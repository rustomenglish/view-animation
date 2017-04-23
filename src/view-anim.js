function Anim() {
    this.animations = Array.prototype.slice.call(document.querySelectorAll('*[data-animation]'));
    this.checkHorizontal = false;

    for (var i = this.animations.length - 1; i >= 0; i--) {
        var el = this.animations[i];
        var delay = el.getAttribute("data-animation-delay");

        // has delay value and is integer
        if (delay && delay % 1 === 0) {
            el.style.animationDelay = delay + "ms";
        }

        el.style.animationFillMode = "backwards"; // save css space

        // this script does not support SVG for IE
        if((navigator.userAgent.indexOf('MSIE')!==-1
            || navigator.appVersion.indexOf('Trident/') > 0) && el instanceof SVGElement) {
            el.setAttribute("class", el.getAttribute("class") + " " + el.getAttribute("data-animation"));
            el.style.animationFillMode = "forwards";
            this.animations.splice(i, 1);
        }
    }
    this.checkViewAnimations();
    var me = this;
    window.addEventListener("scroll", function() {
        me.checkViewAnimations();
    });
    console.log("created");
}

Anim.prototype.checkViewAnimations = function() {
    for (var i = this.animations.length - 1; i >= 0; i--) {
        var el = this.animations[i];
        var animClass = el.getAttribute("data-animation");
        var animRepeat = el.hasAttribute("data-animation-repeat");
        var animated = el.classList.contains(animClass);
        if (this.isElementInViewport(el)) {
            if (!animated) {
                el.style.animationFillMode = "forwards";
                el.classList.add(animClass);
            }
            // remove if the element shouldn't repeat
            if (!animRepeat) {
                this.animations.splice(i, 1);
            }
        } else if (animated && animRepeat) {
            // reset animation
            el.classList.remove(animClass);
            el.style.animationFillMode = "backwards";
        }
    }
};

Anim.prototype.isElementInViewport = function(element) {
    var rect = element.getBoundingClientRect();
    var inViewHorizontal = this.checkHorizontal ? (rect.left >= 0 && rect.right <= (window.innerWidth || document.documentElement.clientWidth)) : true;

    var top = rect.top + window.pageYOffset;
    var bottom = rect.bottom + window.pageYOffset;

    return top <= (window.pageYOffset + window.innerHeight) && bottom >= window.pageYOffset && inViewHorizontal;
}