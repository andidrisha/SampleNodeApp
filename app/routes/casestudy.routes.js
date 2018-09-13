module.exports = (app) => {
    const casestudy = require('../controllers/casestudy.controller.js');

    // Create a new CaseStudy
    app.post('/casestudy', casestudy.create);

    // Retrieve all Casestudies
    app.get('/casestudy', casestudy.findAll);

    // Retrieve a single CaseStudy with casestudyId
    app.get('/casestudy/:casestudyId', casestudy.findOne);

    // Update a CaseStudy with casestudyId
    app.put('/casestudy/:casestudyId', casestudy.update);

    // Delete a CaseStudy with casestudyId
    app.delete('/casestudy/:casestudyId', casestudy.delete);
}