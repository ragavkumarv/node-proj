import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { MongoClient } from "mongodb";
import { pollRouter } from "./routes/poll.js";
import { userRouter } from "./routes/user.js";

dotenv.config();
//loaded in process.env

const app = express();
const PORT = process.env.PORT;

// middleware - transaltor
// request -> parse json (body, post, put, patch) -> request.body
app.use(express.json());
app.use(cors());

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
// /user/signup
app.use("/user", userRouter);

// '/poll/:id'
// '/poll/name/:companyname'
// post '/poll'

app.listen(PORT, () => console.log("The server is started in ", PORT));
