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

     npm install
 
 Attention ce fichier n'est pas totalemnt à jour. Donc il sera nécessaire de faire des `fix`.
## Serveur Web de Développement
### Express
Créer un dossier `buildScripts` à la racine du projet. Dans ce dossier créer un fichier `srcServer.js`.
Coller le code suivant :
```javascript
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

Pour lancer le serveur tapper la commande suivante :

    node buildScripts/srcServer.js
### Localtunnel
Localtunnel nous permet d'accéder à notre Dev web server à partir d'une URL HTTP.
C'est très utile lorsque l'on souhaite partager l'avancement du projet ou faire des testes sur différentes cibles. Il est alors possible de visualiser le site ç partir d'un smartphone.
Installer les packages localtunnel.
```
npm install localtunnel -g
```
Lancer le serveur.
```
node buildScripts/srcServer.js
```
Ouvrir un autre terminal. et lancer localtunnel qui va faire un tunnel sur le port de notre serveur de développement (3000).
```
lt --port 3000
>your url is: http://nnxbcogcik.localtunnel.me
```
Ce qui nous retourne une URL random.

Il est possible de choisir un sous-domaine.
```
lt --port 3000 --subdomain myenvdev
>your url is: http://myenvdev.localtunnel.me
```
## Autamatisation
### Scripts npm
Dans la section `scripts` du fichier `package.json` il est possible de créer des scripts npm.
```json
"scripts": {
			"start": "node buildScrips/srcServer.js"
}
```
Maintenant pour lancer le serveur il suffit de tapper la commande suivante :
```
npm start
```
### Pre/Post Hooks
Créer un fichier `startMessage.js` dans le dossier `buildScripts` avec le contenue suivant :
```javascript
//With the chalk librairie we can display the message in color.
var chalk = require('chalk');

console.log(chalk.green('Starting app in dev mode...'));
```
On ajoute un script npm `prestart`.
```json
"scripts": {
			"prestart": "node buildScripts/startMessage.js",
			"start": "node buildScrips/srcServer.js"
}
```
