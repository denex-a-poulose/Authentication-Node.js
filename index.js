const express = require("express");

const app = express();
app.use(express.json());

const users = [];

// Return a random long string which is **Token**

const generateToken = () => {
  let options = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  let token = "";

  for (let i = 0; i < 32; i++) {
    token += options[Math.floor(Math.random() * options.length)];
  }
  return token;
};

const signUpHandler = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username: username,
    password: password,
  });

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
    let token = generateToken();
    user.token = token;
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

app.post("/signup", signUpHandler);
app.post("/signin", signInHandler);
app.get("/me", (req, res) => {
  const token = req.headers.token;

  let foundUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].token == token) {
      foundUser = users[i];
    }
  }

  if (foundUser) {
    res.json({
      username: foundUser.username,
      password: foundUser.password,
    });
  } else {
    res.json({
      message: "invalid token",
    });
  }
});
app.listen(3000, () => console.log("Listening on Port 3000"));
