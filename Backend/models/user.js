const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    userName: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    vehicle: {
      type: String,
      trim: true,
      required: true,
    },
    permission: {
      type: String,
      enum: ["Admin", "Driver"],
      default: "Driver",
    },
    password: {
      type: String,
      required: true,
    },
    salt: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
