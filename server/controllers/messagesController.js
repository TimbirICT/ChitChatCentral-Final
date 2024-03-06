import Conversation from "../models/Conversation";
import Message from "../models/Message";


export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const {id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message,
        })

        if(newMessage) {
            conversation.messages.push(newMessage);
            await conversation.save();
            res.status(200).json(newMessage);
        }

    } catch (err) {
        console.log(err);
    }
};


