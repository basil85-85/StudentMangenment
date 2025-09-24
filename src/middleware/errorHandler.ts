import { Request, Response, NextFunction } from "express";

export class ErrorHandler {
 
  static notFound(req: Request, res: Response) {
    res.status(404).render("404");
  }

  static serverError(err: any, req: Request, res: Response, next: NextFunction) {
    console.error("Server Error:", err.stack);
    res.status(500).render("500");
  }
}
