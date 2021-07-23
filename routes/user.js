import bcrypt from "bcrypt";
import express from "express";
import { insertUser } from "../helper.js";
import { createConnection } from "../index.js";

const router = express.Router();

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
  console.log(hashedPassword, newUser);
  response.send(newUser);
});

// list all the users in database

async function genPassword(password) {
  const salt = await bcrypt.genSalt(10); // More rounds secure - dowside it will time - user
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export const userRouter = router;
