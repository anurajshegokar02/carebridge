import { c as createLucideIcon, E as useInternetIdentity, j as jsxRuntimeExports, H as Heart, A as Activity, S as Stethoscope, B as Bell, U as Users, L as LayoutDashboard } from "./index-DzD619YK.js";
import { S as Shield } from "./shield-Ck7v-dYn.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
const FEATURES = [
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-6 h-6", style: { color: "#0d9488" } }),
    title: "Patient Monitoring",
    desc: "Track vitals, blood pressure, glucose, SpO2, and heart rate for every patient in your community."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "w-6 h-6", style: { color: "#0d9488" } }),
    title: "Doctor Review Workflow",
    desc: "Doctors review health records, provide clinical advice, and keep patient care timely and traceable."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-6 h-6", style: { color: "#0d9488" } }),
    title: "Automatic Alert System",
    desc: "Critical readings trigger instant alerts — high BP, low SpO2, abnormal heart rate — so no warning goes unnoticed."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6", style: { color: "#0d9488" } }),
    title: "Community Health Roles",
    desc: "Doctors, volunteers, admins, and patients each get a role-specific experience designed for their workflow."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-6 h-6", style: { color: "#0d9488" } }),
    title: "Secure & Decentralized",
    desc: "Built on the Internet Computer — data is private, persistent, and tamper-resistant without external servers."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "w-6 h-6", style: { color: "#0d9488" } }),
    title: "Real-time Dashboards",
    desc: "Live stats and alert feeds give every team member a clear, current picture of community health status."
  }
];
function VisitorPanel() {
  const { login } = useInternetIdentity();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex flex-col",
      style: { backgroundColor: "#f8fafc" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "header",
          {
            className: "flex items-center justify-between px-6 md:px-12 py-4 border-b",
            style: { backgroundColor: "#ffffff", borderColor: "#e2e8f0" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-8 h-8 rounded-lg flex items-center justify-center",
                    style: { backgroundColor: "#0d9488" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4 text-white" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-bold text-lg leading-tight tracking-tight",
                      style: { fontFamily: "var(--font-display)", color: "#0f172a" },
                      children: "CareBridge"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] ml-2 uppercase tracking-widest text-muted-foreground hidden sm:inline", children: "Health Monitor" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: login,
                  className: "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95",
                  style: { backgroundColor: "#0d9488" },
                  "data-ocid": "visitor-login-nav",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
                    "Sign In"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "flex-1 flex flex-col items-center justify-center px-6 py-20 text-center",
            style: {
              background: "linear-gradient(160deg, #0f172a 0%, #134e4a 60%, #0f172a 100%)"
            },
            "data-ocid": "visitor-hero",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg",
                  style: { backgroundColor: "#0d9488" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-8 h-8 text-white" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "h1",
                {
                  className: "text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-4 max-w-3xl",
                  style: { fontFamily: "var(--font-display)" },
                  children: [
                    "Community Health,",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#2dd4bf" }, children: "Monitored Together" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-lg max-w-xl mb-10 leading-relaxed", children: "CareBridge connects patients, volunteers, and doctors on a single platform — tracking vitals, managing alerts, and delivering timely care to every community member." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: login,
                  className: "inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white text-base shadow-lg transition-all hover:scale-105 active:scale-95",
                  style: { backgroundColor: "#0d9488" },
                  "data-ocid": "visitor-hero-cta",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5" }),
                    "Login to Access CareBridge"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/30 text-xs mt-4", children: "Secure login via Internet Identity — no password required" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "px-6 md:px-12 py-16",
            style: { backgroundColor: "#ffffff" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "text-2xl md:text-3xl font-bold text-center mb-2",
                  style: { fontFamily: "var(--font-display)", color: "#0f172a" },
                  children: "Built for Every Role in the Care Chain"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground mb-10 text-sm max-w-xl mx-auto", children: "From field volunteers recording vitals to doctors reviewing records — every role has a dedicated, purpose-built experience." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                  "data-ocid": "visitor-features",
                  children: FEATURES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-xl border p-5 hover:shadow-md transition-smooth",
                      style: { borderColor: "#e2e8f0", backgroundColor: "#f8fafc" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-11 h-11 rounded-lg flex items-center justify-center mb-4",
                            style: { backgroundColor: "#f0fdfa" },
                            children: f.icon
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "h3",
                          {
                            className: "font-semibold text-sm mb-1.5",
                            style: {
                              fontFamily: "var(--font-display)",
                              color: "#0f172a"
                            },
                            children: f.title
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: f.desc })
                      ]
                    },
                    f.title
                  ))
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "px-6 py-16 text-center",
            style: { backgroundColor: "#f8fafc", borderTop: "1px solid #e2e8f0" },
            "data-ocid": "visitor-cta-section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "text-2xl font-bold mb-3",
                  style: { fontFamily: "var(--font-display)", color: "#0f172a" },
                  children: "Ready to get started?"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 max-w-sm mx-auto", children: "Login with Internet Identity to access the platform. Your admin will assign your role once you are registered." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: login,
                  className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 active:scale-95",
                  style: { backgroundColor: "#0d9488" },
                  "data-ocid": "visitor-bottom-cta",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
                    "Login to Access"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "footer",
          {
            className: "px-6 py-4 border-t text-center",
            style: { backgroundColor: "#f1f5f9", borderColor: "#e2e8f0" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
              "© ",
              (/* @__PURE__ */ new Date()).getFullYear(),
              ". Built with love using",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "underline hover:text-foreground transition-colors",
                  children: "caffeine.ai"
                }
              )
            ] })
          }
        )
      ]
    }
  );
}
export {
  VisitorPanel as default
};
