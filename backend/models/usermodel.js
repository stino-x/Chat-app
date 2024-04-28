import mongoose from "mongoose";

// Create a class extending mongoose.Schema
class UserSchema extends mongoose.Schema {
    constructor() {
        super({
            fullName: {
                type: String,
                required: true,
            },
            username: {
                type: String,
                required: true,
                unique: true
            },
            password: {
                type: String,
                required: true,
                minlength: 6
            },
            gender: {
                type: String,
                required: true,
                enum: ["male", "female"]
            },
            profilePic: {
                type: String,
                default: ""
            },
        }, { timestamps: true });
    }
}

// Convert the UserSchema class into a Mongoose model
const User = mongoose.model("User", new UserSchema());

export default User;
