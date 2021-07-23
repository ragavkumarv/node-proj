import bcrypt from "bcrypt";
import express from "express";
import { getUser, getUsers, insertUser } from "../helper.js";
import { createConnection } from "../index.js";

const router = express.Router();

// get all users
router.route("/").get(async (request, response) => {
  const client = await createConnection();
  const contestants = await getUsers(client, {});
  response.send(contestants);
});

// user password - create a user
router.route("/signup").post(async (request, response) => {
  const { username, password, avatar } = request.body;
  const client = await createConnection();
  const hashedPassword = await genPassword(password);
  const newUser = await insertUser(client, {
    username: username,
    password: hashedPassword,
    avatar,
  });
  // console.log(hashedPassword, newUser);
  response.send(newUser);
});

// Make check if user already exists - task

// login
router.route("/login").post(async (request, response) => {
  const { username, password } = request.body;
  const client = await createConnection();
  const user = await getUser(client, { username: username });
  const inDbStorePassword = user.password;
  const isPasswordMatch = await bcrypt.compare(password, inDbStorePassword);
  if (isPasswordMatch) {
    response.send({ message: "Successfull login" });
  } else {
    response.send({ message: "Invalid login" });
  }
});

// list all the users in database

async function genPassword(password) {
  const salt = await bcrypt.genSalt(10); // More rounds secure - dowside it will time - user
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export const userRouter = router;
