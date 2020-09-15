const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, dropDups: true },
    hash: { type: String, required: true },
    entries: [{ mood: String, dateTime: Date, title: String, description: String }],
});

module.exports = mongoose.model("User", userSchema);