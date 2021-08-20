const { ObjectID } = require("bson");
const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017");

exports.createChat = async (userName) => {
  try {
    await client.connect();
    const date = new Date();
    const chat = await client
      .db("chat_app")
      .collection("chats")
      .insertOne({
        userName,
        messages: [],
        isOpen: true,
        lastUpdate: date.toLocaleDateString() + " " + date.toLocaleTimeString(),
      });
    return chat.insertedId;
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

exports.sendMessage = async (message, chatId, isSenderCustomer) => {
  try {
    const date = new Date();
    const humanizeDate =
      date.toLocaleDateString() + " " + date.toLocaleTimeString();
    await client.connect();
    return await client
      .db("chat_app")
      .collection("chats")
      .updateOne(
        { _id: ObjectID(chatId) },
        {
          $push: {
            messages: {
              timestamp: humanizeDate,
              isSenderCustomer,
              message,
            },
          },
          $set: {
            lastUpdate: humanizeDate,
          },
        }
      );
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

exports.getChatMessages = async (chatId) => {
  try {
    await client.connect();
    chat = await client
      .db("chat_app")
      .collection("chats")
      .findOne({ _id: ObjectID(chatId) });
    return chat.messages;
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

exports.getChats = async (userName) => {
  try {
    await client.connect();
    const chats = await client
      .db("chat_app")
      .collection("chats")
      .find({ userName })
      .limit(10)
      .sort("lastUpdate", -1)
      .toArray();
    return chats;
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

exports.getSupportChats = async () => {
  try {
    await client.connect();
    const chats = await client
      .db("chat_app")
      .collection("chats")
      .find({})
      .sort("lastUpdate", -1)
      .toArray();
    return chats;
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};
