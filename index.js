const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const PORT = 5000;

const poll = [
  {
    id: "4",
    company: "Oneplus",
    color: "red",
    content: "China based company",
  },
  {
    id: "2",
    company: "Samsung",
    color: "skyblue",
    content: "Korean based company!",
  },

  {
    id: "5",
    company: "Moto",
    color: "#000080",
    content: "US based company",
  },
  {
    color: "pink",
    content: "India Based Company",
    company: "oppo",
    id: "6",
  },

  {
    id: "3",
    company: "MI",
    color: "orange",
    content: "China based company",
  },
];

async function createConnection() {
  const MONGO_URL =
    "mongodb+srv://ragavkumarv:<pass>@cluster0.yn2hm.mongodb.net/contestants?retryWrites=true&w=majority";

  const client = new MongoClient(MONGO_URL);

  try {
    await client.connect();

    const result = await client
      .db("contestants")
      .collection("poll")
      .insertMany(poll);

    console.log("Inserted successfully", result);

    console.log("Succesfully connected");
  } catch (err) {
    console.log(err);
  }
}

createConnection();

app.get("/", (request, response) => {
  response.send("Welcome to my node app");
});

app.get("/poll", (request, response) => {
  response.send(poll);
});

app.get("/poll/:id", (request, response) => {
  const id = request.params.id;

  const contestant = poll.filter((data) => data.id === id);
  console.log(id, contestant);
  response.send(contestant);
});

app.listen(PORT, () => console.log("The server is started in ", PORT));

// ctrl+c -> stop server
// stop it & rerun the server

// UI (database query are here) -> Database
// React -> Vue
// Vue (rewrite) -> Database
// UI  -> Node (database query are here)   -> Database
// New UI -> Node (database query are here)   -> Database

// Business
// Node (database query are here) (public)  -> Database
// 1. Mock api -> pro -> pay
// 2. Indigo flight (/booktickets) -> Charging ->  BookmyFlight, MakeMytrip, paytm
// 3. Indigo flight (/currentTicketCost) -> Charging -> MakeMytrip

// Multiple platforms
// Mobile app, android, ios, Webapp(React), Windows, MacOS -> Node (database query are here)   -> Database

// Slack -> android, ios, Webapp(React), Windows, MacOS

// REST -> Everyone speaks the same language

// REST methods
// GET, POST, PUT, DELETE
