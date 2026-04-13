import { r as reactExports, j as jsxRuntimeExports, U as Users, d as Button, m as Settings, a as Badge, k as getRoleBadgeColor, f as formatDate } from "./index-DzD619YK.js";
import { C as Card, c as CardContent, a as CardHeader, b as CardTitle } from "./card-z2I4dlon.js";
import { S as Skeleton } from "./skeleton-BFieCumv.js";
import { u as useStats, k as useUsers } from "./useBackend-B4Q7GJj-.js";
import { S as Shield } from "./shield-Ck7v-dYn.js";
import { T as TriangleAlert } from "./triangle-alert-j36SYdkY.js";
import { C as Clock } from "./clock-BPB_cQJ-.js";
import { A as ArrowRight } from "./arrow-right-CVLnkkeq.js";
function AdminPanel({ onNavigate }) {
  const { data: stats, isLoading: statsLoading } = useStats();
  const { data: users, isLoading: usersLoading } = useUsers();
  const pageRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a;
    (_a = pageRef.current) == null ? void 0 : _a.classList.add("page-enter");
  }, []);
  const summaryCards = [
    {
      label: "Total Users",
      value: users == null ? void 0 : users.length,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-indigo-600" }),
      accent: "text-indigo-700",
      bg: "bg-indigo-50",
      isLoading: usersLoading
    },
    {
      label: "Total Patients",
      value: stats == null ? void 0 : stats.totalPatients,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-teal-600" }),
      accent: "text-teal-700",
      bg: "bg-teal-50",
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
      label: "Pending Reviews",
      value: stats == null ? void 0 : stats.pendingReview,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-amber-600" }),
      accent: "text-amber-700",
      bg: "bg-amber-50",
      isLoading: statsLoading
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: pageRef, className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
          style: { backgroundColor: "#0f172a" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-white" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground tracking-tight", children: "Admin Panel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "System overview and user management" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 gap-4 xl:grid-cols-4",
        "data-ocid": "admin-panel-stats",
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", "data-ocid": "admin-panel-actions", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => onNavigate("users"),
          className: "gap-2",
          style: { backgroundColor: "#0f172a" },
          "data-ocid": "btn-manage-users",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4" }),
            "Manage Users",
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
          "data-ocid": "btn-view-all-patients-admin",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
            "View All Patients"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "border-border shadow-sm",
        "data-ocid": "admin-panel-user-table",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4", style: { color: "#0d9488" } }),
              "System Users"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onNavigate("users"),
                className: "text-xs font-medium transition-colors",
                style: { color: "#0d9488" },
                "data-ocid": "admin-panel-view-all-users",
                children: "Manage users"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: usersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 p-4", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-md" }, i)) }) : !users || users.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-10 text-center px-6",
              "data-ocid": "admin-panel-users-empty",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-8 h-8 text-muted-foreground/40 mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "No users yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Add users from the Manage Users page" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide", children: "Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide hidden sm:table-cell", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide", children: "Role" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide hidden md:table-cell", children: "Joined" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: users.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "hover:bg-muted/30 transition-colors",
                "data-ocid": `admin-panel-user-row-${user.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white",
                        style: { backgroundColor: "#0d9488" },
                        children: user.name.charAt(0).toUpperCase()
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate", children: user.name })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden sm:table-cell text-xs text-muted-foreground truncate max-w-[180px]", children: user.email }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: `text-[10px] capitalize border ${getRoleBadgeColor(user.role)}`,
                      children: user.role
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell text-xs text-muted-foreground whitespace-nowrap", children: formatDate(user.createdAt) })
                ]
              },
              user.id
            )) })
          ] }) }) })
        ]
      }
    )
  ] });
}
export {
  AdminPanel as default
};
