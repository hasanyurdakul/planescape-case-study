const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const tokenControl = require("./middleware/auth");

require("dotenv").config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("express-schipnol-airport-case-study");
});

app.use("/user", userRouter);

app.listen(9000);
