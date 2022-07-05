const express = require("express");
const path = require("path");
//Routes
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const cookie = require("cookie-session");
const noCache = require("nocache");
const xssClean = require("xss-clean");
const app = express();

const cors = require("cors");
app.use(cors());

//Accès à l'api
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cross-Origin-Opener-Policy", "cross-origin");
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//Cookies
const expiresDate = new Date(Date.now() + 60 * 60 * 1000);

app.use(
  cookie({
    secret: "sessionS3cur3",
    cookie: {
      secure: true,
      httpOnly: true,
      domain: "http://localhost:8080/",
      expires: expiresDate,
    },
  })
);

app.use(noCache());
app.use(xssClean());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));
// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

module.exports = app;
