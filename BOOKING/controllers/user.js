import { User } from "../api/models/User.model.js";

// ✅ UPDATE USER
export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // Return updated document
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

// ✅ DELETE USER
export const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({ message: "User deleted successfully." });
    } catch (err) {
        next(err);
    }
};

// ✅ GET SINGLE USER
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

// ✅ GET ALL USERS
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find(); // Fetch all users
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};
