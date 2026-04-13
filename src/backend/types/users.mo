import Common "common";

module {
  public type UserId = Common.UserId;
  public type Timestamp = Common.Timestamp;

  public type UserRole = {
    #admin;
    #doctor;
    #volunteer;
    #patient;
    #visitor;
  };

  public type User = {
    id : UserId;
    principal : Principal;
    name : Text;
    email : Text;
    role : UserRole;
    patientId : ?Nat;
    createdAt : Timestamp;
  };
};
