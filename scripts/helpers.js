////////////
// HELPERS
////////////

function $(element, context = document) {
	return context.querySelector(element);
}

function $$(elements, context = document) {
	return context.querySelectorAll(elements);
}


function createEl (element) {
	return document.createElement(element);
}


function disable(element) {
	element.disabled = true;
}

function enable(element) {
	element.disabled = false;
}


function playSound(sound) {
	sound.play();
}

function stopSound(sound) {
	sound.pause();
	sound.currentTime = 0;
}


function max(a, b) {
	if (a > b) {
		return a;
	} else {
		return b;
	}
}

function min(a, b) {
	if (a < b) {
		return a;
	} else {
		return b;
	}
}

function clamp(min, target, max) {
	if (min > target) {
		return min;
	} else if (max < target) {
		return max;
	} else {
		return target;
	}
}


function setCustProp(property, value, element = document.documentElement) {
	element.style.setProperty(property, value);
}

function setCustProps(propValuePairs, element = document.documentElement) {
	for (const property in propValuePairs) {
		element.style.setProperty(`--${property}`, `${propValuePairs[property]}` );
	}
}


function setAttr(attribute, value, element = document.documentElement) {
	element.setAttribute(attribute, value);
}


function storeItem(item, value) {
	localStorage.setItem(item, value);	
}

function retrieveItem(item) {
	return( localStorage.getItem(item) );
}