require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const { Messages } = require("./models/message");

// Mongo Setup
mongoose.set("strictQuery", false);
const mongoDB = "mongodb://localhost:27017/message_board";
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const app = express();

// Makes public folder available
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hello World");
  // const message = new Messages({ messageContent: "awesome" });
  // const message = Messages.create({ messageContent: "awesome" })
  // console.log(message);
  // message.save();
});

app.listen(process.env.PORT);

console.log(`Server running at localhost:${process.env.PORT}`);
