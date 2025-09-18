
export type Grade = "A" | "B" | "C" | "D";

export interface StudentRequest {
  name: string;
  email: string;
  phone?: string;
  course: string;
  grade: Grade;
}

export interface StudentResponse {
  id: string;
  name: string;
  email: string;
  phone?: string;
  course: string;
  grade: Grade;
  createdAt: Date;
  updatedAt: Date;
}
