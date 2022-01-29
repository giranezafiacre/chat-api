const conversationController = require("../controllers/conversationController");

const router = require("express").Router();

//create new conversation
router.post('/', conversationController.createConversation)

//get conversation of users
router.get("/:userId",conversationController.getConversation)

//get conv incudes two userId
router.get("/find/:firstUserId/:secondUserId", conversationController.getConversationOfTwo)
module.exports = router;