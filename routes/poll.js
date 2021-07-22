import express from "express";
import { createConnection } from "../index.js";
import { deletePollById, getPollById, getPolls, insertPoll } from "./helper.js";
const router = express.Router();

router
  .route("/")
  .get(async (request, response) => {
    const client = await createConnection();
    const contestants = await getPolls(client, {});
    response.send(contestants);
  })
  .post(async (request, response) => {
    const { body } = request;
    console.log(body);

    const client = await createConnection();
    const contestant = await insertPoll(client, body);

    response.send(contestant);
  });

router
  .route("/:id")
  .get(async (request, response) => {
    const id = request.params.id;
    const client = await createConnection();
    const contestant = await getPollById(client, id);

    response.send(contestant);
  })
  .delete(async (request, response) => {
    const id = request.params.id;
    const client = await createConnection();
    const contestant = await deletePollById(client, id);
    response.send(contestant);
  });

router.get("/content/:content", async (request, response) => {
  const content = request.params.content;
  const client = await createConnection();
  const contestant = await getPolls(client, {
    content: { $regex: new RegExp(content, "i") },
  });
  response.send(contestant);
});

router.get("/name/:companyname", async (request, response) => {
  const companyname = request.params.companyname;
  const client = await createConnection();
  const contestants = await getPolls(client, { company: companyname });
  response.send(contestants);
});

export const pollRouter = router;
