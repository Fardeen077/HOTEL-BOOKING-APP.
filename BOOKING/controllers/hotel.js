import { Hotel } from "../api/models/Hotel.model.js";

// ✅ CREATE A NEW HOTEL
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (err) {
        next(err);
    }
};

// ✅ UPDATE HOTEL
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // Return updated document
        );
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err);
    }
};

// ✅ DELETE HOTEL
export const deleteHotel = async (req, res, next) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!deletedHotel) {
            return res.status(404).json({ message: "Hotel not found." });
        }
        res.status(200).json({ message: "Hotel deleted successfully." });
    } catch (err) {
        next(err);
    }
};

// ✅ GET SINGLE HOTEL
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found." });
        }
        res.status(200).json(hotel);
    } catch (err) {
        next(err);
    }
};

// ✅ GET ALL HOTELS
export const getHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find(); // Fetch all hotels
        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
};

