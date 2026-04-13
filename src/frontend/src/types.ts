export { UserRole } from "./backend.d";

// Re-export backend primitive types with JS-friendly bigint->number conversions
export type User = {
  id: number;
  principal: string;
  name: string;
  email: string;
  role: UserRoleStr;
  createdAt: number;
  patientId?: number;
};

export type UserRoleStr =
  | "admin"
  | "doctor"
  | "volunteer"
  | "patient"
  | "visitor";

export type Patient = {
  id: number;
  patientCode: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  village: string;
  address: string;
  condition: string;
  volunteerId: number;
  notes: string;
  status: PatientStatus;
  createdAt: number;
};

export type PatientStatus = "stable" | "alert" | "review";

export type HealthRecord = {
  id: number;
  patientId: number;
  volunteerId: number;
  visitType: string;
  bpSystolic: number;
  bpDiastolic: number;
  glucose: number;
  heartRate: number;
  spo2: number;
  temperature: number;
  symptoms: string;
  doctorAdvice: string;
  reviewed: boolean;
  reviewedBy: number;
  checkDate: string;
  createdAt: number;
};

export type Alert = {
  id: number;
  patientId: number;
  recordId: number;
  alertType: string;
  message: string;
  resolved: boolean;
  createdAt: number;
};

// Enriched types returned by backend joined queries
export type PatientWithMeta = {
  patient: Patient;
  volunteerName: string;
  lastCheck?: string;
};

export type PatientDetail = {
  patient: Patient;
  volunteerName: string;
  records: HealthRecord[];
};

export type RecordWithMeta = {
  record: HealthRecord;
  patientName: string;
  patientCode: string;
  village: string;
};

export type AlertWithMeta = {
  alert: Alert;
  patientName: string;
  patientCode: string;
  village: string;
};

export type Stats = {
  totalPatients: number;
  totalRecords: number;
  pendingReview: number;
  activeAlerts: number;
  activeVolunteers: number;
  recordsToday: number;
  alertPatients: number;
};

export type MyRecord = {
  patient: Patient;
  records: HealthRecord[];
};

export type PageName =
  | "dashboard"
  | "register"
  | "patients"
  | "vitals"
  | "review"
  | "alerts"
  | "users"
  | "my-records"
  | "doctor-panel"
  | "admin-panel"
  | "visitor-panel";
