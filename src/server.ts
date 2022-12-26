import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import filePath from "./filePath";
import { getAllItems, getAllBrandNames } from "./db";

// loading in some dummy items into the database
// (comment out if desired, or change the number)

const app = express();

/** Parses JSON data in a request automatically */
app.use(express.json());
/** To allow 'Cross-Origin Resource Sharing': https://en.wikipedia.org/wiki/Cross-origin_resource_sharing */
app.use(cors());

// read in contents of any environment variables in the .env file
dotenv.config();

// use the environment variable PORT, or 4000 as a fallback
const PORT_NUMBER = process.env.PORT ?? 4000;

// GET /items
app.get("/items", async (req, res) => {
  //TODO
  const items = await getAllItems();
  if (items) {
    res.status(200).json(items.rows);
  } else {
    res.status(400).json({
      status: "error",
      message: "Something went wrong with the database",
    });
  }
});

app.get("/brands/name", async (req, res) => {
  const brandNames = await getAllBrandNames();
  if (brandNames) {
    res.status(200).json(brandNames.rows);
  } else {
    res.status(400).json({
      status: "error",
      message: "Could not get brand names",
    });
  }
});

//Handle Invalid Requests
app.get("/:any", (req, res) => {
  const pathToFile = filePath("../public/invalidRequest.html");
  res.sendFile(pathToFile);
});

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on port ${PORT_NUMBER}!`);
});
