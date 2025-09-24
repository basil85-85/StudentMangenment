import { Router } from "express";
import StudentController from "../Controller/controller";
import StudentService from "../Services/student.serives";
import StudentRepository from "../repositories/student.repository";

 class ManagementRoute {
  public route: Router;   
  private repo: StudentRepository;
  private service: StudentService;
  private controller: StudentController;

  constructor() {
    this.route = Router();
    this.repo = new StudentRepository();
    this.service = new StudentService(this.repo);
    this.controller = new StudentController(this.service);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.route.post("/", this.controller.create);
    this.route.get("/", this.controller.getAll);
    this.route.get("/view/:id", this.controller.getById);
    this.route.put("/students/:id", this.controller.update);           
    this.route.delete("/delete/:id", this.controller.delete);
  }
   public getRouter(): Router {
    return this.route; 
  }
}

export default ManagementRoute