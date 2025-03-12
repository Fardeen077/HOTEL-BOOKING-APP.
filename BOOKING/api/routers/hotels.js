import express from "express";
import {
    createHotel,
    deleteHotel,
    getHotel,
    getHotels,
    updateHotel
} from "../../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createHotel);
// UPDATE
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

// GET SINGLE HOTEL
router.get("/:id", getHotel);

// GET ALL HOTELS
router.get("/", getHotels);

export default router;
