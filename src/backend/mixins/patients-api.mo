import PTypes "../types/patients";
import UTypes "../types/users";
import Common "../types/common";
import PatientLib "../lib/patients";
import UserLib "../lib/users";
import List "mo:core/List";

mixin (
  patients : List.List<PTypes.Patient>,
  records : List.List<PTypes.HealthRecord>,
  alerts : List.List<PTypes.Alert>,
  users : List.List<UTypes.User>,
  counters : Common.Counters,
) {
  public shared query ({ caller }) func getPatients() : async [{
    patient : PTypes.Patient;
    lastCheck : ?Text;
    volunteerName : Text;
  }] {
    PatientLib.getAll(patients, records, users);
  };

  public shared query ({ caller }) func getPatient(id : Nat) : async ?{
    patient : PTypes.Patient;
    records : [PTypes.HealthRecord];
    volunteerName : Text;
  } {
    PatientLib.getById(patients, records, users, id);
  };

  public shared ({ caller }) func createPatient(
    name : Text,
    age : Nat,
    gender : Text,
    phone : Text,
    village : Text,
    address : Text,
    condition : Text,
    volunteerId : Nat,
    notes : Text,
  ) : async PTypes.Patient {
    let patient = PatientLib.create(patients, counters.nextPatientId, name, age, gender, phone, village, address, condition, volunteerId, notes);
    counters.nextPatientId += 1;
    patient;
  };

  public shared ({ caller }) func updatePatient(
    id : Nat,
    condition : Text,
    status : Text,
    notes : Text,
  ) : async ?PTypes.Patient {
    PatientLib.update(patients, id, condition, status, notes);
  };

  public shared query ({ caller }) func getRecords(
    reviewed : ?Bool,
    patientId : ?Nat,
  ) : async [{
    record : PTypes.HealthRecord;
    patientName : Text;
    patientCode : Text;
    village : Text;
  }] {
    PatientLib.getRecords(patients, records, reviewed, patientId);
  };

  public shared ({ caller }) func createRecord(
    patientId : Nat,
    visitType : Text,
    bpSystolic : Nat,
    bpDiastolic : Nat,
    glucose : Nat,
    heartRate : Nat,
    spo2 : Nat,
    temperature : Float,
    symptoms : Text,
    checkDate : Text,
  ) : async { record : PTypes.HealthRecord; alerts : [PTypes.Alert] } {
    // Resolve caller's user id for volunteerId
    let volunteerId = switch (UserLib.getByPrincipal(users, caller)) {
      case (?u) { u.id };
      case null { 0 };
    };
    let result = PatientLib.createRecord(
      patients, records, alerts,
      counters.nextRecordId, counters.nextAlertId,
      patientId, volunteerId, visitType,
      bpSystolic, bpDiastolic, glucose, heartRate, spo2, temperature,
      symptoms, checkDate,
    );
    counters.nextRecordId += 1;
    counters.nextAlertId += result.alerts.size();
    result;
  };

  public shared ({ caller }) func reviewRecord(
    recordId : Nat,
    advice : Text,
  ) : async ?PTypes.HealthRecord {
    let reviewerId = switch (UserLib.getByPrincipal(users, caller)) {
      case (?u) { u.id };
      case null { 0 };
    };
    let updated = PatientLib.reviewRecord(records, recordId, reviewerId, advice);
    // Resolve alerts for this record
    PatientLib.resolveAlertsByRecord(alerts, recordId);
    updated;
  };

  public shared query ({ caller }) func getAlerts() : async [{
    alert : PTypes.Alert;
    patientName : Text;
    patientCode : Text;
    village : Text;
  }] {
    PatientLib.getAlerts(patients, alerts);
  };

  public shared ({ caller }) func resolveAlert(alertId : Nat) : async ?PTypes.Alert {
    PatientLib.resolveAlert(alerts, alertId);
  };
};
