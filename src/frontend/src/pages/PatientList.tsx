import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { usePatient, usePatients } from "@/hooks/useBackend";
import { cn, formatVitalStatus, getStatusColor } from "@/lib/utils";
import type { HealthRecord, PatientWithMeta } from "@/types";
import { Eye, MapPin, Search, Stethoscope, User2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

// ── Vital Chip ─────────────────────────────────────────────────────────────────

function VitalChip({
  label,
  value,
  type,
}: {
  label: string;
  value: number;
  type: "bp" | "glucose" | "hr" | "spo2" | "temp";
}) {
  const info = formatVitalStatus(type, value);
  return (
    <div
      className={cn(
        "flex flex-col items-center px-3 py-1.5 rounded-lg border text-center min-w-[72px]",
        info.bgColor,
      )}
    >
      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </span>
      <span className={cn("text-sm font-bold leading-tight", info.color)}>
        {type === "bp"
          ? `${value}`
          : type === "temp"
            ? `${value}°F`
            : `${value}`}
        {type === "spo2" ? "%" : type === "hr" ? " bpm" : ""}
        {type === "glucose" ? " mg/dL" : ""}
      </span>
      <span className={cn("text-[10px] mt-0.5 font-medium", info.color)}>
        {info.label}
      </span>
    </div>
  );
}

// ── Record Card ────────────────────────────────────────────────────────────────

function RecordCard({ record }: { record: HealthRecord }) {
  return (
    <div className="border border-border rounded-xl p-4 bg-card space-y-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-xs bg-[#f0fdfa] border-teal-200 text-teal-700 capitalize"
          >
            {record.visitType}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {record.checkDate}
          </span>
        </div>
        {record.reviewed ? (
          <Badge className="bg-teal-100 text-teal-700 border-teal-200 text-[10px]">
            Reviewed
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200 text-[10px]"
          >
            Pending
          </Badge>
        )}
      </div>

      {/* Vitals */}
      <div className="flex flex-wrap gap-2">
        <VitalChip label="Systolic" value={record.bpSystolic} type="bp" />
        <VitalChip label="Glucose" value={record.glucose} type="glucose" />
        <VitalChip label="Heart Rate" value={record.heartRate} type="hr" />
        <VitalChip label="SpO2" value={record.spo2} type="spo2" />
        <VitalChip label="Temp" value={record.temperature} type="temp" />
      </div>

      {record.symptoms && (
        <div className="text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2">
          <span className="font-medium text-foreground">Symptoms: </span>
          {record.symptoms}
        </div>
      )}

      {record.doctorAdvice ? (
        <div className="text-xs bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 text-blue-800">
          <span className="font-medium">Doctor&apos;s Advice: </span>
          {record.doctorAdvice}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground italic">
          Doctor advice pending review
        </p>
      )}
    </div>
  );
}

// ── Patient Detail Modal ───────────────────────────────────────────────────────

function PatientDetailModal({
  patientId,
  open,
  onClose,
}: {
  patientId: number | null;
  open: boolean;
  onClose: () => void;
}) {
  const { data: detail, isLoading } = usePatient(open ? patientId : null);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        data-ocid="patient-detail-modal"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#0f172a] font-semibold">
            <Stethoscope className="w-5 h-5 text-[#0d9488]" />
            Patient Details
          </DialogTitle>
        </DialogHeader>

        {isLoading || !detail ? (
          <div className="space-y-3 py-4">
            {["sk1", "sk2", "sk3", "sk4"].map((k) => (
              <Skeleton key={k} className="h-8 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="space-y-6 pb-2">
            {/* Patient Info Grid */}
            <div className="rounded-xl border border-border bg-muted/20 p-4">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-base font-bold text-[#0f172a]">
                    {detail.patient.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {detail.patient.condition}
                  </p>
                </div>
                <Badge className="bg-[#0d9488]/10 text-[#0d9488] border-[#0d9488]/20 font-mono text-xs">
                  {detail.patient.patientCode}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {[
                  { label: "Age", value: `${detail.patient.age} years` },
                  { label: "Gender", value: detail.patient.gender },
                  { label: "Village", value: detail.patient.village },
                  { label: "Phone", value: detail.patient.phone },
                  { label: "Volunteer", value: detail.volunteerName },
                  {
                    label: "Status",
                    value: (
                      <span
                        className={cn(
                          "capitalize font-medium",
                          getStatusColor(detail.patient.status).text,
                        )}
                      >
                        {detail.patient.status}
                      </span>
                    ),
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col">
                    <span className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
                      {label}
                    </span>
                    <span className="text-foreground font-medium">{value}</span>
                  </div>
                ))}
              </div>
              {detail.patient.notes && (
                <p className="mt-3 text-xs text-muted-foreground italic border-t border-border pt-3">
                  {detail.patient.notes}
                </p>
              )}
            </div>

            {/* Health Records */}
            <div>
              <h4 className="text-sm font-semibold text-[#334155] mb-3 flex items-center gap-1.5">
                <span className="w-1 h-4 bg-[#0d9488] rounded-full inline-block" />
                Last {Math.min(detail.records.length, 5)} Health Records
              </h4>
              {detail.records.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No health records yet
                </div>
              ) : (
                <div className="space-y-3">
                  {detail.records.slice(0, 5).map((record) => (
                    <RecordCard key={record.id} record={record} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ── Status Badge ───────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const colors = getStatusColor(status);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize",
        colors.bg,
        colors.text,
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", colors.dot)} />
      {status}
    </span>
  );
}

// ── Table Row Skeleton ─────────────────────────────────────────────────────────

function TableRowSkeleton() {
  return (
    <tr className="border-b border-border">
      {["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"].map((k) => (
        <td key={k} className="px-4 py-3">
          <Skeleton className="h-5 w-full rounded" />
        </td>
      ))}
    </tr>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function PatientList() {
  const { data: patients = [], isLoading } = usePatients();
  const [search, setSearch] = useState("");
  const [villageFilter, setVillageFilter] = useState("all");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);

  // Derive filter options from data
  const villages = useMemo(() => {
    const unique = [...new Set(patients.map((p) => p.patient.village))]
      .filter(Boolean)
      .sort();
    return unique;
  }, [patients]);

  const conditions = useMemo(() => {
    const unique = [...new Set(patients.map((p) => p.patient.condition))]
      .filter(Boolean)
      .sort();
    return unique;
  }, [patients]);

  // Apply filters
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return patients.filter((p) => {
      const matchSearch =
        !q ||
        p.patient.name.toLowerCase().includes(q) ||
        p.patient.village.toLowerCase().includes(q) ||
        p.patient.condition.toLowerCase().includes(q) ||
        p.patient.patientCode.toLowerCase().includes(q);
      const matchVillage =
        villageFilter === "all" || p.patient.village === villageFilter;
      const matchCondition =
        conditionFilter === "all" || p.patient.condition === conditionFilter;
      return matchSearch && matchVillage && matchCondition;
    });
  }, [patients, search, villageFilter, conditionFilter]);

  function openModal(id: number) {
    setSelectedPatientId(id);
    setModalOpen(true);
  }

  function clearFilters() {
    setSearch("");
    setVillageFilter("all");
    setConditionFilter("all");
  }

  const hasFilters =
    search !== "" || villageFilter !== "all" || conditionFilter !== "all";

  return (
    <div className="space-y-5" data-ocid="patient-list-page">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-[#0f172a]">Patient Registry</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {isLoading
              ? "Loading patients..."
              : `${patients.length} patients registered`}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, village, or condition..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border"
            data-ocid="patient-search-input"
          />
        </div>

        <Select value={villageFilter} onValueChange={setVillageFilter}>
          <SelectTrigger
            className="w-[160px] bg-card border-border"
            data-ocid="village-filter"
          >
            <MapPin className="w-3.5 h-3.5 text-muted-foreground mr-1" />
            <SelectValue placeholder="All Villages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Villages</SelectItem>
            {villages.map((v) => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={conditionFilter} onValueChange={setConditionFilter}>
          <SelectTrigger
            className="w-[180px] bg-card border-border"
            data-ocid="condition-filter"
          >
            <Stethoscope className="w-3.5 h-3.5 text-muted-foreground mr-1" />
            <SelectValue placeholder="All Conditions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Conditions</SelectItem>
            {conditions.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground gap-1.5"
            data-ocid="clear-filters-btn"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {[
                  "Code",
                  "Patient",
                  "Age / Gender",
                  "Village",
                  "Condition",
                  "Volunteer",
                  "Last Check",
                  "Status",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                ["sk-r1", "sk-r2", "sk-r3", "sk-r4", "sk-r5"].map((k) => (
                  <TableRowSkeleton key={k} />
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={9}>
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-16 gap-3 text-center"
                        data-ocid="patient-empty-state"
                      >
                        <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
                          <User2 className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {hasFilters
                              ? "No patients match your filters"
                              : "No patients registered yet"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {hasFilters
                              ? "Try adjusting your search or filters"
                              : "Register a new patient to get started"}
                          </p>
                        </div>
                        {hasFilters && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={clearFilters}
                          >
                            Clear filters
                          </Button>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </td>
                </tr>
              ) : (
                <AnimatePresence>
                  {filtered.map((item: PatientWithMeta, i) => (
                    <motion.tr
                      key={item.patient.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.2 }}
                      className="border-b border-border hover:bg-muted/20 transition-colors group"
                      data-ocid={`patient-row-${item.patient.id}`}
                    >
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs font-bold px-2 py-1 rounded-md bg-[#0d9488]/10 text-[#0d9488] border border-[#0d9488]/20">
                          {item.patient.patientCode}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-medium text-[#0f172a]">
                          {item.patient.name}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                        {item.patient.age} / {item.patient.gender}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {item.patient.village}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[#334155] text-xs font-medium">
                          {item.patient.condition}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">
                        {item.volunteerName}
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                        {item.lastCheck ?? (
                          <span className="italic text-muted-foreground/60">
                            No records
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={item.patient.status} />
                      </td>
                      <td className="px-4 py-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openModal(item.patient.id)}
                          className="gap-1.5 text-[#0d9488] hover:text-[#0d9488] hover:bg-[#0d9488]/10 transition-opacity"
                          data-ocid={`view-patient-btn-${item.patient.id}`}
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer count */}
        {!isLoading && filtered.length > 0 && (
          <div className="px-4 py-2.5 border-t border-border bg-muted/20 text-xs text-muted-foreground">
            Showing {filtered.length} of {patients.length} patient
            {patients.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* Patient Detail Modal */}
      <PatientDetailModal
        patientId={selectedPatientId}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedPatientId(null);
        }}
      />
    </div>
  );
}
