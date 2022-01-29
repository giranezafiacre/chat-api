const User = require("../models/User");
const Conversation = require("../models/Conversation");
const bcrypt = require("bcrypt");

class AuthController {
  createConversation = async (adminId, receiverId) => {
    const newConv = new Conversation({
      members: [adminId, receiverId]
    })
    try {
      const savedConversation = await newConv.save();
    } catch (err) {
      console.log(err)
    }
  }
  register = async (req, res) => {
    try {
      //generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      //create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      //save user and respond
      const user = await newUser.save();
      const userId = user._id
      await this.createConversation('61ebe60b2c57850ff8526f68', user._id.toString());
      res.status(200).json(user);
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

  login = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(400).json("data not match");

      const validPassword = await bcrypt.compare(req.body.password, user.password)
      !validPassword && res.status(400).json("data not match")

      res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
module.exports = new AuthController();