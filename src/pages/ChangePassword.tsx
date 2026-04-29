import { useState } from "react";
import { ArrowLeft, Lock, Eye, EyeOff } from "lucide-react";
import { authService } from "../services/authService";

interface ChangePasswordProps {
  onBack: () => void;
  token: string;
}

export default function ChangePassword({ onBack, token }: ChangePasswordProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      const res = await authService.changePassword(matchPassword(currentPassword, newPassword) ? currentPassword : currentPassword, newPassword, token);
      if (res.message === "Password changed successfully") {
        setMessage(res.message);
        setCurrentPassword("");
        setNewPassword("");
      } else {
        setError(res.message || "Failed to change password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const matchPassword = (p1: string, p2: string) => p1 === p2;

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
            <span className="font-display text-2xl tracking-tight">JUST</span>
            <div className="border border-sara-light-green/40 px-2 py-0.5 rounded-sm">
              <span className="text-[10px] uppercase tracking-[0.25em] text-sara-light-green">
                Tradie Mobile
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full max-w-md px-6 pt-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="space-y-10">
          <div className="space-y-2 text-center">
            <h2 className="text-5xl tracking-tight">
              Change Password
            </h2>
            <p className="text-sara-light-grey text-xs uppercase tracking-[0.12em]">
              Update your account password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sara-light-green">
                  <Lock size={14} />
                  <label className="text-[10px] font-black uppercase tracking-widest">
                    Current Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-md bg-sara-dark-grey border border-sara-light-green/12 px-5 py-4 text-sara-off-white placeholder-sara-mid-grey focus:outline-none focus:border-sara-light-green transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sara-mid-grey hover:text-sara-light-grey"
                  >
                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sara-light-green">
                  <Lock size={14} />
                  <label className="text-[10px] font-black uppercase tracking-widest">
                    New Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-md bg-sara-dark-grey border border-sara-light-green/12 px-5 py-4 text-sara-off-white placeholder-sara-mid-grey focus:outline-none focus:border-sara-light-green transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sara-mid-grey hover:text-sara-light-grey"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <p className="text-rose-300 text-xs text-center">
                {error}
              </p>
            )}

            {message && (
              <p className="rounded-md border border-sara-light-green/25 bg-sara-light-green/10 py-3 text-center text-xs text-sara-light-green">
                {message}
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
                "Change Password"
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
