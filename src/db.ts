import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

const client = new Client(process.env.DATABASE_URL);
client.connect();
console.log("connecting to db");

export const getAllItems = async () => {
  try {
    const allItems = await client.query("SELECT * from fitnessproducts");
    return allItems;
  } catch (error) {
    console.error("cannot get all products", error);
  }
};
