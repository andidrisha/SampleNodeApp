const CaseStudy = require('../models/casestudy.model.js');

// Create and Save a new CaseStudy
exports.create = (req, res) => {
    // Validate request
    if(!req.body.title) {
        return res.status(400).send({
            message: "CaseStudy title can not be empty"
        });
    }

    // Create a CaseStudy
    const casestudy = new CaseStudy({
        clientName: req.body.clientName || "Untitled CaseStudy", 
        summary: req.body.summary,
        description: req.body.description,
        tags: req.body.tags
    });

    // Save CaseStudy in the database
    casestudy.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Case Study."
        });
    });
};

// Retrieve and return all CaseStudy from the database.
exports.findAll = (req, res) => {
    CaseStudy.find()
    .then(casestudyList => {
        res.send(casestudyList);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving case studies."
        });
    });
};

// Find a single CaseStudy with a CaseStudy Id
exports.findOne = (req, res) => {
    CaseStudy.findById(req.params.casestudyId)
    .then(casestudy => {
        if(!casestudy) {
            return res.status(404).send({
                message: "CaseStudy not found with id " + req.params.casestudyId
            });            
        }
        res.send(casestudy);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "CaseStudy not found with id " + req.params.casestudyId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving case study with id " + req.params.casestudyId
        });
    });
};

// Update a CaseStudy identified by the CaseStudyId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.title) {
        return res.status(400).send({
            message: "CaseStudy title can not be empty"
        });
    }

    // Find CaseStudy and update it with the request body
    CaseStudy.findByIdAndUpdate(req.params.casestudyId, {
        title: req.body.title || "Untitled Case Study",
        clientName: req.body.clientName
    }, {new: true})
    .then(casestudy => {
        if(!casestudy) {
            return res.status(404).send({
                message: "Case Study not found with id " + req.params.casestudyId
            });
        }
        res.send(casestudy);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Case Study not found with id " + req.params.casestudyId
            });                
        }
        return res.status(500).send({
            message: "Error updating casestudy with id " + req.params.casestudyId
        });
    });
};

// Delete a CaseStudy with the specified CaseStudyId in the request
exports.delete = (req, res) => {
    CaseStudy.findByIdAndRemove(req.params.casestudyId)
    .then(casestudy => {
        if(!casestudy) {
            return res.status(404).send({
                message: "Case Study not found with id " + req.params.casestudyId
            });
        }
        res.send({message: "CaseStudy deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "CaseStudy not found with id " + req.params.casestudyId
            });                
        }
        return res.status(500).send({
            message: "Could not delete CaseStudy with id " + req.params.casestudyId
        });
    });
};
