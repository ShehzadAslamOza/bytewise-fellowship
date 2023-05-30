const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
// const path = require("path");
// const fsPromises = require("fs").promises;

// const usersDB = {
//   users: require("../model/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  // If user and pwd are not present
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and Password are required!" });

  // const foundUser = usersDB.users.find((person) => person.username === user);
  const foundUser = await User.findOne({ username: user }).exec();
  console.log(foundUser);
  if (!foundUser) return res.sendStatus(401); // Unauthorized

  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    const roles = Object.values(foundUser.roles);
    console.log(roles);

    // JWT Tokens
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Updating the user with refresh token
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    // // Savinf Refresh Token with current user
    // const otherUsers = usersDB.users.filter(
    //   (person) => person.username !== foundUser.username
    // );
    // const currentUser = { ...foundUser, refreshToken };
    // usersDB.setUsers([...otherUsers, currentUser]);

    // await fsPromises.writeFile(
    //   path.join(__dirname, "..", "model", "users.json"),
    //   JSON.stringify(usersDB.users)
    // );

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
