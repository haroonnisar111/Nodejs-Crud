const User = require('../model/user');
const bcrypt = require('bcrypt');
const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'username and password are required.' });
  const duplicate = await User.findOne({ usernmae: user }).exec();
  if (duplicate) return res.sendStatus(409);
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // create and store new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });
    console.log(result);
    res.status(201).json({ success: 'new user created' });
  } catch {
    res.status(500).json({ message: 'user not created' });
  }
};
module.exports = { handleNewUser };
