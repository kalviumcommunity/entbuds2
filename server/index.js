const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const reviewRouter = require("./routes/extreview");
const listRouter  = require("./routes/list")
const PORT = process.env.PORT;
const DB = process.env.DB;
const MONGO = process.env.MONGODB_TEST;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", reviewRouter);
app.use("/api", listRouter)


mongoose
  .connect(MONGO, {
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
