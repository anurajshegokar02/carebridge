import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as UserPlus, C as CircleAlert, d as Button } from "./index-Duo5bLAA.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardDescription, c as CardContent } from "./card-DtyAyOAZ.js";
import { I as Input } from "./input-CE-9EeSL.js";
import { L as Label } from "./label-C_6IrXh4.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-FHSsYKR-.js";
import { T as Textarea } from "./textarea-Bcx8Slzh.js";
import { b as useVolunteers, c as useCreatePatient } from "./useBackend-CmVVZSZL.js";
import { C as CircleCheck } from "./circle-check-BOWPMmp8.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
const EMPTY_STEP1 = {
  name: "",
  age: "",
  gender: "",
  phone: "",
  village: "",
  address: ""
};
const EMPTY_STEP2 = {
  condition: "",
  volunteerId: "",
  notes: ""
};
const CONDITIONS = [
  "Diabetes",
  "Hypertension",
  "Heart Disease",
  "Asthma",
  "Malaria",
  "Tuberculosis",
  "Other"
];
function StepIndicator({ current }) {
  const steps = [
    { num: 1, label: "Personal Information" },
    { num: 2, label: "Medical Information" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-0 mb-8", children: steps.map((step, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `
                w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-smooth
                ${step.num < current ? "bg-[#0d9488] text-white" : step.num === current ? "bg-[#0d9488] text-white ring-4 ring-[#0d9488]/20" : "bg-muted text-muted-foreground"}
              `,
          children: step.num < current ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : step.num
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `text-xs font-medium whitespace-nowrap ${step.num === current ? "text-[#0d9488]" : "text-muted-foreground"}`,
          children: step.label
        }
      )
    ] }),
    idx < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-24 h-0.5 mx-3 mb-5 transition-smooth ${current > 1 ? "bg-[#0d9488]" : "bg-border"}`
      }
    )
  ] }, step.num)) });
}
function SuccessBanner({
  patientCode,
  onDismiss
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "register-success-banner",
      className: "flex items-center justify-between gap-3 rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 mb-6 animate-[fadeInPage_0.3s_ease-out]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-teal-600 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-teal-800", children: [
            "Patient registered successfully! Code:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold tracking-wide", children: patientCode })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onDismiss,
            type: "button",
            className: "text-teal-600 hover:text-teal-800 text-lg leading-none transition-colors",
            "aria-label": "Dismiss",
            children: "×"
          }
        )
      ]
    }
  );
}
function FieldError({ message }) {
  if (!message) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 text-xs text-destructive mt-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
    message
  ] });
}
function RegisterPatient() {
  const [step, setStep] = reactExports.useState(1);
  const [step1, setStep1] = reactExports.useState(EMPTY_STEP1);
  const [step2, setStep2] = reactExports.useState(EMPTY_STEP2);
  const [errors1, setErrors1] = reactExports.useState({});
  const [errors2, setErrors2] = reactExports.useState({});
  const [successCode, setSuccessCode] = reactExports.useState(null);
  const { data: volunteers = [], isLoading: volunteersLoading } = useVolunteers();
  const createPatient = useCreatePatient();
  function validateStep1() {
    const e = {};
    if (!step1.name.trim()) e.name = "Name is required";
    if (!step1.age || Number.isNaN(Number(step1.age)) || Number(step1.age) <= 0)
      e.age = "Valid age is required";
    if (!step1.gender) e.gender = "Gender is required";
    if (!step1.phone.trim()) e.phone = "Phone is required";
    if (!step1.village.trim()) e.village = "Village is required";
    if (!step1.address.trim()) e.address = "Address is required";
    setErrors1(e);
    return Object.keys(e).length === 0;
  }
  function validateStep2() {
    const e = {};
    if (!step2.condition) e.condition = "Condition is required";
    if (!step2.volunteerId) e.volunteerId = "Volunteer is required";
    setErrors2(e);
    return Object.keys(e).length === 0;
  }
  function handleNext() {
    if (validateStep1()) setStep(2);
  }
  function handleBack() {
    setStep(1);
    setErrors2({});
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateStep2()) return;
    try {
      const patient = await createPatient.mutateAsync({
        name: step1.name.trim(),
        age: Number(step1.age),
        gender: step1.gender,
        phone: step1.phone.trim(),
        village: step1.village.trim(),
        address: step1.address.trim(),
        condition: step2.condition,
        volunteerId: Number(step2.volunteerId),
        notes: step2.notes.trim()
      });
      setSuccessCode(patient.patientCode);
      setStep1(EMPTY_STEP1);
      setStep2(EMPTY_STEP2);
      setErrors1({});
      setErrors2({});
      setStep(1);
    } catch {
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-2xl mx-auto page-enter",
      "data-ocid": "register-patient-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-5 h-5 text-[#0d9488]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold font-display text-foreground", children: "Register Patient" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Add a new patient to the CareBridge monitoring program." })
        ] }),
        successCode && /* @__PURE__ */ jsxRuntimeExports.jsx(
          SuccessBanner,
          {
            patientCode: successCode,
            onDismiss: () => setSuccessCode(null)
          }
        ),
        createPatient.isError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 mb-6 text-sm text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0" }),
          "Failed to register patient. Please try again."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold font-display", children: step === 1 ? "Personal Information" : "Medical Information" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-xs text-muted-foreground", children: step === 1 ? "Step 1 of 2 — Basic patient demographics" : "Step 2 of 2 — Clinical details and assignment" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { current: step }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: step === 2 ? handleSubmit : (e) => {
                  e.preventDefault();
                  handleNext();
                },
                noValidate: true,
                children: [
                  step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "name", children: [
                        "Full Name ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "name",
                          "data-ocid": "input-name",
                          placeholder: "e.g., Sunita Devi",
                          value: step1.name,
                          onChange: (e) => {
                            setStep1((s) => ({ ...s, name: e.target.value }));
                            if (errors1.name)
                              setErrors1((e2) => ({ ...e2, name: void 0 }));
                          },
                          className: errors1.name ? "border-destructive" : ""
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors1.name })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "age", children: [
                          "Age ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "age",
                            "data-ocid": "input-age",
                            type: "number",
                            min: 1,
                            max: 120,
                            placeholder: "e.g., 45",
                            value: step1.age,
                            onChange: (e) => {
                              setStep1((s) => ({ ...s, age: e.target.value }));
                              if (errors1.age)
                                setErrors1((e2) => ({ ...e2, age: void 0 }));
                            },
                            className: errors1.age ? "border-destructive" : ""
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors1.age })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                          "Gender ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Select,
                          {
                            value: step1.gender,
                            onValueChange: (v) => {
                              setStep1((s) => ({ ...s, gender: v }));
                              if (errors1.gender)
                                setErrors1((e2) => ({ ...e2, gender: void 0 }));
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                SelectTrigger,
                                {
                                  "data-ocid": "select-gender",
                                  className: errors1.gender ? "border-destructive" : "",
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select gender" })
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Male", children: "Male" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Female", children: "Female" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Other", children: "Other" })
                              ] })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors1.gender })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "phone", children: [
                          "Phone ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "phone",
                            "data-ocid": "input-phone",
                            placeholder: "e.g., +91 98765 43210",
                            value: step1.phone,
                            onChange: (e) => {
                              setStep1((s) => ({ ...s, phone: e.target.value }));
                              if (errors1.phone)
                                setErrors1((e2) => ({ ...e2, phone: void 0 }));
                            },
                            className: errors1.phone ? "border-destructive" : ""
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors1.phone })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "village", children: [
                          "Village ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "village",
                            "data-ocid": "input-village",
                            placeholder: "e.g., Rampur",
                            value: step1.village,
                            onChange: (e) => {
                              setStep1((s) => ({ ...s, village: e.target.value }));
                              if (errors1.village)
                                setErrors1((e2) => ({ ...e2, village: void 0 }));
                            },
                            className: errors1.village ? "border-destructive" : ""
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors1.village })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "address", children: [
                        "Address ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Textarea,
                        {
                          id: "address",
                          "data-ocid": "input-address",
                          placeholder: "House no., street, locality...",
                          rows: 2,
                          value: step1.address,
                          onChange: (e) => {
                            setStep1((s) => ({ ...s, address: e.target.value }));
                            if (errors1.address)
                              setErrors1((e2) => ({ ...e2, address: void 0 }));
                          },
                          className: errors1.address ? "border-destructive" : ""
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors1.address })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "submit",
                        "data-ocid": "btn-next",
                        className: "gap-2 bg-[#0d9488] hover:bg-[#0f766e] text-white",
                        children: [
                          "Next",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                        ]
                      }
                    ) })
                  ] }),
                  step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                        "Medical Condition",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Select,
                        {
                          value: step2.condition,
                          onValueChange: (v) => {
                            setStep2((s) => ({ ...s, condition: v }));
                            if (errors2.condition)
                              setErrors2((e2) => ({ ...e2, condition: void 0 }));
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              SelectTrigger,
                              {
                                "data-ocid": "select-condition",
                                className: errors2.condition ? "border-destructive" : "",
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select condition" })
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CONDITIONS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors2.condition })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                        "Assign Volunteer ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Select,
                        {
                          value: step2.volunteerId,
                          onValueChange: (v) => {
                            setStep2((s) => ({ ...s, volunteerId: v }));
                            if (errors2.volunteerId)
                              setErrors2((e2) => ({ ...e2, volunteerId: void 0 }));
                          },
                          disabled: volunteersLoading,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              SelectTrigger,
                              {
                                "data-ocid": "select-volunteer",
                                className: errors2.volunteerId ? "border-destructive" : "",
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  SelectValue,
                                  {
                                    placeholder: volunteersLoading ? "Loading volunteers..." : "Select volunteer"
                                  }
                                )
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                              volunteers.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(v.id), children: [
                                v.name,
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs text-muted-foreground", children: v.email })
                              ] }, v.id)),
                              !volunteersLoading && volunteers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2 text-xs text-muted-foreground", children: "No volunteers found" })
                            ] })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors2.volunteerId })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "notes", children: [
                        "Clinical Notes",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-normal", children: "(optional)" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Textarea,
                        {
                          id: "notes",
                          "data-ocid": "input-notes",
                          placeholder: "Additional observations, medication history, allergies...",
                          rows: 4,
                          value: step2.notes,
                          onChange: (e) => setStep2((s) => ({ ...s, notes: e.target.value }))
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/40 p-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Patient Summary" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-6 gap-y-1 text-sm", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Name" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium truncate", children: step1.name || "—" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Age / Gender" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                          step1.age || "—",
                          " / ",
                          step1.gender || "—"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Village" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium truncate", children: step1.village || "—" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Phone" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: step1.phone || "—" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          type: "button",
                          variant: "outline",
                          "data-ocid": "btn-back",
                          onClick: handleBack,
                          className: "gap-2",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                            "Back"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "submit",
                          "data-ocid": "btn-submit-patient",
                          disabled: createPatient.isPending,
                          className: "gap-2 bg-[#0d9488] hover:bg-[#0f766e] text-white min-w-[130px]",
                          children: createPatient.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                            "Registering..."
                          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
                            "Register Patient"
                          ] })
                        }
                      )
                    ] })
                  ] })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  RegisterPatient as default
};
