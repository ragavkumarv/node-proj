import bcrypt from "bcrypt";
import dotenv from "dotenv";
import express from "express";
import { MongoClient } from "mongodb";
import { pollRouter } from "./routes/poll.js";

dotenv.config();
//loaded in process.env

const app = express();
const PORT = process.env.PORT;

// middleware - transaltor
// request -> parse json (body, post, put, patch) -> request.body
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
// '/poll/:id'
// '/poll/name/:companyname'
// post '/poll'

app.listen(PORT, () => console.log("The server is started in ", PORT));

async function genPassword(password) {
  const salt = await bcrypt.genSalt(10); // More rounds secure - dowside it will time - user
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
}

genPassword("password@123");
