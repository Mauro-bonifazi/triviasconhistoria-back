const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "UserTrivias" } // Aquí poné el nombre exacto de tu colección en Atlas
);

module.exports = mongoose.model("User", UserSchema);
