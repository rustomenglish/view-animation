# view-anim
A lightweight library that provides functionality to play animations when the element is visible in the viewport.

## Installation

Include the script from the dist folder:
```js
<script src="view_anim.min.js"></script>
...
var view = new ViewAnimation().init();
```

Or use `npm` (5+):

```ssh
npm install view-animation
```

```js
var ViewAnimation = require('view-animation');

//babel
import ViewAnimation from 'view-animation';
```

## Usage

The library uses CSS classes to animate elements visible in the viewport. `init` will check elements with the
`data-animation` attribute where the value is added to the element's class.
*Example*:
```html
<div class="block" data-animation="block-anim">...
```

```css
.block-anim {
	animation: reveal-top 2s .2s ease;
}
```

For dynamic elements, you can register them manually by calling the `register` method:
```js
view.register(document.getElementById('red')); // single element

view.register(newDiv.querySelectorAll('[data-animation]')); // node list
```

**Delays**

You can add delays to the animation by adding the attribute `data-delay` with the value in milliseconds. This can be useful when the same animation is being used on multiple elements and you want to set the order of which should be played to save CSS.
```html
<div class="col-6" data-animation="reveal-top" data-delay="200">...
<div class="col-6" data-animation="reveal-top" data-delay="400">...
```

**Repeat**

To repeat an element's animation after it has gone out of view, use the `data-repeat` attribute.
```html
<div data-animation="cool-animation" data-repeat>
```

**Offset**

To set an offset (from the top position), add `data-offset` with the value in pixels.
```html
<div ... data-offset="100">
```

**Checking visible elements**

By default, the elements are checked when a new `Anim` is created(`init` function in the ES2015 version) and when the user scrolls. You can manually trigger this by calling `anim.checkViewAnimations()`

### Options

Options can be passed into the passed into the `ViewElement`s constructor:
```js
viewAnim = new ViewAnimation({
	...
})
```
The options are:

**Horizontal checking**

By default, horizontal visibility is not checked to allow off-screen animations to trigger when the user scrolls down. Set using `checkHorizontal`.
```js
anim.checkHorizontal = true;
```

**Attribute Names**

You can customise the default attributes used for storing properties:
```js
{
	attribAnimation: 'data-view',
	attribDelay: 'data-delay',
	attribDelay: 'data-offset'
}
```
**Debug**

Displays information and warnings in the console when true. Default is set to false.

### Support

Minimum browser support of **IE10** (only 11 tested) and any modern browser will work.

**Internet Explorer SVG**

The library uses `classList` for managing an element's class; while this has been supported on IE since version 10, it does not support classList on SVG elements, see [caniuse](http://caniuse.com/#search=classList). If IE is detected, SVG elements will automatically have their animations played and will not be checked in `checkViewAnimations`.

IE also doesn't animate SVG properties properly, such as `fill`. A work around can be wrapping the SVG in a container e.g `div`, and applying the animations to that.

### Examples

Check the examples folder:

[JSW](http://jsw4jumps.co.uk)

### License
MIT
