import throttle from 'throttle-debounce/debounce';

import ViewElement from './view-element';


export default class ViewAnimation {
    
    constructor(options) {
        this.options = options ? Object.assign(this.getDefaults(), this.check(options)) : this.getDefaults();
        this.viewElements = [];
    }

    init() {
        let elements = document.querySelectorAll('[data-animation]');
        for (let i = elements.length - 1; i >= 0; i--) {
            this.registerElement(elements[i]);
        }

        this.log('Registered: ' + this.viewElements.length);

        this.scrollListener = window.addEventListener('scroll', throttle(16, () => this.checkViewAnimations()));
        this.resizeListener = window.addEventListener('resize', () => this.viewElements.forEach(el => el.setSize()));
        return this;
    }

    registerElement(element) {
        if (element.hasAttribute('data-animation') && this.checkCompatibility(element)) {
            let delay = element.getAttribute('data-delay'),
                offset = element.getAttribute('data-offset'),
                viewClass = element.getAttribute('data-animation'),
                full = element.getAttribute('data-full'),
                repeat = element.hasAttribute('data-repeat');

            if (delay) {
                element.style.animationDelay = delay + "ms";
            }

            if (offset) {
                offset = parseInt(offset);
            }

            element.style.animationFillMode = "backwards";
            
            let viewElement = new ViewElement(element, offset, repeat, viewClass);
            this.viewElements.push(viewElement);
            return viewElement;
        } else {
            this.log("Attemted to register element without a data-animation attribute. " + element);
        }
    }

    checkViewAnimations() {
        for (let i = this.viewElements.length - 1; i >= 0; i--) {
            let el = this.viewElements[i],
                animated = el.animated;
            if (this.isElementInViewport(el.element, el.element.getBoundingClientRect(), el.offset)) {
                if (!animated) {
                    el.animate();
                }
                // remove if the element shouldn't repeat
                if (!el.repeat) {
                    this.viewElements.splice(i, 1);
                    if (!this.viewElements)
                        document.removeEventListener(this.scrollListener);
                }
            } else if (animated && el.repeat) {
                // reset animation
                el.reset();
            }
        }
    }

    check(options) {
        for (option in options) {
            switch (options[option]) {
                case 'checkHorizontal':
                case 'debug':
                    if (typeof(option) !== "boolean")
                        options[option] = this.getDefaults()[option];
                    break;
            }
        }
        return options;
    }

    getDefaults() {
        return {
            checkHorizontal: false,
            debug: true
        }
    }

    checkCompatibility(element) {
        // this script does not support SVG in IE
        if((navigator.userAgent.indexOf('MSIE')!==-1
            || navigator.appVersion.indexOf('Trident/') > 0) && element instanceof SVGElement) {
            element.setAttribute("class", element.getAttribute("class") + " " + element.getAttribute("data-animation"));
            element.style.animationFillMode = "forwards";
            this.log("SVG element detected on Internet Explorer " + element);
            return false;
        }
        return true;
    }

    isElementInViewport(element, rect, offset = 0) {
        let inViewHorizontal = this.options.checkHorizontal ? (rect.left >= 0 && rect.right <= (window.innerWidth 
            || document.documentElement.clientWidth)) : true;
        console.log(window.pageYOffset + ' is width: ' + window.innerHeight);
        return rect.top + window.pageYOffset <= (window.pageYOffset + window.innerHeight) && rect.bottom + window.pageYOffset >= window.pageYOffset && inViewHorizontal;
    }

    isInteger(value) {
        return value && value % 1 === 0;
    }

    /**
     * Prints the given message to the console if this.options.debug is true.
     * 
     * @param {*} msg 
     */
    log(msg) {
        this.options.debug && console.log(msg);
    }
}
    