import Types "../types/users";
import Common "../types/common";
import UserLib "../lib/users";
import List "mo:core/List";

mixin (
  users : List.List<Types.User>,
  counters : Common.Counters,
) {
  public shared query ({ caller }) func getUsers() : async [Types.User] {
    UserLib.getAll(users);
  };

  public shared query ({ caller }) func getVolunteers() : async [Types.User] {
    UserLib.getVolunteers(users);
  };

  public shared ({ caller }) func createUser(
    name : Text,
    email : Text,
    role : Types.UserRole,
  ) : async Types.User {
    let user = UserLib.create(users, counters.nextUserId, caller, name, email, role);
    counters.nextUserId += 1;
    user;
  };

  public shared ({ caller }) func updateUserRole(
    userId : Nat,
    role : Types.UserRole,
  ) : async ?Types.User {
    UserLib.updateRole(users, userId, role);
  };

  public shared query ({ caller }) func getCurrentUser() : async ?Types.User {
    UserLib.getByPrincipal(users, caller);
  };

  public shared ({ caller }) func registerUser(
    name : Text,
    email : Text,
    role : Types.UserRole,
  ) : async Types.User {
    // If already registered, return existing user
    switch (UserLib.getByPrincipal(users, caller)) {
      case (?existing) { existing };
      case null {
        let user = UserLib.create(users, counters.nextUserId, caller, name, email, role);
        counters.nextUserId += 1;
        user;
      };
    };
  };
};
