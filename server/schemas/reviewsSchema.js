const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    reviews: {
      type: [
        {
          name: { type: String, required: true },
          review: { type: String, required: true },
          image: { type: String, required: true },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("review", reviewSchema);
