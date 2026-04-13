import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  Activity,
  Bell,
  Heart,
  LayoutDashboard,
  Lock,
  Shield,
  Stethoscope,
  Users,
} from "lucide-react";

const FEATURES = [
  {
    icon: <Activity className="w-6 h-6" style={{ color: "#0d9488" }} />,
    title: "Patient Monitoring",
    desc: "Track vitals, blood pressure, glucose, SpO2, and heart rate for every patient in your community.",
  },
  {
    icon: <Stethoscope className="w-6 h-6" style={{ color: "#0d9488" }} />,
    title: "Doctor Review Workflow",
    desc: "Doctors review health records, provide clinical advice, and keep patient care timely and traceable.",
  },
  {
    icon: <Bell className="w-6 h-6" style={{ color: "#0d9488" }} />,
    title: "Automatic Alert System",
    desc: "Critical readings trigger instant alerts — high BP, low SpO2, abnormal heart rate — so no warning goes unnoticed.",
  },
  {
    icon: <Users className="w-6 h-6" style={{ color: "#0d9488" }} />,
    title: "Community Health Roles",
    desc: "Doctors, volunteers, admins, and patients each get a role-specific experience designed for their workflow.",
  },
  {
    icon: <Shield className="w-6 h-6" style={{ color: "#0d9488" }} />,
    title: "Secure & Decentralized",
    desc: "Built on the Internet Computer — data is private, persistent, and tamper-resistant without external servers.",
  },
  {
    icon: <LayoutDashboard className="w-6 h-6" style={{ color: "#0d9488" }} />,
    title: "Real-time Dashboards",
    desc: "Live stats and alert feeds give every team member a clear, current picture of community health status.",
  },
] as const;

export default function VisitorPanel() {
  const { login } = useInternetIdentity();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#f8fafc" }}
    >
      {/* Navbar */}
      <header
        className="flex items-center justify-between px-6 md:px-12 py-4 border-b"
        style={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#0d9488" }}
          >
            <Heart className="w-4 h-4 text-white" />
          </div>
          <div>
            <span
              className="font-bold text-lg leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-display)", color: "#0f172a" }}
            >
              CareBridge
            </span>
            <span className="text-[10px] ml-2 uppercase tracking-widest text-muted-foreground hidden sm:inline">
              Health Monitor
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={login}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: "#0d9488" }}
          data-ocid="visitor-login-nav"
        >
          <Lock className="w-4 h-4" />
          Sign In
        </button>
      </header>

      {/* Hero */}
      <section
        className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center"
        style={{
          background:
            "linear-gradient(160deg, #0f172a 0%, #134e4a 60%, #0f172a 100%)",
        }}
        data-ocid="visitor-hero"
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
          style={{ backgroundColor: "#0d9488" }}
        >
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-4 max-w-3xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Community Health,{" "}
          <span style={{ color: "#2dd4bf" }}>Monitored Together</span>
        </h1>
        <p className="text-white/60 text-lg max-w-xl mb-10 leading-relaxed">
          CareBridge connects patients, volunteers, and doctors on a single
          platform — tracking vitals, managing alerts, and delivering timely
          care to every community member.
        </p>
        <button
          type="button"
          onClick={login}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white text-base shadow-lg transition-all hover:scale-105 active:scale-95"
          style={{ backgroundColor: "#0d9488" }}
          data-ocid="visitor-hero-cta"
        >
          <Lock className="w-5 h-5" />
          Login to Access CareBridge
        </button>
        <p className="text-white/30 text-xs mt-4">
          Secure login via Internet Identity — no password required
        </p>
      </section>

      {/* Feature Highlights */}
      <section
        className="px-6 md:px-12 py-16"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-bold text-center mb-2"
            style={{ fontFamily: "var(--font-display)", color: "#0f172a" }}
          >
            Built for Every Role in the Care Chain
          </h2>
          <p className="text-center text-muted-foreground mb-10 text-sm max-w-xl mx-auto">
            From field volunteers recording vitals to doctors reviewing records
            — every role has a dedicated, purpose-built experience.
          </p>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="visitor-features"
          >
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border p-5 hover:shadow-md transition-smooth"
                style={{ borderColor: "#e2e8f0", backgroundColor: "#f8fafc" }}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#f0fdfa" }}
                >
                  {f.icon}
                </div>
                <h3
                  className="font-semibold text-sm mb-1.5"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "#0f172a",
                  }}
                >
                  {f.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="px-6 py-16 text-center"
        style={{ backgroundColor: "#f8fafc", borderTop: "1px solid #e2e8f0" }}
        data-ocid="visitor-cta-section"
      >
        <h2
          className="text-2xl font-bold mb-3"
          style={{ fontFamily: "var(--font-display)", color: "#0f172a" }}
        >
          Ready to get started?
        </h2>
        <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
          Login with Internet Identity to access the platform. Your admin will
          assign your role once you are registered.
        </p>
        <button
          type="button"
          onClick={login}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: "#0d9488" }}
          data-ocid="visitor-bottom-cta"
        >
          <Lock className="w-4 h-4" />
          Login to Access
        </button>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-4 border-t text-center"
        style={{ backgroundColor: "#f1f5f9", borderColor: "#e2e8f0" }}
      >
        <p className="text-[11px] text-muted-foreground">
          &copy; {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
