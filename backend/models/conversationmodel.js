import mongoose from "mongoose";

// Create a class extending mongoose.Schema
class ConversationSchema extends mongoose.Schema {
    constructor() {
        super({
            participants: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
            ],
            messages: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Message",
                    default: [],
                },
            ],
        }, { timestamps: true });
    }
}

// Convert the ConversationSchema class into a Mongoose model
const Conversation = mongoose.model("Conversation", new ConversationSchema());

export default Conversation;
