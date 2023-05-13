import mongoose from "mongoose";

const authUser = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  refresh_token: {type: String, require: false},
  roles: [{type: String, ref: 'Role'}]
});

export default mongoose.model("authUser", authUser);