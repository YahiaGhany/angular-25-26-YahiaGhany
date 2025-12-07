# Application de Gestion des Devoirs (Assignments App)

Ce projet est une application **Full-Stack (MEAN)** réalisée dans le cadre du module Angular (Master 1 MIAGE). Elle permet de gérer une liste de devoirs (ajout, modification, suppression) avec une gestion complète des utilisateurs, des droits d'accès et une interface soignée.

---

## 🚀 Liens de Déploiement

L'application est hébergée et fonctionnelle en ligne sur la plateforme **Render.com**.

* 👉 **Frontend (Site Web) :** https://front-yahiaghany.onrender.com
* 👉 **Backend (API) :** https://backend-yahiaghany.onrender.com

> **Note importante :** Le premier chargement peut prendre jusqu'à **60 secondes** car le serveur gratuit de Render se met en veille. Merci de patienter le temps qu'il se réveille !

---

## 🔑 Identifiants de Test

Pour tester les fonctionnalités selon les niveaux de droits, utilisez les comptes suivants :

| Rôle | Login | Mot de passe | Droits & Accès |
| :--- | :--- | :--- | :--- |
| **ADMINISTRATEUR** | `admin` | `admin` | **Accès total** : Peut ajouter, modifier, supprimer des devoirs et peupler la base de données. |
| **UTILISATEUR** | `user` | `user` | **Lecture seule** : Peut voir la liste, les détails et marquer un devoir comme "Rendu". Ne peut pas modifier ni supprimer. |

---

## 🛠️ Architecture Technique

* **Frontend :** Angular (v18+) avec Angular Material.
* **Backend :** Node.js avec Express.
* **Base de Données :** MongoDB (Hébergée sur MongoDB Atlas).
* **Hébergement :** Render.com (Web Service pour l'API, Static Site pour le Front).

---

## ✅ Fonctionnalités Implémentées

Le projet respecte l'ensemble des consignes du TP et inclut plusieurs fonctionnalités avancées.

### 1. Fonctionnalités de Base (Socle)
* **CRUD Complet :** Affichage, Ajout, Modification et Suppression de devoirs.
* **Services :** Utilisation de `HttpClient` pour communiquer avec l'API.
* **Routage :** Navigation fluide avec routes paramétrées (`/assignment/:id`).
* **Pagination :** Gestion performante côté serveur (plugin Mongoose) avec navigation par boutons (Première, Suivante...).

### 2. Authentification & Sécurité
* **Auth Service :** Gestion de la connexion, déconnexion et persistance de la session.
* **Auth Guard :** Protection des routes sensibles (Édition/Suppression). Un utilisateur non-admin est redirigé s'il tente de forcer l'accès.
* **Gestion des Rôles :** Adaptation de l'interface (boutons grisés ou cachés) selon que l'utilisateur est `admin` ou `user`.

### 3. Améliorations UX/UI (Bonus)
* **Design Professionnel :** Utilisation d'un thème personnalisé Angular Material (Gris/Bleu) pour un rendu sobre et élégant.
* **Recherche Instantanée :** Barre de recherche avec système de *Debounce* (délai) pour filtrer les devoirs par nom sans surcharger le serveur.
* **Filtrage par État :** Menu déroulant permettant d'isoler les devoirs "Rendus" ou "À rendre".
* **Badges Visuels :** Indicateurs colorés (Vert/Rouge) et icônes pour voir l'état d'un devoir en un coup d'œil dans la liste.
* **Contrôle de Saisie (Dates) :** Une règle métier empêche d'ajouter ou de modifier un devoir avec une date de rendu antérieure à la date du jour. Un message d'alerte informe l'utilisateur en cas d'erreur.
* **Bouton Surprise :** J'en dirais pas plus, une surprise c'est une surprise !.

## 💻 Installation Locale

Si vous souhaitez lancer le projet sur votre machine :

### 1. Pré-requis
* Node.js et NPM installés.
* Angular CLI installé.

### 2. Lancer le Backend (API)
Le code du backend se trouve dans le dossier `api`.

1.  Ouvrez un terminal et naviguez dans le dossier `api`.
2.  Installez les dépendances :
    ```bash
    npm install
    ```
    *Note : Les dépendances incluent `express`, `mongodb`, `mongoose` et `multer`.*
3.  Démarrez le serveur :
    ```bash
    npm start
    ```
    ou
    ```bash
    node server.js
    ```
    *Le serveur démarrera sur le port défini (par défaut 8010) et se connectera à MongoDB Atlas via l'URI configurée dans `server.js`. Vous devriez voir un message de confirmation de connexion dans la console.*

### 3. Lancer le Frontend (Angular)
Le code du frontend Angular se trouve dans le dossier principal (contenant `app.ts`, `app.html`, etc.).

1.  Ouvrez un nouveau terminal et naviguez dans le dossier racine du projet Angular (là où se trouve `package.json`).
2.  Installez les dépendances (si ce n'est pas déjà fait) :
    ```bash
    npm install
    ```
3.  Lancez l'application Angular :
    ```bash
    ng serve
    ```
    *L'application sera accessible par défaut sur `http://localhost:4200`.*

> **Important :** Assurez-vous que l'URL de l'API dans votre service Angular (ex: `AssignmentsService`) pointe bien vers votre serveur backend local (`http://localhost:8010/api/assignments`) pour le développement, ou vers votre URL de production si vous testez la version déployée.  