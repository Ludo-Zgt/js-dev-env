title : Documentation
---
[//]: <> (https://github.com/mixu/markdown-styles)

[//]: <> (Install commande)
[//]: <> (npm install -g markdown-styles)

[//]: <> (commande line to generate doc)
[//]: <> (generate-md --layout github --input ./documentation/md --output ./documentation/html)
# ALTESSE MOBILE - Modern UI Design
## Profoud UI
### Introduction
Profound UI is a toolkit able to transform an AS/400 green screen into a web application.
Unfortunatly, Profound UI can't generate a modern and responsive web app.
#### Strengths and weaknesses analysis
Strength :
 - Able to transform an AS/400 green screen into a web application.

Weakness :
 - HTML elements have absolute positions. We can't make responsive UI with absolute positionnig ;
 - Limited variety of HTML elements. We can't properly design HTML elements. For exemple we can't put an element in another element.
 - Maintenance : When an AS/400 screen has changed, it's necessary to take care about this new updates on the corresponding generated web page. We must define the absolute positionning of new elements.
 
### Custom the Web App
As we said Ptofound UI generate a Web App from the AS/400 screens. The generated Web App is a Single Page Application (SPA).
The generating process is a Profound Logic's property which is located in the `./proddata` file. We will not touch this files.

The folowing files can be customized :
 - `start.html`
 - `Mobile_v2.css`
 - `custom.js`
 - `name_page.scn`

The `name_page.scn` file is located in the `./screens` repository, is a JSON file. This file contains all DOM elements and their attributes in a JSON format. This file store all customizations added to elements from the Designer mode. When running the app, Profound Genie will generate HTML from this file. The generated HTML will be implemented into the `<div>` with the` id="5250"` in `start.html`.
```html
<body>
	<div id="main">
		<div id="contain5250">
			<div id="5250" class="genie container-fluid"></div>
		</div>
	</div>
</body>
```
In the `custom.js` file we override the `afterLoad()` function.
> afterLoad() is a special function that allows you to customize a Genie screen after the screen has been rendered and all designer enhancements have been applied.  If defined, it will be called for every Genie screen.

In the `afterLoad()` function we can **manipulate the DOM** to obtain a modern and responsive Web App.
### Generated DOM

## Responsive UI
### CSS Frameworks
In this project two CSS Framework are used :
  - [Bootstrap](https://getbootstrap.com/ "Bootstrap")
  - [Fontawesome](https://fontawesome.com/ "Fontawesome")

Bootstrap is used for make responsive UI and make the front-end development easier.
Fontawesome it's an icon toolkit wich provide vector icons.

For implement these two frameworks to the project, we just have to inject this two lines in the `<header>` of the `start.html` file.
```html
<!-- Bootstrap -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
<!-- Fontawesome -->
<script defer src="https://use.fontawesome.com/releases/v5.4.1/js/all.js" integrity="sha384-L469/ELG4Bg9sDQbl0hvjMq8pOcqFgkSpwhwnslzvVVGpDjYJ6wJJyYjvG3u8XW7" crossorigin="anonymous"></script>
```
### Absolute to static positioning
Full absolute positionnig and responsive can't live together. The positionning must be static. But due to the CSS precedence we can't just apply the static positionning in the `Mobile_v2.css` file. So we need to manipulate the DOM with Javascript. In order to reduce the verbose we use **jQuery**.

We can manipulate the DOM into the `afterLoad()` function. We already saw this function in the *General Web App* part.
