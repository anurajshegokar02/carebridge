import { E as useInternetIdentity, y as useActor, R as React, j as jsxRuntimeExports, H as Heart, b as UserPlus, d as Button, A as Activity, U as Users, C as toNumber, D as createActor } from "./index-DzD619YK.js";
import { I as Input } from "./input-zoOC-Y3F.js";
import { L as Label } from "./label-DkAVQWtA.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B3sfJtbu.js";
import { C as CircleCheck } from "./circle-check-BcYOZTyI.js";
import { C as CircleAlert } from "./circle-alert-C62JjHR0.js";
import { L as LoaderCircle } from "./loader-circle-BBSyBGXI.js";
import { S as Shield } from "./shield-Ck7v-dYn.js";
const ROLE_OPTIONS = [
  {
    value: "volunteer",
    label: "Volunteer",
    desc: "Register patients and enter vitals",
    icon: "🤝"
  },
  {
    value: "doctor",
    label: "Doctor",
    desc: "Review records and manage clinical alerts",
    icon: "🩺"
  },
  {
    value: "patient",
    label: "Patient",
    desc: "View your own health records only",
    icon: "🏥"
  },
  {
    value: "admin",
    label: "Admin",
    desc: "Full platform access and user management",
    icon: "🛡️"
  }
];
function SignUp({ onRegistered, onLogout }) {
  var _a;
  const { identity } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("volunteer");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const principal = (identity == null ? void 0 : identity.getPrincipal().toString()) ?? "";
  const shortPrincipal = principal.length > 16 ? `${principal.slice(0, 8)}...${principal.slice(-6)}` : principal;
  async function handleSubmit(e) {
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
        role
      );
      setSuccess(true);
      setTimeout(() => {
        const mapped = {
          id: toNumber(rawUser.id),
          principal: rawUser.principal.toString(),
          name: rawUser.name,
          email: rawUser.email,
          role: rawUser.role,
          createdAt: toNumber(rawUser.createdAt),
          patientId: rawUser.patientId != null ? toNumber(rawUser.patientId) : void 0
        };
        onRegistered(mapped);
      }, 1200);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }
  const isReady = !!actor && !actorFetching;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen flex items-center justify-center p-4",
      style: {
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f2744 100%)"
      },
      "data-ocid": "signup-page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg",
              style: { backgroundColor: "#0d9488" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-8 h-8 text-white" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              className: "text-3xl font-bold text-white mb-1",
              style: { fontFamily: "var(--font-display)" },
              children: "CareBridge"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-sm", children: "Complete your profile to get started" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl p-7 shadow-2xl border border-white/10",
            style: { backgroundColor: "#1e293b" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5 pb-5 border-b border-white/10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                    style: { backgroundColor: "rgba(13,148,136,0.2)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-5 h-5", style: { color: "#2dd4bf" } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      className: "text-lg font-semibold text-white leading-tight",
                      style: { fontFamily: "var(--font-display)" },
                      children: "Create Your Account"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/40 text-xs truncate", children: [
                    "Principal: ",
                    shortPrincipal || "connected"
                  ] })
                ] })
              ] }),
              success ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 py-6 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-12 h-12 text-teal-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-lg font-semibold text-white",
                    style: { fontFamily: "var(--font-display)" },
                    children: "Registration complete!"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-sm", children: "Redirecting to your dashboard..." })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "form",
                {
                  onSubmit: handleSubmit,
                  className: "space-y-4",
                  "data-ocid": "signup-form",
                  children: [
                    error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-start gap-2 rounded-lg p-3 border border-red-500/30 text-red-300 text-sm",
                        style: { backgroundColor: "rgba(239,68,68,0.1)" },
                        "data-ocid": "signup-error",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0 mt-0.5" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Label,
                        {
                          htmlFor: "signup-name",
                          className: "text-white/70 text-sm font-medium",
                          children: [
                            "Full Name ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400", children: "*" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "signup-name",
                          "data-ocid": "input-signup-name",
                          placeholder: "Dr. Anita Sharma",
                          value: name,
                          onChange: (e) => setName(e.target.value),
                          required: true,
                          disabled: loading,
                          className: "bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-teal-500/60 focus:ring-teal-500/20"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Label,
                        {
                          htmlFor: "signup-email",
                          className: "text-white/70 text-sm font-medium",
                          children: [
                            "Email Address ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400", children: "*" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "signup-email",
                          "data-ocid": "input-signup-email",
                          type: "email",
                          placeholder: "anita@carebridge.com",
                          value: email,
                          onChange: (e) => setEmail(e.target.value),
                          required: true,
                          disabled: loading,
                          className: "bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-teal-500/60 focus:ring-teal-500/20"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-white/70 text-sm font-medium", children: [
                        "Your Role ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Select,
                        {
                          value: role,
                          onValueChange: (v) => setRole(v),
                          disabled: loading,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              SelectTrigger,
                              {
                                "data-ocid": "select-signup-role",
                                className: "bg-white/5 border-white/15 text-white focus:border-teal-500/60",
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select your role" })
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ROLE_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt.value, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: opt.icon }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: opt.label }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs hidden sm:inline", children: [
                                "— ",
                                opt.desc
                              ] })
                            ] }) }, opt.value)) })
                          ]
                        }
                      ),
                      role && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/35 text-xs mt-1 pl-0.5", children: (_a = ROLE_OPTIONS.find((r) => r.value === role)) == null ? void 0 : _a.desc })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "submit",
                        "data-ocid": "btn-signup-submit",
                        disabled: !isReady || loading || !name.trim() || !email.trim(),
                        className: "w-full h-11 text-sm font-semibold text-white shadow-lg transition-all duration-200 mt-2",
                        style: { backgroundColor: "#0d9488" },
                        children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                          "Creating account..."
                        ] }) : !isReady ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                          "Connecting..."
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
                          "Create Account"
                        ] })
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 mt-4", children: [
          { icon: Activity, label: "Vitals Tracking" },
          { icon: Users, label: "Patient Records" },
          { icon: Shield, label: "Secure & Private" }
        ].map(({ icon: Icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-1.5 p-2.5 rounded-lg border border-white/8 text-center",
            style: { backgroundColor: "rgba(255,255,255,0.04)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-teal-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/50 leading-tight", children: label })
            ]
          },
          label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onLogout,
            className: "text-white/30 text-xs hover:text-white/50 transition-colors underline underline-offset-2",
            "data-ocid": "btn-signup-logout",
            children: "Sign out and use a different identity"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mt-3 rounded-xl p-3.5 border border-white/8",
            style: { backgroundColor: "rgba(13,148,136,0.06)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-teal-400/70 text-[10px] uppercase tracking-wider font-medium mb-2", children: "Role-based access" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-1.5 text-[10px]", children: [
                { role: "Admin", access: "All features + user management" },
                { role: "Doctor", access: "Review records, alerts" },
                { role: "Volunteer", access: "Register patients, enter vitals" },
                { role: "Patient", access: "View own health records only" }
              ].map(({ role: r, access }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 rounded-full bg-teal-500/60 flex-shrink-0 mt-1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/40", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/60 font-medium", children: [
                    r,
                    ":"
                  ] }),
                  " ",
                  access
                ] })
              ] }, r)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/20 text-[10px] mt-2.5 pt-2 border-t border-white/8 leading-relaxed", children: "* Admins can change your role at any time from the Manage Users panel." })
            ]
          }
        )
      ] })
    }
  );
}
export {
  SignUp as default
};
