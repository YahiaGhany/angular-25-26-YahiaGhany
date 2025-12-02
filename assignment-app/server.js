// Install express server
const express = require("express");
const path = require("path");

const app = express();

// Définir le dossier de production généré par ng build
const DIST_FOLDER = path.join(process.cwd(), "dist/assignment-app/browser");

// Servir uniquement les fichiers statiques du dossier de distribution
app.use(express.static(DIST_FOLDER));

// Route générique pour toutes les requêtes (sauf les fichiers statiques)
// CHANGEMENT : On utilise une expression régulière tolérante pour contourner le bug
app.get(/\//, (req, res) => { // La route "/./" ou "/." est souvent utilisée, mais "/" est la plus simple et tolérante ici
  res.sendFile(path.join(DIST_FOLDER, "index.html"));
});

// Start the app by listening on the default port
app.listen(process.env.PORT || 8081, () => {
  console.log(`Serveur de production démarré sur http://localhost:${process.env.PORT || 8081}`);
});