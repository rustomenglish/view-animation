# view-anim
A lightweight library with 0 dependencies that provides functionality to play animations when the element is visible in the viewport.
Included are a standard Javascript version **view-anim.js** and an ES6 version **view-anim.es6.js**.

## Usage


```js
var = new Anim();
```

```js
// ES6
import { Anim } from "view-anim";
let anim = new Anim().init();
```

The library makes use of CSS classes to animate elements visible in the viewport. Elements with the `data-animation` attribute are checked with the value being added to the element's class.
*Example*:
```html
<div class="block" data-animation="block-anim">...
```

```css
.data-anim {
	animation: reveal-top 2s .2s ease;
}
```

**Delays**

You can add delays to the animation by adding the attribute `data-animation-delay` with the value in milliseconds. This can be useful when the same animation is being used on multiple elements and you want to set the order of which should be played to save CSS.
```html
<div class="col-6" data-animation="reveal-top" data-animation-delay="200">...
<div class="col-6" data-animation="reveal-top" data-animation-delay="400">...
```

**Repeat**

To repeat an element's animation after it has gone out of view, use the `data-animation-repeat` attribute.
```html
<div data-animation="cool-animation" data-animation-repeat="true">
```

**Checking visible elements**

By default, the elements are checked when a new `Anim` is created and when the user scrolls (in the `init` function on ES6 version). You can manually trigger this by calling `checkViewAnimations`

### Options

**Horizontal checking**

By default, horizontal visibility is not checked to allow off-screen animations to trigger when the user scrolls down. Set using `checkHorizontal`.
```js
anim.checkHorizontal = true;
```

### Support

Minimum browser support of **IE10** (only 11 tested) and any modern browser will work.

**Internet Explorer SVG**

The library uses `classList` for managing an element's class; while this has been supported on IE since version 10, it does not support classList on SVG elements, see [caniuse](http://caniuse.com/#search=classList). If IE is detected, SVG elements will automatically have their animations played and will not be tested in `checkViewAnimations`.

Since IE doesn't support SVG element property animations/transitions such as `fill` you can work around this by wrapping the SVG in a `div` and animating that.

### License
MIT
