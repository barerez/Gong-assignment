import {User} from '../models/models';

export function convertUserArrToHierarchy(usersArr): User[] {
  const result = [];
  const map: Map<number, User> = new Map();
  usersArr.forEach((user: User) => {
    map.set(user.id, user);
  });
  usersArr.forEach((user: User) => {
    if (user.managerId != null) {
      const manager = map.get(user.managerId);
      if (manager !== undefined) {
        if (manager.employees) {
          manager.employees.push(user);
        } else {
          manager.employees = [user];
        }
      } else {
        result.push(user);
      }
    } else {
      result.push(user);
    }
  });
  return result;
}
