import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  Alert as RawAlert,
  HealthRecord as RawHealthRecord,
  Patient as RawPatient,
  User as RawUser,
  UserRole,
} from "../backend.d";
import { toNumber } from "../lib/utils";
import type {
  Alert,
  AlertWithMeta,
  HealthRecord,
  MyRecord,
  Patient,
  PatientDetail,
  PatientWithMeta,
  RecordWithMeta,
  Stats,
  User,
} from "../types";

// ── helpers ────────────────────────────────────────────────────────────────────

function mapUser(u: RawUser): User {
  return {
    id: toNumber(u.id),
    principal: u.principal.toString(),
    name: u.name,
    email: u.email,
    role: u.role as unknown as User["role"],
    createdAt: toNumber(u.createdAt),
  };
}

function mapPatient(p: RawPatient): Patient {
  return {
    id: toNumber(p.id),
    patientCode: p.patientCode,
    name: p.name,
    age: toNumber(p.age),
    gender: p.gender,
    phone: p.phone,
    village: p.village,
    address: p.address,
    condition: p.condition,
    volunteerId: toNumber(p.volunteerId),
    notes: p.notes,
    status: p.status as Patient["status"],
    createdAt: toNumber(p.createdAt),
  };
}

function mapRecord(r: RawHealthRecord): HealthRecord {
  return {
    id: toNumber(r.id),
    patientId: toNumber(r.patientId),
    volunteerId: toNumber(r.volunteerId),
    visitType: r.visitType,
    bpSystolic: toNumber(r.bpSystolic),
    bpDiastolic: toNumber(r.bpDiastolic),
    glucose: toNumber(r.glucose),
    heartRate: toNumber(r.heartRate),
    spo2: toNumber(r.spo2),
    temperature: r.temperature,
    symptoms: r.symptoms,
    doctorAdvice: r.doctorAdvice,
    reviewed: r.reviewed,
    reviewedBy: toNumber(r.reviewedBy),
    checkDate: r.checkDate,
    createdAt: toNumber(r.createdAt),
  };
}

function mapAlert(a: RawAlert): Alert {
  return {
    id: toNumber(a.id),
    patientId: toNumber(a.patientId),
    recordId: toNumber(a.recordId),
    alertType: a.alertType,
    message: a.message,
    resolved: a.resolved,
    createdAt: toNumber(a.createdAt),
  };
}

// ── useCurrentUser ─────────────────────────────────────────────────────────────

export function useCurrentUser() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const query = useQuery<User | null>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      if (!actor) return null;
      const u = await actor.getCurrentUser();
      return u ? mapUser(u) : null;
    },
    enabled: !!actor && !actorFetching,
    retry: false,
    staleTime: 30_000,
  });
  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

// ── Stats ──────────────────────────────────────────────────────────────────────

export function useStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: async () => {
      if (!actor)
        return {
          totalPatients: 0,
          totalRecords: 0,
          pendingReview: 0,
          activeAlerts: 0,
          activeVolunteers: 0,
          recordsToday: 0,
          alertPatients: 0,
        };
      const s = await actor.getStats();
      return {
        totalPatients: toNumber(s.totalPatients),
        totalRecords: toNumber(s.totalRecords),
        pendingReview: toNumber(s.pendingReview),
        activeAlerts: toNumber(s.activeAlerts),
        activeVolunteers: toNumber(s.activeVolunteers),
        recordsToday: toNumber(s.recordsToday),
        alertPatients: toNumber(s.alertPatients),
      };
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
}

// ── Patients ───────────────────────────────────────────────────────────────────

export function usePatients() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<PatientWithMeta[]>({
    queryKey: ["patients"],
    queryFn: async () => {
      if (!actor) return [];
      const list = await actor.getPatients();
      return list.map((item) => ({
        patient: mapPatient(item.patient),
        volunteerName: item.volunteerName,
        lastCheck: item.lastCheck ?? undefined,
      }));
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePatient(id: number | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<PatientDetail | null>({
    queryKey: ["patient", id],
    queryFn: async () => {
      if (!actor || id === null) return null;
      const res = await actor.getPatient(BigInt(id));
      if (!res) return null;
      return {
        patient: mapPatient(res.patient),
        volunteerName: res.volunteerName,
        records: res.records.map(mapRecord),
      };
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useCreatePatient() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      age: number;
      gender: string;
      phone: string;
      village: string;
      address: string;
      condition: string;
      volunteerId: number;
      notes: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const p = await actor.createPatient(
        data.name,
        BigInt(data.age),
        data.gender,
        data.phone,
        data.village,
        data.address,
        data.condition,
        BigInt(data.volunteerId),
        data.notes,
      );
      return mapPatient(p);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["patients"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

export function useUpdatePatient() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: number;
      condition: string;
      status: string;
      notes: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updatePatient(
        BigInt(data.id),
        data.condition,
        data.status,
        data.notes,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["patients"] });
    },
  });
}

// ── Health Records ─────────────────────────────────────────────────────────────

export function useRecords(
  reviewed: boolean | null,
  patientId?: number | null,
) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<RecordWithMeta[]>({
    queryKey: ["records", reviewed, patientId ?? null],
    queryFn: async () => {
      if (!actor) return [];
      const list = await actor.getRecords(
        reviewed,
        patientId != null ? BigInt(patientId) : null,
      );
      return list.map((item) => ({
        record: mapRecord(item.record),
        patientName: item.patientName,
        patientCode: item.patientCode,
        village: item.village,
      }));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateRecord() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      patientId: number;
      visitType: string;
      bpSystolic: number;
      bpDiastolic: number;
      glucose: number;
      heartRate: number;
      spo2: number;
      temperature: number;
      symptoms: string;
      checkDate: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createRecord(
        BigInt(data.patientId),
        data.visitType,
        BigInt(data.bpSystolic),
        BigInt(data.bpDiastolic),
        BigInt(data.glucose),
        BigInt(data.heartRate),
        BigInt(data.spo2),
        data.temperature,
        data.symptoms,
        data.checkDate,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["records"] });
      qc.invalidateQueries({ queryKey: ["alerts"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
      qc.invalidateQueries({ queryKey: ["patients"] });
    },
  });
}

export function useReviewRecord() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      recordId,
      advice,
    }: { recordId: number; advice: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.reviewRecord(BigInt(recordId), advice);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["records"] });
      qc.invalidateQueries({ queryKey: ["alerts"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

// ── Alerts ─────────────────────────────────────────────────────────────────────

export function useAlerts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<AlertWithMeta[]>({
    queryKey: ["alerts"],
    queryFn: async () => {
      if (!actor) return [];
      const list = await actor.getAlerts();
      return list.map((item) => ({
        alert: mapAlert(item.alert),
        patientName: item.patientName,
        patientCode: item.patientCode,
        village: item.village,
      }));
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 20_000,
  });
}

export function useResolveAlert() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (alertId: number) => {
      if (!actor) throw new Error("Not connected");
      return actor.resolveAlert(BigInt(alertId));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["alerts"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

// ── Users ──────────────────────────────────────────────────────────────────────

export function useUsers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      if (!actor) return [];
      const list = await actor.getUsers();
      return list.map(mapUser);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useVolunteers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<User[]>({
    queryKey: ["volunteers"],
    queryFn: async () => {
      if (!actor) return [];
      const list = await actor.getVolunteers();
      return list.map(mapUser);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateUser() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; email: string; role: string }) => {
      if (!actor) throw new Error("Not connected");
      const roleEnum = data.role as unknown as UserRole;
      return actor.createUser(data.name, data.email, roleEnum);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["volunteers"] });
    },
  });
}

export function useSeedDemoData() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.seedDemoData();
    },
    onSuccess: () => {
      qc.invalidateQueries();
    },
  });
}

// ── Patient self-view (patient role) ──────────────────────────────────────────

export function useMyRecord(patientId: number | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<MyRecord | null>({
    queryKey: ["myRecord", patientId],
    queryFn: async () => {
      if (!actor || patientId === null) return null;
      // Use getPatient to fetch the patient's own record by linked patientId
      const res = await actor.getPatient(BigInt(patientId));
      if (!res) return null;
      return {
        patient: mapPatient(res.patient),
        records: res.records.map(mapRecord),
      };
    },
    enabled: !!actor && !isFetching && patientId !== null,
    refetchInterval: 60_000,
  });
}

export function useMyAlerts(patientId: number | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Alert[]>({
    queryKey: ["myAlerts", patientId],
    queryFn: async () => {
      if (!actor || patientId === null) return [];
      // Filter alerts for this patient from the global alerts list
      const list = await actor.getAlerts();
      return list
        .filter((item) => toNumber(item.alert.patientId) === patientId)
        .map((item) => mapAlert(item.alert))
        .filter((a) => !a.resolved);
    },
    enabled: !!actor && !isFetching && patientId !== null,
    refetchInterval: 30_000,
  });
}
