require("dotenv").config();
const path = require("path");
const express = require("express");
const pug = require("pug");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const { Messages } = require("./models/message");

const urls = {
  HOME: "/",
  NEW: "/new",
};

// Mongo Setup
const mongoDB = process.env.DATABASE_URL;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// Setting up express
const app = express();

// Middleware
app.set("view engine", "pug"); // Configures express to expect pug templates for views
app.use(express.static(path.join(__dirname, "public"))); // Makes public folder available
app.use(express.urlencoded({ extended: true })); // Populating body in post requests
app.use(express.json()); // Parse JSON requests

// Routing
app.get(urls.HOME, async (req, res) => {
  const messages = await Messages.find();
  res.render("./views/index.pug", { messages });
});

app.get(urls.NEW, async (req, res) => {
  res.render("./views/new.pug");
});

app.post(urls.NEW, async (req, res) => {
  console.log(req.body);
});

const PORT = process.env.PORT | 8000;
app.listen(PORT);
console.log(`Server running at localhost:${process.env.PORT}`);
