import List "mo:core/List";

module {
  // Old UserRole type (without #visitor)
  type OldUserRole = {
    #admin;
    #doctor;
    #volunteer;
    #patient;
  };

  // Old User type (with old UserRole)
  type OldUser = {
    id : Nat;
    principal : Principal;
    name : Text;
    email : Text;
    role : OldUserRole;
    patientId : ?Nat;
    createdAt : Int;
  };

  // New UserRole type (with #visitor added)
  type NewUserRole = {
    #admin;
    #doctor;
    #volunteer;
    #patient;
    #visitor;
  };

  // New User type (with new UserRole)
  type NewUser = {
    id : Nat;
    principal : Principal;
    name : Text;
    email : Text;
    role : NewUserRole;
    patientId : ?Nat;
    createdAt : Int;
  };

  // Patient and other types are unchanged — only UserRole changed
  type Patient = {
    id : Nat;
    patientCode : Text;
    name : Text;
    age : Nat;
    gender : Text;
    phone : Text;
    village : Text;
    address : Text;
    condition : Text;
    volunteerId : Nat;
    notes : Text;
    status : Text;
    createdAt : Int;
  };

  type HealthRecord = {
    id : Nat;
    patientId : Nat;
    volunteerId : Nat;
    visitType : Text;
    bpSystolic : Nat;
    bpDiastolic : Nat;
    glucose : Nat;
    heartRate : Nat;
    spo2 : Nat;
    temperature : Float;
    symptoms : Text;
    doctorAdvice : Text;
    reviewed : Bool;
    reviewedBy : Nat;
    checkDate : Text;
    createdAt : Int;
  };

  type Alert = {
    id : Nat;
    patientId : Nat;
    recordId : Nat;
    alertType : Text;
    message : Text;
    resolved : Bool;
    createdAt : Int;
  };

  type Counters = {
    var nextUserId : Nat;
    var nextPatientId : Nat;
    var nextRecordId : Nat;
    var nextAlertId : Nat;
  };

  type OldActor = {
    users : List.List<OldUser>;
    patients : List.List<Patient>;
    records : List.List<HealthRecord>;
    alerts : List.List<Alert>;
    counters : Counters;
  };

  type NewActor = {
    users : List.List<NewUser>;
    patients : List.List<Patient>;
    records : List.List<HealthRecord>;
    alerts : List.List<Alert>;
    counters : Counters;
  };

  func migrateRole(old : OldUserRole) : NewUserRole {
    switch old {
      case (#admin) #admin;
      case (#doctor) #doctor;
      case (#volunteer) #volunteer;
      case (#patient) #patient;
    };
  };

  public func run(old : OldActor) : NewActor {
    let users = old.users.map<OldUser, NewUser>(
      func(u) { { u with role = migrateRole(u.role) } }
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
