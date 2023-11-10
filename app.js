require("dotenv").config();
const path = require("path");
const express = require("express");
const pug = require("pug");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const { Messages } = require("./models/message");

// Mongo Setup
const mongoDB = process.env.DATABASE_URL;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const app = express(); // Setting up express
app.set("view engine", "pug"); // Configures express to expect pug templates for views

// Makes public folder available
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  const messages = await Messages.find();
  const compiledPugTemplate = pug.renderFile("./views/index.pug", { messages });
  res.send(compiledPugTemplate);
});

app.get("/new", async (req, res) => {
  const compiledPugTemplate = pug.renderFile("./views/new.pug");
  res.send(compiledPugTemplate);
});

app.listen(process.env.PORT);

console.log(`Server running at localhost:${process.env.PORT}`);
