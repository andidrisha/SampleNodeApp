const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    clientName: String,
    summary: String,
    description: String,
    tags: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);