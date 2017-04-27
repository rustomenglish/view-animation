# view-anim
A lightweight library that provides functionality to play animations when the element is visible in the viewport - no dependencies!
Included are a standard Javascript version **view-anim.js** and an ES2015 version **view-anim.es6.js**.

## Usage


```js
<script src="view_anim.min.js"></script>
...
var anim = new Anim();
```

```js
// ES2015
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

By default, the elements are checked when a new `Anim` is created(`init` function in the ES2015 version) and when the user scrolls. You can manually trigger this by calling `anim.checkViewAnimations()`

### Options

**Horizontal checking**

By default, horizontal visibility is not checked to allow off-screen animations to trigger when the user scrolls down. Set using `checkHorizontal`.
```js
anim.checkHorizontal = true;
```

### Support

Minimum browser support of **IE10** (only 11 tested) and any modern browser will work.

**Internet Explorer SVG**

The library uses `classList` for managing an element's class; while this has been supported on IE since version 10, it does not support classList on SVG elements, see [caniuse](http://caniuse.com/#search=classList). If IE is detected, SVG elements will automatically have their animations played and will not be checked in `checkViewAnimations`.

IE also doesn't animate SVG properties properly, such as `fill`. A work around can be wrapping the SVG in a container e.g `div`, and applying the animations to that.

### License
MIT
