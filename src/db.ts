import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

const client = new Client(process.env.DATABASE_URL);
client.connect();

export const getAllItems = async () => {
  try {
    const allItems = await client.query("SELECT * from fitnessproducts");
    return allItems;
  } catch (error) {
    console.error("cannot get all products", error);
  }
};

export const getAllBrandNames = async () => {
  try {
    const queryText = "SELECT DISTINCT brand_name from fitnessproducts";
    const res = await client.query(queryText);
    return res;
  } catch (error) {
    console.error("Cannot get brand names", error);
  }
};

export const getAllSaleProducts = async (amount = "10") => {
  try {
    const queryText =
      "SELECT * FROM fitnessproducts WHERE selling_price < original_price LIMIT $1";
    const queryValue = [amount];
    const res = await client.query(queryText, queryValue);
    return res;
  } catch (error) {
    console.error("Cannot get sale products", error);
  }
};

export const getAllBrandedProducts = async (brandName: string) => {
  try {
    const queryText = "SELECT * from fitnessproducts WHERE brand_name = $1";
    const queryValue = [brandName];
    const res = await client.query(queryText, queryValue);
    return res;
  } catch (error) {
    console.error("cannot get branded products", error);
  }
};
