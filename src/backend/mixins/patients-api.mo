import PTypes "../types/patients";
import UTypes "../types/users";
import Common "../types/common";
import PatientLib "../lib/patients";
import UserLib "../lib/users";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

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
    let callerUser = UserLib.getByPrincipal(users, caller);
    switch (callerUser) {
      case null { Runtime.trap("Unauthorized: not a registered user") };
      case (?u) {
        if (u.role == #patient) {
          Runtime.trap("Unauthorized: patients cannot list all patients");
        };
        PatientLib.getAll(patients, records, users);
      };
    };
  };

  public shared query ({ caller }) func getPatient(id : Nat) : async ?{
    patient : PTypes.Patient;
    records : [PTypes.HealthRecord];
    volunteerName : Text;
  } {
    let callerUser = UserLib.getByPrincipal(users, caller);
    switch (callerUser) {
      case null { Runtime.trap("Unauthorized: not a registered user") };
      case (?u) {
        if (u.role == #patient) {
          // Patients may only fetch their own record
          switch (u.patientId) {
            case null { Runtime.trap("Unauthorized: patient account not linked to a record") };
            case (?pid) {
              if (pid != id) {
                Runtime.trap("Unauthorized: patients can only view their own record");
              };
            };
          };
        };
        PatientLib.getById(patients, records, users, id);
      };
    };
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
    let callerUser = UserLib.getByPrincipal(users, caller);
    switch (callerUser) {
      case null { Runtime.trap("Unauthorized: not a registered user") };
      case (?u) {
        if (u.role == #patient or u.role == #doctor) {
          Runtime.trap("Unauthorized: only admins and volunteers can register patients");
        };
        let patient = PatientLib.create(patients, counters.nextPatientId, name, age, gender, phone, village, address, condition, volunteerId, notes);
        counters.nextPatientId += 1;
        patient;
      };
    };
  };

  public shared ({ caller }) func updatePatient(
    id : Nat,
    condition : Text,
    status : Text,
    notes : Text,
  ) : async ?PTypes.Patient {
    let callerUser = UserLib.getByPrincipal(users, caller);
    switch (callerUser) {
      case null { Runtime.trap("Unauthorized: not a registered user") };
      case (?u) {
        if (u.role == #patient) {
          Runtime.trap("Unauthorized: patients cannot update patient records");
        };
        PatientLib.update(patients, id, condition, status, notes);
      };
    };
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
    let callerUser = UserLib.getByPrincipal(users, caller);
    switch (callerUser) {
      case null { Runtime.trap("Unauthorized: not a registered user") };
      case (?u) {
        if (u.role == #patient) {
          Runtime.trap("Unauthorized: use getMyRecord to access your health records");
        };
        PatientLib.getRecords(patients, records, reviewed, patientId);
      };
    };
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
    let callerUser = UserLib.getByPrincipal(users, caller);
    switch (callerUser) {
      case null { Runtime.trap("Unauthorized: not a registered user") };
      case (?u) {
        if (u.role == #patient or u.role == #admin) {
          Runtime.trap("Unauthorized: only doctors and volunteers can enter vitals");
        };
        let result = PatientLib.createRecord(
          patients, records, alerts,
          counters.nextRecordId, counters.nextAlertId,
          patientId, u.id, visitType,
          bpSystolic, bpDiastolic, glucose, heartRate, spo2, temperature,
          symptoms, checkDate,
        );
        counters.nextRecordId += 1;
        counters.nextAlertId += result.alerts.size();
        result;
      };
    };
  };

  public shared ({ caller }) func reviewRecord(
    recordId : Nat,
    advice : Text,
  ) : async ?PTypes.HealthRecord {
    let callerUser = UserLib.getByPrincipal(users, caller);
    switch (callerUser) {
      case null { Runtime.trap("Unauthorized: not a registered user") };
      case (?u) {
        if (u.role != #doctor and u.role != #admin) {
          Runtime.trap("Unauthorized: only doctors can review records");
        };
        let updated = PatientLib.reviewRecord(records, recordId, u.id, advice);
        PatientLib.resolveAlertsByRecord(alerts, recordId);
        updated;
      };
    };
  };

  public shared query ({ caller }) func getAlerts() : async [{
    alert : PTypes.Alert;
    patientName : Text;
    patientCode : Text;
    village : Text;
  }] {
    let callerUser = UserLib.getByPrincipal(users, caller);
    switch (callerUser) {
      case null { Runtime.trap("Unauthorized: not a registered user") };
      case (?u) {
        if (u.role == #patient) {
          Runtime.trap("Unauthorized: use getMyAlerts to access your alerts");
        };
        PatientLib.getAlerts(patients, alerts);
      };
    };
  };

  public shared ({ caller }) func resolveAlert(alertId : Nat) : async ?PTypes.Alert {
    let callerUser = UserLib.getByPrincipal(users, caller);
    switch (callerUser) {
      case null { Runtime.trap("Unauthorized: not a registered user") };
      case (?u) {
        if (u.role == #patient) {
          Runtime.trap("Unauthorized: patients cannot resolve alerts");
        };
        PatientLib.resolveAlert(alerts, alertId);
      };
    };
  };

  // Patient self-service: returns the caller's own patient record and health history
  public shared query ({ caller }) func getMyRecord() : async ?{
    patient : PTypes.Patient;
    records : [PTypes.HealthRecord];
    volunteerName : Text;
  } {
    switch (UserLib.getByPrincipal(users, caller)) {
      case null { null };
      case (?u) {
        switch (u.patientId) {
          case null { null };
          case (?pid) { PatientLib.getById(patients, records, users, pid) };
        };
      };
    };
  };

  // Patient self-service: returns unresolved alerts for the caller's own patient record
  public shared query ({ caller }) func getMyAlerts() : async [{
    alert : PTypes.Alert;
    patientName : Text;
    patientCode : Text;
    village : Text;
  }] {
    switch (UserLib.getByPrincipal(users, caller)) {
      case null { [] };
      case (?u) {
        switch (u.patientId) {
          case null { [] };
          case (?pid) { PatientLib.getAlertsByPatient(patients, alerts, pid) };
        };
      };
    };
  };
};
