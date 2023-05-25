const express = require("express");
const router = express.Router();
const Review = require("../schemas/reviewsSchema");

router.get("/review/:title", async (req, resp) => {
  const { title } = req.params;

  try {
    const review = await Review.findOne({ title });

    if (!review) {
      resp.status(200).json({ exist: false });
    } else {
      resp.status(200).json({ exist: true, out: review });
    }
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
});

router.post("/review", async (req, resp) => {
  const { title, reviews } = req.body;

  try {
    const review = await Review.create({
      title,
      reviews,
    });
    if (!review) {
      return resp.status(400).json(review);
    } else {
      return resp.status(200).json(review);
    }
  } catch (e) {
    return resp.status(200).json({ error: e.message });
  }
});

router.put("/review", async (req, resp) => {
  const { title, reviews } = req.body;

  try {
    const review = await Review.findOneAndUpdate(
      { title },
      { $push: { reviews: reviews } },
      { new: true }
    );
    if (!review) {
      resp.status(400).json(review);
    } else {
      resp.status(200).json(review);
    }
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
});

router.put("/review/edit/:title/:_id", async (req, resp) => {
  const { title, _id } = req.params;
  const { text } = req.body;

  try {
    const movie = await Review.findOne({ title });

    if (movie) {
      const review = movie.reviews.find((r) => r._id.toString() === _id);

      if (review) {
        review.review = text;
        await movie.save();

        const updatedReview = movie.reviews.find((r) => r._id.toString() === _id);
        resp.status(200).json(updatedReview);
      } else {
        resp.status(404).json({ mssg: "Review not found" });
      }
    } else {
      resp.status(400).json({ mssg: "Movie not found" });
    }
  } catch (e) {
    resp.status(500).json({ mssg: e.message });
  }
});



router.delete("/review/:title/:_id", async (req, resp) => {
  const { title, _id } = req.params;

  try {
    const review = await Review.findOneAndUpdate(
      { title },
      { $pull: { reviews: { _id } } },
      { new: true }
    );
    if (!review) {
      resp.status(400).json(review);
    } else {
      resp.status(200).json(review);
    }
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
});

router.put("/review/like/:title/:_id/:email", async (req, resp) => {
  const { email, title, _id } = req.params;
  try {
    const movie = await Review.findOne({ title });
    if (movie) {
      const review = movie.reviews.find((r) => r._id.toString() === _id);
      if (review) {
        if (review.likes && review.likes.includes(email)) {
          review.likes = review.likes.filter((item) => item !== email);
        } else {
          if (!review.likes) {
            review.likes = [email];
          } else {
            review.likes.push(email);
          }
        }
        await movie.save();
        const UpdatedReview = movie.reviews.find(
          (r) => r._id.toString() === _id
        );
        resp.status(200).json(UpdatedReview);
      } else {
        resp.status(404).json({ mssg: "Review not found" });
      }
    } else {
      resp.status(400).json({ mssg: "Movie not found" });
    }
  } catch (e) {
    resp.status(500).json({ mssg: e.message });
  }
});

router.post("/review/reply/:title/:parent_id", async (req, resp) => {
  const { title, parent_id } = req.params;
  const { text, user, userimage } = req.body;

  try {
    const movie = await Review.findOne({ title });

    if (movie) {
      const parentReview = movie.reviews.find(
        (r) => r._id.toString() === parent_id
      );

      if (parentReview) {
        const reply = {
          text,
          user,
          userimage,
          likes: [],
        };

        parentReview.replies.push(reply);
        await movie.save();

        resp.status(200).json(reply);
      } else {
        resp.status(404).json({ mssg: "Parent review not found" });
      }
    } else {
      resp.status(400).json({ mssg: "Movie not found" });
    }
  } catch (e) {
    resp.status(500).json({ mssg: e.message });
  }
});



module.exports = router;
