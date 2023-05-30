const bcrypt = require("bcrypt");
const User = require("../model/User");
// const path = require("path");

// const usersDB = {
//   users: require("../model/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  // If user and pwd are not present
  if ((!user, !pwd))
    return res
      .status(400)
      .json({ message: "Username and Password are required!" });

  // check for duplicates
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409);

  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // create and store new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });

    console.log(result);

    // usersDB.setUsers([...usersDB.users, newUser]);
    // await fsPromises.writeFile(
    //   path.join(__dirname, "..", "model", "users.json"),
    //   JSON.stringify(usersDB.users)
    // );

    // console.log(usersDB.users);
    res.status(201).json({ success: `New User ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
