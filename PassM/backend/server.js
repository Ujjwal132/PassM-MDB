const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const bodyparser = require("body-parser");
const cors = require("cors");

dotenv.config();

// Connecting to the MongoDB Client
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
client.connect();

// App & Database
const dbName = process.env.DB_NAME;
const app = express();
const port = 3000;

// Middleware
app.use(bodyparser.json());
app.use(cors());

// get all passwords
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// save password
app.post("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(password);
  res.send({ success: true, result: findResult });
});

// delete a password by id
app.delete("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne(password);
  res.send({ success: true, result: findResult });
});

// update password by id
app.put("/:id", async (req, res) => {
  const { id } = req.params; // get the id from URL params
  const { _id, ...updatedPassword } = req.body; // destructure to remove _id from the update

  const db = client.db(dbName);
  const collection = db.collection("passwords");

  // Update the password entry with the matching id (but don't update the _id field)
  const findResult = await collection.updateOne(
    { id: id }, // find by id (not _id, since you're storing uuid as id)
    { $set: updatedPassword } // update all fields except _id
  );

  if (findResult.matchedCount > 0) {
    res.send({ success: true, message: "Password updated successfully!" });
  } else {
    res.status(404).send({ success: false, message: "Password not found!" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
