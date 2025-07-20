const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // null for public
    text: String,
    imageUrl: String
}, { timestamps: true })

module.exports = mongoose.model("Message", messageSchema);
