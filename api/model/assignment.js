let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let aggregatePaginate = require("mongoose-aggregate-paginate-v2"); // 1. Import

let AssignmentSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean
});

AssignmentSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('Assignment', AssignmentSchema);