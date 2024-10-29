import { Role } from "./role.enum";

export class User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    role: Role;
  
    constructor() {
      this.id = 0;
      this.name = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.phone = '';
      this.role = Role.ARRENDADOR; // Valor predeterminado
    }
  }