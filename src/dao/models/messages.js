import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  user: String, 
  message: String, 
});

module.exports = mongoose.model('Message', messageSchema);