export class Anim {

    constructor() {
        this.animations = Array.prototype.slice.call(document.querySelectorAll('*[data-animation]'));
        this.checkHorizontal = false;
        this.setup();
    }

    static init() {
        let anim = this;
        anim.checkViewAnimations();
        window.addEventListener("scroll", function() {
            anim.checkViewAnimations();
        });
        return anim;
    }

    setup() {
        for (let i = this.animations.length - 1; i >= 0; i--) {
            let el = this.animations[i];
            let delay = el.getAttribute("data-animation-delay");

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
    }

    checkViewAnimations() {
        for (let i = this.animations.length - 1; i >= 0; i--) {
            let el = this.animations[i];
            let animClass = el.getAttribute("data-animation");
            let animRepeat = el.hasAttribute("data-animation-repeat");
            let animated = el.classList.contains(animClass);
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
    }

    static isElementInViewport(element) {
        let rect = element.getBoundingClientRect();
        let inViewHorizontal = this.checkHorizontal ? (rect.left >= 0 && rect.right <= (window.innerWidth || document.documentElement.clientWidth)) : true;

        let top = rect.top + window.pageYOffset;
        let bottom = rect.bottom + window.pageYOffset;

        return top <= (window.pageYOffset + window.innerHeight) && bottom >= window.pageYOffset && inViewHorizontal;
    }
}