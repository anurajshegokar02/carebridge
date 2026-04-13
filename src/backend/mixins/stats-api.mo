import PTypes "../types/patients";
import UTypes "../types/users";
import PatientLib "../lib/patients";
import UserLib "../lib/users";
import List "mo:core/List";

mixin (
  patients : List.List<PTypes.Patient>,
  records : List.List<PTypes.HealthRecord>,
  alerts : List.List<PTypes.Alert>,
  users : List.List<UTypes.User>,
) {
  public shared query ({ caller }) func getStats() : async {
    totalPatients : Nat;
    totalRecords : Nat;
    pendingReview : Nat;
    activeAlerts : Nat;
    activeVolunteers : Nat;
    recordsToday : Nat;
    alertPatients : Nat;
  } {
    {
      totalPatients = patients.size();
      totalRecords = records.size();
      pendingReview = PatientLib.countPendingReview(records);
      activeAlerts = PatientLib.countActiveAlerts(alerts);
      activeVolunteers = UserLib.countVolunteers(users);
      recordsToday = PatientLib.countRecordsToday(records);
      alertPatients = PatientLib.countAlertPatients(alerts);
    };
  };
};
