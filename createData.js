#! /usr/bin/env node
console.log(
  'This script populates some messages into the db- e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Your connection string would look something like mongodb://localhost:27017/DBNAME

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

// Get the model(s)
const { Messages } = require("./models/message");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Connection string is first arg
const mongoDB = userArgs[0];
main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createMessages();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// Creates and saves a message document
async function messageCreate(messageContent, hex) {
  const message = new Messages({
    messageContent: messageContent,
    messageColorHex: hex,
    messageDate: new Date(),
  });
  await message.save();
  console.log(`Added message: ${message}`);
}

// Creates a bunch of messages
async function createMessages() {
  console.log("Adding messages");
  await Promise.all([
    messageCreate(
      "Stay away from those people who try to disparage your ambitions. Small minds will always do that, but great minds will give you a feeling that you can become great too.",
      "#4D4C7D"
    ),
    messageCreate(
      "Nature has given us all the pieces required to achieve exceptional wellness and health, but has left it to us to put these pieces together",
      "#F99417"
    ),
    messageCreate(
      "Nothing in the world can take the place of Persistence. Talent will not; nothing is more common than unsuccessful men with talent. Genius will not; unrewarded genius is almost a proverb. Education will not; the world is full of educated derelicts. The slogan 'Press On' has solved and always will solve the problems of the human race.",
      "#363062"
    ),
  ]);
}
