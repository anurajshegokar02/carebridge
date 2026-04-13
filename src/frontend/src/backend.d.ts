import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = bigint;
export type Timestamp = bigint;
export interface User {
    id: UserId;
    principal: Principal;
    patientId?: bigint;
    name: string;
    createdAt: Timestamp;
    role: UserRole;
    email: string;
}
export interface HealthRecord {
    id: bigint;
    bpSystolic: bigint;
    patientId: bigint;
    temperature: number;
    createdAt: Timestamp;
    spo2: bigint;
    visitType: string;
    reviewedBy: UserId;
    glucose: bigint;
    volunteerId: UserId;
    checkDate: string;
    heartRate: bigint;
    doctorAdvice: string;
    symptoms: string;
    bpDiastolic: bigint;
    reviewed: boolean;
}
export interface Alert {
    id: bigint;
    resolved: boolean;
    alertType: string;
    patientId: bigint;
    createdAt: Timestamp;
    message: string;
    recordId: bigint;
}
export interface Patient {
    id: bigint;
    age: bigint;
    status: string;
    name: string;
    createdAt: Timestamp;
    volunteerId: UserId;
    address: string;
    village: string;
    gender: string;
    notes: string;
    patientCode: string;
    phone: string;
    condition: string;
}
export enum UserRole {
    patient = "patient",
    admin = "admin",
    doctor = "doctor",
    volunteer = "volunteer"
}
export interface backendInterface {
    createPatient(name: string, age: bigint, gender: string, phone: string, village: string, address: string, condition: string, volunteerId: bigint, notes: string): Promise<Patient>;
    createRecord(patientId: bigint, visitType: string, bpSystolic: bigint, bpDiastolic: bigint, glucose: bigint, heartRate: bigint, spo2: bigint, temperature: number, symptoms: string, checkDate: string): Promise<{
        alerts: Array<Alert>;
        record: HealthRecord;
    }>;
    createUser(name: string, email: string, role: UserRole): Promise<User>;
    getAlerts(): Promise<Array<{
        alert: Alert;
        village: string;
        patientCode: string;
        patientName: string;
    }>>;
    getCurrentUser(): Promise<User | null>;
    getMyAlerts(): Promise<Array<{
        alert: Alert;
        village: string;
        patientCode: string;
        patientName: string;
    }>>;
    getMyRecord(): Promise<{
        patient: Patient;
        volunteerName: string;
        records: Array<HealthRecord>;
    } | null>;
    getPatient(id: bigint): Promise<{
        patient: Patient;
        volunteerName: string;
        records: Array<HealthRecord>;
    } | null>;
    getPatients(): Promise<Array<{
        patient: Patient;
        volunteerName: string;
        lastCheck?: string;
    }>>;
    getRecords(reviewed: boolean | null, patientId: bigint | null): Promise<Array<{
        village: string;
        patientCode: string;
        patientName: string;
        record: HealthRecord;
    }>>;
    getStats(): Promise<{
        pendingReview: bigint;
        totalPatients: bigint;
        activeVolunteers: bigint;
        recordsToday: bigint;
        activeAlerts: bigint;
        totalRecords: bigint;
        alertPatients: bigint;
    }>;
    getUsers(): Promise<Array<User>>;
    getVolunteers(): Promise<Array<User>>;
    linkPatientAccount(userId: bigint, patientId: bigint): Promise<User | null>;
    registerUser(name: string, email: string, role: UserRole): Promise<User>;
    resolveAlert(alertId: bigint): Promise<Alert | null>;
    reviewRecord(recordId: bigint, advice: string): Promise<HealthRecord | null>;
    seedDemoData(): Promise<string>;
    updatePatient(id: bigint, condition: string, status: string, notes: string): Promise<Patient | null>;
    updateUserRole(userId: bigint, role: UserRole): Promise<User | null>;
}
