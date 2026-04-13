import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreatePatient, useVolunteers } from "@/hooks/useBackend";
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  UserPlus,
} from "lucide-react";
import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────

type Step1Data = {
  name: string;
  age: string;
  gender: string;
  phone: string;
  village: string;
  address: string;
};

type Step2Data = {
  condition: string;
  volunteerId: string;
  notes: string;
};

const EMPTY_STEP1: Step1Data = {
  name: "",
  age: "",
  gender: "",
  phone: "",
  village: "",
  address: "",
};

const EMPTY_STEP2: Step2Data = {
  condition: "",
  volunteerId: "",
  notes: "",
};

const CONDITIONS = [
  "Diabetes",
  "Hypertension",
  "Heart Disease",
  "Asthma",
  "Malaria",
  "Tuberculosis",
  "Other",
];

// ── Step Indicator ─────────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: 1 | 2 }) {
  const steps = [
    { num: 1, label: "Personal Information" },
    { num: 2, label: "Medical Information" },
  ];

  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((step, idx) => (
        <div key={step.num} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`
                w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-smooth
                ${
                  step.num < current
                    ? "bg-[#0d9488] text-white"
                    : step.num === current
                      ? "bg-[#0d9488] text-white ring-4 ring-[#0d9488]/20"
                      : "bg-muted text-muted-foreground"
                }
              `}
            >
              {step.num < current ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                step.num
              )}
            </div>
            <span
              className={`text-xs font-medium whitespace-nowrap ${
                step.num === current
                  ? "text-[#0d9488]"
                  : "text-muted-foreground"
              }`}
            >
              {step.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div
              className={`w-24 h-0.5 mx-3 mb-5 transition-smooth ${
                current > 1 ? "bg-[#0d9488]" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Success Banner ─────────────────────────────────────────────────────────────

function SuccessBanner({
  patientCode,
  onDismiss,
}: {
  patientCode: string;
  onDismiss: () => void;
}) {
  return (
    <div
      data-ocid="register-success-banner"
      className="flex items-center justify-between gap-3 rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 mb-6 animate-[fadeInPage_0.3s_ease-out]"
    >
      <div className="flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
        <p className="text-sm font-medium text-teal-800">
          Patient registered successfully! Code:{" "}
          <span className="font-bold tracking-wide">{patientCode}</span>
        </p>
      </div>
      <button
        onClick={onDismiss}
        type="button"
        className="text-teal-600 hover:text-teal-800 text-lg leading-none transition-colors"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}

// ── Field Error ────────────────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1 text-xs text-destructive mt-1">
      <AlertCircle className="w-3 h-3" />
      {message}
    </p>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function RegisterPatient() {
  const [step, setStep] = useState<1 | 2>(1);
  const [step1, setStep1] = useState<Step1Data>(EMPTY_STEP1);
  const [step2, setStep2] = useState<Step2Data>(EMPTY_STEP2);
  const [errors1, setErrors1] = useState<Partial<Step1Data>>({});
  const [errors2, setErrors2] = useState<Partial<Step2Data>>({});
  const [successCode, setSuccessCode] = useState<string | null>(null);

  const { data: volunteers = [], isLoading: volunteersLoading } =
    useVolunteers();
  const createPatient = useCreatePatient();

  // ── Validation ────────────────────────────────────────────────────────────

  function validateStep1(): boolean {
    const e: Partial<Step1Data> = {};
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

  function validateStep2(): boolean {
    const e: Partial<Step2Data> = {};
    if (!step2.condition) e.condition = "Condition is required";
    if (!step2.volunteerId) e.volunteerId = "Volunteer is required";
    setErrors2(e);
    return Object.keys(e).length === 0;
  }

  // ── Handlers ──────────────────────────────────────────────────────────────

  function handleNext() {
    if (validateStep1()) setStep(2);
  }

  function handleBack() {
    setStep(1);
    setErrors2({});
  }

  async function handleSubmit(e: React.FormEvent) {
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
        notes: step2.notes.trim(),
      });

      setSuccessCode(patient.patientCode);
      setStep1(EMPTY_STEP1);
      setStep2(EMPTY_STEP2);
      setErrors1({});
      setErrors2({});
      setStep(1);
    } catch {
      // error handled via mutation state
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      className="max-w-2xl mx-auto page-enter"
      data-ocid="register-patient-page"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <UserPlus className="w-5 h-5 text-[#0d9488]" />
          <h1 className="text-2xl font-semibold font-display text-foreground">
            Register Patient
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Add a new patient to the CareBridge monitoring program.
        </p>
      </div>

      {/* Success banner */}
      {successCode && (
        <SuccessBanner
          patientCode={successCode}
          onDismiss={() => setSuccessCode(null)}
        />
      )}

      {/* Mutation error */}
      {createPatient.isError && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 mb-6 text-sm text-destructive">
          <AlertCircle className="w-4 h-4 shrink-0" />
          Failed to register patient. Please try again.
        </div>
      )}

      <Card className="shadow-sm border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold font-display">
            {step === 1 ? "Personal Information" : "Medical Information"}
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            {step === 1
              ? "Step 1 of 2 — Basic patient demographics"
              : "Step 2 of 2 — Clinical details and assignment"}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          {/* Step Indicator */}
          <StepIndicator current={step} />

          <form
            onSubmit={
              step === 2
                ? handleSubmit
                : (e) => {
                    e.preventDefault();
                    handleNext();
                  }
            }
            noValidate
          >
            {/* ── Step 1 ────────────────────────────────────────────────── */}
            {step === 1 && (
              <div className="space-y-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="name">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    data-ocid="input-name"
                    placeholder="e.g., Sunita Devi"
                    value={step1.name}
                    onChange={(e) => {
                      setStep1((s) => ({ ...s, name: e.target.value }));
                      if (errors1.name)
                        setErrors1((e2) => ({ ...e2, name: undefined }));
                    }}
                    className={errors1.name ? "border-destructive" : ""}
                  />
                  <FieldError message={errors1.name} />
                </div>

                {/* Age + Gender row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="age">
                      Age <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="age"
                      data-ocid="input-age"
                      type="number"
                      min={1}
                      max={120}
                      placeholder="e.g., 45"
                      value={step1.age}
                      onChange={(e) => {
                        setStep1((s) => ({ ...s, age: e.target.value }));
                        if (errors1.age)
                          setErrors1((e2) => ({ ...e2, age: undefined }));
                      }}
                      className={errors1.age ? "border-destructive" : ""}
                    />
                    <FieldError message={errors1.age} />
                  </div>

                  <div className="space-y-1.5">
                    <Label>
                      Gender <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={step1.gender}
                      onValueChange={(v) => {
                        setStep1((s) => ({ ...s, gender: v }));
                        if (errors1.gender)
                          setErrors1((e2) => ({ ...e2, gender: undefined }));
                      }}
                    >
                      <SelectTrigger
                        data-ocid="select-gender"
                        className={errors1.gender ? "border-destructive" : ""}
                      >
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError message={errors1.gender} />
                  </div>
                </div>

                {/* Phone + Village row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">
                      Phone <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      data-ocid="input-phone"
                      placeholder="e.g., +91 98765 43210"
                      value={step1.phone}
                      onChange={(e) => {
                        setStep1((s) => ({ ...s, phone: e.target.value }));
                        if (errors1.phone)
                          setErrors1((e2) => ({ ...e2, phone: undefined }));
                      }}
                      className={errors1.phone ? "border-destructive" : ""}
                    />
                    <FieldError message={errors1.phone} />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="village">
                      Village <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="village"
                      data-ocid="input-village"
                      placeholder="e.g., Rampur"
                      value={step1.village}
                      onChange={(e) => {
                        setStep1((s) => ({ ...s, village: e.target.value }));
                        if (errors1.village)
                          setErrors1((e2) => ({ ...e2, village: undefined }));
                      }}
                      className={errors1.village ? "border-destructive" : ""}
                    />
                    <FieldError message={errors1.village} />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-1.5">
                  <Label htmlFor="address">
                    Address <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="address"
                    data-ocid="input-address"
                    placeholder="House no., street, locality..."
                    rows={2}
                    value={step1.address}
                    onChange={(e) => {
                      setStep1((s) => ({ ...s, address: e.target.value }));
                      if (errors1.address)
                        setErrors1((e2) => ({ ...e2, address: undefined }));
                    }}
                    className={errors1.address ? "border-destructive" : ""}
                  />
                  <FieldError message={errors1.address} />
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    data-ocid="btn-next"
                    className="gap-2 bg-[#0d9488] hover:bg-[#0f766e] text-white"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ── Step 2 ────────────────────────────────────────────────── */}
            {step === 2 && (
              <div className="space-y-5">
                {/* Condition */}
                <div className="space-y-1.5">
                  <Label>
                    Medical Condition{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={step2.condition}
                    onValueChange={(v) => {
                      setStep2((s) => ({ ...s, condition: v }));
                      if (errors2.condition)
                        setErrors2((e2) => ({ ...e2, condition: undefined }));
                    }}
                  >
                    <SelectTrigger
                      data-ocid="select-condition"
                      className={errors2.condition ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {CONDITIONS.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError message={errors2.condition} />
                </div>

                {/* Volunteer */}
                <div className="space-y-1.5">
                  <Label>
                    Assign Volunteer <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={step2.volunteerId}
                    onValueChange={(v) => {
                      setStep2((s) => ({ ...s, volunteerId: v }));
                      if (errors2.volunteerId)
                        setErrors2((e2) => ({ ...e2, volunteerId: undefined }));
                    }}
                    disabled={volunteersLoading}
                  >
                    <SelectTrigger
                      data-ocid="select-volunteer"
                      className={
                        errors2.volunteerId ? "border-destructive" : ""
                      }
                    >
                      <SelectValue
                        placeholder={
                          volunteersLoading
                            ? "Loading volunteers..."
                            : "Select volunteer"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {volunteers.map((v) => (
                        <SelectItem key={v.id} value={String(v.id)}>
                          {v.name}
                          <span className="ml-2 text-xs text-muted-foreground">
                            {v.email}
                          </span>
                        </SelectItem>
                      ))}
                      {!volunteersLoading && volunteers.length === 0 && (
                        <div className="px-3 py-2 text-xs text-muted-foreground">
                          No volunteers found
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                  <FieldError message={errors2.volunteerId} />
                </div>

                {/* Notes */}
                <div className="space-y-1.5">
                  <Label htmlFor="notes">
                    Clinical Notes{" "}
                    <span className="text-muted-foreground text-xs font-normal">
                      (optional)
                    </span>
                  </Label>
                  <Textarea
                    id="notes"
                    data-ocid="input-notes"
                    placeholder="Additional observations, medication history, allergies..."
                    rows={4}
                    value={step2.notes}
                    onChange={(e) =>
                      setStep2((s) => ({ ...s, notes: e.target.value }))
                    }
                  />
                </div>

                {/* Patient summary preview */}
                <div className="rounded-lg border border-border bg-muted/40 p-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Patient Summary
                  </p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium truncate">
                      {step1.name || "—"}
                    </span>
                    <span className="text-muted-foreground">Age / Gender</span>
                    <span className="font-medium">
                      {step1.age || "—"} / {step1.gender || "—"}
                    </span>
                    <span className="text-muted-foreground">Village</span>
                    <span className="font-medium truncate">
                      {step1.village || "—"}
                    </span>
                    <span className="text-muted-foreground">Phone</span>
                    <span className="font-medium">{step1.phone || "—"}</span>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    data-ocid="btn-back"
                    onClick={handleBack}
                    className="gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    data-ocid="btn-submit-patient"
                    disabled={createPatient.isPending}
                    className="gap-2 bg-[#0d9488] hover:bg-[#0f766e] text-white min-w-[130px]"
                  >
                    {createPatient.isPending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Registering...
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        Register Patient
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
