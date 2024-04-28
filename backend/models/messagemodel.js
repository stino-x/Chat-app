import mongoose from "mongoose";

// Create a class extending mongoose.Schema
class MessageSchema extends mongoose.Schema {
    constructor() {
        super({
            senderId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            receiverId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            message: {
                type: String,
                required: true,
            },
        }, { timestamps: true });
    }
}

// Convert the MessageSchema class into a Mongoose model
const Message = mongoose.model("Message", new MessageSchema());

export default Message;
