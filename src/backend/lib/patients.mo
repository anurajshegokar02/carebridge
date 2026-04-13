import Types "../types/patients";
import UserTypes "../types/users";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public type Patient = Types.Patient;
  public type HealthRecord = Types.HealthRecord;
  public type Alert = Types.Alert;
  public type User = UserTypes.User;

  public type PatientWithMeta = {
    patient : Patient;
    lastCheck : ?Text;
    volunteerName : Text;
  };

  public type PatientDetail = {
    patient : Patient;
    records : [HealthRecord];
    volunteerName : Text;
  };

  public type RecordWithMeta = {
    record : HealthRecord;
    patientName : Text;
    patientCode : Text;
    village : Text;
  };

  public type AlertWithMeta = {
    alert : Alert;
    patientName : Text;
    patientCode : Text;
    village : Text;
  };

  public type CreateRecordResult = {
    record : HealthRecord;
    alerts : [Alert];
  };

  public func generatePatientCode(id : Nat) : Text {
    let s = id.toText();
    let padded = if (s.size() >= 3) { s } else if (s.size() == 2) { "0" # s } else { "00" # s };
    "P" # padded;
  };

  public func getAll(
    patients : List.List<Patient>,
    records : List.List<HealthRecord>,
    users : List.List<User>,
  ) : [PatientWithMeta] {
    patients.map<Patient, PatientWithMeta>(func(p) {
      let patientRecords = records.filter(func(r) { r.patientId == p.id });
      let lastCheck : ?Text = switch (patientRecords.last()) {
        case (?r) { ?r.checkDate };
        case null { null };
      };
      let volunteerName = switch (users.find(func(u) { u.id == p.volunteerId })) {
        case (?u) { u.name };
        case null { "Unknown" };
      };
      { patient = p; lastCheck; volunteerName };
    }).toArray();
  };

  public func getById(
    patients : List.List<Patient>,
    records : List.List<HealthRecord>,
    users : List.List<User>,
    id : Nat,
  ) : ?PatientDetail {
    switch (patients.find(func(p) { p.id == id })) {
      case null { null };
      case (?p) {
        let patientRecords = records.filter(func(r) { r.patientId == p.id }).toArray();
        let volunteerName = switch (users.find(func(u) { u.id == p.volunteerId })) {
          case (?u) { u.name };
          case null { "Unknown" };
        };
        ?{ patient = p; records = patientRecords; volunteerName };
      };
    };
  };

  // Find the patient linked to a given user account
  public func getByUserId(
    patients : List.List<Patient>,
    users : List.List<User>,
    userId : Nat,
  ) : ?Patient {
    switch (users.find(func(u) { u.id == userId })) {
      case null { null };
      case (?u) {
        switch (u.patientId) {
          case null { null };
          case (?pid) { patients.find(func(p) { p.id == pid }) };
        };
      };
    };
  };

  public func create(
    patients : List.List<Patient>,
    nextId : Nat,
    name : Text,
    age : Nat,
    gender : Text,
    phone : Text,
    village : Text,
    address : Text,
    condition : Text,
    volunteerId : Nat,
    notes : Text,
  ) : Patient {
    let patient : Patient = {
      id = nextId;
      patientCode = generatePatientCode(nextId);
      name = name;
      age = age;
      gender = gender;
      phone = phone;
      village = village;
      address = address;
      condition = condition;
      volunteerId = volunteerId;
      notes = notes;
      status = "stable";
      createdAt = Time.now();
    };
    patients.add(patient);
    patient;
  };

  public func update(
    patients : List.List<Patient>,
    id : Nat,
    condition : Text,
    status : Text,
    notes : Text,
  ) : ?Patient {
    var updated : ?Patient = null;
    patients.mapInPlace(func(p) {
      if (p.id == id) {
        let newPatient = { p with condition = condition; status = status; notes = notes };
        updated := ?newPatient;
        newPatient;
      } else { p };
    });
    updated;
  };

  public func getRecords(
    patients : List.List<Patient>,
    records : List.List<HealthRecord>,
    reviewed : ?Bool,
    patientId : ?Nat,
  ) : [RecordWithMeta] {
    let filtered = records.filter(func(r) {
      let reviewedMatch = switch (reviewed) {
        case (?rv) { r.reviewed == rv };
        case null { true };
      };
      let patientMatch = switch (patientId) {
        case (?pid) { r.patientId == pid };
        case null { true };
      };
      reviewedMatch and patientMatch;
    });
    filtered.map<HealthRecord, RecordWithMeta>(func(r) {
      let (patientName, patientCode, village) = switch (patients.find(func(p) { p.id == r.patientId })) {
        case (?p) { (p.name, p.patientCode, p.village) };
        case null { ("Unknown", "P000", "Unknown") };
      };
      { record = r; patientName; patientCode; village };
    }).toArray();
  };

  public func createRecord(
    patients : List.List<Patient>,
    records : List.List<HealthRecord>,
    alerts : List.List<Alert>,
    nextRecordId : Nat,
    nextAlertId : Nat,
    patientId : Nat,
    volunteerId : Nat,
    visitType : Text,
    bpSystolic : Nat,
    bpDiastolic : Nat,
    glucose : Nat,
    heartRate : Nat,
    spo2 : Nat,
    temperature : Float,
    symptoms : Text,
    checkDate : Text,
  ) : CreateRecordResult {
    let now = Time.now();
    let record : HealthRecord = {
      id = nextRecordId;
      patientId = patientId;
      volunteerId = volunteerId;
      visitType = visitType;
      bpSystolic = bpSystolic;
      bpDiastolic = bpDiastolic;
      glucose = glucose;
      heartRate = heartRate;
      spo2 = spo2;
      temperature = temperature;
      symptoms = symptoms;
      doctorAdvice = "";
      reviewed = false;
      reviewedBy = 0;
      checkDate = checkDate;
      createdAt = now;
    };
    records.add(record);

    // Auto-generate alerts
    var alertIdCounter = nextAlertId;
    let newAlerts = List.empty<Alert>();

    let addAlert = func(alertType : Text, message : Text) {
      let a : Alert = {
        id = alertIdCounter;
        patientId = patientId;
        recordId = nextRecordId;
        alertType = alertType;
        message = message;
        resolved = false;
        createdAt = now;
      };
      alerts.add(a);
      newAlerts.add(a);
      alertIdCounter += 1;
    };

    if (bpSystolic >= 140) {
      addAlert("High Blood Pressure", "Blood pressure reading is critically high: " # bpSystolic.toText() # "/" # bpDiastolic.toText() # " mmHg");
    };
    if (glucose >= 200) {
      addAlert("High Glucose", "Blood glucose level is critically high: " # glucose.toText() # " mg/dL");
    };
    if (spo2 < 94) {
      addAlert("Low SpO2", "Blood oxygen saturation is low: " # spo2.toText() # "%");
    };
    if (heartRate < 50 or heartRate > 110) {
      addAlert("Abnormal Heart Rate", "Heart rate is abnormal: " # heartRate.toText() # " bpm");
    };

    // Update patient status based on alerts
    let hasAlerts = not newAlerts.isEmpty();
    let newStatus = if (hasAlerts) { "alert" } else { "review" };
    patients.mapInPlace(func(p) {
      if (p.id == patientId) { { p with status = newStatus } } else { p };
    });

    { record = record; alerts = newAlerts.toArray() };
  };

  public func reviewRecord(
    records : List.List<HealthRecord>,
    recordId : Nat,
    reviewerId : Nat,
    advice : Text,
  ) : ?HealthRecord {
    var updated : ?HealthRecord = null;
    records.mapInPlace(func(r) {
      if (r.id == recordId) {
        let newRecord = { r with reviewed = true; reviewedBy = reviewerId; doctorAdvice = advice };
        updated := ?newRecord;
        newRecord;
      } else { r };
    });
    updated;
  };

  public func getAlerts(
    patients : List.List<Patient>,
    alerts : List.List<Alert>,
  ) : [AlertWithMeta] {
    alerts.filter(func(a) { not a.resolved }).map<Alert, AlertWithMeta>(func(a) {
      let (patientName, patientCode, village) = switch (patients.find(func(p) { p.id == a.patientId })) {
        case (?p) { (p.name, p.patientCode, p.village) };
        case null { ("Unknown", "P000", "Unknown") };
      };
      { alert = a; patientName; patientCode; village };
    }).toArray();
  };

  // Get all alerts (including resolved) for a specific patient, with metadata
  public func getAlertsByPatient(
    patients : List.List<Patient>,
    alerts : List.List<Alert>,
    patientId : Nat,
  ) : [AlertWithMeta] {
    alerts.filter(func(a) { a.patientId == patientId and not a.resolved }).map<Alert, AlertWithMeta>(func(a) {
      let (patientName, patientCode, village) = switch (patients.find(func(p) { p.id == a.patientId })) {
        case (?p) { (p.name, p.patientCode, p.village) };
        case null { ("Unknown", "P000", "Unknown") };
      };
      { alert = a; patientName; patientCode; village };
    }).toArray();
  };

  public func resolveAlert(alerts : List.List<Alert>, alertId : Nat) : ?Alert {
    var updated : ?Alert = null;
    alerts.mapInPlace(func(a) {
      if (a.id == alertId) {
        let newAlert = { a with resolved = true };
        updated := ?newAlert;
        newAlert;
      } else { a };
    });
    updated;
  };

  public func resolveAlertsByRecord(alerts : List.List<Alert>, recordId : Nat) : () {
    alerts.mapInPlace(func(a) {
      if (a.recordId == recordId) { { a with resolved = true } } else { a };
    });
  };

  public func countPendingReview(records : List.List<HealthRecord>) : Nat {
    records.filter(func(r) { not r.reviewed }).size();
  };

  public func countActiveAlerts(alerts : List.List<Alert>) : Nat {
    alerts.filter(func(a) { not a.resolved }).size();
  };

  public func countRecordsToday(records : List.List<HealthRecord>) : Nat {
    // Time.now() returns nanoseconds; 1 day = 86_400_000_000_000 ns
    let now = Time.now();
    let oneDayNs : Int = 86_400_000_000_000;
    let startOfToday = now - (now % oneDayNs);
    records.filter(func(r) { r.createdAt >= startOfToday and r.createdAt < startOfToday + oneDayNs }).size();
  };

  public func countAlertPatients(alerts : List.List<Alert>) : Nat {
    // Count distinct patientIds with unresolved alerts
    let activeAlerts = alerts.filter(func(a) { not a.resolved });
    var seen = List.empty<Nat>();
    var count = 0;
    activeAlerts.forEach(func(a) {
      if (seen.find(func(id) { id == a.patientId }) == null) {
        seen.add(a.patientId);
        count += 1;
      };
    });
    count;
  };
};
