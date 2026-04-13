import Common "common";

module {
  public type UserId = Common.UserId;
  public type Timestamp = Common.Timestamp;

  public type UserRole = {
    #admin;
    #doctor;
    #volunteer;
  };

  public type User = {
    id : UserId;
    principal : Principal;
    name : Text;
    email : Text;
    role : UserRole;
    createdAt : Timestamp;
  };
};
