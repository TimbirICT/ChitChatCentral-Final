import User from "../models/User.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "password is incorrect"});
        }

        const user = await User.findOne({ username });
        
        if (user) {
            return res.status(400).json({ error: "Username already in exists" });

            const newUser = new User({
                fullName,
                username,
                password,
                profile picture,
            });

            if (newUser) {
                await newUser.save();
            }

            res.status(201).json({
                _id:newUser._id,
                fullName: newUser.fullName,
                userName: newUser.username,
                profilePicture: newUser.profilePicture,
            });
        } else {
            res.status(404).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.log("error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });


        if (!user || !ispasswordcorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        res.status(200).json({
            _id: user.id,
            fullName: user.fullName
            userName: user.userName,
            profilePicture: user.profilePicture,
        });
    } catch (error) {
        console.log("error in login controller". error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "logged out successfully" });
    } catch (error) {
        console.log("error in logout controller". error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};