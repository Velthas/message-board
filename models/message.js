const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  messageContent: String,
  messageDate: Date,
  messageColorHex: String,
});

const Messages = mongoose.model("messages", messageSchema);

module.exports = { Messages };
