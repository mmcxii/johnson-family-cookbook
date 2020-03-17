import dotenv from "dotenv";
dotenv.config();

export const { PORT = 4000, PASSWORD_HASH } = process.env;
