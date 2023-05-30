const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fsPromises = require("fs").promises;
require("dotenv").config();

const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  // If user and pwd are not present
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and Password are required!" });

  const foundUser = usersDB.users.find((person) => person.username === user);
  console.log(foundUser);
  if (!foundUser) return res.sendStatus(401); // Unauthorized

  const match = await bcrypt.compare(pwd, foundUser.password);
  console.log("reached jere");

  if (match) {
    // JWT Tokens
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Savinf Refresh Token with current user
    const otherUsers = usersDB.users.filter(
      (person) => person.username !== foundUser.username
    );
    const currentUser = { ...foundUser, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );

    // res.cookie("jwt", refreshToken, {
    //   httpOnly: true,
    //   sameSite: "None",
    //   secure: true,
    //   maxAge: 24 * 60 * 60 * 1000,
    // });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
