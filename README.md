# JS Development environment
Mise en place d'un environnement de développement JavaScript.
Pluralsight Course with Cory House.
## .editorconfig
Ajouter un fichier `.editorconfig` à la racine du dossier et y mettre ses règles (voir des exemples sur [ici](https://editorconfig.org/#example-file "ici")).
Télécharger le plugin editorconfig sur [editorconfig.org](https://editorconfig.org/#download "editorconfig.org") pour son éditeur.
Maintenant `.editorconfig` va appliquer les règles aux future fichiers.
## Node & npm
Pour installer Node, il faut se rendre sur le site [nodejs.org](https://nodejs.org/en/ "nodejs.org").
### Example : Set up Webpack
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
### package.json Starter Kit
Pour simplifier l'installation de tous les packages, on créer un fichier `package.json` à la racine du projet. Et on copie le fichier [package.json](http://https://gist.github.com/coryhouse/29bd1029b623beb4c7f79b748dcba844 "package.json") suivant.

Il est possible de jeter un oeuil à la documentation pour comprendre la structure du fichier [ici](http:/https://docs.npmjs.com/files/package.json#devdependencies/ "ici").
 Pour lancer l'intallation des packages :

     npm install
 
 Attention ce fichier n'est pas totalemnt à jour. Donc il sera nécessaire de faire des `fix`.
## Development Web Server
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
## Automation
### npm Scripts
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
### Concurrent Tasks
```json
"scripts": {
			"prestart": "node buildScripts/startMessage.js",
			"start": "node buildScripts/srcServer.js",
			"localtunnel": "lt --port 3000",
			"share": "npm-run-all --parallel start localtunnel"
		}
```
## Transpilling
Créer un fichier `.babelrc` à la racine du projet.
```json
{
	"presets": [
		"latest"
	]
}
```
Ajouter le préfixe `babel-` devant les commandes `node` des scripts npm.
```json
"prestart": "babel-node buildScripts/startMessage.js",
"start": "babel-node buildScripts/srcServer.js",
```
Il est maintenant de possible d'utiliser les fonctionnalitées de ES6.
## Bundling
### Configuring Webpack
Créer un fichier `webpack.config.dev.js` à la racine du projet.
Copier/ Coller le code [ici](http://https://gist.github.com/coryhouse/d611e83e432f3ae65cc46ebb9b599930 "ici").
```javascript

import path from 'path';

export default {
	//enable some debugging information
  debug: true,
  devtool: 'inline-source-map',
	noInfo: false,
	//Entry point of our app
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
	target: 'web',
	//Here we tell webpack where it should create(simulate) our bundle
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
	},
	//We will add plugins here
  plugins: [],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
}
```
Intégrer webpack au serveur de développement.
```javascript
import webpack from 'webpack';
import config from ' ../webpack.config.dev';
//...
const compiler = webpack(config);
//...
app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));
```
### Create App Entry Point
Créer un fichier `ìndex.js` dans le repertoire `src`.
```javascript
import numeral from 'numeral';

const courseValue = numeral(15000).format('$0,0..00');
console.log(`I would pay ${courseValue} for this awesome car!`);
```
Ajouter le script `bundle.js` à la fin du `body` de `index.html`. Lancer le serveur et ouvrir la console. Le message doit s'afficher.
### Handling CSS
Créer un fichier `index.css` dans le repertoire `src`.
```CSS
body{
	font-family: San-Serif;
}

table th {
	padding: 5px;
}
```
Et ajouter la ligne suivante au fichier `index.js`.
```javascript
import './index.css';
```
### Debugging via Scourcemaps
En utilisant Babel et Webpack le javascript interprété par le navigateur est notre code transpilé et 'bundlé'. C'est pourquoi il faut utiliser Sourcemaps.
Dans le fichier `webpack.config.dev.js` nous avons déjà intégré Sourcemaps.
```json
//...
devtool: 'inline-source-map',
//...
```
Voir plus [ici](http://https://webpack.js.org/configuration/devtool/#devtool "ici").
Ajouter un breakpoint dans le script `index.js`.
```javascript
const courseValue = numeral(15000).format('$0,0..00');
debugger;
console.log(`I would pay ${courseValue} for this awesome car!`);
```
Lancer le dev server et debugger avec l'outil de debuggage de Chrome. Dans `Source` et `index`. Rafraichir la page.
## Linting
Créer un fichier `.eslintrc.json` à la racine du projet. Coller le contenu suivant :
```json
{
  "root": true,
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module"
  },
  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  },
  "rules": {
		"no-console": 1
  }
}
```
Ajouter les lignes suivantes dans les scripts de `package.json`.
```json
"start": "babel-node buildScripts/srcServer.js lint:watch",
"lint": "esw webpack.config.* src buildScripts",
"lint:watch": "npm run lint -- --watch",
```
Lancer le script : 
```
npm run lint:watch
```
## Testing and Continiuous Integration
### Testing with mocha
Créer un fichier `testSetup.js` dans le répertoire `buildScripts`.
```javascript
require('babel-register')();
require.extensions['.css'] = function() {};
```
Et ajouter le script de test au fichier `package.json`.
```json
"start": "babel-node buildScripts/srcServer.js lint:watch test:watch",
//...
"test": "mocha --reporter progress buildScripts/testSetup.js \"src/**/*.test.js\""
"test:watch": "npm run test -- --watch"
```
Pour lancer les tests.
```
npm t
```
### Travis CI
Aller sur le site [Travis CI](http://https://travis-ci.org/ "Travis CI").
Lire la documentation [*Getting Started*](http://https://docs.travis-ci.com/user/getting-started/ "*Getting Started*"). Travis tourne sous **Linux**.
Créer un fichier `.travis.yml` à la racine du projet.
```
language: node_js
node_js:
  - "iojs"
  - "7"
```
