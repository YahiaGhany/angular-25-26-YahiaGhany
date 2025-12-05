let Assignment = require('../model/assignment');

// Récupérer tous les assignments (avec pagination)
function getAssignments(req, res){
    var aggregateQuery = Assignment.aggregate();
    
    if (req.query.search) { aggregateQuery.match({ nom: { $regex: req.query.search, $options: 'i' } }); }
    if (req.query.rendu !== undefined && req.query.rendu !== 'undefined') {
        const estRendu = (req.query.rendu === 'true');
        aggregateQuery.match({ rendu: estRendu });
    }

    const options = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
    };

    Assignment.aggregatePaginate(aggregateQuery, options, (err, assignments) => {
        if(err) return res.send(err);
        res.send(assignments);
    });
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;

    // FIX : Conversion en Nombre pour la recherche dans la DB
    Assignment.findOne({id: parseInt(assignmentId)}, (err, assignment) =>{
        if(err) return res.send(err);
        if(!assignment) return res.status(404).json({message: "Devoir introuvable"});
        res.json(assignment);
    })
}

// Ajout (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;

    assignment.save( (err) => {
        if(err) return res.send('cant post assignment ', err);
        res.json({ message: `${assignment.nom} saved!`})
    })
}

// Update (PUT)
function updateAssignment(req, res) {
    // FIX : Recherche par ID numéro (notre ID custom)
    Assignment.findOneAndUpdate({id: req.body.id}, req.body, {new: true}, (err, assignment) => {
        if (err) return res.send(err);
        if (!assignment) return res.status(404).json({message: "Devoir non trouvé"});
        res.json({message: 'updated'});
    });
}

// Suppression (DELETE)
function deleteAssignment(req, res) {
    // FIX : Recherche par ID numéro (notre ID custom)
    Assignment.findOneAndRemove({id: req.params.id}, (err, assignment) => {
        if (err) return res.send(err);
        if (!assignment) return res.status(404).json({ message: 'Assignment non trouvé' });
        res.json({message: `${assignment.nom} deleted`});
    })
}

module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };