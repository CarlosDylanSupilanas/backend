import * as userModel from "../models/userModel.js";
import ValidationError from "../utils/ValidationError.js";
import validator from "validator";
import bcrypt from "bcrypt";

// CHECK IF USER EXISTS
const doesUserExist = async (email) => {
  const existing = await userModel.findUserByEmail(email);

  if (existing.length > 0) {
    return { result: true, user: existing[0] };
  }

  return { result: false, user: undefined };
};

// CREATE ACCOUNT
export const createAccount = async (user) => {
  // CHECK REQUIRED FIELDS
  if (!user.name || !user.email || !user.password) {
    throw new ValidationError(400, "Name, email and password are required");
  }

  //  CHECK NAME
  if (typeof user.name !== "string" || !user.name.trim()) {
    throw new ValidationError(400, "Invalid name");
  }

  // CHECK EMAIL FORMAT
  if (!validator.isEmail(user.email)) {
    throw new ValidationError(400, "Improper email format");
  }

  // CHECK PASSWORD STRENGTH
  if (!validator.isStrongPassword(user.password)) {
    throw new ValidationError(400, "Password is not strong enough.");
  }

  // CHECK IF EMAIL ALREADY EXISTS
  const existing = await doesUserExist(user.email);

  if (existing.result) {
    throw new ValidationError(409, "An account with that email already exists");
  }

  //  HASH PASSWORD
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(user.password, salt);

  // INSERT USER INTO DATABASE
  const result = await userModel.insert(user.name, user.email, hashedPassword);

  if (!result || result <= 0) {
    throw new Error("Unable to create an account. Please try again later");
  }

  return "Account created successfully!";
};

// LOGIN
export const login = async (user) => {
  // 1. CHECK REQUIRED FIELDS
  if (!user.email || !user.password) {
    throw new ValidationError(400, "Email and password are required");
  }

  // 2. CHECK EMAIL FORMAT
  if (!validator.isEmail(user.email)) {
    throw new ValidationError(404, "Improper email format");
  }

  // 3. CHECK IF USER EXISTS
  const existing = await doesUserExist(user.email);

  if (!existing.result) {
    throw new ValidationError(404, "Account with that email does not Exist");
  }

  // 4. CHECK PASSWORD
  const isCorrectPassword = await bcrypt.compare(
    user.password,
    existing.user.password,
  );

  if (!isCorrectPassword) {
    throw new ValidationError(404, "Incorrect Password");
  }

  return "Login successful!";
};
