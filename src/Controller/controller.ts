import { Request, Response } from "express";
import { validationResult } from "express-validator";   // ✅ import this
import StudentService from "../Services/student.serives";
import ResponseHandler from "../utils/Responces";

export default class StudentController {
  private service: StudentService;

  constructor(service: StudentService) {
    this.service = service;
  }

  // Helper method to handle validation errors
  private handleValidationErrors(req: Request, res: Response): boolean {
    const errors = validationResult(req);   // ✅ use validationResult
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => err.msg).join(", ");
      ResponseHandler.sendError(res, errorMessages, 400);
      return true;
    }
    return false;          
  }

  create = async (req: Request, res: Response) => {
    if (this.handleValidationErrors(req, res)) {
      return;
    }

    try {
      const student = await this.service.createStudent(req.body);

      ResponseHandler.sendSuccess(res, student, 201);
    } catch (error: any) {
      console.error("Error creating student:", error);
      ResponseHandler.sendError(res, "Failed to create student", 500);
    }
  };

  getAll = async (_req: Request, res: Response) => {
    try {
      const students = await this.service.getAllStudents();
      console.log(students)
      res.render("index", { students });          
    } catch (error: any) {
      console.error("Error fetching students:", error);
      ResponseHandler.sendError(res, "Failed to fetch students", 500);
    }            
  };
                
  getById = async (req: Request, res: Response) => {
    try {
      const student = await this.service.getStudentById(req.params.id);
      if (!student) {
        return ResponseHandler.sendError(res, "Student not found", 404);
      }
      res.render("viewStudent", { student });
    } catch (error: any) {
      console.error("Error fetching student:", error);
      ResponseHandler.sendError(res, "Failed to fetch student", 500);
    }   
  };
                                                 
  update = async (req: Request, res: Response) => {
    if (this.handleValidationErrors(req, res)) {
      return;
    }

    try {
      const updated = await this.service.updateStudent(req.params.id, req.body);
      if (!updated) {
        return ResponseHandler.sendError(res, "Student not found", 404);
      }
      ResponseHandler.sendSuccess(res, updated, 200);
    } catch (error: any) {
      console.error("Error updating student:", error);
      ResponseHandler.sendError(res, "Failed to update student", 500);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const deleted = await this.service.deleteStudent(req.params.id);
      if (!deleted) {
        return ResponseHandler.sendError(res, "Student not found", 404);
      }
      ResponseHandler.sendSuccess(res, { message: "Student deleted successfully" }, 200);
    } catch (error: any) {
      console.error("Error deleting student:", error);
      ResponseHandler.sendError(res, "Failed to delete student", 500);
    }
  };
}
