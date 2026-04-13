import { r as reactExports, j as jsxRuntimeExports, a as Badge, d as Button, e as cn, h as formatVitalStatus } from "./index-OpIi-ir7.js";
import { C as Card, a as CardHeader, c as CardContent } from "./card-DamURwOL.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CN-KDG1B.js";
import { S as Skeleton } from "./skeleton-DaF0cUYx.js";
import { T as Textarea } from "./textarea-BF9xvyaS.js";
import { h as useRecords, i as useReviewRecord } from "./useBackend-BsWx6z5L.js";
import { L as LoaderCircle } from "./loader-circle-DpBaxGNl.js";
function VitalBox({ title, value, type, numericValue }) {
  const info = formatVitalStatus(type, numericValue);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col gap-0.5 rounded-lg border px-3 py-2 text-sm",
        info.bgColor
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-base font-bold tabular-nums", info.color), children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-xs font-medium", info.color), children: info.label })
      ]
    }
  );
}
function RecordCard({ item, isReviewed }) {
  const { record, patientName, patientCode, village } = item;
  const [advice, setAdvice] = reactExports.useState(record.doctorAdvice ?? "");
  const [submitting, setSubmitting] = reactExports.useState(null);
  const reviewMutation = useReviewRecord();
  const adviceId = `advice-${record.id}`;
  async function handleSaveAdvice() {
    setSubmitting("save");
    try {
      await reviewMutation.mutateAsync({ recordId: record.id, advice });
    } finally {
      setSubmitting(null);
    }
  }
  async function handleMarkReviewed() {
    setSubmitting("review");
    try {
      await reviewMutation.mutateAsync({ recordId: record.id, advice });
    } finally {
      setSubmitting(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "border-border bg-card shadow-sm transition-shadow hover:shadow-md",
      "data-ocid": "review-record-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-semibold text-foreground", children: patientName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "border-[#0d9488]/40 bg-[#0d9488]/10 font-mono text-xs text-[#0d9488]",
                children: patientCode
              }
            ),
            isReviewed && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "border-teal-200 bg-teal-50 text-xs text-teal-700",
                children: "Reviewed"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  "aria-hidden": "true",
                  className: "h-3.5 w-3.5",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    }
                  )
                }
              ),
              record.checkDate
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  "aria-hidden": "true",
                  className: "h-3.5 w-3.5",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    }
                  )
                }
              ),
              record.visitType
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "svg",
                {
                  "aria-hidden": "true",
                  className: "h-3.5 w-3.5",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      }
                    )
                  ]
                }
              ),
              village
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              VitalBox,
              {
                title: "Blood Pressure",
                value: `${record.bpSystolic}/${record.bpDiastolic}`,
                type: "bp",
                numericValue: record.bpSystolic
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              VitalBox,
              {
                title: "Glucose",
                value: `${record.glucose} mg/dL`,
                type: "glucose",
                numericValue: record.glucose
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              VitalBox,
              {
                title: "SpO2",
                value: `${record.spo2}%`,
                type: "spo2",
                numericValue: record.spo2
              }
            )
          ] }),
          record.symptoms && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/50 px-3 py-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Symptoms" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-foreground", children: record.symptoms })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: adviceId,
                className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                children: "Doctor Advice"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: adviceId,
                value: advice,
                onChange: (e) => setAdvice(e.target.value),
                placeholder: "Enter medical advice...",
                rows: 3,
                className: "resize-none border-input bg-background text-sm placeholder:text-muted-foreground/60 focus:border-[#0d9488] focus:ring-[#0d9488]/20",
                "data-ocid": "advice-textarea",
                readOnly: isReviewed
              }
            )
          ] }),
          !isReviewed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: handleSaveAdvice,
                disabled: submitting !== null,
                "data-ocid": "save-advice-btn",
                className: "border-[#0d9488]/50 text-[#0d9488] hover:bg-[#0d9488]/10",
                children: submitting === "save" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 animate-spin" }),
                  "Saving..."
                ] }) : "Submit Advice"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                onClick: handleMarkReviewed,
                disabled: submitting !== null,
                "data-ocid": "mark-reviewed-btn",
                className: "bg-[#0d9488] text-white hover:bg-[#0d9488]/90",
                children: submitting === "review" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 animate-spin" }),
                  "Reviewing..."
                ] }) : "Mark Reviewed"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function RecordSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-lg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-lg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-lg" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-lg" })
    ] })
  ] });
}
function DoctorReview() {
  const [filter, setFilter] = reactExports.useState("pending");
  const isReviewed = filter === "reviewed";
  const { data: records, isLoading } = useRecords(isReviewed);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-foreground", children: "Doctor Review Panel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-muted-foreground", children: "Review patient health records and provide medical advice" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: filter,
          onValueChange: (v) => setFilter(v),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-48 border-input bg-background",
                "data-ocid": "review-filter",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pending", children: "Pending Review" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "reviewed", children: "Reviewed" })
            ] })
          ]
        }
      )
    ] }),
    !isLoading && records && records.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
        records.length,
        " record",
        records.length !== 1 ? "s" : ""
      ] }),
      !isReviewed && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          variant: "outline",
          className: "border-amber-200 bg-amber-50 text-amber-700",
          children: "Needs attention"
        }
      )
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "review-loading", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RecordSkeleton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RecordSkeleton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RecordSkeleton, {})
    ] }),
    !isLoading && records && records.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: records.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      RecordCard,
      {
        item,
        isReviewed
      },
      item.record.id
    )) }),
    !isLoading && (!records || records.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 py-16 text-center",
        "data-ocid": "review-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              "aria-hidden": "true",
              className: "h-7 w-7 text-muted-foreground",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 1.5,
                  d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-foreground", children: isReviewed ? "No reviewed records" : "No records pending review" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: isReviewed ? "Records marked as reviewed will appear here." : "All records have been reviewed. Great work!" })
        ]
      }
    )
  ] });
}
export {
  DoctorReview as default
};
