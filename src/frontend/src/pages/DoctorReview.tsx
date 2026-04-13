import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRecords, useReviewRecord } from "../hooks/useBackend";
import { cn, formatVitalStatus } from "../lib/utils";
import type { RecordWithMeta } from "../types";

// ── Vital Box ──────────────────────────────────────────────────────────────────

type VitalBoxProps = {
  title: string;
  value: string;
  type: "bp" | "glucose" | "hr" | "spo2" | "temp";
  numericValue: number;
};

function VitalBox({ title, value, type, numericValue }: VitalBoxProps) {
  const info = formatVitalStatus(type, numericValue);
  return (
    <div
      className={cn(
        "flex flex-col gap-0.5 rounded-lg border px-3 py-2 text-sm",
        info.bgColor,
      )}
    >
      <span className="text-xs font-medium text-muted-foreground">{title}</span>
      <span className={cn("text-base font-bold tabular-nums", info.color)}>
        {value}
      </span>
      <span className={cn("text-xs font-medium", info.color)}>
        {info.label}
      </span>
    </div>
  );
}

// ── Record Card ────────────────────────────────────────────────────────────────

type RecordCardProps = {
  item: RecordWithMeta;
  isReviewed: boolean;
};

function RecordCard({ item, isReviewed }: RecordCardProps) {
  const { record, patientName, patientCode, village } = item;
  const [advice, setAdvice] = useState(record.doctorAdvice ?? "");
  const [submitting, setSubmitting] = useState<"save" | "review" | null>(null);
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

  return (
    <Card
      className="border-border bg-card shadow-sm transition-shadow hover:shadow-md"
      data-ocid="review-record-card"
    >
      {/* Header: patient info + meta */}
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base font-semibold text-foreground">
              {patientName}
            </span>
            <Badge
              variant="outline"
              className="border-[#0d9488]/40 bg-[#0d9488]/10 font-mono text-xs text-[#0d9488]"
            >
              {patientCode}
            </Badge>
            {isReviewed && (
              <Badge
                variant="outline"
                className="border-teal-200 bg-teal-50 text-xs text-teal-700"
              >
                Reviewed
              </Badge>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <svg
                aria-hidden="true"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {record.checkDate}
            </span>
            <span className="flex items-center gap-1">
              <svg
                aria-hidden="true"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              {record.visitType}
            </span>
            <span className="flex items-center gap-1">
              <svg
                aria-hidden="true"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {village}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Vitals row */}
        <div className="grid grid-cols-3 gap-2">
          <VitalBox
            title="Blood Pressure"
            value={`${record.bpSystolic}/${record.bpDiastolic}`}
            type="bp"
            numericValue={record.bpSystolic}
          />
          <VitalBox
            title="Glucose"
            value={`${record.glucose} mg/dL`}
            type="glucose"
            numericValue={record.glucose}
          />
          <VitalBox
            title="SpO2"
            value={`${record.spo2}%`}
            type="spo2"
            numericValue={record.spo2}
          />
        </div>

        {/* Symptoms */}
        {record.symptoms && (
          <div className="rounded-lg bg-muted/50 px-3 py-2.5">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Symptoms
            </p>
            <p className="text-sm leading-relaxed text-foreground">
              {record.symptoms}
            </p>
          </div>
        )}

        {/* Doctor Advice */}
        <div className="space-y-1.5">
          <label
            htmlFor={adviceId}
            className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
          >
            Doctor Advice
          </label>
          <Textarea
            id={adviceId}
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
            placeholder="Enter medical advice..."
            rows={3}
            className="resize-none border-input bg-background text-sm placeholder:text-muted-foreground/60 focus:border-[#0d9488] focus:ring-[#0d9488]/20"
            data-ocid="advice-textarea"
            readOnly={isReviewed}
          />
        </div>

        {/* Actions */}
        {!isReviewed && (
          <div className="flex flex-wrap gap-2 pt-1">
            <Button
              size="sm"
              variant="outline"
              onClick={handleSaveAdvice}
              disabled={submitting !== null}
              data-ocid="save-advice-btn"
              className="border-[#0d9488]/50 text-[#0d9488] hover:bg-[#0d9488]/10"
            >
              {submitting === "save" ? (
                <>
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  Saving...
                </>
              ) : (
                "Submit Advice"
              )}
            </Button>
            <Button
              size="sm"
              onClick={handleMarkReviewed}
              disabled={submitting !== null}
              data-ocid="mark-reviewed-btn"
              className="bg-[#0d9488] text-white hover:bg-[#0d9488]/90"
            >
              {submitting === "review" ? (
                <>
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  Reviewing...
                </>
              ) : (
                "Mark Reviewed"
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── Loading Skeleton ───────────────────────────────────────────────────────────

function RecordSkeleton() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-16" />
          </div>
          <Skeleton className="h-4 w-40" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
        </div>
        <Skeleton className="h-16 rounded-lg" />
        <Skeleton className="h-20 rounded-lg" />
      </CardContent>
    </Card>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

type FilterValue = "pending" | "reviewed";

export default function DoctorReview() {
  const [filter, setFilter] = useState<FilterValue>("pending");
  const isReviewed = filter === "reviewed";

  const { data: records, isLoading } = useRecords(isReviewed);

  return (
    <div className="space-y-6">
      {/* Page header + filter */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Doctor Review Panel
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Review patient health records and provide medical advice
          </p>
        </div>
        <Select
          value={filter}
          onValueChange={(v) => setFilter(v as FilterValue)}
        >
          <SelectTrigger
            className="w-48 border-input bg-background"
            data-ocid="review-filter"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending Review</SelectItem>
            <SelectItem value="reviewed">Reviewed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary badge */}
      {!isLoading && records && records.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {records.length} record{records.length !== 1 ? "s" : ""}
          </span>
          {!isReviewed && (
            <Badge
              variant="outline"
              className="border-amber-200 bg-amber-50 text-amber-700"
            >
              Needs attention
            </Badge>
          )}
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-4" data-ocid="review-loading">
          <RecordSkeleton />
          <RecordSkeleton />
          <RecordSkeleton />
        </div>
      )}

      {/* Records list */}
      {!isLoading && records && records.length > 0 && (
        <div className="space-y-4">
          {records.map((item) => (
            <RecordCard
              key={item.record.id}
              item={item}
              isReviewed={isReviewed}
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && (!records || records.length === 0) && (
        <div
          className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 py-16 text-center"
          data-ocid="review-empty-state"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <svg
              aria-hidden="true"
              className="h-7 w-7 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-foreground">
            {isReviewed ? "No reviewed records" : "No records pending review"}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {isReviewed
              ? "Records marked as reviewed will appear here."
              : "All records have been reviewed. Great work!"}
          </p>
        </div>
      )}
    </div>
  );
}
