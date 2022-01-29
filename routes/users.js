const router = require("express").Router();
const usersController = require("../controllers/usersController");

//update user
router.put("/:id",usersController.updateUser );

//delete user
router.delete("/:id", usersController.deleteUser);

// get all users
// router.get("/", usersController.getAllUsers);

//get a user
router.get("/", usersController.getUser);


module.exports = router;
