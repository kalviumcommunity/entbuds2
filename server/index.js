const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const reviewRouter = require("./routes/extreview");
const PORT = process.env.PORT;
const DB = process.env.DB;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", reviewRouter);

mongoose
  .connect(DB, {
    family: 4,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connected and listening on PORT:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
