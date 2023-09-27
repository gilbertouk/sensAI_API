require("dotenv").config();
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let chatMessagesCollection;

try {
  client.connect();

  const db = client.db("sensAI");
  chatMessagesCollection = db.collection("chatMessages");

  console.log("Connected to the database successfully!");
} catch (err) {
  console.log(err);
  client.close();
} finally {
  client.close();
}

module.exports = { chatMessagesCollection };
