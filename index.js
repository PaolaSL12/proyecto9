require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db");
const characterRouter = require("./src/api/routes/characters");

const app = express();

connectDB();

app.use("/api/v1/characters", characterRouter)

app.listen(3000, () => {
    console.log("http://localhost:3000");
})