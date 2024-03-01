const mongoose = require("mongoose");

const TicketSchema = mongoose.Schema(
  {
    vehicle: {
      type: String,
      required: true,
    },
    driver: {
      type: String,
      required: true,
    },
    h_code: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    date: {
      type: Date,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ticket", TicketSchema);
