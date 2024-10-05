const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "JWT_SECRET";
const app = express();
app.use(express.json());

const users = [];

// logger middleware

const logger = (req, res, next) => {
  console.log(`${req.method} request came.`);
  next();
};

const signUpHandler = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username: username,
    password: password,
  });

  // should check if this username already exists

  res.json({
    message: "You're signed up!",
  });

  console.log(users);
};
const signInHandler = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find((u) => {
    if (u.username == username && u.password == password) {
      return true;
    } else {
      return false;
    }
  });

  if (user) {
    let token = jwt.sign(
      {
        username: username,
      },
      JWT_SECRET
    );
    // user.token = token;
    res.json({
      token: token,
    });
  } else {
    res.status(403).send({
      message: "Invalid Username or Password.",
    });
  }

  console.log(users);
};

app.post("/signup", logger, signUpHandler);
app.post("/signin", logger, signInHandler);

// Auth middleware

const auth = (req, res, next) => {
  const token = req.headers.token;
  const decodedData = jwt.verify(token, JWT_SECRET);
  if (decodedData.username) {
    req.username = decodedData.username;
    next();
  } else {
    res.json({
      message: "You are not logged in.",
    });
  }
};

app.get("/me", logger, auth, (req, res) => {
  const currentUser = req.username;
  //   const token = req.headers.token;
  //   const decodedData = jwt.verify(token, JWT_SECRET);
  //   const currentUser = decodedData.username;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username == currentUser) {
      foundUser = users[i];
    }
  }

  res.json({
    username: foundUser.username,
    password: foundUser.password,
  });
});

app.listen(3000, () => console.log("Listening on Port 3000"));
