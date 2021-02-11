export interface User {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  password: string;
  photo?: string;
  index: number;
  employees?: any[];
  managerId?: number;
}

export class UserFullName {
  id: number;
  firstName: string;
  lastName: string;

  constructor(id: number, first: string, last: string) {
    this.id = id;
    this.firstName = first;
    this.lastName = last;
  }
}
