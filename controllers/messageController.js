const Message = require('../models/Message');
class MessageController {
    createMessage = async (req, res) => {
        const newMessage = new Message(req.body)
        try {
            const savedMessage = await newMessage.save();
            res.status(201).json(savedMessage)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    getConvesation = async (req,res) => {
        try {
            const message= await Message.find({
                conversationId:req.params.conversationId,
            })
            res.status(200).json(message)
        } catch (err) {
            
        }
    }
    getAllMessages = async (req,res) => {
        try {
            const message= await Message.find()
            res.status(200).json(message)
        } catch (err) {
            
        }
    }
}
module.exports = new MessageController();