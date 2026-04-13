import List "mo:core/List";
import UTypes "types/users";
import PTypes "types/patients";
import Common "types/common";

module {
  // Old user type -- copied from .old/src/backend/types/users.mo
  type OldUserRole = {
    #admin;
    #doctor;
    #volunteer;
  };

  type OldUser = {
    id : Nat;
    principal : Principal;
    name : Text;
    email : Text;
    role : OldUserRole;
    createdAt : Int;
  };

  type OldActor = {
    users : List.List<OldUser>;
    patients : List.List<PTypes.Patient>;
    records : List.List<PTypes.HealthRecord>;
    alerts : List.List<PTypes.Alert>;
    counters : Common.Counters;
  };

  type NewActor = {
    users : List.List<UTypes.User>;
    patients : List.List<PTypes.Patient>;
    records : List.List<PTypes.HealthRecord>;
    alerts : List.List<PTypes.Alert>;
    counters : Common.Counters;
  };

  func migrateRole(old : OldUserRole) : UTypes.UserRole {
    switch old {
      case (#admin) #admin;
      case (#doctor) #doctor;
      case (#volunteer) #volunteer;
    };
  };

  public func run(old : OldActor) : NewActor {
    let users = old.users.map<OldUser, UTypes.User>(
      func(u) {
        {
          u with
          role = migrateRole(u.role);
          patientId = null;
        }
      }
    );
    {
      users;
      patients = old.patients;
      records = old.records;
      alerts = old.alerts;
      counters = old.counters;
    };
  };
};
