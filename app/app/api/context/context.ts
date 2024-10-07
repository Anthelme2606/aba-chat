import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import { Request } from 'express'; // Assuming you are using express
dotenv.config();

const secretKey = process.env.SECRET_KEY || ""; // Ensure secretKey is always a string

if (!secretKey) {
  throw new Error("SECRET_KEY is not defined in environment variables.");
}

// Helper function to get the user from the token
const getUser = async (token: string) => {
  try {
    if (token) {
      const user = jwt.verify(token, secretKey);
      return user;
    }
    return null;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null; // Return null instead of throwing to handle unauthenticated users
  }
};

// The context function
const context = async ({ req }: { req: Request }) => {
  // Skip context creation for introspection and specific mutations
  const operationName = req.body?.operationName;
  
  if (operationName === "IntrospectionQuery" || operationName === "CreateUser" || operationName === "Login" || 
     operationName === "GetUsers"
  ) {
    return {};
  }

  const token = req.headers.authorization || "";

  // Attempt to retrieve the user with the token
  const user = await getUser(token);

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  // Return the user in the context for further resolvers
  return { user };
};

export default context;
