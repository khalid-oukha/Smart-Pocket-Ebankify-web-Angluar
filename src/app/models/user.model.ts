export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  age?: number;
  createdAt?: string;
  updatedAt?: string;
}
