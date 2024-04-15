import db from "../db/connection.js";
import express from "express";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all
router.get("/", async (req, res) => {
  let collection = await db.collection("lists");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// Get by _id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("lists");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Create new list
router.post("/", async (req, res) => {
  try {
    let newDocument = req.body;
    let collection = await db.collection("lists");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// Update by _id
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        list: req.body.list,
      },
    };

    let collection = await db.collection("lists");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// Delete by _id
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("lists");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;
