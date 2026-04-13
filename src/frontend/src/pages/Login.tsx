import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Activity, AlertCircle, Heart, Shield, Users } from "lucide-react";
import React from "react";

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const { login, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [error, setError] = React.useState<string | null>(null);

  const isLoading = loginStatus === "logging-in";

  const handleLogin = async () => {
    setError(null);
    try {
      await login();
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      onLoginSuccess();
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Login failed. Please try again.";
      if (msg !== "User closed the prompt") {
        setError(msg);
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f2744 100%)",
      }}
      data-ocid="login-page"
    >
      <div className="w-full max-w-md">
        {/* Logo card */}
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
            Community Health Monitoring Platform
          </p>
        </div>

        {/* Login card */}
        <div
          className="rounded-2xl p-7 shadow-2xl border border-white/10"
          style={{ backgroundColor: "#1e293b" }}
        >
          <h2
            className="text-xl font-semibold text-white mb-1.5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Secure Sign In
          </h2>
          <p className="text-white/50 text-sm mb-6">
            Use Internet Identity to access your CareBridge account securely.
          </p>

          {error && (
            <div
              className="flex items-start gap-2 rounded-lg p-3 mb-4 border border-red-500/30 text-red-300 text-sm"
              style={{ backgroundColor: "rgba(239,68,68,0.1)" }}
              data-ocid="login-error"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full h-11 text-sm font-semibold text-white shadow-lg transition-all duration-200"
            style={{ backgroundColor: "#0d9488" }}
            data-ocid="btn-login"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Connecting...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Sign in with Internet Identity
              </span>
            )}
          </Button>

          {/* Feature pills */}
          <div className="grid grid-cols-3 gap-2 mt-5">
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
        </div>

        {/* Demo credentials hint */}
        <div
          className="mt-4 rounded-xl p-4 border border-white/10"
          style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
          data-ocid="demo-credentials"
        >
          <p className="text-white/60 text-xs font-medium mb-2.5 uppercase tracking-wider">
            Demo Accounts (seeded on first login)
          </p>
          <div className="space-y-1.5">
            {[
              {
                role: "Doctor",
                email: "doctor@carebridge.com",
                color: "#3b82f6",
              },
              {
                role: "Volunteer",
                email: "sunita@carebridge.com",
                color: "#0d9488",
              },
              {
                role: "Admin",
                email: "admin@carebridge.com",
                color: "#a855f7",
              },
            ].map(({ role, email, color }) => (
              <div
                key={role}
                className="flex items-center justify-between text-xs"
              >
                <span
                  className="font-semibold px-1.5 py-0.5 rounded text-white text-[10px]"
                  style={{ backgroundColor: `${color}33`, color }}
                >
                  {role}
                </span>
                <span className="text-white/50">{email}</span>
              </div>
            ))}
          </div>
          <p className="text-white/30 text-[10px] mt-2">
            * Demo data is seeded automatically after your first login.
          </p>
        </div>
      </div>
    </div>
  );
}
