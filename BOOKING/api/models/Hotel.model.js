import mongoose, { Schema } from "mongoose";

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
        default: [],
        // required: true
    },
    desc: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    rooms: {
        type: [String],
        default: [],
    },
    cheapestPrice: {
        type: Number,
        required: true,
    },
    featured: {
        type: Boolean,
        default: true,
    }

}, { timestamps: true });

export const Hotel = mongoose.model("Hotel", hotelSchema);