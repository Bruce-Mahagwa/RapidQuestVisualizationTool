// dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// files and functions
const connectDB = require("./config/db");
const apiRoutes = require("./routes/apiRoutes");
// const SpaceModel = require("./models/SpaceModel");
// const PostModel = require("./models/PostModel");
// const CommentsModel = require("./models/CommentModel");
// variables
const app = express();
const PORT = 4000;
const whitelist = [
  "https://things-we-like-client.vercel.app",
  "https://things-we-like-client.vercel.app/"
];
const corsoptions = {
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }
    if (whitelist.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      console.log(whitelist.indexOf(origin));
      return callback(new Error("not allowed by cors"));
    }
  },
  credentials: true,
};

app.use(cors(corsoptions));
app.use(express.json());
app.use(cookieParser());
app.use(apiRoutes);
// socket io
// const server = require("http").createServer(app);
// const io = require("socket.io")(server, { 
//   cors: { 
//     origin: ["https://things-we-like-client.vercel.app", "https://things-we-like-client.vercel.app/", "http://things-we-like-client.vercel.app", "http://things-we-like-client.vercel.app/"], 
//     credentials: true
//   }
// });

// connect
connectDB();

app.listen(PORT)