const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const lyricsRoute = require('./routes/lyricsRoute');
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoute");
const mongoose = require('mongoose');
const loginRoute = require("./routes/loginRoute");
const refreshRoute = require("./routes/refreshRoute");
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/user' ,userRouter);
app.use("/login", loginRoute);
app.use("/refresh", refreshRoute);
app.use("/lyrics", lyricsRoute);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://vaidik24:Vaidik2405@cluster0.rd6wiou.mongodb.net/test', {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: {conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
connectDB();

app.listen(3001, function () {
  console.log("Server running on port 3001");
});
