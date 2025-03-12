import express from "express";
import {
    updateUser,
    deleteUser,
    getUser,
    getUsers,
} from "../../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"

const router = express.Router();

// check authentication
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("hello user you are logged in!");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("hello user you are logged in and you can deleted account!");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("hello Admin you are logged in and you can deleted account!");
// });
// UPDATE
router.put("/:id", verifyUser, updateUser);

// DELETE
router.delete("/:id", verifyUser, deleteUser);

// GET SINGLE User
router.get("/:id", verifyUser, getUser);

// GET ALL UserS
router.get("/", verifyAdmin, getUsers);

export default router;