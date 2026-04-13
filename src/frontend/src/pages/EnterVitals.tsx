import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Activity,
  AlertTriangle,
  Droplets,
  Heart,
  Thermometer,
  Wind,
} from "lucide-react";
import React from "react";
import {
  useCreateRecord,
  useCurrentUser,
  usePatients,
} from "../hooks/useBackend";
import { cn, formatVitalStatus } from "../lib/utils";

const VISIT_TYPES = [
  "Home Visit",
  "Clinic Visit",
  "Emergency Visit",
  "Follow-up",
];

function getTodayISO(): string {
  return new Date().toISOString().split("T")[0];
}

// ── Vital Preview Box ──────────────────────────────────────────────────────────

type VitalBoxProps = {
  icon: React.ReactNode;
  name: string;
  value: string;
  unit: string;
  type: "bp" | "glucose" | "hr" | "spo2" | "temp";
  numValue: number | null;
};

function VitalBox({ icon, name, value, unit, type, numValue }: VitalBoxProps) {
  if (numValue === null || numValue === 0) {
    return (
      <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-muted/30 p-3">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          {icon}
          <span className="text-xs font-medium uppercase tracking-wide">
            {name}
          </span>
        </div>
        <p className="text-lg font-bold text-muted-foreground/50">—</p>
        <span className="text-xs text-muted-foreground">awaiting input</span>
      </div>
    );
  }

  const info = formatVitalStatus(type, numValue);
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 rounded-lg border p-3 transition-all",
        info.bgColor,
      )}
    >
      <div className={cn("flex items-center gap-1.5", info.color)}>
        {icon}
        <span className="text-xs font-medium uppercase tracking-wide">
          {name}
        </span>
      </div>
      <p className={cn("text-lg font-bold", info.color)}>
        {value}
        <span className="ml-1 text-xs font-normal opacity-70">{unit}</span>
      </p>
      <div className="flex items-center gap-1">
        <span className={cn("text-xs font-semibold", info.color)}>
          {info.label}
        </span>
        {info.status === "critical" && (
          <AlertTriangle
            className="h-3 w-3 text-red-600"
            aria-label="Will trigger alert"
          />
        )}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function EnterVitals() {
  const { data: currentUser } = useCurrentUser();
  const { data: patientsData, isLoading: patientsLoading } = usePatients();
  const createRecord = useCreateRecord();

  // Form state
  const [patientId, setPatientId] = React.useState<string>("");
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
  const volunteerName = currentUser?.name ?? "";

  // Derived numeric values for preview
  const numSystolic = bpSystolic ? Number(bpSystolic) : null;
  const numDiastolic = bpDiastolic ? Number(bpDiastolic) : null;
  const numGlucose = glucose ? Number(glucose) : null;
  const numHR = heartRate ? Number(heartRate) : null;
  const numSpO2 = spo2 ? Number(spo2) : null;
  const numTemp = temperature ? Number(temperature) : null;

  // Any vital entered — show preview
  const showPreview = numSystolic || numGlucose || numHR || numSpO2 || numTemp;

  // Alert count preview — must match backend thresholds exactly
  const alertCount = [
    numSystolic !== null && numSystolic >= 140,
    numGlucose !== null && numGlucose >= 200,
    numHR !== null && (numHR < 50 || numHR > 110),
    numSpO2 !== null && numSpO2 < 94,
  ].filter(Boolean).length;

  async function handleSubmit(e: React.FormEvent) {
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
      checkDate,
    });

    setSuccess(true);
    // Reset vitals + symptoms but keep patient selected
    setBpSystolic("");
    setBpDiastolic("");
    setGlucose("");
    setHeartRate("");
    setSpo2("");
    setTemperature("");
    setSymptoms("");
    setCheckDate(getTodayISO());
    setVisitType("Home Visit");
    setTimeout(() => setSuccess(false), 5000);
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Enter Vitals
        </h1>
        <p className="text-muted-foreground mt-1">
          Record patient health measurements and observations
        </p>
      </div>

      {/* Success banner */}
      {success && (
        <div
          data-ocid="vitals-success-banner"
          className="flex items-center gap-3 rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-teal-800"
        >
          <div className="h-2 w-2 rounded-full bg-teal-500 shrink-0" />
          <p className="text-sm font-medium">Vitals recorded successfully!</p>
        </div>
      )}

      {/* Error banner */}
      {createRecord.isError && (
        <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <p className="text-sm font-medium">
            Failed to save vitals. Please try again.
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left column: Visit info + Vitals input */}
        <div className="lg:col-span-2 space-y-6">
          {/* Visit Info */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#0d9488]" />
                Visit Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="patient-select">
                  Patient <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={patientId}
                  onValueChange={setPatientId}
                  disabled={patientsLoading}
                >
                  <SelectTrigger
                    id="patient-select"
                    data-ocid="vitals-patient-select"
                    className="w-full"
                  >
                    <SelectValue
                      placeholder={
                        patientsLoading
                          ? "Loading patients..."
                          : "Select patient"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map(({ patient }) => (
                      <SelectItem key={patient.id} value={String(patient.id)}>
                        <span className="font-mono text-xs text-muted-foreground mr-2">
                          {patient.patientCode}
                        </span>
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="check-date">Visit Date</Label>
                <Input
                  id="check-date"
                  data-ocid="vitals-date-input"
                  type="date"
                  value={checkDate}
                  onChange={(e) => setCheckDate(e.target.value)}
                  max={getTodayISO()}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="visit-type">Visit Type</Label>
                <Select value={visitType} onValueChange={setVisitType}>
                  <SelectTrigger id="visit-type" data-ocid="vitals-visit-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {VISIT_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="volunteer-name">Recorded By</Label>
                <Input
                  id="volunteer-name"
                  value={volunteerName}
                  readOnly
                  className="bg-muted/40 text-muted-foreground cursor-not-allowed"
                />
              </div>
            </CardContent>
          </Card>

          {/* Vitals Inputs */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Heart className="h-4 w-4 text-[#0d9488]" />
                Vital Measurements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* BP row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bp-sys">
                    BP Systolic{" "}
                    <span className="text-muted-foreground text-xs">
                      (mmHg)
                    </span>
                  </Label>
                  <Input
                    id="bp-sys"
                    data-ocid="vitals-bp-systolic"
                    type="number"
                    min={0}
                    max={300}
                    placeholder="e.g. 120"
                    value={bpSystolic}
                    onChange={(e) => setBpSystolic(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bp-dia">
                    BP Diastolic{" "}
                    <span className="text-muted-foreground text-xs">
                      (mmHg)
                    </span>
                  </Label>
                  <Input
                    id="bp-dia"
                    data-ocid="vitals-bp-diastolic"
                    type="number"
                    min={0}
                    max={200}
                    placeholder="e.g. 80"
                    value={bpDiastolic}
                    onChange={(e) => setBpDiastolic(e.target.value)}
                  />
                </div>
              </div>

              {/* Glucose + HR */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="glucose">
                    Glucose{" "}
                    <span className="text-muted-foreground text-xs">
                      (mg/dL)
                    </span>
                  </Label>
                  <Input
                    id="glucose"
                    data-ocid="vitals-glucose"
                    type="number"
                    min={0}
                    max={600}
                    placeholder="e.g. 95"
                    value={glucose}
                    onChange={(e) => setGlucose(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heart-rate">
                    Heart Rate{" "}
                    <span className="text-muted-foreground text-xs">(bpm)</span>
                  </Label>
                  <Input
                    id="heart-rate"
                    data-ocid="vitals-heart-rate"
                    type="number"
                    min={0}
                    max={300}
                    placeholder="e.g. 72"
                    value={heartRate}
                    onChange={(e) => setHeartRate(e.target.value)}
                  />
                </div>
              </div>

              {/* SpO2 + Temp */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="spo2">
                    SpO2{" "}
                    <span className="text-muted-foreground text-xs">(%)</span>
                  </Label>
                  <Input
                    id="spo2"
                    data-ocid="vitals-spo2"
                    type="number"
                    min={0}
                    max={100}
                    placeholder="e.g. 98"
                    value={spo2}
                    onChange={(e) => setSpo2(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temperature">
                    Temperature{" "}
                    <span className="text-muted-foreground text-xs">(°F)</span>
                  </Label>
                  <Input
                    id="temperature"
                    data-ocid="vitals-temperature"
                    type="number"
                    min={90}
                    max={115}
                    step={0.1}
                    placeholder="e.g. 98.6"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                  />
                </div>
              </div>

              {/* Symptoms */}
              <div className="space-y-2">
                <Label htmlFor="symptoms">Symptoms / Observations</Label>
                <Textarea
                  id="symptoms"
                  data-ocid="vitals-symptoms"
                  placeholder="Describe any symptoms, patient complaints, or observations..."
                  rows={3}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              type="submit"
              data-ocid="vitals-submit-btn"
              disabled={!patientId || createRecord.isPending}
              className="min-w-[160px]"
            >
              {createRecord.isPending ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                "Save Vitals"
              )}
            </Button>
          </div>
        </div>

        {/* Right column: Live Preview */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-4">
            <Card
              className={cn(
                "transition-all duration-300",
                showPreview ? "opacity-100" : "opacity-60",
              )}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Activity className="h-4 w-4 text-[#0d9488]" />
                  Live Preview
                </CardTitle>
                {showPreview && alertCount > 0 && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    {alertCount} alert{alertCount > 1 ? "s" : ""} will be
                    generated
                  </p>
                )}
                {showPreview && alertCount === 0 && (
                  <p className="text-xs text-teal-700 font-medium mt-1">
                    All vitals within normal range
                  </p>
                )}
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-3">
                {/* BP box — uses systolic for status classification */}
                <VitalBox
                  icon={<Activity className="h-3.5 w-3.5" />}
                  name="Blood Pressure"
                  value={
                    numSystolic && numDiastolic
                      ? `${numSystolic}/${numDiastolic}`
                      : numSystolic
                        ? String(numSystolic)
                        : ""
                  }
                  unit="mmHg"
                  type="bp"
                  numValue={numSystolic}
                />

                <VitalBox
                  icon={<Droplets className="h-3.5 w-3.5" />}
                  name="Glucose"
                  value={glucose}
                  unit="mg/dL"
                  type="glucose"
                  numValue={numGlucose}
                />

                <VitalBox
                  icon={<Heart className="h-3.5 w-3.5" />}
                  name="Heart Rate"
                  value={heartRate}
                  unit="bpm"
                  type="hr"
                  numValue={numHR}
                />

                <VitalBox
                  icon={<Wind className="h-3.5 w-3.5" />}
                  name="SpO2"
                  value={spo2}
                  unit="%"
                  type="spo2"
                  numValue={numSpO2}
                />

                <VitalBox
                  icon={<Thermometer className="h-3.5 w-3.5" />}
                  name="Temperature"
                  value={temperature}
                  unit="°F"
                  type="temp"
                  numValue={numTemp}
                />
              </CardContent>
            </Card>

            {/* Guide card */}
            <Card className="bg-muted/30">
              <CardContent className="pt-4 space-y-2.5 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground text-xs uppercase tracking-wide">
                  Reference Ranges
                </p>
                <div className="space-y-1.5">
                  {[
                    {
                      label: "BP Systolic",
                      ranges: "<120 Normal · 120-139 Elevated · ≥140 High",
                    },
                    {
                      label: "Glucose",
                      ranges: "<100 Normal · 100-125 Pre-diabetic · ≥126 High",
                    },
                    {
                      label: "Heart Rate",
                      ranges: "60-100 Normal · outside Abnormal",
                    },
                    {
                      label: "SpO2",
                      ranges: "≥95 Normal · 90-94 Low · <90 Critical",
                    },
                    {
                      label: "Temperature",
                      ranges:
                        "≤99°F Normal · 99-100.4 Low Fever · >100.4 Fever",
                    },
                  ].map(({ label, ranges }) => (
                    <div key={label}>
                      <p className="font-medium text-foreground">{label}</p>
                      <p className="text-[11px]">{ranges}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
