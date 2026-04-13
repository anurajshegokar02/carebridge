import PTypes "../types/patients";
import UTypes "../types/users";
import Common "../types/common";
import PatientLib "../lib/patients";
import UserLib "../lib/users";
import List "mo:core/List";
import Principal "mo:core/Principal";

mixin (
  patients : List.List<PTypes.Patient>,
  records : List.List<PTypes.HealthRecord>,
  alerts : List.List<PTypes.Alert>,
  users : List.List<UTypes.User>,
  counters : Common.Counters,
) {
  public shared ({ caller }) func seedDemoData() : async Text {
    if (not users.isEmpty()) {
      return "Already seeded";
    };

    let placeholder = Principal.fromText("aaaaa-aa");

    // Seed 3 default users
    ignore UserLib.create(users, counters.nextUserId, placeholder, "Dr. Sarah Ahmed", "doctor@carebridge.com", #doctor);
    counters.nextUserId += 1;
    ignore UserLib.create(users, counters.nextUserId, placeholder, "Sunita Devi", "sunita@carebridge.com", #volunteer);
    counters.nextUserId += 1;
    ignore UserLib.create(users, counters.nextUserId, placeholder, "Admin User", "admin@carebridge.com", #admin);
    counters.nextUserId += 1;

    // Volunteer id is 2 (Sunita Devi)
    let volunteerId = 2;

    // Seed 2 sample patients
    ignore PatientLib.create(patients, counters.nextPatientId, "Ramesh Kumar", 58, "Male", "9876543210", "Sunder Nagar", "House 12, Sunder Nagar", "Hypertension", volunteerId, "Long-term hypertension patient");
    counters.nextPatientId += 1;
    ignore PatientLib.create(patients, counters.nextPatientId, "Meena Devi", 45, "Female", "9876543211", "Green Valley", "House 5, Green Valley", "Diabetes", volunteerId, "Type 2 diabetes, controlled diet");
    counters.nextPatientId += 1;

    // Seed health records
    // Record 1: Ramesh - normal vitals
    let r1 = PatientLib.createRecord(
      patients, records, alerts,
      counters.nextRecordId, counters.nextAlertId,
      1, volunteerId, "Routine",
      125, 82, 145, 78, 97, 98.4,
      "Mild headache", "2026-04-10",
    );
    counters.nextRecordId += 1;
    counters.nextAlertId += r1.alerts.size();

    // Record 2: Ramesh - high BP alert
    let r2 = PatientLib.createRecord(
      patients, records, alerts,
      counters.nextRecordId, counters.nextAlertId,
      1, volunteerId, "Follow-up",
      155, 95, 138, 88, 96, 99.1,
      "Dizziness and chest tightness", "2026-04-12",
    );
    counters.nextRecordId += 1;
    counters.nextAlertId += r2.alerts.size();

    // Record 3: Meena - high glucose alert
    let r3 = PatientLib.createRecord(
      patients, records, alerts,
      counters.nextRecordId, counters.nextAlertId,
      2, volunteerId, "Routine",
      118, 76, 215, 82, 98, 98.6,
      "Increased thirst and fatigue", "2026-04-13",
    );
    counters.nextRecordId += 1;
    counters.nextAlertId += r3.alerts.size();

    "Seeded";
  };
};
