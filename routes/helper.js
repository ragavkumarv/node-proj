export async function getPollById(client, id) {
  const result = await client
    .db("contestants")
    .collection("poll")
    .findOne({ id: +id });
  console.log("Succesfully local connected", id, result);
  return result;
}
export async function getPolls(client, filter) {
  const result = await client
    .db("contestants")
    .collection("poll")
    .find(filter)
    .toArray();
  console.log("Succesfully connected", result);
  return result;
}
export async function insertPoll(client, poll) {
  const result = await client
    .db("contestants")
    .collection("poll")
    .insertMany(poll);
  console.log("Inserted successfully", result);
  return result;
}
