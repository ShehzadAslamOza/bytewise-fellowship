const User = require("../model/User");
// const path = require("path");
// const fsPromises = require("fs").promises;

// const usersDB = {
//   users: require("../model/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204);
  } // No Content

  const refreshToken = cookies.jwt;

  // Is refresh Token in db
  //   const foundUser = usersDB.users.find(
  //     (person) => person.refreshToken === refreshToken
  //   );
  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }

  // If refresh token in db
  foundUser.refreshToken = "";
  await foundUser.save();

  //   const otherUsers = usersDB.users.filter(
  //     (person) => person.refreshToken !== foundUser.refreshToken
  //   );
  //   const currentUser = { ...foundUser, refreshToken: "" };
  //   usersDB.setUsers([...otherUsers, currentUser]);

  //   await fsPromises.writeFile(
  //     path.join(__dirname, "..", "model", "users.json"),
  //     JSON.stringify(usersDB.users)
  //   );

  res.clearCookie("jwt", { httpOnly: true }); // secure:true (serves only https)
  res.sendStatus(204);
};

module.exports = { handleLogout };
