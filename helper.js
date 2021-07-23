export async function getPollById(client, id) {
  const result = await client
    .db("contestants")
    .collection("poll")
    .findOne({ id: id });
  console.log("Succesfully connected", result);
  return result;
}
export async function deletePollById(client, id) {
  const result = await client
    .db("contestants")
    .collection("poll")
    .deleteOne({ id: id });
  console.log("Succesfully connected", result);
  return result;
}
export async function getPolls(client, filter) {
  const result = await client
    .db("contestants")
    .collection("poll")
    .find(filter)
    .toArray();

  // db.poll.find({color: 'green'})
  console.log("Succesfully connected", result);
  return result;
}
export async function insertPoll(client, polls) {
  const result = await client
    .db("contestants")
    .collection("poll")
    .insertMany(polls);
  console.log("Inserted successfully", result);
  return result;
}

export async function insertUser(client, user) {
  const result = await client
    .db("contestants")
    .collection("user")
    .insertOne(user);
  console.log("Inserted successfully", result);
  return result;
}

export async function getUsers(client, filter) {
  const result = await client
    .db("contestants")
    .collection("user")
    .find(filter)
    .toArray();

  // db.poll.find({color: 'green'})
  console.log("Succesfully connected", result);
  return result;
}

export async function getUser(client, filter) {
  const result = await client
    .db("contestants")
    .collection("user")
    .findOne(filter);

  // db.poll.find({color: 'green'})
  console.log("Succesfully connected", result);
  return result;
}
