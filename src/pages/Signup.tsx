import { useState, type ReactNode } from "react";
import {
  ArrowLeft,
  User,
  Briefcase,
  FileText,
  Mail,
  Hammer,
  Phone,
  Clock,
  Check,
  MessageSquare,
  Plus,
} from "lucide-react";
import { authService } from "../services/authService";
import logo from "../assets/logo.png";

interface SignupProps {
  onBack: () => void;
  onSuccess?: (user: any, token: string) => void;
}

export default function Signup({ onBack, onSuccess }: SignupProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    password: "",
    acn: "",
    trade: "",
    mobile: "",
    wantGeo: false,
    portGeo: false,
    geoNumber: "",
    openingTime: "07:00 AM",
    closingTime: "06:00 PM",
    secondarySMS: "",
    portMobile: false,
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otp, setOtp] = useState("");

  const steps = [
    { id: 1, label: "Your Details", icon: <User size={16} /> },
    { id: 2, label: "Your Trade", icon: <Hammer size={16} /> },
    { id: 3, label: "Number Setup", icon: <Phone size={16} /> },
    { id: 4, label: "Hours & Delivery", icon: <Clock size={16} /> },
    { id: 5, label: "Confirm", icon: <Check size={16} /> },
    { id: 6, label: "Verify", icon: <Mail size={16} /> },
  ];

  const trades = [
    "Plumber",
    "Electrician",
    "Carpenter",
    "HVAC Technician",
    "Locksmith",
    "Painter",
    "Roofer",
    "General Tradesperson",
  ];

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 7));
  const prevStep = () => {
    if (step === 1) onBack();
    else setStep((prev) => prev - 1);
  };

  const handleSignup = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const payload = {
        customerName: formData.name,
        companyName: formData.company,
        acn: formData.acn,
        email: formData.email,
        password: formData.password,
        trade: formData.trade,
        mobileNumber: formData.mobile,
        wantsGeoNumber: formData.wantGeo,
        geoNumberType: "NONE",
        portingNumber: formData.geoNumber,
        openingHours: `${formData.openingTime}-${formData.closingTime} MON-FRI`,
        paymentDetails: {},
      };

      const res = await authService.register(payload);
      if (res.userId) setStep(6);
      else setError(res.message || "Failed to register");
    } catch {
      setError("An error occurred during signup");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await authService.verifyOtp(formData.email, otp);
      if (res.message === "Email verified successfully") setStep(7);
      else setError(res.message || "Invalid OTP");
    } catch {
      setError("An error occurred during verification");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-sara-black text-sara-off-white">
      <header className="flex w-full items-center justify-between border-b border-sara-light-green/15 px-6 py-6">
        <div className="flex items-center gap-4">
          <button
            onClick={prevStep}
            className="group flex items-center gap-2 text-sara-light-grey transition-colors hover:text-sara-off-white"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />
          </button>
          <img src={logo} alt="Logo" className="h-16 w-auto" />
        </div>

        <span className="text-[10px] uppercase tracking-[0.3em] text-sara-mid-grey">
          Step {Math.min(step, 5)}/5
        </span>
      </header>

      <div className="mx-auto w-full max-w-4xl overflow-x-auto px-6 pb-4 pt-12 no-scrollbar">
        <div className="relative flex min-w-[500px] items-center justify-between">
          {steps.map((s) => (
            <div
              key={s.id}
              className={`z-10 flex cursor-pointer items-center gap-2 border-b-2 pb-4 transition-all ${
                step === s.id
                  ? "border-sara-light-green text-sara-light-green"
                  : step > s.id
                    ? "border-sara-off-white text-sara-off-white"
                    : "border-transparent text-sara-mid-grey"
              }`}
            >
              {step > s.id ? <Check size={16} /> : s.icon}
              <span className="whitespace-nowrap text-xs uppercase tracking-[0.2em]">
                {s.label}
              </span>
            </div>
          ))}
          <div className="absolute bottom-4 left-0 h-[2px] w-full bg-sara-light-green/10 -z-10" />
        </div>
      </div>

      <main className="mx-auto w-full max-w-2xl px-6 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
        {step === 1 && (
          <Section title="Your Details" copy="Tell us about yourself and your business.">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
              <InputField label="Your Name" value={formData.name} icon={<User size={14} />} placeholder="Jon Smith" onChange={(v: string) => handleInputChange("name", v)} />
              <InputField label="Company Name" value={formData.company} icon={<Briefcase size={14} />} placeholder="Jon's Plumbing" onChange={(v: string) => handleInputChange("company", v)} />
              <InputField label="ACN (optional)" value={formData.acn} icon={<FileText size={14} />} placeholder="123 456 789" highlight onChange={(v: string) => handleInputChange("acn", v)} />
              <InputField label="Email" value={formData.email} icon={<Mail size={14} />} placeholder="jon@plumbing.com.au" onChange={(v: string) => handleInputChange("email", v)} />
              <InputField label="Password" type="password" value={formData.password} icon={<FileText size={14} />} placeholder="••••••••" onChange={(v: string) => handleInputChange("password", v)} />
            </div>
          </Section>
        )}

        {step === 2 && (
          <Section title="What Trade Are You?" copy="This helps Bele.Ai qualify callers and check they need the right trade.">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {trades.map((t) => (
                <button
                  key={t}
                  onClick={() => setFormData({ ...formData, trade: t })}
                  className={`group flex items-center justify-between rounded-2xl border-2 p-5 transition-all ${
                    formData.trade === t
                      ? "border-sara-light-green bg-sara-light-green/10 text-sara-light-green"
                      : "border-sara-light-green/12 bg-sara-dark-grey text-sara-light-grey hover:border-sara-light-green/28"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Hammer
                      size={18}
                      className={
                        formData.trade === t
                          ? "text-sara-light-green"
                          : "text-sara-mid-grey transition-colors group-hover:text-sara-light-grey"
                      }
                    />
                    <span>{t}</span>
                  </div>
                  {formData.trade === t && <Check size={16} />}
                </button>
              ))}
            </div>
          </Section>
        )}

        {step === 3 && (
          <Section title="Number Setup" copy="Your mobile number and optional geographic (landline) number.">
            <div className="space-y-4">
              <InputField label="Mobile Number" value={formData.mobile} icon={<Phone size={14} />} placeholder="0412 345 678" onChange={(v: string) => handleInputChange("mobile", v)} />

              <div onClick={() => setFormData({ ...formData, portMobile: !formData.portMobile })}>
                <CheckboxField checked={formData.portMobile} label="Port this mobile number?" sub="CAT-A port typically takes 24-48 hours" />
              </div>

              <div className="border-t border-sara-light-green/10" />

              <div onClick={() => setFormData({ ...formData, wantGeo: !formData.wantGeo })}>
                <CheckboxField checked={formData.wantGeo} label="Do you want a Geo (landline) number?" sub="e.g. 02 XXXX XXXX for a local presence" />
              </div>

              {formData.wantGeo && (
                <div className="animate-in space-y-4 border-l-2 border-sara-light-green/20 pl-4 pt-1 slide-in-from-left-4">
                  <div onClick={() => setFormData({ ...formData, portGeo: !formData.portGeo })}>
                    <CheckboxField checked={formData.portGeo} label="Port an existing Geo number" />
                  </div>
                  <InputField label="Existing Geo Number" value={formData.geoNumber} icon={<Plus size={14} />} placeholder="02 XXXX XXXX" onChange={(v: string) => handleInputChange("geoNumber", v)} />
                </div>
              )}
            </div>
          </Section>
        )}

        {step === 4 && (
          <Section title="Working Hours & Delivery" copy="Set your business hours so Bele.Ai can greet callers differently after hours.">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <InputField label="Opening Time" value={formData.openingTime} icon={<Clock size={14} />} placeholder="07:00 AM" onChange={(v: string) => handleInputChange("openingTime", v)} />
              <InputField label="Closing Time" value={formData.closingTime} icon={<Clock size={14} />} placeholder="06:00 PM" onChange={(v: string) => handleInputChange("closingTime", v)} />
            </div>

            <div className="mt-8">
              <InputField
                label="Secondary SMS Delivery (optional)"
                value={formData.secondarySMS}
                icon={<MessageSquare size={14} />}
                placeholder="111XXXXXXXX"
                subLabel="A copy of each lead SMS will also be sent to this number."
                highlight
                onChange={(v: string) => handleInputChange("secondarySMS", v)}
              />
            </div>

            <div className="mt-8 space-y-4 rounded-2xl border border-sara-light-green/20 bg-sara-dark-grey p-6">
              <div className="flex items-center gap-2 text-sara-light-green">
                <Briefcase size={16} />
                <span className="text-xs uppercase tracking-[0.2em]">Payment</span>
              </div>
              <p className="text-sm text-sara-light-grey">
                Payment details would be collected here. Upfront payment required
                before activation.
              </p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-rose-300">
                (Demo only - no payment processing)
              </p>
            </div>
          </Section>
        )}

        {step === 5 && (
          <Section title="Confirm & Sign Up" copy="Review your details and accept the terms.">
            <div className="space-y-10">
              <div className="space-y-4 rounded-3xl border border-sara-light-green/12 bg-sara-dark-grey p-10">
                <div className="flex justify-center text-[10px] uppercase tracking-[0.25em] text-sara-mid-grey">
                  Your Details
                </div>
                <SummaryItem label="Name" value={formData.name || "—"} />
                <SummaryItem label="Company" value={formData.company || "—"} />
                <SummaryItem label="Email" value={formData.email || "—"} />
                <SummaryItem label="Trade" value={formData.trade || "—"} />
                <SummaryItem label="Mobile" value={`${formData.mobile || "—"} ${formData.portMobile ? "(porting)" : ""}`} />
                <SummaryItem label="Hours" value={`${formData.openingTime} — ${formData.closingTime}`} />
              </div>

              <div
                onClick={() => setAgreedToTerms(!agreedToTerms)}
                className={`group flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition-all ${
                  agreedToTerms
                    ? "border-sara-light-green/50 bg-sara-light-green/10 shadow-[0_0_20px_rgba(163,177,138,0.1)]"
                    : "border-sara-light-green/12 bg-sara-dark-grey hover:border-sara-light-green/24"
                }`}
              >
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
                    agreedToTerms
                      ? "border-sara-light-green bg-sara-light-green"
                      : "border-sara-light-grey/20 group-hover:border-sara-light-grey/40"
                  }`}
                >
                  {agreedToTerms && (
                    <Check size={16} className="stroke-[4] text-sara-dark-green" />
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-sara-off-white">
                    I agree to the Terms and Conditions
                  </p>
                  <p className="text-[10px] leading-relaxed text-sara-light-grey">
                    Including payment terms, porting authorisation, and Bele.Ai
                    service agreement.
                  </p>
                </div>
              </div>
            </div>
          </Section>
        )}

        {step === 6 && (
          <Section title="Verify Your Email" copy={`We've sent a 6-digit code to ${formData.email}`}>
            <div className="flex flex-col items-center space-y-6">
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000"
                className="w-full max-w-xs rounded-2xl border border-sara-light-green/12 bg-sara-dark-grey px-6 py-5 text-center font-mono text-4xl tracking-[0.5em] text-sara-light-green placeholder-sara-mid-grey transition-all focus:outline-none focus:border-sara-light-green"
              />

              {error && <p className="text-sm text-rose-300">{error}</p>}

              <button
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6 || isSubmitting}
                className="w-full max-w-xs rounded-md bg-sara-light-green px-10 py-4 text-sm uppercase tracking-[0.25em] text-sara-dark-green transition-all hover:bg-[#b7c5a2] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </Section>
        )}

        {step === 7 && (
          <div className="animate-in space-y-10 py-10 text-center fade-in zoom-in-95 duration-1000">
            <div className="relative flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-sara-light-green shadow-[0_0_50px_rgba(163,177,138,0.2)]">
                <Check size={48} className="text-sara-light-green" />
              </div>
              <div className="absolute -inset-4 -z-10 rounded-full bg-sara-light-green/10 blur-2xl" />
            </div>

            <div className="space-y-4">
              <h2 className="text-5xl tracking-tight sm:text-6xl">
                You're All Set!
              </h2>
              <p className="mx-auto max-w-md text-sm leading-relaxed text-sara-light-grey sm:text-base">
                In a real sign-up, you'd receive a confirmation email at <br />
                <span className="text-sara-off-white">{formData.email}</span>
                <br />
                and your Bele.Ai agent would be activated immediately.
              </p>
            </div>

            <div className="mx-auto w-full max-w-sm space-y-4 rounded-3xl border border-sara-light-green/12 bg-sara-dark-grey/70 p-8 text-left">
              <span className="text-[10px] uppercase tracking-[0.25em] text-sara-mid-grey">
                Summary
              </span>
              <MiniRow label="Business" value={formData.company} />
              <MiniRow label="Trade" value={formData.trade} />
              <MiniRow label="Mobile" value={formData.mobile} />
              <MiniRow
                label="Hours"
                value={`${formData.openingTime} — ${formData.closingTime}`}
              />
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={() =>
                  onSuccess &&
                  onSuccess(
                    { email: formData.email, name: formData.name },
                    "dummy-token-after-signup"
                  )
                }
                className="group flex w-full items-center justify-center gap-3 rounded-md bg-sara-light-green px-8 py-4 text-sm uppercase tracking-[0.25em] text-sara-dark-green transition-all hover:bg-[#b7c5a2] sm:w-auto"
              >
                Try the Demo
                <ArrowLeft className="h-5 w-5 rotate-180 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={onBack}
                className="w-full rounded-md border border-sara-light-green/20 px-8 py-4 text-sm uppercase tracking-[0.25em] text-sara-off-white transition-all hover:border-sara-light-green/35 sm:w-auto"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}

        {step < 6 && (
          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={prevStep}
              className="group flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-sara-mid-grey transition-colors hover:text-sara-off-white"
            >
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-1"
              />
              Back
            </button>

            {error && <p className="text-xs text-rose-300">{error}</p>}

            <button
              onClick={step === 5 ? handleSignup : nextStep}
              disabled={
                (step === 5 && (!agreedToTerms || isSubmitting)) || isSubmitting
              }
              className={`group flex items-center gap-2 rounded-md px-10 py-3 text-sm uppercase tracking-[0.25em] transition-all duration-300 hover:scale-[1.03] active:scale-95 ${
                step === 5
                  ? agreedToTerms
                    ? "bg-sara-light-green text-sara-dark-green shadow-[0_10px_30px_rgba(163,177,138,0.25)]"
                    : "cursor-not-allowed border border-sara-light-green/12 bg-sara-dark-grey text-sara-mid-grey opacity-50"
                  : "bg-sara-light-green text-sara-dark-green hover:bg-[#b7c5a2]"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  Processing...
                </span>
              ) : (
                <>
                  {step === 5 ? <Check size={20} className="stroke-[3]" /> : null}
                  {step === 5 ? "Complete Sign Up" : "Next"}
                  {step !== 5 && (
                    <ArrowLeft className="h-5 w-5 rotate-180 transition-transform group-hover:translate-x-1" />
                  )}
                </>
              )}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

function Section({
  title,
  copy,
  children,
}: {
  title: string;
  copy: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h2 className="text-5xl tracking-tight">{title}</h2>
        <p className="text-xs uppercase tracking-[0.12em] text-sara-light-grey">
          {copy}
        </p>
      </div>
      {children}
    </div>
  );
}

function InputField({
  label,
  value,
  icon,
  placeholder,
  highlight = false,
  subLabel,
  type = "text",
  onChange,
}: any) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sara-light-green">
        {icon}
        <label className="text-[10px] uppercase tracking-[0.2em]">{label}</label>
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-md border bg-sara-dark-grey px-5 py-4 text-sara-off-white placeholder-sara-mid-grey transition-all focus:outline-none focus:border-sara-light-green ${
          highlight
            ? "border-sara-light-green/30 shadow-[0_0_20px_rgba(163,177,138,0.08)]"
            : "border-sara-light-green/12"
        }`}
      />
      {subLabel && (
        <p className="text-[10px] leading-relaxed text-sara-mid-grey">
          {subLabel}
        </p>
      )}
    </div>
  );
}

function CheckboxField({ checked, label, sub }: any) {
  return (
    <div className="group flex cursor-pointer items-center gap-5 rounded-2xl border border-sara-light-green/12 bg-sara-dark-grey p-6 transition-all hover:border-sara-light-green/24">
      <div
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
          checked
            ? "border-sara-light-green bg-sara-light-green"
            : "border-sara-light-grey/20"
        }`}
      >
        {checked && <Check size={16} className="text-sara-dark-green" />}
      </div>
      <div className="space-y-0.5">
        <p className="text-sm tracking-tight text-sara-off-white">{label}</p>
        {sub && (
          <p className="text-[10px] uppercase tracking-[0.2em] text-sara-light-grey/75">
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

function SummaryItem({ label, value }: any) {
  return (
    <div className="flex items-center justify-between border-b border-sara-light-green/10 pb-4">
      <span className="text-xs uppercase tracking-[0.2em] text-sara-mid-grey">
        {label}:
      </span>
      <span className="tracking-tight text-sara-off-white">{value}</span>
    </div>
  );
}

function MiniRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="uppercase tracking-[0.2em] text-sara-light-grey">
        {label}:
      </span>
      <span className="text-sara-off-white">{value}</span>
    </div>
  );
}
