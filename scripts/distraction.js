// HELPERS
function setCustProp(property, value, element = document.documentElement) {
	element.style.setProperty(property, value);
}

function setCustProps(propValuePairs, element = document.documentElement) {
	for (const property in propValuePairs) {
		element.style.setProperty(`--${property}`, `${propValuePairs[property]}` );
	}
}

function $(element, context = document) {
	return context.querySelector(element);
}

function $$(elements, context = document) {
	return context.querySelectorAll(elements);
}









function iniDistraction() {
  let unicornWorld;

  let unicornDistractionIsActive = false;
  let unicornTimer;
  let unicornSoundIsActive = true;
  let unicornRainbowIsActive = true;

  let unicornTime = 6000;
  let unicornIntervalBase = 1000;
  let multiplierUnicornBubbles = 3.75;

  const unicornImages = [
    "uni1.svg",
    "uni2.svg",
    "uni3.svg",
    "uni4.svg",
    "uni5.svg",
    "uni6.svg"
  ]
  
  const unicornColors = [
    "yellow",
    "orange",
    "pink",
    "green",
    "blue",
    "purple",
    "turquoise"
  ]
  
  const soundPop = new Audio("../sounds/pop.m4a");
  const soundSqueaky = new Audio("../sounds/squeaky.m4a");
  // const soundGrunt = new Audio("../sounds/grunt.m4a");
  const soundWiehieuw = new Audio("../sounds/wiehieuw.m4a");
  const soundRelief = new Audio("../sounds/relief.m4a");
  
  

  ////////////
  // SLIDER //
  ////////////

  function updateSettingDistraction(e) {
    const valueDistraction = e.target.value;
  
    switch (valueDistraction) {
      case '0':
        stopDistraction();
        break;
      case '1':
        startDistraction();
        break;
      case '2':
        startDistraction();
        break;
      case '3':
        startDistraction();
        break;
      case '4':
        startDistraction();
        break;
    }
  }
  
  function iniDistractionRange() {
    const rangeDistraction = $('#settings-experience [name="distraction"]');
    rangeDistraction.addEventListener("input", updateSettingDistraction);
  }



  /////////////
  // BUBBLES //
  /////////////
  
  function handleUnicornBubblePoefEnd(e) {
    let unicornBubble = e.target;
    unicornBubble.remove();
  }
  
  function unicornBubblePop(unicornBubble) {
    soundPop.play();
    unicornBubble.classList.add("poef");
    unicornBubble.ontransitionend = handleUnicornBubblePoefEnd;
  }
  
  
  function handleUnicornBubbleClick(e) {
    let unicornBubble = e.target;
    unicornBubblePop(unicornBubble); 
  }
  
  
  function handleUnicornBubbleTransitionEnd(e) {
    if (e.propertyName == "transform") {
      let unicornBubble = e.target;
      unicornBubblePop(unicornBubble); 
    }
  }
  

  function createUnicornBubble(x, y) {
    // create element
    let unicornBubble = document.createElement("div");
    unicornBubble.classList.add("unicorn-bubble");

    // random color
    if(unicornRainbowIsActive) {
      let unicornBubbleColorRandom = Math.floor(Math.random() * unicornColors.length);
      unicornBubble.classList.add( unicornColors[unicornBubbleColorRandom ] );
    }
  
    setCustProps({
      x: x,
      y: y,
      size: Math.random(),
      poefX: Math.random(),
      deltaX: Math.random(),
      deltaY: Math.random(),
      timeY: Math.random()			
    }, unicornBubble);
  
    // add bubble to world
    unicornWorld.appendChild(unicornBubble);
  
    setTimeout(() => {
      unicornBubble.classList.add("move");
      unicornBubble.ontransitionend = handleUnicornBubbleTransitionEnd;
      unicornBubble.onclick = handleUnicornBubbleClick;
    }, 10);
  }

  function unicornFart(unicorn) {
    // viewport size
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // unicorn dimensions
    const unicornHeight = unicorn.offsetHeight;
    const unicornRect = unicorn.getBoundingClientRect();
    const unicornRight = unicornRect.right;
    // pos in percentage of viewport
    const unicornRightP = unicornRight / viewportWidth;
    const unicornCenterP = (unicornHeight * .3) / viewportHeight;
  
    // amount of bubbles
    // min 1 + random amount
    const unicornBubbleAmount = 
      1 + 
      Math.floor(
        Math.pow(
          Math.random() * multiplierUnicornBubbles , 3
        )
      );

    // make noise 
    if(unicornSoundIsActive) {
      if( unicornBubbleAmount < 3 ) {
        soundRelief.play();
      } 
      else if ( unicornBubbleAmount < 25 ) {
        soundSqueaky.play();
      } 
      else {
        soundWiehieuw.play();
      }
    }
  
    // create bubbles
    for (let i = 0; i < unicornBubbleAmount; i++) {
      createUnicornBubble(unicornRightP, unicornCenterP);
    }
  }
  
  

  //////////////
  // UNICORNS //
  //////////////

  function unicornReprise(e) {
    // if current unicorn left the world
    if(e.target.nodeName == "DIV") {
      // remove current unicorn
      e.currentTarget.remove();

      // min .7 max 1.2
      let intervalUnicornRandom = .7 + .5 * Math.random;
      setTimeout( createUnicorn, unicornIntervalBase * intervalUnicornRandom);
    }
  }

  function createUnicorn() {
    // create element
    let unicorn = document.createElement("div");
    unicorn.classList.add("unicorn");
  
    // fill with images - body (random), eyes, squint and mouth
    let unicornImage = document.createElement("img");
    let unicornImageRandom = Math.floor( Math.random() * unicornImages.length );
    unicornImage.src = "./images/" + unicornImages[unicornImageRandom];
    unicornImage.classList.add("unicorn__image");
    unicorn.appendChild(unicornImage);
  
    let unicornEye = document.createElement("img");
    unicornEye.src = "./images/" + "uniEye.svg";
    unicornEye.classList.add("unicorn__eye");
    unicorn.appendChild(unicornEye);
  
    let unicornSquint = document.createElement("img");
    unicornSquint.src = "./images/" + "uniSquint.svg";
    unicornSquint.classList.add("unicorn__squint");
    unicorn.appendChild(unicornSquint);
  
    let unicornMouth = document.createElement("img");
    unicornMouth.src = "./images/" + "uniMouth.svg";
    unicornMouth.classList.add("unicorn__mouth");
    unicorn.appendChild(unicornMouth);
  
    // add to unicorn world
    unicornWorld.appendChild(unicorn);

    // fart when paused → 95%
    unicornTimer = setTimeout(() => {
      unicornFart(unicorn);
    }, unicornTime * .94);
  
    // again after leaving world
    unicorn.onanimationend = unicornReprise;
  }

  function destroyLastUnicorn() {
    clearTimeout(unicornTimer);
    
    let lastUnicorn = document.querySelector("div.unicorn");

    if(lastUnicorn) {
      lastUnicorn.remove();
    }
  }

  

  ///////////////
  // THE WORLD //
  ///////////////

  function createUnicornWorld() {
    // create world and add to body
    unicornWorld = document.createElement("div");
    unicornWorld.classList.add("distraction");
    unicornWorld.style.setProperty("--time-unicorn", unicornTime + "ms");
    document.body.appendChild(unicornWorld);
  }

  function destroyUnicornWorld() {
    document.querySelector("div.distraction").remove();
  }


  ////////////////
  // START STOP //
  ////////////////

  function startDistraction() {
    if (!unicornDistractionIsActive) {
      // ini the world
      createUnicornWorld();
      // first unicorn
      createUnicorn();
    }
    
    // distraction is a go
    unicornDistractionIsActive = true;
  }

  function stopDistraction() {
    // no more :(
    unicornDistractionIsActive = false;

    // unicorn poef
    destroyLastUnicorn();
    // world poef
    destroyUnicornWorld();
  }
 


  ///////////////
  // INI RANGE //
  ///////////////

  iniDistractionRange();
}



iniDistraction();