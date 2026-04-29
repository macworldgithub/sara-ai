import { useState } from "react";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.png";
import { authService } from "../services/authService";

interface LoginProps {
  onBack: () => void;
  onSuccess: (user: any, token: string) => void;
  onForgotPassword: () => void;
  onSignup: () => void;
}

export default function Login({ onBack, onSuccess, onForgotPassword, onSignup }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await authService.login({ email, password });
      if (res.accessToken) {
        onSuccess(res.user, res.accessToken);
      } else {
        setError(res.message || "Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-sara-black text-sara-off-white flex flex-col items-center">
      <header className="w-full px-6 py-6 border-b border-sara-light-green/15 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-sara-light-grey hover:text-sara-off-white transition-colors flex items-center gap-2 group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
          </button>

          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-20 w-auto" />
          </div>
        </div>
      </header>

      <main className="w-full max-w-md px-6 pt-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="space-y-10">
          <div className="space-y-2 text-center">
            <h2 className="text-5xl tracking-tight">
              Welcome Back
            </h2>
            <p className="text-sara-light-grey tracking-[0.08em] uppercase text-xs">
              Sign in to manage your AI agent.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sara-light-green">
                  <Mail size={14} />
                  <label className="text-[10px] font-black uppercase tracking-widest">
                    Email Address
                  </label>
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jon@plumbing.com.au"
                  className="w-full rounded-md bg-sara-dark-grey border border-sara-light-green/12 px-5 py-4 text-sara-off-white placeholder-sara-mid-grey focus:outline-none focus:border-sara-light-green transition-all"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sara-light-green">
                    <Lock size={14} />
                    <label className="text-[10px] font-black uppercase tracking-widest">
                      Password
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-[10px] uppercase tracking-[0.25em] text-sara-light-grey hover:text-sara-light-green transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-md bg-sara-dark-grey border border-sara-light-green/12 px-5 py-4 text-sara-off-white placeholder-sara-mid-grey focus:outline-none focus:border-sara-light-green transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sara-mid-grey hover:text-sara-light-grey"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <p className="text-rose-300 text-xs text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 rounded-md bg-sara-light-green px-8 py-4 text-sm uppercase tracking-[0.25em] text-sara-dark-green transition-all hover:bg-[#b7c5a2] disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-sara-dark-green border-t-transparent rounded-full animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-sara-light-grey text-xs">
            Don't have an account?{" "}
            <button
              onClick={onSignup}
              className="text-sara-light-green hover:underline"
            >
              Sign up now
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
