// const { MongoClient } = require("mongodb");
import dotenv from "dotenv";
import express from "express";
// const express = require("express");
import { MongoClient } from "mongodb";
import { pollRouter } from "./routes/poll.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.json());
export async function createConnection() {
  const MONGO_URL = process.env.MONGO_URI;
  const client = new MongoClient(MONGO_URL);
  try {
    await client.connect();
    return client;
    // getPollById(client, "4");
  } catch (err) {
    console.log(err);
  }
}

app.get("/", (request, response) => {
  response.send("Welcome to my node app");
});

app.use("/poll", pollRouter);

// "/poll/content/China" - search by content

app.listen(PORT, () => console.log("The server is started in ", PORT));
