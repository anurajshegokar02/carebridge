import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PatientStatus, UserRoleStr } from "../types";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(timestamp: number): string {
  if (!timestamp) return "—";
  const ms = timestamp > 1e12 ? Math.floor(timestamp / 1_000_000) : timestamp;
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(ms));
}

export function formatDateShort(timestamp: number): string {
  if (!timestamp) return "—";
  const ms = timestamp > 1e12 ? Math.floor(timestamp / 1_000_000) : timestamp;
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
  }).format(new Date(ms));
}

export type VitalStatus = "normal" | "warning" | "critical";

export type VitalInfo = {
  label: string;
  status: VitalStatus;
  color: string;
  bgColor: string;
};

export function formatVitalStatus(
  type: "bp" | "glucose" | "hr" | "spo2" | "temp",
  value: number,
): VitalInfo {
  switch (type) {
    case "bp": {
      if (value < 120)
        return {
          label: "Normal",
          status: "normal",
          color: "text-teal-700",
          bgColor: "bg-teal-50 border-teal-200",
        };
      if (value < 140)
        return {
          label: "Elevated",
          status: "warning",
          color: "text-amber-700",
          bgColor: "bg-amber-50 border-amber-200",
        };
      return {
        label: "High",
        status: "critical",
        color: "text-red-700",
        bgColor: "bg-red-50 border-red-200",
      };
    }
    case "glucose": {
      if (value < 100)
        return {
          label: "Normal",
          status: "normal",
          color: "text-teal-700",
          bgColor: "bg-teal-50 border-teal-200",
        };
      if (value < 126)
        return {
          label: "Pre-diabetic",
          status: "warning",
          color: "text-amber-700",
          bgColor: "bg-amber-50 border-amber-200",
        };
      return {
        label: "High",
        status: "critical",
        color: "text-red-700",
        bgColor: "bg-red-50 border-red-200",
      };
    }
    case "hr": {
      if (value >= 60 && value <= 100)
        return {
          label: "Normal",
          status: "normal",
          color: "text-teal-700",
          bgColor: "bg-teal-50 border-teal-200",
        };
      if ((value >= 50 && value < 60) || (value > 100 && value <= 110))
        return {
          label: "Borderline",
          status: "warning",
          color: "text-amber-700",
          bgColor: "bg-amber-50 border-amber-200",
        };
      return {
        label: "Abnormal",
        status: "critical",
        color: "text-red-700",
        bgColor: "bg-red-50 border-red-200",
      };
    }
    case "spo2": {
      if (value >= 95)
        return {
          label: "Normal",
          status: "normal",
          color: "text-teal-700",
          bgColor: "bg-teal-50 border-teal-200",
        };
      if (value >= 90)
        return {
          label: "Low",
          status: "warning",
          color: "text-amber-700",
          bgColor: "bg-amber-50 border-amber-200",
        };
      return {
        label: "Critical",
        status: "critical",
        color: "text-red-700",
        bgColor: "bg-red-50 border-red-200",
      };
    }
    case "temp": {
      if (value <= 99)
        return {
          label: "Normal",
          status: "normal",
          color: "text-teal-700",
          bgColor: "bg-teal-50 border-teal-200",
        };
      if (value <= 100.4)
        return {
          label: "Low Fever",
          status: "warning",
          color: "text-amber-700",
          bgColor: "bg-amber-50 border-amber-200",
        };
      return {
        label: "Fever",
        status: "critical",
        color: "text-red-700",
        bgColor: "bg-red-50 border-red-200",
      };
    }
  }
}

export function getStatusColor(status: PatientStatus | string): {
  bg: string;
  text: string;
  dot: string;
} {
  switch (status) {
    case "stable":
      return { bg: "bg-teal-50", text: "text-teal-700", dot: "bg-teal-500" };
    case "review":
      return { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" };
    case "alert":
      return { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" };
    default:
      return {
        bg: "bg-muted",
        text: "text-muted-foreground",
        dot: "bg-muted-foreground",
      };
  }
}

export function getRoleBadgeColor(role: UserRoleStr | string): string {
  switch (role) {
    case "admin":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "doctor":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "volunteer":
      return "bg-teal-100 text-teal-700 border-teal-200";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

export function toNumber(val: bigint | number | undefined | null): number {
  if (val === undefined || val === null) return 0;
  if (typeof val === "bigint") return Number(val);
  return val;
}
