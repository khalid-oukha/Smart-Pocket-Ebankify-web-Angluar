export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  age?: number;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}
