const mongoose = require('mongoose');

const CaseStudySchema = mongoose.Schema({
    clientName: String,
    summary: String,
    description: String,
    tags: String
}, {
    timestamps: true
});

module.exports = mongoose.model('CaseStudy', CaseStudySchema);