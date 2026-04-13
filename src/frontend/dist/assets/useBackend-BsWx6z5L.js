var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { q as Subscribable, s as shallowEqualObjects, t as hashKey, w as getDefaultState, x as notifyManager, y as useQueryClient, r as reactExports, z as noop, D as shouldThrowError, E as useActor, F as useQuery, G as toNumber, I as createActor } from "./index-OpIi-ir7.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
function mapUser(u) {
  return {
    id: toNumber(u.id),
    principal: u.principal.toString(),
    name: u.name,
    email: u.email,
    role: u.role,
    createdAt: toNumber(u.createdAt)
  };
}
function mapPatient(p) {
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
    status: p.status,
    createdAt: toNumber(p.createdAt)
  };
}
function mapRecord(r) {
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
    createdAt: toNumber(r.createdAt)
  };
}
function mapAlert(a) {
  return {
    id: toNumber(a.id),
    patientId: toNumber(a.patientId),
    recordId: toNumber(a.recordId),
    alertType: a.alertType,
    message: a.message,
    resolved: a.resolved,
    createdAt: toNumber(a.createdAt)
  };
}
function useCurrentUser() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      if (!actor) return null;
      const u = await actor.getCurrentUser();
      return u ? mapUser(u) : null;
    },
    enabled: !!actor && !actorFetching,
    retry: false,
    staleTime: 3e4
  });
  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched
  };
}
function useStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
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
          alertPatients: 0
        };
      const s = await actor.getStats();
      return {
        totalPatients: toNumber(s.totalPatients),
        totalRecords: toNumber(s.totalRecords),
        pendingReview: toNumber(s.pendingReview),
        activeAlerts: toNumber(s.activeAlerts),
        activeVolunteers: toNumber(s.activeVolunteers),
        recordsToday: toNumber(s.recordsToday),
        alertPatients: toNumber(s.alertPatients)
      };
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3e4
  });
}
function usePatients() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      if (!actor) return [];
      const list = await actor.getPatients();
      return list.map((item) => ({
        patient: mapPatient(item.patient),
        volunteerName: item.volunteerName,
        lastCheck: item.lastCheck ?? void 0
      }));
    },
    enabled: !!actor && !isFetching
  });
}
function usePatient(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["patient", id],
    queryFn: async () => {
      if (!actor || id === null) return null;
      const res = await actor.getPatient(BigInt(id));
      if (!res) return null;
      return {
        patient: mapPatient(res.patient),
        volunteerName: res.volunteerName,
        records: res.records.map(mapRecord)
      };
    },
    enabled: !!actor && !isFetching && id !== null
  });
}
function useCreatePatient() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
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
        data.notes
      );
      return mapPatient(p);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["patients"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
    }
  });
}
function useRecords(reviewed, patientId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["records", reviewed, null],
    queryFn: async () => {
      if (!actor) return [];
      const list = await actor.getRecords(
        reviewed,
        null
      );
      return list.map((item) => ({
        record: mapRecord(item.record),
        patientName: item.patientName,
        patientCode: item.patientCode,
        village: item.village
      }));
    },
    enabled: !!actor && !isFetching
  });
}
function useCreateRecord() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
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
        data.checkDate
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["records"] });
      qc.invalidateQueries({ queryKey: ["alerts"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
      qc.invalidateQueries({ queryKey: ["patients"] });
    }
  });
}
function useReviewRecord() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      recordId,
      advice
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.reviewRecord(BigInt(recordId), advice);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["records"] });
      qc.invalidateQueries({ queryKey: ["alerts"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
    }
  });
}
function useAlerts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["alerts"],
    queryFn: async () => {
      if (!actor) return [];
      const list = await actor.getAlerts();
      return list.map((item) => ({
        alert: mapAlert(item.alert),
        patientName: item.patientName,
        patientCode: item.patientCode,
        village: item.village
      }));
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 2e4
  });
}
function useResolveAlert() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (alertId) => {
      if (!actor) throw new Error("Not connected");
      return actor.resolveAlert(BigInt(alertId));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["alerts"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
    }
  });
}
function useUsers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      if (!actor) return [];
      const list = await actor.getUsers();
      return list.map(mapUser);
    },
    enabled: !!actor && !isFetching
  });
}
function useVolunteers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["volunteers"],
    queryFn: async () => {
      if (!actor) return [];
      const list = await actor.getVolunteers();
      return list.map(mapUser);
    },
    enabled: !!actor && !isFetching
  });
}
function useCreateUser() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Not connected");
      const roleEnum = data.role;
      return actor.createUser(data.name, data.email, roleEnum);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["volunteers"] });
    }
  });
}
function useMyRecord(patientId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myRecord", patientId],
    queryFn: async () => {
      if (!actor || patientId === null) return null;
      const res = await actor.getPatient(BigInt(patientId));
      if (!res) return null;
      return {
        patient: mapPatient(res.patient),
        records: res.records.map(mapRecord)
      };
    },
    enabled: !!actor && !isFetching && patientId !== null,
    refetchInterval: 6e4
  });
}
function useMyAlerts(patientId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myAlerts", patientId],
    queryFn: async () => {
      if (!actor || patientId === null) return [];
      const list = await actor.getAlerts();
      return list.filter((item) => toNumber(item.alert.patientId) === patientId).map((item) => mapAlert(item.alert)).filter((a) => !a.resolved);
    },
    enabled: !!actor && !isFetching && patientId !== null,
    refetchInterval: 3e4
  });
}
export {
  useAlerts as a,
  useVolunteers as b,
  useCreatePatient as c,
  usePatients as d,
  usePatient as e,
  useCurrentUser as f,
  useCreateRecord as g,
  useRecords as h,
  useReviewRecord as i,
  useResolveAlert as j,
  useUsers as k,
  useCreateUser as l,
  useMyRecord as m,
  useMyAlerts as n,
  useStats as u
};
