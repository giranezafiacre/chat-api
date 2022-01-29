const User = require("../models/User");
const bcrypt = require("bcrypt");

class UsersController {
    updateUser = async (req, res) => {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            if (req.body.password) {
                try {
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password, salt);
                } catch (err) {
                    return res.status(500).json(err);
                }
            }
            try {
                const user = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                });
                res.status(200).json("Account has been updated");
            } catch (err) {
                return res.status(500).json(err);
            }
        } else {
            return res.status(403).json("You can update only your account!");
        }
    }
    deleteUser = async (req, res) => {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            try {
                await User.findByIdAndDelete(req.params.id);
                res.status(204).json("Account has been deleted");
            } catch (err) {
                return res.status(500).json(err);
            }
        } else {
            return res.status(403).json("You can delete only your account!");
        }
    }
    getUser = async (req, res) => {
        const userId = req.query.userId;
        const username = req.query.username;
        try {
            const user = userId
                ? await User.findById(userId)
                : await User.findOne({ username: username });
            const { password, updatedAt, ...other } = user._doc;
            res.status(200).json(other);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    getAllUsers = async (req,res) => {
        try {
            const users= await User.find()
            res.status(200).json(users)
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
module.exports = new UsersController();