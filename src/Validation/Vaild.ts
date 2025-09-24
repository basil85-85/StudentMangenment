import { body } from "express-validator";

export const signupValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
  
  body("phone")
    .optional({ checkFalsy: true })
    .isMobilePhone("en-IN")
    .withMessage("Please provide a valid Indian phone number"),
  
  body("course")
    .trim()
    .notEmpty()
    .withMessage("Course is required")                  
    .isLength({ min: 6 })
    .withMessage("Course name must be at least 6 characters long"),
  
  body("grade")
    .notEmpty()
    .withMessage("Please select a grade")
    .isIn(["A", "B", "C", "D"])
    .withMessage("Grade must be A, B, C, or D"),
];

export const updateValidation = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
  
  body("phone")
    .optional({ checkFalsy: true })
    .isMobilePhone("en-IN")
    .withMessage("Please provide a valid Indian phone number"),
  
  body("course")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Course cannot be empty")
    .isLength({ min: 6 })
    .withMessage("Course name must be at least 6 characters long"),
  
  body("grade")
    .optional()
    .notEmpty()
    .withMessage("Grade cannot be empty")
    .isIn(["A", "B", "C", "D"])
    .withMessage("Grade must be A, B, C, or D"),
];