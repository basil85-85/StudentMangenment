import { StudentModel, StudentDoc } from "../Models/student.model";
import { StudentRequest, StudentResponse } from "../dtos/student.dto";
import { Types } from "mongoose"

export default class StudentRepository {
  async create(student: StudentRequest): Promise<StudentResponse> {
    const newStudent: StudentDoc = new StudentModel(student);
    const saved = await newStudent.save();
    return this.toResponse(saved);
  }

  async findAll(): Promise<StudentResponse[]> {
    const students = await StudentModel.find().sort({ createdAt: -1 });
    return students.map(this.toResponse);
  }

  async findById(id: string): Promise<StudentResponse | null> {
    if (!Types.ObjectId.isValid(id)) return null;  
  const student = await StudentModel.findById(id);
  return student ? this.toResponse(student) : null;
  }

  async update(id: string, updateData: Partial<StudentRequest>): Promise<StudentResponse | null> {
    const updated = await StudentModel.findByIdAndUpdate(id, updateData, { new: true });
    return updated ? this.toResponse(updated) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await StudentModel.findByIdAndDelete(id);
    return result ? true : false;
  }

  private toResponse(student: StudentDoc): StudentResponse {
    return {
      id: (student._id as Types.ObjectId).toString(),
      name: student.name,  
      email: student.email,
      phone: student.phone,
      course: student.course,
      grade: student.grade,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    };
  }
}                   
