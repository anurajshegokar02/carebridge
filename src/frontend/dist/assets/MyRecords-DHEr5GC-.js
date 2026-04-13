import { c as createLucideIcon, j as jsxRuntimeExports, p as HeartPulse, H as Heart, A as Activity, a as Badge } from "./index-DrRtbove.js";
import { S as Skeleton } from "./skeleton-DN--iV-e.js";
import { m as useMyRecord, n as useMyAlerts } from "./useBackend-DNXNmNW0.js";
import { C as ClipboardList } from "./clipboard-list-CqWxsbtQ.js";
import { T as TriangleAlert } from "./triangle-alert-BblS0HW6.js";
import { D as Droplets, W as Wind, T as Thermometer } from "./wind-D7QtFXqQ.js";
import { M as MapPin } from "./map-pin-1duq5bAY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function bpStatus(sys, dia) {
  if (sys >= 180 || dia >= 120) return "critical";
  if (sys >= 140 || dia >= 90) return "warning";
  return "normal";
}
function glucoseStatus(g) {
  if (g >= 400 || g < 40) return "critical";
  if (g >= 200 || g < 70) return "warning";
  return "normal";
}
function hrStatus(hr) {
  if (hr < 40 || hr > 140) return "critical";
  if (hr < 55 || hr > 100) return "warning";
  return "normal";
}
function spo2Status(s) {
  if (s < 90) return "critical";
  if (s < 94) return "warning";
  return "normal";
}
function tempStatus(t) {
  if (t >= 40 || t < 35) return "critical";
  if (t >= 38.5 || t < 36) return "warning";
  return "normal";
}
const STATUS_STYLES = {
  normal: "bg-teal-500/15 text-teal-300 border border-teal-500/25",
  warning: "bg-amber-500/15 text-amber-300 border border-amber-500/25",
  critical: "bg-red-500/15 text-red-300 border border-red-500/30"
};
function VitalChip({
  label,
  value,
  status
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ${STATUS_STYLES[status]}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40 font-normal", children: label }),
        value
      ]
    }
  );
}
function PatientProfileCard({ patient }) {
  const statusColors = {
    stable: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    alert: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    review: "bg-blue-500/20 text-blue-300 border-blue-500/30"
  };
  const statusColor = statusColors[patient.status] ?? statusColors.stable;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl border border-white/10 p-5 flex flex-col gap-4",
      style: { backgroundColor: "#1e293b" },
      "data-ocid": "patient-profile-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold flex-shrink-0",
                style: { backgroundColor: "#0d9488" },
                children: patient.name.charAt(0).toUpperCase()
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "text-white font-semibold text-lg leading-tight truncate",
                  style: { fontFamily: "var(--font-display)" },
                  children: patient.name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs font-mono mt-0.5", children: patient.patientCode })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `px-2.5 py-1 rounded-full text-[11px] font-semibold border capitalize flex-shrink-0 ${statusColor}`,
              children: patient.status
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2.5", children: [
          {
            icon: User,
            label: "Age / Gender",
            value: `${patient.age} yrs, ${patient.gender}`
          },
          { icon: Phone, label: "Phone", value: patient.phone || "—" },
          { icon: MapPin, label: "Village", value: patient.village || "—" },
          {
            icon: ClipboardList,
            label: "Condition",
            value: patient.condition || "—"
          }
        ].map(({ icon: Icon, label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-2 p-2.5 rounded-lg",
            style: { backgroundColor: "rgba(255,255,255,0.04)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-teal-400 mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-[10px] uppercase tracking-wider leading-none mb-0.5", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/85 text-xs font-medium truncate", children: value })
              ] })
            ]
          },
          label
        )) }),
        patient.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "p-3 rounded-lg border border-white/8",
            style: { backgroundColor: "rgba(255,255,255,0.03)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-[10px] uppercase tracking-wider mb-1", children: "Notes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/65 text-xs leading-relaxed", children: patient.notes })
            ]
          }
        )
      ]
    }
  );
}
function AlertBanner({ alert }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-start gap-3 p-3.5 rounded-xl border border-amber-500/30",
      style: { backgroundColor: "rgba(245,158,11,0.08)" },
      "data-ocid": "alert-banner",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-amber-300 text-sm font-semibold leading-tight", children: alert.alertType }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-amber-200/60 text-xs mt-0.5 leading-snug", children: alert.message })
        ] })
      ]
    }
  );
}
function RecordRow({ record }) {
  const bp = bpStatus(record.bpSystolic, record.bpDiastolic);
  const gl = glucoseStatus(record.glucose);
  const hr = hrStatus(record.heartRate);
  const sp = spo2Status(record.spo2);
  const tm = tempStatus(record.temperature);
  const overallStatus = [bp, gl, hr, sp, tm].includes("critical") ? "critical" : [bp, gl, hr, sp, tm].includes("warning") ? "warning" : "normal";
  const statusDot = {
    normal: "bg-teal-400",
    warning: "bg-amber-400",
    critical: "bg-red-400"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border border-white/8 p-4 flex flex-col gap-3",
      style: { backgroundColor: "rgba(255,255,255,0.03)" },
      "data-ocid": "record-row",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `w-2 h-2 rounded-full flex-shrink-0 ${statusDot[overallStatus]}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/70 text-xs font-medium", children: record.visitType })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-white/40 text-[11px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
            record.checkDate
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            VitalChip,
            {
              label: "BP",
              value: `${record.bpSystolic}/${record.bpDiastolic}`,
              status: bp
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            VitalChip,
            {
              label: "Glucose",
              value: `${record.glucose} mg/dL`,
              status: gl
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(VitalChip, { label: "HR", value: `${record.heartRate} bpm`, status: hr }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(VitalChip, { label: "SpO2", value: `${record.spo2}%`, status: sp }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(VitalChip, { label: "Temp", value: `${record.temperature}°C`, status: tm })
        ] }),
        record.symptoms && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/45 text-xs leading-snug", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/25 uppercase tracking-wider text-[10px]", children: [
            "Symptoms:",
            " "
          ] }),
          record.symptoms
        ] }),
        record.doctorAdvice && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "p-2.5 rounded-lg border border-blue-500/20",
            style: { backgroundColor: "rgba(59,130,246,0.07)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/35 text-[10px] uppercase tracking-wider mb-0.5", children: "Doctor Advice" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-200/70 text-xs leading-snug", children: record.doctorAdvice })
            ]
          }
        ),
        record.reviewed && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: "text-[10px] border-teal-500/30 text-teal-400 bg-teal-500/10",
            children: "Reviewed by doctor"
          }
        ) })
      ]
    }
  );
}
function LoadingSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Skeleton,
      {
        className: "h-40 w-full rounded-2xl",
        style: { backgroundColor: "rgba(255,255,255,0.06)" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Skeleton,
      {
        className: "h-24 w-full rounded-2xl",
        style: { backgroundColor: "rgba(255,255,255,0.06)" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Skeleton,
      {
        className: "h-28 w-full rounded-xl",
        style: { backgroundColor: "rgba(255,255,255,0.06)" }
      },
      i
    )) })
  ] });
}
function MyRecords({ patientId }) {
  const { data: myRecord, isLoading: recordLoading } = useMyRecord(patientId);
  const { data: myAlerts = [], isLoading: alertsLoading } = useMyAlerts(patientId);
  const isLoading = recordLoading || alertsLoading;
  if (patientId === null) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center",
        "data-ocid": "my-records-no-link",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-14 h-14 rounded-2xl flex items-center justify-center",
              style: { backgroundColor: "rgba(13,148,136,0.15)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeartPulse, { className: "w-7 h-7 text-teal-400" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white/80 font-semibold text-base mb-1", children: "Account Not Linked" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-sm max-w-xs", children: "Your account is not yet linked to a patient record. Please contact your healthcare provider or administrator." })
          ] })
        ]
      }
    );
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, {});
  }
  if (!myRecord) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center",
        "data-ocid": "my-records-not-found",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-14 h-14 rounded-2xl flex items-center justify-center",
              style: { backgroundColor: "rgba(239,68,68,0.12)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-7 h-7 text-red-400" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white/80 font-semibold text-base mb-1", children: "Record Not Found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-sm max-w-xs", children: "Unable to load your health record. Please try again or contact support." })
          ] })
        ]
      }
    );
  }
  const { patient, records } = myRecord;
  const sortedRecords = [...records].sort((a, b) => b.createdAt - a.createdAt);
  const activeAlerts = myAlerts.filter((a) => !a.resolved);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "my-records-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
          style: { backgroundColor: "rgba(13,148,136,0.18)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4 text-teal-400" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            className: "text-white font-semibold text-lg leading-tight",
            style: { fontFamily: "var(--font-display)" },
            children: "My Health Records"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/35 text-xs", children: "Read-only view of your health data" })
      ] })
    ] }),
    activeAlerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "my-alerts-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/50 text-xs uppercase tracking-wider font-medium flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 text-amber-400" }),
        "Active Health Alerts (",
        activeAlerts.length,
        ")"
      ] }),
      activeAlerts.map((alert) => /* @__PURE__ */ jsxRuntimeExports.jsx(AlertBanner, { alert }, alert.id))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PatientProfileCard, { patient }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/50 text-xs uppercase tracking-wider font-medium flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-3.5 h-3.5 text-teal-400" }),
          "Health Records (",
          sortedRecords.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-[10px] text-white/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-teal-400 inline-block" }),
            "Normal"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-amber-400 inline-block" }),
            "Warning"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-red-400 inline-block" }),
            "Critical"
          ] })
        ] })
      ] }),
      sortedRecords.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl border border-white/8 p-8 flex flex-col items-center gap-3 text-center",
          style: { backgroundColor: "rgba(255,255,255,0.03)" },
          "data-ocid": "my-records-empty",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-11 h-11 rounded-xl flex items-center justify-center",
                style: { backgroundColor: "rgba(255,255,255,0.06)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "w-5 h-5 text-white/25" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-sm font-medium", children: "No health records yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/25 text-xs mt-0.5", children: "Records will appear here after your first health check" })
            ] })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", "data-ocid": "records-list", children: sortedRecords.map((record) => /* @__PURE__ */ jsxRuntimeExports.jsx(RecordRow, { record }, record.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl border border-white/6 p-3.5 grid grid-cols-2 gap-2",
        style: { backgroundColor: "rgba(255,255,255,0.02)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "col-span-2 text-white/25 text-[10px] uppercase tracking-wider mb-1", children: "Vitals Reference Ranges" }),
          [
            {
              icon: Activity,
              label: "Blood Pressure",
              normal: "< 120/80",
              warning: "< 140/90",
              critical: ">= 180/120"
            },
            {
              icon: Droplets,
              label: "Glucose",
              normal: "70-199 mg/dL",
              warning: "200-399",
              critical: ">= 400 or < 40"
            },
            {
              icon: HeartPulse,
              label: "Heart Rate",
              normal: "55-100 bpm",
              warning: "40-54 / 101-140",
              critical: "< 40 or > 140"
            },
            {
              icon: Wind,
              label: "SpO2",
              normal: ">= 94%",
              warning: "90-93%",
              critical: "< 90%"
            },
            {
              icon: Thermometer,
              label: "Temperature",
              normal: "36-38.4°C",
              warning: "38.5-39.9°C",
              critical: ">= 40 or < 35"
            }
          ].map(({ icon: Icon, label, normal }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3 text-white/20 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/30 text-[10px] truncate", children: [
              label,
              ": ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-teal-400/60", children: normal })
            ] })
          ] }, label))
        ]
      }
    )
  ] });
}
export {
  MyRecords as default
};
