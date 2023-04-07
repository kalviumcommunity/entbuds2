const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

app.use(cors());
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/EntBuds", {
    useNewUrlParser: true ,
    useUnifiedTopology: true ,
    family: 4
})
.then(() => {
    app.listen("4000", () => {
        console.log("Connection Successful");
    });
})
.catch((error) => {
    console.log(error);
})