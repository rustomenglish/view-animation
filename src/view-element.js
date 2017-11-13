export default class ViewElement {
	
	constructor(element, offset, repeat, viewClass) {
		this.element = element;
		this.offset = offset;
		this.repeat = repeat;
		this.viewClass = viewClass;
		this.animated = false;
		this.setSize();
	}

	setSize() {
		let bounds = this.element.getBoundingClientRect(),
			offsetTop = bounds.top + window.pageYOffset - document.documentElement.clientTop;
		if (!this.bounds) {
			this.bounds = {
				top: offsetTop,
				right: bounds.right,
				bottom: offsetTop + bounds.height,
				left: bounds.left
			}
		} else {
			this.bounds.top = offsetTop,
			this.bounds.right = bounds.right,
			this.bounds.bottom = offsetTop + bounds.height,
			this.bounds.left = bounds.left
		}
	}

	animate() {
		this.element.style.animationFillMode = "forwards";
		this.element.classList.add(this.viewClass);
		this.animated = true;
	}

	reset() {
		this.element.classList.remove(this.viewClass);
		this.element.style.animationFillMode = "backwards";
		this.animated = false;
	}
	
}