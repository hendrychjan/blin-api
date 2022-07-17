import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export interface UserPayload {
  name: string;
  password: string;
}

export default class UserService {
  // Generate a JWT auth token for a user
  static generateAuthToken(user: User): string {
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
      },
      process.env.JWTPK!
    );

    return token;
  }

  // Register a new user and return a JWT auth token
  static async register(user: UserPayload): Promise<string> {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Save the user to db
    try {
      const newUser = await prisma.user.create({
        data: user,
      });

      // Return the JWT auth token
      return UserService.generateAuthToken(newUser);
    } catch (e) {
      throw "Username is already taken";
    }
  }

  // Authenticate a user and return a JWT auth token
  static async login(user: UserPayload): Promise<string> {
    // Find the user by name
    const foundUser = await prisma.user.findFirst({
      where: {
        name: user.name,
      },
    });

    // Check if the user exists
    if (!foundUser) {
      throw "Wrong username or password";
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(
      user.password,
      foundUser.password
    );

    if (!isPasswordCorrect) {
      throw "Wrong username or password";
    }

    // Return the JWT auth token
    return UserService.generateAuthToken(foundUser);
  }
}
