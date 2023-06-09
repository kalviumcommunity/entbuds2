const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    reviews: [
      {
        name: {
          type: String,
          required: true,
        },
        review: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        likes: {
          type: [String],
          default: [],
        },
        replies: [
          {
            text: String,
            user: String,
            userimage: String,
            likes: [String],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
