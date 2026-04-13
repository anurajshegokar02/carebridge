import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Heart,
  Loader2,
  Shield,
  Stethoscope,
  UserPlus,
  Users,
} from "lucide-react";
import React from "react";
import { createActor } from "../backend";
import { toNumber } from "../lib/utils";
import type { User, UserRoleStr } from "../types";

const ROLE_OPTIONS: {
  value: UserRoleStr;
  label: string;
  desc: string;
  icon: string;
}[] = [
  {
    value: "volunteer",
    label: "Volunteer",
    desc: "Register patients and enter vitals",
    icon: "🤝",
  },
  {
    value: "doctor",
    label: "Doctor",
    desc: "Review records and manage clinical alerts",
    icon: "🩺",
  },
  {
    value: "patient",
    label: "Patient",
    desc: "View your own health records only",
    icon: "🏥",
  },
  {
    value: "admin",
    label: "Admin",
    desc: "Full platform access and user management",
    icon: "🛡️",
  },
];

interface SignUpProps {
  onRegistered: (user: User) => void;
  onLogout: () => void;
}

export default function SignUp({ onRegistered, onLogout }: SignUpProps) {
  const { identity } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor(createActor);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState<UserRoleStr>("volunteer");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const principal = identity?.getPrincipal().toString() ?? "";
  const shortPrincipal =
    principal.length > 16
      ? `${principal.slice(0, 8)}...${principal.slice(-6)}`
      : principal;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!actor || actorFetching) return;
    if (!name.trim() || !email.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const rawUser = await actor.registerUser(
        name.trim(),
        email.trim(),
        role as unknown as Parameters<typeof actor.registerUser>[2],
      );

      setSuccess(true);

      setTimeout(() => {
        const mapped: User = {
          id: toNumber(rawUser.id),
          principal: rawUser.principal.toString(),
          name: rawUser.name,
          email: rawUser.email,
          role: rawUser.role as unknown as UserRoleStr,
          createdAt: toNumber(rawUser.createdAt),
          patientId:
            rawUser.patientId != null ? toNumber(rawUser.patientId) : undefined,
        };
        onRegistered(mapped);
      }, 1200);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  const isReady = !!actor && !actorFetching;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f2744 100%)",
      }}
      data-ocid="signup-page"
    >
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            style={{ backgroundColor: "#0d9488" }}
          >
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1
            className="text-3xl font-bold text-white mb-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            CareBridge
          </h1>
          <p className="text-white/50 text-sm">
            Complete your profile to get started
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-7 shadow-2xl border border-white/10"
          style={{ backgroundColor: "#1e293b" }}
        >
          <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/10">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "rgba(13,148,136,0.2)" }}
            >
              <UserPlus className="w-5 h-5" style={{ color: "#2dd4bf" }} />
            </div>
            <div className="min-w-0">
              <h2
                className="text-lg font-semibold text-white leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Create Your Account
              </h2>
              <p className="text-white/40 text-xs truncate">
                Principal: {shortPrincipal || "connected"}
              </p>
            </div>
          </div>

          {/* Success State */}
          {success ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <CheckCircle2 className="w-12 h-12 text-teal-400" />
              <p
                className="text-lg font-semibold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Registration complete!
              </p>
              <p className="text-white/50 text-sm">
                Redirecting to your dashboard...
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              data-ocid="signup-form"
            >
              {error && (
                <div
                  className="flex items-start gap-2 rounded-lg p-3 border border-red-500/30 text-red-300 text-sm"
                  style={{ backgroundColor: "rgba(239,68,68,0.1)" }}
                  data-ocid="signup-error"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <Label
                  htmlFor="signup-name"
                  className="text-white/70 text-sm font-medium"
                >
                  Full Name <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="signup-name"
                  data-ocid="input-signup-name"
                  placeholder="Dr. Anita Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                  className="bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-teal-500/60 focus:ring-teal-500/20"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="signup-email"
                  className="text-white/70 text-sm font-medium"
                >
                  Email Address <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="signup-email"
                  data-ocid="input-signup-email"
                  type="email"
                  placeholder="anita@carebridge.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-teal-500/60 focus:ring-teal-500/20"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-white/70 text-sm font-medium">
                  Your Role <span className="text-red-400">*</span>
                </Label>
                <Select
                  value={role}
                  onValueChange={(v) => setRole(v as UserRoleStr)}
                  disabled={loading}
                >
                  <SelectTrigger
                    data-ocid="select-signup-role"
                    className="bg-white/5 border-white/15 text-white focus:border-teal-500/60"
                  >
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <span className="flex items-center gap-2">
                          <span>{opt.icon}</span>
                          <span className="font-medium">{opt.label}</span>
                          <span className="text-muted-foreground text-xs hidden sm:inline">
                            — {opt.desc}
                          </span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Role hint */}
                {role && (
                  <p className="text-white/35 text-xs mt-1 pl-0.5">
                    {ROLE_OPTIONS.find((r) => r.value === role)?.desc}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                data-ocid="btn-signup-submit"
                disabled={!isReady || loading || !name.trim() || !email.trim()}
                className="w-full h-11 text-sm font-semibold text-white shadow-lg transition-all duration-200 mt-2"
                style={{ backgroundColor: "#0d9488" }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating account...
                  </span>
                ) : !isReady ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Connecting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Create Account
                  </span>
                )}
              </Button>
            </form>
          )}
        </div>

        {/* Feature pills */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[
            { icon: Activity, label: "Vitals Tracking" },
            { icon: Users, label: "Patient Records" },
            { icon: Shield, label: "Secure & Private" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg border border-white/8 text-center"
              style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
            >
              <Icon className="w-4 h-4 text-teal-400" />
              <span className="text-[10px] text-white/50 leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Logout link */}
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={onLogout}
            className="text-white/30 text-xs hover:text-white/50 transition-colors underline underline-offset-2"
            data-ocid="btn-signup-logout"
          >
            Sign out and use a different identity
          </button>
        </div>

        {/* Role info card */}
        <div
          className="mt-3 rounded-xl p-3.5 border border-white/8"
          style={{ backgroundColor: "rgba(13,148,136,0.06)" }}
        >
          <p className="text-teal-400/70 text-[10px] uppercase tracking-wider font-medium mb-2">
            Role-based access
          </p>
          <div className="grid grid-cols-2 gap-1.5 text-[10px]">
            {[
              { role: "Admin", access: "All features + user management" },
              { role: "Doctor", access: "Review records, alerts" },
              { role: "Volunteer", access: "Register patients, enter vitals" },
              { role: "Patient", access: "View own health records only" },
            ].map(({ role: r, access }) => (
              <div key={r} className="flex items-start gap-1.5">
                <span className="w-1 h-1 rounded-full bg-teal-500/60 flex-shrink-0 mt-1" />
                <span className="text-white/40">
                  <span className="text-white/60 font-medium">{r}:</span>{" "}
                  {access}
                </span>
              </div>
            ))}
          </div>
          <p className="text-white/20 text-[10px] mt-2.5 pt-2 border-t border-white/8 leading-relaxed">
            * Admins can change your role at any time from the Manage Users
            panel.
          </p>
        </div>
      </div>
    </div>
  );
}
