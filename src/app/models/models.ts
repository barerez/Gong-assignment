export interface User {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  password: string;
  photo?: string;
  index: number;
  managerId?: number;
}

export class FullName {
  firstName: string;
  lastName: string;

  constructor(first: string, last: string) {
    this.firstName = first;
    this.lastName = last;
  }
}
