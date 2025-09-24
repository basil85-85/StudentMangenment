import { StudentRequest, StudentResponse } from "../dtos/student.dto";
import StudentRepository from "../repositories/student.repository";

export default class StudentService {
  private repo: StudentRepository;

  constructor(repo: StudentRepository) {
    this.repo = repo; 
  }

  async createStudent(data: StudentRequest): Promise<StudentResponse> {
    return await this.repo.create(data);
  }

  async getAllStudents(): Promise<StudentResponse[]> {
    return await this.repo.findAll();
  }

  async getStudentById(id: string): Promise<StudentResponse | null> {
    return await this.repo.findById(id);
  }

  async updateStudent(id: string, data: Partial<StudentRequest>): Promise<StudentResponse | null> {
    return await this.repo.update(id, data);
  }

  async deleteStudent(id: string): Promise<boolean | null> {
    return await this.repo.delete(id);
  }
  async existingEmail(email: string): Promise<boolean | null> {
  if (!email || typeof email !== 'string' || email.trim() === '') {
    return null; 
  }
  return await this.repo.existingEmail(email);
  }
}


