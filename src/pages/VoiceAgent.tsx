import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { ArrowLeft, Mic, PhoneOff } from "lucide-react";

interface VoiceAgentProps {
  onBack: () => void;
}

export default function VoiceAgent({ onBack }: VoiceAgentProps) {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [status, setStatus] = useState("Ready");
  const [orbState, setOrbState] = useState<null | 'listening' | 'speaking'>(null);
  const [agentTranscript, setAgentTranscript] = useState("");
  const [userTranscript, setUserTranscript] = useState("");


  const socketRef = useRef<Socket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const playbackQueueRef = useRef<Float32Array[]>([]);
  const isPlayingRef = useRef(false);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const isSessionActiveRef = useRef(false);

  const BACKEND_URL = "https://www.tradie.omnisuiteai.com";

  const CAPTURE_SAMPLE_RATE = 24000;
  const PLAYBACK_SAMPLE_RATE = 16000;

  useEffect(() => {
    // Initialize Socket.IO with backend URL
    const socket = io(BACKEND_URL);
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('session-started', (data) => {
      console.log('Session started:', data.sessionId);
      setStatus('Connected — Listening...');
      setOrbState('listening');
    });

    socket.on('audio-delta', (data) => {
      if (!isSessionActiveRef.current) return;
      queueAudioChunk(data.delta);
    });

    let accumulatedAgentText = '';
    socket.on('transcript-delta', (data) => {
      if (!isSessionActiveRef.current) return;
      accumulatedAgentText += data.delta;
      setAgentTranscript(accumulatedAgentText);
    });

    socket.on('transcript-done', () => {
      accumulatedAgentText = '';
    });

    socket.on('user-transcript', (data) => {
      if (!isSessionActiveRef.current) return;
      setUserTranscript(data.transcript);
    });

    socket.on('speech-started', () => {
      if (!isSessionActiveRef.current) return;
      stopPlayback();
      setOrbState('listening');
      setStatus('Listening...');
      setAgentTranscript('');
      accumulatedAgentText = '';
    });



    socket.on('realtime-error', (data) => {
      console.error('Realtime error:', data.error);
      setStatus('Error: ' + (data.error?.message || 'Unknown'));
    });

    socket.on('session-closed', () => {
      handleEndSession();
    });

    return () => {
      socket.disconnect();
      stopMicrophone();
    };
  }, []);

  const queueAudioChunk = (base64: string) => {
    const raw = atob(base64);
    const bytes = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
    const pcm16 = new Int16Array(bytes.buffer);
    const float32 = new Float32Array(pcm16.length);
    for (let i = 0; i < pcm16.length; i++) float32[i] = pcm16[i] / 32768;

    playbackQueueRef.current.push(float32);
    if (!isPlayingRef.current) playNextChunk();
  };

  const playNextChunk = () => {
    if (playbackQueueRef.current.length === 0 || !audioContextRef.current || !isSessionActiveRef.current) {
      isPlayingRef.current = false;
      if (isSessionActiveRef.current) {
        setOrbState('listening');
        setStatus('Listening...');
      }
      return;
    }

    isPlayingRef.current = true;
    setOrbState('speaking');
    setStatus('Agent speaking...');

    const samples = playbackQueueRef.current.shift()!;
    const buffer = audioContextRef.current.createBuffer(1, samples.length, PLAYBACK_SAMPLE_RATE);

    buffer.getChannelData(0).set(samples);

    const source = audioContextRef.current.createBufferSource();
    currentSourceRef.current = source;
    source.buffer = buffer;
    source.connect(audioContextRef.current.destination);
    source.onended = () => {
      currentSourceRef.current = null;
      if (isSessionActiveRef.current) {
        playNextChunk();
      }
    };
    source.start();
  };

  const stopPlayback = () => {
    playbackQueueRef.current = [];
    isPlayingRef.current = false;
    if (currentSourceRef.current) {
      try {
        currentSourceRef.current.stop();
      } catch (e) {
        // Source might have already stopped or not started
      }
      currentSourceRef.current = null;
    }
  };

  const startMicrophone = async () => {
    const audioContext = new AudioContext({ sampleRate: CAPTURE_SAMPLE_RATE });
    audioContextRef.current = audioContext;

    const processorCode = `
      class PCMProcessor extends AudioWorkletProcessor {
          process(inputs) {
              const input = inputs[0];
              if (input && input[0]) {
                  const float32 = input[0];
                  const pcm16 = new Int16Array(float32.length);
                  for (let i = 0; i < float32.length; i++) {
                      const s = Math.max(-1, Math.min(1, float32[i]));
                      pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
                  }
                  this.port.postMessage(pcm16.buffer, [pcm16.buffer]);
              }
              return true;
          }
      }
      registerProcessor('pcm-processor', PCMProcessor);
    `;
    const blob = new Blob([processorCode], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    await audioContext.audioWorklet.addModule(url);
    URL.revokeObjectURL(url);

    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        sampleRate: CAPTURE_SAMPLE_RATE,
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      }
    });
    mediaStreamRef.current = mediaStream;

    const source = audioContext.createMediaStreamSource(mediaStream);
    const workletNode = new AudioWorkletNode(audioContext, 'pcm-processor');
    workletNodeRef.current = workletNode;

    workletNode.port.onmessage = (e) => {
      if (!socketRef.current || !isSessionActiveRef.current) return;

      const pcm16 = new Uint8Array(e.data);
      let binary = '';
      for (let i = 0; i < pcm16.length; i++) {
        binary += String.fromCharCode(pcm16[i]);
      }
      const base64 = btoa(binary);
      socketRef.current.emit('audio-chunk', { audio: base64 });
    };

    source.connect(workletNode);
    workletNode.connect(audioContext.destination);
  };

  const stopMicrophone = () => {
    if (workletNodeRef.current) {
      workletNodeRef.current.disconnect();
      workletNodeRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(t => t.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const handleStartSession = async () => {
    try {
      setStatus('Connecting...');

      await startMicrophone();
      isSessionActiveRef.current = true;
      setIsSessionActive(true);
      socketRef.current?.emit('start-session');
    } catch (err) {
      console.error('Failed to start:', err);
      setStatus('Microphone access denied');
    }
  };

  const handleEndSession = () => {
    isSessionActiveRef.current = false;
    setIsSessionActive(false);
    socketRef.current?.emit('end-session');
    stopPlayback();
    stopMicrophone();
    setOrbState(null);
    setStatus('Call ended');
    setAgentTranscript("");
    setUserTranscript("");

  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-sara-black text-sara-off-white">
      {/* BACKGROUND GRADIENTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sara-dark-green/40 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] translate-x-1/2 translate-y-1/2 rounded-full bg-sara-light-green/20 blur-[120px]" />
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-sara-light-green/15 bg-sara-black/80 px-6 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="rounded-full p-2 text-sara-light-grey transition-all hover:bg-sara-off-white/5 hover:text-sara-off-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-1">
            <span className="font-bold text-sara-light-green">~</span>
            <span className="text-sm uppercase tracking-[0.2em] text-sara-off-white">
              VOICE
            </span>
            <span className="text-sm uppercase tracking-[0.2em] text-sara-light-green">
              AGENT
            </span>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-y-auto">
        <div className="w-full max-w-lg space-y-10 rounded-[40px] border border-sara-light-green/15 bg-sara-dark-grey/70 p-8 text-center shadow-sara-soft backdrop-blur-2xl md:p-12">

          <div className="space-y-4">
            <h1 className="bg-gradient-to-r from-sara-off-white to-sara-light-green bg-clip-text text-4xl tracking-tight text-transparent md:text-5xl">
              AI Voice Assistant
            </h1>
            <p className="text-sm uppercase tracking-[0.25em] text-sara-light-grey">
              Real-time Service Booking Representative
            </p>
          </div>

          <div className="flex flex-col items-center space-y-8">
            {/* STATUS BADGE */}
            <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${isSessionActive
              ? 'border border-sara-light-green/25 bg-sara-light-green/10 text-sara-light-green shadow-[0_0_15px_rgba(163,177,138,0.12)]'
              : 'border border-sara-off-white/12 bg-sara-off-white/5 text-sara-off-white'
              }`}>
              {status}
            </div>

            {/* THE ORB */}
            <div className="relative group">
              <div className={`relative z-10 flex h-32 w-32 items-center justify-center rounded-full transition-all duration-700 md:h-40 md:w-40 ${orbState === 'listening' ? 'scale-105 bg-sara-light-green text-sara-dark-green shadow-[0_0_50px_rgba(163,177,138,0.35)]' :
                orbState === 'speaking' ? 'scale-110 bg-sara-dark-green text-sara-off-white shadow-[0_0_60px_rgba(0,73,58,0.45)]' :
                  'scale-100 border border-sara-light-green/12 bg-sara-dark-grey shadow-xl'
                }`}>
                <Mic size={40} className={`transition-opacity duration-300 ${isSessionActive ? 'opacity-100' : 'opacity-40'}`} />

                {/* PULSE RINGS */}
                {isSessionActive && (
                  <>
                    <div className={`absolute inset-0 rounded-full border-2 animate-ping opacity-20 ${orbState === 'speaking' ? 'border-sara-off-white' : 'border-sara-light-green'
                      }`} />
                    <div className={`absolute -inset-4 rounded-full border border-sara-light-green/15 ${orbState === 'speaking' ? 'animate-pulse' : ''
                      }`} />
                  </>
                )}
              </div>

              {/* ORB GLOW EFFECT */}
              <div className={`absolute inset-0 -z-10 opacity-20 blur-3xl transition-all duration-700 ${orbState === 'listening' ? 'scale-150 bg-sara-light-green' :
                orbState === 'speaking' ? 'scale-150 bg-sara-dark-green' :
                  'bg-transparent'
                }`} />
            </div>

            {/* CONTROLS */}
            <div className="w-full max-w-sm">
              {!isSessionActive ? (
                <button
                  onClick={handleStartSession}
                  className="w-full rounded-md bg-sara-light-green px-8 py-4 text-sm uppercase tracking-[0.25em] text-sara-dark-green transition-all hover:bg-[#b7c5a2] active:scale-95"
                >
                  START CONVERSATION
                </button>
              ) : (
                <button
                  onClick={handleEndSession}
                  className="flex w-full items-center justify-center gap-3 rounded-md border border-rose-400/30 bg-rose-400/10 px-8 py-4 text-sm uppercase tracking-[0.25em] text-rose-300 transition-all hover:bg-rose-500 hover:text-white"
                >
                  <PhoneOff size={18} />
                  END CALL
                </button>
              )}
            </div>
          </div>

          {/* TRANSCRIPTS */}
          {(userTranscript || agentTranscript) && (
            <div className="space-y-4 border-t border-sara-light-green/15 pt-10 text-left">
              {agentTranscript && (
                <div className="space-y-2">
                  <span className="ml-2 text-[10px] uppercase tracking-[0.25em] text-sara-light-green/70">Agent</span>
                  <div className="rounded-r-2xl border-l-2 border-sara-light-green bg-sara-light-green/10 p-4 text-sm leading-relaxed text-sara-off-white italic">
                    {agentTranscript}
                  </div>
                </div>
              )}

              {userTranscript && (
                <div className="space-y-2">
                  <span className="ml-2 text-[10px] uppercase tracking-[0.25em] text-sara-light-grey/70">You</span>
                  <div className="rounded-2xl bg-sara-black/35 p-4 text-sm leading-relaxed text-sara-light-grey">
                    {userTranscript}
                  </div>
                </div>
              )}
            </div>
          )}


        </div>
      </main>

      {/* FOOTER STATUS */}
      <footer className="flex h-10 w-full items-center justify-between border-t border-sara-light-green/15 bg-sara-black/60 px-6 font-mono text-[9px] uppercase tracking-[0.2em] text-sara-mid-grey">
        <div className="flex items-center gap-2">
          <div className={`h-1 w-1 rounded-full ${isSessionActive ? 'bg-sara-light-green animate-pulse' : 'bg-sara-mid-grey'}`} />
          {isSessionActive ? 'SESSION_ENCRYPTED_ACTIVE' : 'READY_TO_CONNECT'}
        </div>
        <div className="flex items-center gap-6">
          <span className="opacity-40">TRADIE_MOB_OS v1.0.4</span>
          <span className="text-sara-light-green/40">BELE.AI_CORE</span>
        </div>
      </footer>
    </div>
  );
}
