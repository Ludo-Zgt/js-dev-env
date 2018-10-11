# Environnement de développement JS
Mise en place d'un environnement de développement JavaScript.
Pluralsight Course with Cory House.
## .editorconfig
Ajouter un fichier `.editorconfig` à la racine du dossier et y mettre ses règles (voir des exemples sur [ici](https://editorconfig.org/#example-file "ici")).
Télécharger le plugin editorconfig sur [editorconfig.org](https://editorconfig.org/#download "editorconfig.org") pour son éditeur.
Maintenant `.editorconfig` va appliquer les règles aux future fichiers.
## Node et les packages npm
Pour installer Node, il faut se rendre sur le site [nodejs.org](https://nodejs.org/en/ "nodejs.org").
### Exemple installation des packages Webpack
Avant de pouvoir installer des packages il faut initialiser le projet. Alors, on lance :
```
npm init
```
Un fichier `package.json` a été créé.
Il est maintenant possible d'ajouter des packages à notres projet. Prenons l'exemple du package Webpack.
```
npm install webpack --save-dev
```
A noter ici que le suffix `--save-dev` permet d'indiquer que le package webpack, est un package pour le developpemnt uniquement. Nous n'en aurons pas besoin pour la production.
Si on regarde de nouveau notre fichier `package.json` les dependences (packages) utilisés y figurent. Voir plus d'informations [ici](https://www.youtube.com/watch?v=GU-2T7k9NfI "ici").
### Package.json Starter Kit
Pour simplifier l'installation de tous les packages, on créer un fichier `package.json` à la racine du projet. Et on copie le fichier [package.json](http://https://gist.github.com/coryhouse/29bd1029b623beb4c7f79b748dcba844 "package.json") suivant.

Il est possible de jeter un oeuil à la documentation pour comprendre la structure du fichier [ici](http:/https://docs.npmjs.com/files/package.json#devdependencies/ "ici").
 Pour lancer l'intallation des packages :
 ```
 npm install
 ```
 Attention ce fichier n'est pas totalemnt à jour. Donc il sera nécessaire de faire des `fix`.
## Express un Serveur Web de Développement
Créer un dossier `buildScripts` à la racine du projet. Dans ce dossier créer un fichier `srcServer.js`.
Coller le code suivant :
```
var express = require('express');
var path = require('path');
var open = require('open');

var port = 3000;
var app = express();

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../src/index.html'))
});

app.listen(port, function(err) {
    if(err){
        console.log(err);
    }else{
        open('http://localhost:' + port);
    }
});
```
Créer un dossier `src` à la racine du projet. dans ce dossier créer un fichier `index.html`. Dans ce fichier taper `!` et l'éditeur de texte propose automatiquement un boilerplate html. Appuyer sur la touche `Entrer`. Rajouter une balise `p` avec un `lorem`.

Lancer la commande suivante :
`node buildScripts/srcServer.js`
