import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Activity,
  AlertTriangle,
  Calendar,
  ClipboardList,
  Droplets,
  Heart,
  HeartPulse,
  MapPin,
  Phone,
  Thermometer,
  User,
  Wind,
} from "lucide-react";
import React from "react";
import { useMyAlerts, useMyRecord } from "../hooks/useBackend";
import type { Alert, HealthRecord, Patient } from "../types";

interface MyRecordsProps {
  patientId: number | null;
}

// ── vitals status helpers ──────────────────────────────────────────────────────

function bpStatus(sys: number, dia: number): "normal" | "warning" | "critical" {
  if (sys >= 180 || dia >= 120) return "critical";
  if (sys >= 140 || dia >= 90) return "warning";
  return "normal";
}
function glucoseStatus(g: number): "normal" | "warning" | "critical" {
  if (g >= 400 || g < 40) return "critical";
  if (g >= 200 || g < 70) return "warning";
  return "normal";
}
function hrStatus(hr: number): "normal" | "warning" | "critical" {
  if (hr < 40 || hr > 140) return "critical";
  if (hr < 55 || hr > 100) return "warning";
  return "normal";
}
function spo2Status(s: number): "normal" | "warning" | "critical" {
  if (s < 90) return "critical";
  if (s < 94) return "warning";
  return "normal";
}
function tempStatus(t: number): "normal" | "warning" | "critical" {
  if (t >= 40 || t < 35) return "critical";
  if (t >= 38.5 || t < 36) return "warning";
  return "normal";
}

type VitalStatus = "normal" | "warning" | "critical";

const STATUS_STYLES: Record<VitalStatus, string> = {
  normal: "bg-teal-500/15 text-teal-300 border border-teal-500/25",
  warning: "bg-amber-500/15 text-amber-300 border border-amber-500/25",
  critical: "bg-red-500/15 text-red-300 border border-red-500/30",
};

function VitalChip({
  label,
  value,
  status,
}: { label: string; value: string; status: VitalStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ${STATUS_STYLES[status]}`}
    >
      <span className="text-white/40 font-normal">{label}</span>
      {value}
    </span>
  );
}

// ── Patient profile card ───────────────────────────────────────────────────────

function PatientProfileCard({ patient }: { patient: Patient }) {
  const statusColors: Record<string, string> = {
    stable: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    alert: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    review: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  };
  const statusColor = statusColors[patient.status] ?? statusColors.stable;

  return (
    <div
      className="rounded-2xl border border-white/10 p-5 flex flex-col gap-4"
      style={{ backgroundColor: "#1e293b" }}
      data-ocid="patient-profile-card"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold flex-shrink-0"
            style={{ backgroundColor: "#0d9488" }}
          >
            {patient.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h2
              className="text-white font-semibold text-lg leading-tight truncate"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {patient.name}
            </h2>
            <p className="text-white/40 text-xs font-mono mt-0.5">
              {patient.patientCode}
            </p>
          </div>
        </div>
        <span
          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border capitalize flex-shrink-0 ${statusColor}`}
        >
          {patient.status}
        </span>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {[
          {
            icon: User,
            label: "Age / Gender",
            value: `${patient.age} yrs, ${patient.gender}`,
          },
          { icon: Phone, label: "Phone", value: patient.phone || "—" },
          { icon: MapPin, label: "Village", value: patient.village || "—" },
          {
            icon: ClipboardList,
            label: "Condition",
            value: patient.condition || "—",
          },
        ].map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-start gap-2 p-2.5 rounded-lg"
            style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
          >
            <Icon className="w-3.5 h-3.5 text-teal-400 mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-white/40 text-[10px] uppercase tracking-wider leading-none mb-0.5">
                {label}
              </p>
              <p className="text-white/85 text-xs font-medium truncate">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {patient.notes && (
        <div
          className="p-3 rounded-lg border border-white/8"
          style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
        >
          <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">
            Notes
          </p>
          <p className="text-white/65 text-xs leading-relaxed">
            {patient.notes}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Alert banners ──────────────────────────────────────────────────────────────

function AlertBanner({ alert }: { alert: Alert }) {
  return (
    <div
      className="flex items-start gap-3 p-3.5 rounded-xl border border-amber-500/30"
      style={{ backgroundColor: "rgba(245,158,11,0.08)" }}
      data-ocid="alert-banner"
    >
      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
      <div className="min-w-0 flex-1">
        <p className="text-amber-300 text-sm font-semibold leading-tight">
          {alert.alertType}
        </p>
        <p className="text-amber-200/60 text-xs mt-0.5 leading-snug">
          {alert.message}
        </p>
      </div>
    </div>
  );
}

// ── Health record row ──────────────────────────────────────────────────────────

function RecordRow({ record }: { record: HealthRecord }) {
  const bp = bpStatus(record.bpSystolic, record.bpDiastolic);
  const gl = glucoseStatus(record.glucose);
  const hr = hrStatus(record.heartRate);
  const sp = spo2Status(record.spo2);
  const tm = tempStatus(record.temperature);

  const overallStatus: VitalStatus = [bp, gl, hr, sp, tm].includes("critical")
    ? "critical"
    : [bp, gl, hr, sp, tm].includes("warning")
      ? "warning"
      : "normal";

  const statusDot: Record<VitalStatus, string> = {
    normal: "bg-teal-400",
    warning: "bg-amber-400",
    critical: "bg-red-400",
  };

  return (
    <div
      className="rounded-xl border border-white/8 p-4 flex flex-col gap-3"
      style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
      data-ocid="record-row"
    >
      {/* Row header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full flex-shrink-0 ${statusDot[overallStatus]}`}
          />
          <span className="text-white/70 text-xs font-medium">
            {record.visitType}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-white/40 text-[11px]">
          <Calendar className="w-3 h-3" />
          {record.checkDate}
        </div>
      </div>

      {/* Vitals chips */}
      <div className="flex flex-wrap gap-1.5">
        <VitalChip
          label="BP"
          value={`${record.bpSystolic}/${record.bpDiastolic}`}
          status={bp}
        />
        <VitalChip
          label="Glucose"
          value={`${record.glucose} mg/dL`}
          status={gl}
        />
        <VitalChip label="HR" value={`${record.heartRate} bpm`} status={hr} />
        <VitalChip label="SpO2" value={`${record.spo2}%`} status={sp} />
        <VitalChip label="Temp" value={`${record.temperature}°C`} status={tm} />
      </div>

      {/* Symptoms */}
      {record.symptoms && (
        <p className="text-white/45 text-xs leading-snug">
          <span className="text-white/25 uppercase tracking-wider text-[10px]">
            Symptoms:{" "}
          </span>
          {record.symptoms}
        </p>
      )}

      {/* Doctor advice */}
      {record.doctorAdvice && (
        <div
          className="p-2.5 rounded-lg border border-blue-500/20"
          style={{ backgroundColor: "rgba(59,130,246,0.07)" }}
        >
          <p className="text-white/35 text-[10px] uppercase tracking-wider mb-0.5">
            Doctor Advice
          </p>
          <p className="text-blue-200/70 text-xs leading-snug">
            {record.doctorAdvice}
          </p>
        </div>
      )}

      {/* Reviewed badge */}
      {record.reviewed && (
        <div className="flex justify-end">
          <Badge
            variant="outline"
            className="text-[10px] border-teal-500/30 text-teal-400 bg-teal-500/10"
          >
            Reviewed by doctor
          </Badge>
        </div>
      )}
    </div>
  );
}

// ── Skeleton loader ────────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton
        className="h-40 w-full rounded-2xl"
        style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
      />
      <Skeleton
        className="h-24 w-full rounded-2xl"
        style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
      />
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <Skeleton
            key={i}
            className="h-28 w-full rounded-xl"
            style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function MyRecords({ patientId }: MyRecordsProps) {
  const { data: myRecord, isLoading: recordLoading } = useMyRecord(patientId);
  const { data: myAlerts = [], isLoading: alertsLoading } =
    useMyAlerts(patientId);

  const isLoading = recordLoading || alertsLoading;

  if (patientId === null) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center"
        data-ocid="my-records-no-link"
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: "rgba(13,148,136,0.15)" }}
        >
          <HeartPulse className="w-7 h-7 text-teal-400" />
        </div>
        <div>
          <h3 className="text-white/80 font-semibold text-base mb-1">
            Account Not Linked
          </h3>
          <p className="text-white/40 text-sm max-w-xs">
            Your account is not yet linked to a patient record. Please contact
            your healthcare provider or administrator.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!myRecord) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center"
        data-ocid="my-records-not-found"
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: "rgba(239,68,68,0.12)" }}
        >
          <ClipboardList className="w-7 h-7 text-red-400" />
        </div>
        <div>
          <h3 className="text-white/80 font-semibold text-base mb-1">
            Record Not Found
          </h3>
          <p className="text-white/40 text-sm max-w-xs">
            Unable to load your health record. Please try again or contact
            support.
          </p>
        </div>
      </div>
    );
  }

  const { patient, records } = myRecord;
  const sortedRecords = [...records].sort((a, b) => b.createdAt - a.createdAt);
  const activeAlerts = myAlerts.filter((a) => !a.resolved);

  return (
    <div className="space-y-5" data-ocid="my-records-page">
      {/* Page title */}
      <div className="flex items-center gap-2.5 mb-1">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "rgba(13,148,136,0.18)" }}
        >
          <Heart className="w-4 h-4 text-teal-400" />
        </div>
        <div>
          <h1
            className="text-white font-semibold text-lg leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            My Health Records
          </h1>
          <p className="text-white/35 text-xs">
            Read-only view of your health data
          </p>
        </div>
      </div>

      {/* Active alerts */}
      {activeAlerts.length > 0 && (
        <div className="space-y-2" data-ocid="my-alerts-section">
          <p className="text-white/50 text-xs uppercase tracking-wider font-medium flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            Active Health Alerts ({activeAlerts.length})
          </p>
          {activeAlerts.map((alert) => (
            <AlertBanner key={alert.id} alert={alert} />
          ))}
        </div>
      )}

      {/* Patient profile */}
      <PatientProfileCard patient={patient} />

      {/* Health records */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-white/50 text-xs uppercase tracking-wider font-medium flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-teal-400" />
            Health Records ({sortedRecords.length})
          </p>
          <div className="flex items-center gap-3 text-[10px] text-white/30">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-teal-400 inline-block" />
              Normal
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
              Warning
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
              Critical
            </span>
          </div>
        </div>

        {sortedRecords.length === 0 ? (
          <div
            className="rounded-xl border border-white/8 p-8 flex flex-col items-center gap-3 text-center"
            style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            data-ocid="my-records-empty"
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            >
              <Droplets className="w-5 h-5 text-white/25" />
            </div>
            <div>
              <p className="text-white/50 text-sm font-medium">
                No health records yet
              </p>
              <p className="text-white/25 text-xs mt-0.5">
                Records will appear here after your first health check
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2.5" data-ocid="records-list">
            {sortedRecords.map((record) => (
              <RecordRow key={record.id} record={record} />
            ))}
          </div>
        )}
      </div>

      {/* Vitals legend footer */}
      <div
        className="rounded-xl border border-white/6 p-3.5 grid grid-cols-2 gap-2"
        style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
      >
        <p className="col-span-2 text-white/25 text-[10px] uppercase tracking-wider mb-1">
          Vitals Reference Ranges
        </p>
        {[
          {
            icon: Activity,
            label: "Blood Pressure",
            normal: "< 120/80",
            warning: "< 140/90",
            critical: ">= 180/120",
          },
          {
            icon: Droplets,
            label: "Glucose",
            normal: "70-199 mg/dL",
            warning: "200-399",
            critical: ">= 400 or < 40",
          },
          {
            icon: HeartPulse,
            label: "Heart Rate",
            normal: "55-100 bpm",
            warning: "40-54 / 101-140",
            critical: "< 40 or > 140",
          },
          {
            icon: Wind,
            label: "SpO2",
            normal: ">= 94%",
            warning: "90-93%",
            critical: "< 90%",
          },
          {
            icon: Thermometer,
            label: "Temperature",
            normal: "36-38.4°C",
            warning: "38.5-39.9°C",
            critical: ">= 40 or < 35",
          },
        ].map(({ icon: Icon, label, normal }) => (
          <div key={label} className="flex items-center gap-1.5">
            <Icon className="w-3 h-3 text-white/20 flex-shrink-0" />
            <span className="text-white/30 text-[10px] truncate">
              {label}: <span className="text-teal-400/60">{normal}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
