import Types "../types/users";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

module {
  public type User = Types.User;
  public type UserRole = Types.UserRole;

  public func getAll(users : List.List<User>) : [User] {
    users.toArray();
  };

  public func getVolunteers(users : List.List<User>) : [User] {
    users.filter(func(u) { u.role == #volunteer }).toArray();
  };

  public func getByPrincipal(users : List.List<User>, p : Principal) : ?User {
    users.find(func(u) { Principal.equal(u.principal, p) });
  };

  public func getById(users : List.List<User>, id : Nat) : ?User {
    users.find(func(u) { u.id == id });
  };

  public func create(
    users : List.List<User>,
    nextId : Nat,
    principal : Principal,
    name : Text,
    email : Text,
    role : UserRole,
  ) : User {
    let user : User = {
      id = nextId;
      principal = principal;
      name = name;
      email = email;
      role = role;
      patientId = null;
      createdAt = Time.now();
    };
    users.add(user);
    user;
  };

  public func updateRole(users : List.List<User>, userId : Nat, role : UserRole) : ?User {
    var updated : ?User = null;
    users.mapInPlace(func(u) {
      if (u.id == userId) {
        let newUser = { u with role = role };
        updated := ?newUser;
        newUser;
      } else { u };
    });
    updated;
  };

  public func linkPatient(users : List.List<User>, userId : Nat, patientId : Nat) : ?User {
    var updated : ?User = null;
    users.mapInPlace(func(u) {
      if (u.id == userId) {
        let newUser = { u with patientId = ?patientId };
        updated := ?newUser;
        newUser;
      } else { u };
    });
    updated;
  };

  public func countVolunteers(users : List.List<User>) : Nat {
    users.filter(func(u) { u.role == #volunteer }).size();
  };
};
