# Gulp

First, install node.js and npm (there're plenty of tutorials online).

Then global install gulp: `npm install -g gulp`

and finally in the project folder install all the dependencies: `npm install`

## Individual build tasks

* `gulp vendor` Concatenate vendors to `js/vendor.js`
* `gulp scripts` Concatenate app to `js/bundle.js` 
* `gulp styles` Cocatenate styles to `css/bundle.css`
* `gulp html` Process html to `app/dist`
* `gulp images` Compress images to `app/dist/img`

Those tasks can be called with aditional parameters (they can be combined):

* `--prod` or `-p` Minify the code
* `--debug` or `-d` Inline source maps
* `--watch` or `-w` Watch for changes and rebuild

## Build tasks

* `gulp build` Build project
* `gulp watch` Watch for changes on scripts, styles and html

## Utils tasks

* `gulp serve` Start local server (root `app/dist`) on localhost:8000
* `gulp deploy` Deploy `app/dist` to `gh-pages` branch

# About paths

Paths must follow the dist files tree

* index.html
 * js/
 * css/
 * img/
 
For instance, calling an image:

from `index.html`:

```html
<img src="img/image.jpg>
```

from `main.jsx`:

```javascript
var img = new Image();
img.src = 'img/image.jpg';
```

from `main.scss`:

```css
body {
  background-image: url("../img/image.jpeg");
}
```