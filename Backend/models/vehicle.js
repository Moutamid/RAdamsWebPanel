const mongoose = require("mongoose");

const VehicleSchema = mongoose.Schema(
  {
    number: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("vehicle", VehicleSchema);
