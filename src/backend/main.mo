import PTypes "types/patients";
import UTypes "types/users";
import Common "types/common";
import List "mo:core/List";
import UsersMixin "mixins/users-api";
import PatientsMixin "mixins/patients-api";
import StatsMixin "mixins/stats-api";
import SeedMixin "mixins/seed-api";



actor {
  let users = List.empty<UTypes.User>();
  let patients = List.empty<PTypes.Patient>();
  let records = List.empty<PTypes.HealthRecord>();
  let alerts = List.empty<PTypes.Alert>();

  let counters : Common.Counters = {
    var nextUserId = 1;
    var nextPatientId = 1;
    var nextRecordId = 1;
    var nextAlertId = 1;
  };

  include UsersMixin(users, counters);
  include PatientsMixin(patients, records, alerts, users, counters);
  include StatsMixin(patients, records, alerts, users);
  include SeedMixin(patients, records, alerts, users, counters);
};
