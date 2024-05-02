import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

class AuthController {
    static async signup(req, res) {
        try {
            const { fullName, username, password, confirmPassword, gender } = req.body;

            if (password !== confirmPassword) {
                return res.status(400).json({ error: "Passwords don't match" });
            }

            const user = await User.findOne({ username });

            if (user) {
                return res.status(400).json({ error: "Username already exists" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const profilePicUrl = `https://avatar.iran.liara.run/public/${gender === "male" ? "boy" : "girl"}?username=${username}`;

            const newUser = new User({
                fullName,
                username,
                password: hashedPassword,
                gender,
                profilePic: profilePicUrl,
            });

            await newUser.save();
            generateTokenAndSetCookie(newUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        } catch (error) {
            console.error("Error in signup controller", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            const isPasswordCorrect = user && await bcrypt.compare(password, user.password);

            if (!isPasswordCorrect) {
                return res.status(400).json({ error: "Invalid username or password" });
            }

            generateTokenAndSetCookie(user._id, res);

            res.status(200).json({
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
                profilePic: user.profilePic,
            });
        } catch (error) {
            console.error("Error in login controller", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static logout(req, res) {
        try {
            res.cookie("jwt", "", { maxAge: 0 });
            res.status(200).json({ message: "Logged out successfully" });
        } catch (error) {
            console.error("Error in logout controller", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default AuthController;
