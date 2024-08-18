const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const tokenControl = require("./middleware/auth");
require("dotenv").config();

const app = express();
app.use(express.json());

// Cors Middleware
app.use(
  cors({
    origin: "*",
  })
);

// MongoDB Bağlantısı Kurma
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("express-schipnol-airport-case-study");
});

// User Route
app.use("/user", userRouter);

// Uygulamanın çalıştığı portu belirleme
app.listen(9000);
