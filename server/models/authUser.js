import mongoose from "mongoose";

const authUser = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{type: String, ref: 'Role'}]
});

export default mongoose.model("authUser", authUser);