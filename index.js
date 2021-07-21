import express from "express";
// const express = require("express");
import { MongoClient } from "mongodb";
// const { MongoClient } = require("mongodb");
const app = express();
const PORT = 5000;

// const poll = [
//   {
//     id: "4",
//     company: "Oneplus",
//     color: "red",
//     content: "China based company",
//   },
//   {
//     id: "2",
//     company: "Samsung",
//     color: "skyblue",
//     content: "Korean based company!",
//   },

//   {
//     id: "5",
//     company: "Moto",
//     color: "#000080",
//     content: "US based company",
//   },
//   {
//     color: "pink",
//     content: "India Based Company",
//     company: "oppo",
//     id: "6",
//   },

//   {
//     id: "3",
//     company: "MI",
//     color: "orange",
//     content: "China based company",
//   },
// ];

async function createConnection() {
  const MONGO_URL =
    "mongodb+srv://ragavkumarv:pass@cluster0.yn2hm.mongodb.net/contestants?retryWrites=true&w=majority";
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

// "/poll/content/China" - search by content

app.listen(PORT, () => console.log("The server is started in ", PORT));
