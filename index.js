const express = require("express");
const app = express();
const PORT = 5000;

const poll = [
  {
    id: "2",
    company: "Samsung",
    color: "skyblue",
    content: "Korean based company!",
  },
  {
    id: "3",
    company: "MI",
    color: "orange",
    content: "China based company",
  },
  {
    id: "4",
    company: "Oneplus",
    color: "red",
    content: "China based company",
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
];

app.get("/", (request, response) => {
  response.send("Welcome to my node app!!!");
});

app.get("/poll", (request, response) => {
  response.send(poll);
});

app.listen(PORT, () => console.log("The server is started in ", PORT));

// ctrl+c -> stop server
// stop it & rerun the server
