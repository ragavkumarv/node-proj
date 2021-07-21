// const { MongoClient } = require("mongodb");
import dotenv from "dotenv";
import express from "express";
// const express = require("express");
import { MongoClient } from "mongodb";

dotenv.config();

const app = express();
const PORT = process.PORT || 5000;

async function createConnection() {
  const MONGO_URL = process.MONGO_URI || process.env.MONGO_URI;
  const client = new MongoClient(MONGO_URL);
  try {
    await client.connect();
    return client;
    // getPollById(client, "4");
  } catch (err) {
    console.log(err);
  }
}

async function getPollById(client, id) {
  const result = await client
    .db("contestants")
    .collection("poll")
    .findOne({ id: id });
  console.log("Succesfully connected", result);
  return result;
}

async function getPolls(client, filter) {
  const result = await client
    .db("contestants")
    .collection("poll")
    .find(filter)
    .toArray();
  console.log("Succesfully connected", result);
  return result;
}

async function insertPoll(client, poll) {
  const result = await client
    .db("contestants")
    .collection("poll")
    .insertMany(poll);
  console.log("Inserted successfully", result);
}

createConnection();

app.get("/", (request, response) => {
  response.send("Welcome to my node app");
});

app.get("/poll", async (request, response) => {
  const client = await createConnection();
  const contestants = await getPolls(client, {});
  response.send(contestants);
});

// "/poll/name/Samsung" - search by name

app.get("/poll/name/:companyname", async (request, response) => {
  const companyname = request.params.companyname;
  const client = await createConnection();
  const contestants = await getPolls(client, { company: companyname });
  response.send(contestants);
});

app.get("/poll/:id", async (request, response) => {
  const id = request.params.id;

  // const contestant = poll.filter((data) => data.id === id);
  // console.log(id, contestant);
  const client = await createConnection();
  const contestant = await getPollById(client, id);

  response.send(contestant);
});

app.get("/poll/content/:content", async (request, response) => {
  const content = request.params.content;

  // const contestant = poll.filter((data) => data.id === id);
  // console.log(id, contestant);
  const client = await createConnection();
  const contestant = await getPolls(client, {
    content: { $regex: new RegExp(content, "i") },
  });

  response.send(contestant);
});

app.get("/poll", async (request, response) => {
  const { body } = request;

  // const contestant = poll.filter((data) => data.id === id);
  // console.log(id, contestant);
  const client = await createConnection();
  const contestant = await insertPoll(client, body);

  response.send(contestant);
});

// "/poll/content/China" - search by content

app.listen(PORT, () => console.log("The server is started in ", PORT));
