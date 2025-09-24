import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import StudentService from "../Services/student.serives";
import ResponseHandler from "../utils/Responces";

export default class StudentController {
  private service: StudentService;
  
  constructor(service: StudentService) {
    this.service = service;
  }

  // Helper method to handle validation errors
  private handleValidationErrors(req: Request, res: Response): boolean {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => err.msg).join(", ");
      ResponseHandler.sendError(res, errorMessages, 400);
      return true;
    }
    return false;          
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    if (this.handleValidationErrors(req, res)) {
      return;
    }
    try {
      const existingEmail = await this.service.existingEmail(req.body.email)
      if(existingEmail){
        return ResponseHandler.sendError(res,`This email already existing`,404)
      }
      const student = await this.service.createStudent(req.body);
      ResponseHandler.sendSuccess(res, student, 201);  
    } catch (error: any) {
      console.error("Error creating student:", error);
      next(error);
    }
  };

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const students = await this.service.getAllStudents();
      console.log(students);
      res.render("index", { students });          
    } catch (error: any) {
      console.error("Error fetching students:", error);
      next(error);
    }            
  };
               
  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const student = await this.service.getStudentById(req.params.id);
      if (!student) {
        return ResponseHandler.sendError(res, "Student not found", 404);
      }
      res.render("viewStudent", { student });
    } catch (error: any) {
      console.error("Error fetching student:", error);
      next(error);
    }  
  };
                                                 
 update = async (req: Request, res: Response, next: NextFunction) => {
  if (this.handleValidationErrors(req, res)) {
    return;
  }
  try {
    // First check if the student exists
    const currentStudent = await this.service.getStudentById(req.params.id);
    if (!currentStudent) {
      return ResponseHandler.sendError(res, "Student not found", 404);
    }

    // Check if email is being updated and if it already exists for another student
    if (req.body.email && req.body.email !== currentStudent.email) {
      const existingEmail = await this.service.existingEmail(req.body.email);
      if (existingEmail) {
        return ResponseHandler.sendError(res, `This email already exists`, 409); // 409 for conflict
      }
    }

    const updated = await this.service.updateStudent(req.params.id, req.body);
    if (!updated) {
      return ResponseHandler.sendError(res, "Student not found", 404);
    }
    ResponseHandler.sendSuccess(res, updated, 200);
  } catch (error: any) {
    console.error("Error updating student:", error);
    next(error);
  }
}
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleted = await this.service.deleteStudent(req.params.id);
      if (!deleted) {
        return ResponseHandler.sendError(res, "Student not found", 404);
      }
      ResponseHandler.sendSuccess(res, { message: "Student deleted successfully" }, 200);
    } catch (error: any) {
      console.error("Error deleting student:", error);
      next(error);
    }
  };
}
