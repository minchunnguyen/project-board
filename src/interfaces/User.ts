import Role from "./Role";
import Photo from "./Photo";

export default interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  password: string;
  isDeleted: boolean;
  phone?: string;
  address?: string;
  role?: Role;
  photo?: Photo[];
}

// export interface Role {
//   id: number;
//   name: string
//   description: string;
// }

// export interface User {
//   id: number!;
//   firstName: string;
//   lastName: string;
//   email: string!;
//   address: string;
//   password: string!;
//   phone: number;
//   isDeleted: boolean;
//   roleId: number;
// }

// export interface Task {
//   id: number;
//   name: string;
//   assignedTo: number;
//   projectId: number;
//   startDate: Date;
//   endDate: Date;
//   status: string;
//   description: string;
//   isDeleted: string;
// }
