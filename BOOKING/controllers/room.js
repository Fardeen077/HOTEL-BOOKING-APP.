import { Hotel } from "../api/models/Hotel.model.js"
import { Room } from "../api/models/Room.model.js"
import { createError } from "../api/utils/error.js"

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndDelete(hotelId, {
                $push: { rooms: savedRoom._id },
            })
        } catch (err) {
            next(err);
        }
        res.status(200)
            .json(savedRoom);
    } catch (err) {
        next(err);
    }
};

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // Return updated document
        );
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
};

// ✅ DELETE room
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id);

        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json("Room has been deleted.");
    } catch (err) {
        next(err);
    }
}

    // ✅ GET SINGLE Room
    export const getRoom = async (req, res, next) => {
        try {
            const room = await Hotel.findById(req.params.id);
            if (!room) {
                return res.status(404).json({ message: "Hotel not found." });
            }
            res.status(200).json(room);
        } catch (err) {
            next(err);
        }
    };

    // ✅ GET ALL HOTELS
    export const getRooms = async (req, res, next) => {
        try {
            const rooms = await Hotel.find(); // Fetch all Rooms
            res.status(200).json(rooms);
        } catch (err) {
            next(err);
        }
    };
