import Common "common";

module {
  public type UserId = Common.UserId;
  public type Timestamp = Common.Timestamp;

  public type Patient = {
    id : Nat;
    patientCode : Text;
    name : Text;
    age : Nat;
    gender : Text;
    phone : Text;
    village : Text;
    address : Text;
    condition : Text;
    volunteerId : UserId;
    notes : Text;
    status : Text;
    createdAt : Timestamp;
  };

  public type HealthRecord = {
    id : Nat;
    patientId : Nat;
    volunteerId : UserId;
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
    reviewedBy : UserId;
    checkDate : Text;
    createdAt : Timestamp;
  };

  public type Alert = {
    id : Nat;
    patientId : Nat;
    recordId : Nat;
    alertType : Text;
    message : Text;
    resolved : Bool;
    createdAt : Timestamp;
  };
};
