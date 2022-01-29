const router = require("express").Router();
const messageController = require("../controllers/messageController");

//new message
router.post('/',messageController.createMessage);
router.get('/',messageController.getAllMessages)
//get
router.get("/:conversationId", messageController.getConvesation)
module.exports = router;