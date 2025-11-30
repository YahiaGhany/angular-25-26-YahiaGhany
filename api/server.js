let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');
let cors = require('cors'); 

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);

const uri = 'mongodb+srv://yahia_db_user:Q123sYjlRzpgI1aJ@cluster0.gdcyisu.mongodb.net/?appName=Cluster0';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Configuration CORS (autoriser tout le monde)
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

const prefix = '/api';

app.route(prefix + '/assignments')
  .get(assignment.getAssignments);

app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);

app.route(prefix + '/assignments')
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);

app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;