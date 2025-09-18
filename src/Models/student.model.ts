import mongoose, { Document, Schema, Model } from "mongoose";
import type{ Grade } from "../dtos/student.dto";


export interface StudentDoc extends Document {
  name: string;
  email: string;
  phone?: string;
  course: string;
  grade: Grade;
  createdAt: Date;
  updatedAt: Date;
}


const StudentSchema = new Schema<StudentDoc>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true },
    phone: { type: String },
    course: { type: String, required: true },
    grade: { type: String, enum: ["A", "B", "C", "D"], required: true }
  },
  { timestamps: true }
);
export const StudentModel = mongoose.model<StudentDoc>("Student", StudentSchema);
