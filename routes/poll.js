import express from "express";
import {
  deletePollById,
  getPollById,
  getPolls,
  insertPoll,
  replacePollById,
  updatePollById,
} from "../helper.js";
import { createConnection } from "../index.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// 5x+6x -> x(5 + 6)

// app - router & removed poll word (we know that when pollRouter it start with /poll)
router
  .route("/")
  .get(auth, async (request, response) => {
    const client = await createConnection();
    const contestants = await getPolls(client, {});
    response.send(contestants);
  })
  .post(auth, async (request, response) => {
    const client = await createConnection();
    const polls = request.body;
    const contestants = await insertPoll(client, polls);
    response.send(contestants);
  });

// "/poll/name/Samsung" - search by name
router.get("/name/:companyname", auth, async (request, response) => {
  const companyname = request.params.companyname;
  const client = await createConnection();
  const contestants = await getPolls(client, { company: companyname });
  response.send(contestants);
});

router
  .route("/:id")
  .get(auth, async (request, response) => {
    const id = request.params.id;
    const client = await createConnection();
    const contestant = await getPollById(client, +id);
    response.send(contestant);
  })
  .patch(auth, async (request, response) => {
    const id = request.params.id;
    const client = await createConnection();
    const newPoll = request.body;
    const contestant = await updatePollById(client, +id, newPoll);
    response.send(contestant);
  })
  .put(auth, async (request, response) => {
    const id = request.params.id;
    const client = await createConnection();
    const newPoll = request.body;
    const contestant = await replacePollById(client, +id, newPoll);
    response.send(contestant);
  })
  .delete(auth, async (request, response) => {
    const id = request.params.id;
    const client = await createConnection();
    const contestant = await deletePollById(client, +id);
    response.send(contestant);
  });
// patch - update of mongodb (id) , India - China (body)

// "/poll/content/China" - search by content - regex
router.get("/content/:search", auth, async (request, response) => {
  const search = request.params.search;
  const client = await createConnection();
  const contestants = await getPolls(client, {
    content: { $regex: search, $options: "i" },
  });
  response.send(contestants);
});

// i - Case insensitive - to match uppercase& lowercase

export const pollRouter = router;
