import * as studentModel from "../models/studentModel.js";
import ValidationError from "../utils/ValidationError.js";

export const fetchAllStudents = async () => {
  const students = await studentModel.fetchAllStudents();
  return students;
};

const doesStudentExist = async (student) => {
  let existing;

  if (Object.hasOwn(student, "id")) {
    existing = await studentModel.findStudentById(student.id);
  } else {
    existing = await studentModel.findStudentByNameAndSrcodeAndProgram(student);
  }

  if (existing.length > 0) {
    return true;
  }

  return false;
};

// SR Code Validation
const validateSrcode = (srcode) => {
  const srcodePattern = /^\d{2}-\d{5}$/;

  if (!srcodePattern.test(srcode)) {
    throw new ValidationError(400, "Invalid SR Code format! Example: 22-12345");
  }
};

// Create
export const createStudent = async (student) => {
  if (!student.name || !student.srcode || !student.program) {
    throw new ValidationError(400, "Name, SR Code, and Program are required!");
  }

  // Validate SR Code first before checking the database
  validateSrcode(student.srcode);

  const existing = await doesStudentExist(student);

  if (existing) {
    throw new ValidationError(409, "Student already exists!");
  }

  const studentId = await studentModel.insert(student);
  return studentId;
};
// Update
export const updateStudent = async (student) => {
  if (!student.name || !student.srcode || !student.program) {
    throw new ValidationError(404, "Name, SR Code, and Program are required!");
  }

  validateSrcode(student.srcode);

  const existing = await doesStudentExist(student);

  if (!existing) {
    throw new ValidationError(404, "Student does not exist!");
  }

  const updatedStudent = await studentModel.update(student);
  return updatedStudent;
};

// Delete
export const deleteStudent = async (id) => {
  const student = { id };
  const existing = await doesStudentExist(student);

  if (!existing) {
    throw new ValidationError(404, "Student does not exist!");
  }

  const deletedStudent = await studentModel.remove(id);
  return deletedStudent;
};
