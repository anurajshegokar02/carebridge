import { r as reactExports, j as jsxRuntimeExports, U as Users, S as Stethoscope, d as Button, a as Badge, B as Bell, f as formatDate } from "./index-DrRtbove.js";
import { C as Card, c as CardContent, a as CardHeader, b as CardTitle } from "./card-C4j-Fijx.js";
import { S as Skeleton } from "./skeleton-DN--iV-e.js";
import { u as useStats, a as useAlerts, h as useRecords } from "./useBackend-DNXNmNW0.js";
import { C as Clock } from "./clock-CYrPKNoW.js";
import { T as TriangleAlert } from "./triangle-alert-BblS0HW6.js";
import { C as ClipboardList } from "./clipboard-list-CqWxsbtQ.js";
import { A as ArrowRight } from "./arrow-right-wQchasyO.js";
import { C as CircleCheck } from "./circle-check-BkBsbQqo.js";
import { M as MapPin } from "./map-pin-1duq5bAY.js";
function alertTypeLabel(type) {
  switch (type) {
    case "high_bp":
      return "High BP";
    case "high_glucose":
      return "High Glucose";
    case "low_spo2":
      return "Low SpO2";
    case "abnormal_hr":
      return "Abnormal HR";
    default:
      return type.replace(/_/g, " ");
  }
}
function statusColor(reviewed) {
  return reviewed ? "bg-teal-50 text-teal-700 border-teal-200" : "bg-amber-50 text-amber-700 border-amber-200";
}
function DoctorPanel({ onNavigate }) {
  const { data: stats, isLoading: statsLoading } = useStats();
  const { data: alerts, isLoading: alertsLoading } = useAlerts();
  const { data: records, isLoading: recordsLoading } = useRecords(false);
  const pageRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a;
    (_a = pageRef.current) == null ? void 0 : _a.classList.add("page-enter");
  }, []);
  const pendingRecords = (records ?? []).slice(0, 5);
  const activeAlerts = (alerts ?? []).filter((a) => !a.alert.resolved).slice(0, 5);
  const summaryCards = [
    {
      label: "Pending Reviews",
      value: stats == null ? void 0 : stats.pendingReview,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-amber-600" }),
      accent: "text-amber-700",
      bg: "bg-amber-50",
      isLoading: statsLoading
    },
    {
      label: "Active Alerts",
      value: stats == null ? void 0 : stats.activeAlerts,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-red-600" }),
      accent: "text-red-700",
      bg: "bg-red-50",
      isLoading: statsLoading
    },
    {
      label: "Total Patients",
      value: stats == null ? void 0 : stats.totalPatients,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-teal-600" }),
      accent: "text-teal-700",
      bg: "bg-teal-50",
      isLoading: statsLoading
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: pageRef, className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
          style: { backgroundColor: "#0d9488" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "w-5 h-5 text-white" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground tracking-tight", children: "Doctor Panel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Your clinical workflow at a glance" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
        "data-ocid": "doctor-panel-stats",
        children: summaryCards.map((card, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "border-border shadow-sm hover:shadow-md transition-smooth",
            style: { animation: `fadeIn 0.4s ease-out ${i * 60}ms both` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-tight", children: card.label }),
                card.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-14 mt-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `text-3xl font-bold font-display tracking-tight ${card.accent}`,
                    children: card.value ?? 0
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-xl p-3 ${card.bg}`, children: card.icon })
            ] }) })
          },
          card.label
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", "data-ocid": "doctor-panel-actions", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => onNavigate("review"),
          className: "gap-2",
          style: { backgroundColor: "#0d9488" },
          "data-ocid": "btn-go-to-review",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-4 h-4" }),
            "Go to Review Queue",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          onClick: () => onNavigate("patients"),
          className: "gap-2 border-border",
          "data-ocid": "btn-view-all-patients",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
            "View All Patients"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "border-border shadow-sm",
          "data-ocid": "doctor-panel-pending-records",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base font-semibold text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-4 h-4 text-amber-500" }),
                "Records Awaiting Review",
                ((stats == null ? void 0 : stats.pendingReview) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-100 text-amber-700 border border-amber-200 text-xs px-1.5 py-0 font-mono", children: stats == null ? void 0 : stats.pendingReview })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => onNavigate("review"),
                  className: "text-xs font-medium transition-colors",
                  style: { color: "#0d9488" },
                  "data-ocid": "doctor-panel-view-all-records",
                  children: "View all"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: recordsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 p-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-md" }, i)) }) : pendingRecords.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center justify-center py-10 text-center px-6",
                "data-ocid": "doctor-panel-records-empty",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-teal-400 mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "All caught up" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "No pending records to review" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: pendingRecords.map(
              ({ record, patientName, patientCode, village }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors",
                  "data-ocid": `doctor-panel-record-${record.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground text-sm truncate", children: patientName }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground font-mono flex-shrink-0", children: patientCode })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 text-muted-foreground flex-shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate", children: village }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "·" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: record.checkDate })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: `text-[10px] ml-2 flex-shrink-0 border ${statusColor(record.reviewed)}`,
                        children: record.reviewed ? "Reviewed" : "Pending"
                      }
                    )
                  ]
                },
                record.id
              )
            ) }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "border-border shadow-sm",
          "data-ocid": "doctor-panel-alerts",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base font-semibold text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-red-500" }),
                "Active Alerts",
                activeAlerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-100 text-red-700 border border-red-200 text-xs px-1.5 py-0 font-mono", children: activeAlerts.length })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => onNavigate("alerts"),
                  className: "text-xs font-medium transition-colors",
                  style: { color: "#0d9488" },
                  "data-ocid": "doctor-panel-view-all-alerts",
                  children: "View all"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: alertsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 p-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-md" }, i)) }) : activeAlerts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center justify-center py-10 text-center px-6",
                "data-ocid": "doctor-panel-alerts-empty",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-teal-400 mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "All clear" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "No active alerts at this time" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: activeAlerts.map(({ alert, patientName, patientCode }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "li",
              {
                className: "px-4 py-3 hover:bg-muted/30 transition-colors",
                "data-ocid": `doctor-panel-alert-${alert.id}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground text-sm truncate", children: patientName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground font-mono", children: patientCode })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-1", children: alert.message })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 flex flex-col items-end gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-red-500" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-700 font-medium text-xs", children: alertTypeLabel(alert.alertType) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: formatDate(alert.createdAt) })
                  ] })
                ] })
              },
              alert.id
            )) }) })
          ]
        }
      )
    ] })
  ] });
}
export {
  DoctorPanel as default
};
