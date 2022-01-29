const Conversation = require("../models/Conversation");
class ConversationController{
    createConversation = async (req,res) => {
        const newConv = new Conversation({
            members:[req.body.senderId, req.body.receiverId]
        })
        try{
           const savedConversation = await newConv.save();
           res.status(201).json(savedConversation)
        }catch(err){
            res.status(500).json(err)
        }
    }
    getConversation = async (req,res) => {
        try {
            const conversation = await Conversation.find({
                members:{$in: [req.params.userId] },
            })
            res.status(200).json(conversation)
         }catch(err){
             res.status(500).json(err)
         } 
    }
    getConversationOfTwo = async (req,res) => {
        try {
            const conversation = await Conversation.findOne({
                members:{$all:[req.params.firstUserId,req.params.secondUserId]}
            })
            res.status(200).json(conversation)
        } catch (err) {
            res.status(500).json(err);
        }
    }
} 
module.exports = new ConversationController();