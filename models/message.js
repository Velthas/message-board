const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  messageContent: { type: String, required: true },
  messageDate: { type: Date, required: true },
  messageColorHex: { type: String, required: true },
});

const Messages = mongoose.model("messages", messageSchema);

module.exports = { Messages };
