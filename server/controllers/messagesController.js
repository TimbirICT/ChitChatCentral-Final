import Conversation from "../models/Conversation";
import Message from "../models/Message";

export const sendMessage = async (req, res) => {
};




export const getMessages = async (req, res) => {
    try {
        const {id:userToChatId} = req.params;
        const senderID = req.user._id;

        const conversation = await Conversation.findOne({
           participants: {$all: [senderId, userToChatId] }
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error: "Bad Request"
        });
    }
};