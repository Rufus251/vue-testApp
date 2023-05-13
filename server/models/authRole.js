import mongoose from "mongoose";

const authRole = new mongoose.Schema({
  value: {type: String, unique: true, default: 'user'}
});

export default mongoose.model("authRole", authRole);