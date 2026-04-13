import { R as React, j as jsxRuntimeExports, A as Activity, H as Heart, d as Button, e as cn, h as formatVitalStatus } from "./index-DzD619YK.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-z2I4dlon.js";
import { I as Input } from "./input-zoOC-Y3F.js";
import { L as Label } from "./label-DkAVQWtA.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B3sfJtbu.js";
import { T as Textarea } from "./textarea-C9fM960W.js";
import { f as useCurrentUser, d as usePatients, g as useCreateRecord } from "./useBackend-B4Q7GJj-.js";
import { T as TriangleAlert } from "./triangle-alert-j36SYdkY.js";
import { D as Droplets, W as Wind, T as Thermometer } from "./wind-BtDjPWDV.js";
const VISIT_TYPES = [
  "Home Visit",
  "Clinic Visit",
  "Emergency Visit",
  "Follow-up"
];
function getTodayISO() {
  return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
}
function VitalBox({ icon, name, value, unit, type, numValue }) {
  if (numValue === null || numValue === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 rounded-lg border border-border bg-muted/30 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
        icon,
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wide", children: name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-muted-foreground/50", children: "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "awaiting input" })
    ] });
  }
  const info = formatVitalStatus(type, numValue);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col gap-1.5 rounded-lg border p-3 transition-all",
        info.bgColor
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex items-center gap-1.5", info.color), children: [
          icon,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wide", children: name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: cn("text-lg font-bold", info.color), children: [
          value,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs font-normal opacity-70", children: unit })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-xs font-semibold", info.color), children: info.label }),
          info.status === "critical" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            TriangleAlert,
            {
              className: "h-3 w-3 text-red-600",
              "aria-label": "Will trigger alert"
            }
          )
        ] })
      ]
    }
  );
}
function EnterVitals() {
  const { data: currentUser } = useCurrentUser();
  const { data: patientsData, isLoading: patientsLoading } = usePatients();
  const createRecord = useCreateRecord();
  const [patientId, setPatientId] = React.useState("");
  const [checkDate, setCheckDate] = React.useState(getTodayISO());
  const [visitType, setVisitType] = React.useState("Home Visit");
  const [bpSystolic, setBpSystolic] = React.useState("");
  const [bpDiastolic, setBpDiastolic] = React.useState("");
  const [glucose, setGlucose] = React.useState("");
  const [heartRate, setHeartRate] = React.useState("");
  const [spo2, setSpo2] = React.useState("");
  const [temperature, setTemperature] = React.useState("");
  const [symptoms, setSymptoms] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const patients = patientsData ?? [];
  const volunteerName = (currentUser == null ? void 0 : currentUser.name) ?? "";
  const numSystolic = bpSystolic ? Number(bpSystolic) : null;
  const numDiastolic = bpDiastolic ? Number(bpDiastolic) : null;
  const numGlucose = glucose ? Number(glucose) : null;
  const numHR = heartRate ? Number(heartRate) : null;
  const numSpO2 = spo2 ? Number(spo2) : null;
  const numTemp = temperature ? Number(temperature) : null;
  const showPreview = numSystolic || numGlucose || numHR || numSpO2 || numTemp;
  const alertCount = [
    numSystolic !== null && numSystolic >= 140,
    numGlucose !== null && numGlucose >= 200,
    numHR !== null && (numHR < 50 || numHR > 110),
    numSpO2 !== null && numSpO2 < 94
  ].filter(Boolean).length;
  async function handleSubmit(e) {
    e.preventDefault();
    if (!patientId) return;
    await createRecord.mutateAsync({
      patientId: Number(patientId),
      visitType,
      bpSystolic: numSystolic ?? 0,
      bpDiastolic: numDiastolic ?? 0,
      glucose: numGlucose ?? 0,
      heartRate: numHR ?? 0,
      spo2: numSpO2 ?? 0,
      temperature: numTemp ?? 0,
      symptoms,
      checkDate
    });
    setSuccess(true);
    setBpSystolic("");
    setBpDiastolic("");
    setGlucose("");
    setHeartRate("");
    setSpo2("");
    setTemperature("");
    setSymptoms("");
    setCheckDate(getTodayISO());
    setVisitType("Home Visit");
    setTimeout(() => setSuccess(false), 5e3);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in duration-300", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Enter Vitals" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Record patient health measurements and observations" })
    ] }),
    success && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "vitals-success-banner",
        className: "flex items-center gap-3 rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-teal-800",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-2 rounded-full bg-teal-500 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Vitals recorded successfully!" })
        ]
      }
    ),
    createRecord.isError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Failed to save vitals. Please try again." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4 text-[#0d9488]" }),
                "Visit Information"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "patient-select", children: [
                    "Patient ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: patientId,
                      onValueChange: setPatientId,
                      disabled: patientsLoading,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectTrigger,
                          {
                            id: "patient-select",
                            "data-ocid": "vitals-patient-select",
                            className: "w-full",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              SelectValue,
                              {
                                placeholder: patientsLoading ? "Loading patients..." : "Select patient"
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: patients.map(({ patient }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(patient.id), children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground mr-2", children: patient.patientCode }),
                          patient.name
                        ] }, patient.id)) })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "check-date", children: "Visit Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "check-date",
                      "data-ocid": "vitals-date-input",
                      type: "date",
                      value: checkDate,
                      onChange: (e) => setCheckDate(e.target.value),
                      max: getTodayISO()
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "visit-type", children: "Visit Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: visitType, onValueChange: setVisitType, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "visit-type", "data-ocid": "vitals-visit-type", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: VISIT_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: t }, t)) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "volunteer-name", children: "Recorded By" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "volunteer-name",
                      value: volunteerName,
                      readOnly: true,
                      className: "bg-muted/40 text-muted-foreground cursor-not-allowed"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4 text-[#0d9488]" }),
                "Vital Measurements"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "bp-sys", children: [
                      "BP Systolic",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(mmHg)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "bp-sys",
                        "data-ocid": "vitals-bp-systolic",
                        type: "number",
                        min: 0,
                        max: 300,
                        placeholder: "e.g. 120",
                        value: bpSystolic,
                        onChange: (e) => setBpSystolic(e.target.value)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "bp-dia", children: [
                      "BP Diastolic",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(mmHg)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "bp-dia",
                        "data-ocid": "vitals-bp-diastolic",
                        type: "number",
                        min: 0,
                        max: 200,
                        placeholder: "e.g. 80",
                        value: bpDiastolic,
                        onChange: (e) => setBpDiastolic(e.target.value)
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "glucose", children: [
                      "Glucose",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(mg/dL)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "glucose",
                        "data-ocid": "vitals-glucose",
                        type: "number",
                        min: 0,
                        max: 600,
                        placeholder: "e.g. 95",
                        value: glucose,
                        onChange: (e) => setGlucose(e.target.value)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "heart-rate", children: [
                      "Heart Rate",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(bpm)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "heart-rate",
                        "data-ocid": "vitals-heart-rate",
                        type: "number",
                        min: 0,
                        max: 300,
                        placeholder: "e.g. 72",
                        value: heartRate,
                        onChange: (e) => setHeartRate(e.target.value)
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "spo2", children: [
                      "SpO2",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(%)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "spo2",
                        "data-ocid": "vitals-spo2",
                        type: "number",
                        min: 0,
                        max: 100,
                        placeholder: "e.g. 98",
                        value: spo2,
                        onChange: (e) => setSpo2(e.target.value)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "temperature", children: [
                      "Temperature",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(°F)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "temperature",
                        "data-ocid": "vitals-temperature",
                        type: "number",
                        min: 90,
                        max: 115,
                        step: 0.1,
                        placeholder: "e.g. 98.6",
                        value: temperature,
                        onChange: (e) => setTemperature(e.target.value)
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "symptoms", children: "Symptoms / Observations" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "symptoms",
                      "data-ocid": "vitals-symptoms",
                      placeholder: "Describe any symptoms, patient complaints, or observations...",
                      rows: 3,
                      value: symptoms,
                      onChange: (e) => setSymptoms(e.target.value)
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                "data-ocid": "vitals-submit-btn",
                disabled: !patientId || createRecord.isPending,
                className: "min-w-[160px]",
                children: createRecord.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                  "Saving..."
                ] }) : "Save Vitals"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-6 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: cn(
                  "transition-all duration-300",
                  showPreview ? "opacity-100" : "opacity-60"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4 text-[#0d9488]" }),
                      "Live Preview"
                    ] }),
                    showPreview && alertCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-red-600 flex items-center gap-1 mt-1 font-medium", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3.5 w-3.5" }),
                      alertCount,
                      " alert",
                      alertCount > 1 ? "s" : "",
                      " will be generated"
                    ] }),
                    showPreview && alertCount === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-teal-700 font-medium mt-1", children: "All vitals within normal range" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid grid-cols-1 gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      VitalBox,
                      {
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3.5 w-3.5" }),
                        name: "Blood Pressure",
                        value: numSystolic && numDiastolic ? `${numSystolic}/${numDiastolic}` : numSystolic ? String(numSystolic) : "",
                        unit: "mmHg",
                        type: "bp",
                        numValue: numSystolic
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      VitalBox,
                      {
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "h-3.5 w-3.5" }),
                        name: "Glucose",
                        value: glucose,
                        unit: "mg/dL",
                        type: "glucose",
                        numValue: numGlucose
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      VitalBox,
                      {
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-3.5 w-3.5" }),
                        name: "Heart Rate",
                        value: heartRate,
                        unit: "bpm",
                        type: "hr",
                        numValue: numHR
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      VitalBox,
                      {
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wind, { className: "h-3.5 w-3.5" }),
                        name: "SpO2",
                        value: spo2,
                        unit: "%",
                        type: "spo2",
                        numValue: numSpO2
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      VitalBox,
                      {
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Thermometer, { className: "h-3.5 w-3.5" }),
                        name: "Temperature",
                        value: temperature,
                        unit: "°F",
                        type: "temp",
                        numValue: numTemp
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 space-y-2.5 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-xs uppercase tracking-wide", children: "Reference Ranges" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: [
                {
                  label: "BP Systolic",
                  ranges: "<120 Normal · 120-139 Elevated · ≥140 High"
                },
                {
                  label: "Glucose",
                  ranges: "<100 Normal · 100-125 Pre-diabetic · ≥126 High"
                },
                {
                  label: "Heart Rate",
                  ranges: "60-100 Normal · outside Abnormal"
                },
                {
                  label: "SpO2",
                  ranges: "≥95 Normal · 90-94 Low · <90 Critical"
                },
                {
                  label: "Temperature",
                  ranges: "≤99°F Normal · 99-100.4 Low Fever · >100.4 Fever"
                }
              ].map(({ label, ranges }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px]", children: ranges })
              ] }, label)) })
            ] }) })
          ] }) })
        ]
      }
    )
  ] });
}
export {
  EnterVitals as default
};
