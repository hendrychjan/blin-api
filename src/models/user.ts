import { Schema, InferSchemaType, model, Model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// User object data schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Instance methods for User
interface IUserMethods {
  generateAuthToken(): string;
}

// Static methods for User
interface IStaticMethods {
  createNew(user: UserType): Promise<string>;
  login(name: string, password: string): Promise<boolean>;
}

// Bussiness logic methods
userSchema.methods.generateAuthToken = function generateAuthToken(): string {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
    },
    process.env.JWTPK!
  );

  return token;
};

// Register a new user
userSchema.static(
  "createNew",
  async function createNew(user: UserType): Promise<string> {
    // Create a new user instance
    const newUser = new User(user);

    // Hash the user's password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(user.password, salt);

    // Save the user
    await newUser.save();

    return newUser.generateAuthToken();
  }
);

// Authenticate (login) a user
userSchema.static(
  "login",
  async function login(name: string, password: string): Promise<string> {
    // Find the user by name
    const user = await User.findOne({ name });

    // Check if the user exists
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Return the user's token
    return user.generateAuthToken();
  }
);

// Generate mongodb models for the user collection
export type UserType = InferSchemaType<typeof userSchema>;
const User = model<
  UserType,
  Model<UserType, {}, IUserMethods> & IStaticMethods
>("User", userSchema);

export default User;
