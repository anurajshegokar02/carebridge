module {
  public type UserId = Nat;
  public type Timestamp = Int;

  public type Counters = {
    var nextUserId : Nat;
    var nextPatientId : Nat;
    var nextRecordId : Nat;
    var nextAlertId : Nat;
  };
};
