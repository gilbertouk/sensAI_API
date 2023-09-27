require("../db/mongodbConnection");
const { chatMessagesCollection } = require("../db/mongodbConnection");

async function getChatMessages(room_id) {
  const chatHistory = await chatMessagesCollection.findOne({ room_id });

  return chatHistory;
}

async function patchChatMessages(room_id, data) {
  const chatHistory = await getChatMessages(room_id);
  delete chatHistory._id;
  chatHistory.messages.push(data);

  const updated = await chatMessagesCollection.updateOne(
    { room_id },
    { $set: chatHistory }
  );

  return updated;
}

async function insertNewRoom(room_id) {
  const result = await chatMessagesCollection.insertOne({
    room_id: room_id,
    messages: [],
  });

  return result;
}

module.exports = { getChatMessages, patchChatMessages, insertNewRoom };
