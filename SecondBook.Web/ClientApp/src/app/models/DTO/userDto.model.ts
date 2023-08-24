export class UserDto {
  name: string;
  email: string;
  role: string;
  id: number;

  constructor(name: string, email: string, role: string, id: number) {
    this.name = name;
    this.email = email;
    this.role = role;
    this.id = id;
  }
}
