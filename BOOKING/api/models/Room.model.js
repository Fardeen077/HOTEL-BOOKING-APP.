import mongoose, { Schema } from "mongoose";

const roomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    maxPeople: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    roomNumber: [{ number: Number, unavailableDates: { type: [Date] } }],

}, { timestamps: true });


export const Room = mongoose.model("Room", roomSchema);