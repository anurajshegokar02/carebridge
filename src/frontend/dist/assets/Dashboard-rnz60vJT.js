import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, U as Users, B as Bell, a as Badge, f as formatDate } from "./index-DzD619YK.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-z2I4dlon.js";
import { S as Skeleton } from "./skeleton-BFieCumv.js";
import { u as useStats, a as useAlerts } from "./useBackend-B4Q7GJj-.js";
import { C as ClipboardList } from "./clipboard-list-BEsQbZcl.js";
import { C as Clock } from "./clock-BPB_cQJ-.js";
import { T as TriangleAlert } from "./triangle-alert-j36SYdkY.js";
import { C as CircleCheck } from "./circle-check-BcYOZTyI.js";
import { M as MapPin } from "./map-pin-CTKyf1b8.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode);
function StatCard({
  label,
  value,
  icon,
  accent,
  bgAccent,
  isLoading,
  delay
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "relative overflow-hidden border-border shadow-sm hover:shadow-md transition-smooth",
      style: { animation: `fadeIn 0.4s ease-out ${delay} both` },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-tight", children: label }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16 mt-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `text-3xl font-bold font-display tracking-tight ${accent}`,
              children: value ?? 0
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-xl p-3 ${bgAccent}`, children: icon })
      ] }) })
    }
  );
}
const workflowSteps = [
  { label: "Patient Registered", state: "done" },
  { label: "Vital Signs Recorded", state: "done" },
  { label: "Doctor Review Pending", state: "active" },
  { label: "Advice Given", state: "pending" },
  { label: "Follow-up Scheduled", state: "pending" }
];
function WorkflowTimeline() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base font-semibold text-foreground", children: "Care Workflow" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-0", children: workflowSteps.map((step, i) => {
      const isLast = i === workflowSteps.length - 1;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-3.5 h-3.5 rounded-full mt-0.5 shrink-0 ${step.state === "done" ? "bg-teal-500" : step.state === "active" ? "bg-amber-400 ring-2 ring-amber-200" : "bg-muted-foreground/25"}`
            }
          ),
          !isLast && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-0.5 flex-1 my-0.5 ${step.state === "done" ? "bg-teal-300" : "bg-border"}`,
              style: { minHeight: "1.25rem" }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-4 flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-sm leading-tight pt-0.5 ${step.state === "done" ? "text-teal-700 font-medium" : step.state === "active" ? "text-amber-700 font-semibold" : "text-muted-foreground"}`,
              children: step.label
            }
          ),
          step.state === "done" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-teal-500 mt-0.5 shrink-0" }),
          step.state === "active" && /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" })
        ] })
      ] }, step.label);
    }) }) })
  ] });
}
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
function Dashboard({ onNavigate }) {
  const { data: stats, isLoading: statsLoading } = useStats();
  const { data: alerts, isLoading: alertsLoading } = useAlerts();
  const pageRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a;
    (_a = pageRef.current) == null ? void 0 : _a.classList.add("page-enter");
  }, []);
  const statCards = [
    {
      label: "Total Patients",
      value: stats == null ? void 0 : stats.totalPatients,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-teal-600" }),
      accent: "text-teal-700",
      bgAccent: "bg-teal-50",
      delay: "0ms"
    },
    {
      label: "Records Today",
      value: stats == null ? void 0 : stats.recordsToday,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-5 h-5 text-blue-600" }),
      accent: "text-blue-700",
      bgAccent: "bg-blue-50",
      delay: "60ms"
    },
    {
      label: "Pending Review",
      value: stats == null ? void 0 : stats.pendingReview,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-amber-600" }),
      accent: "text-amber-700",
      bgAccent: "bg-amber-50",
      delay: "120ms"
    },
    {
      label: "Active Alerts",
      value: stats == null ? void 0 : stats.activeAlerts,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-red-600" }),
      accent: "text-red-700",
      bgAccent: "bg-red-50",
      delay: "180ms"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: pageRef, className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground tracking-tight", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Community health monitoring overview" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 gap-4 xl:grid-cols-4",
        "data-ocid": "dashboard-stats",
        children: statCards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { ...card, isLoading: statsLoading }, card.label))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", "data-ocid": "dashboard-alerts-table", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-sm h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-red-500" }),
            "Active Alerts",
            ((stats == null ? void 0 : stats.activeAlerts) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-100 text-red-700 border border-red-200 text-xs px-1.5 py-0 font-mono", children: stats == null ? void 0 : stats.activeAlerts })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onNavigate("alerts"),
              className: "text-xs text-teal-600 hover:text-teal-800 font-medium transition-colors",
              "data-ocid": "dashboard-view-all-alerts",
              children: "View all"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: alertsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 p-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-md" }, i)) }) : !alerts || alerts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-12 text-center px-6",
            "data-ocid": "dashboard-alerts-empty",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10 text-teal-400 mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "All clear" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "No active alerts at this time" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide", children: "Patient" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide", children: "Alert" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide hidden sm:table-cell", children: "Village" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide hidden md:table-cell", children: "Date" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: alerts.map(
            ({ alert, patientName, patientCode, village }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "hover:bg-muted/30 transition-colors",
                "data-ocid": `dashboard-alert-row-${alert.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate leading-tight", children: patientName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: patientCode })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-700 font-medium text-xs leading-tight", children: alertTypeLabel(alert.alertType) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-1", children: alert.message })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-muted-foreground text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 shrink-0" }),
                    village
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell text-xs text-muted-foreground whitespace-nowrap", children: formatDate(alert.createdAt) })
                ]
              },
              alert.id
            )
          ) })
        ] }) }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "dashboard-workflow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WorkflowTimeline, {}) })
    ] })
  ] });
}
export {
  Dashboard as default
};
