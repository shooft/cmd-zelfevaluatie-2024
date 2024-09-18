//////////////////
// COLOR SCHEME //
//////////////////

function setColorScheme(colorScheme) {
  if(colorScheme == "system") {
    if(window.matchMedia('(prefers-color-scheme: light)').matches) {
      setAttr("data-color-scheme", "light");
    } else {
      setAttr("data-color-scheme", "dark");
    }
  } else {
    setAttr("data-color-scheme", colorScheme);
  }
}


function handleColorSchemeChange(e) {
  // value of color scheme radio
  const colorScheme = e.currentTarget.value;
  storeItem("colorScheme", colorScheme);
  setColorScheme(colorScheme);
}


function iniColorscheme() {
  // default
  let colorScheme = "system";

   // if in local storage
  const storedColorScheme = retrieveItem("colorScheme");
  if(storedColorScheme) {
    colorScheme = storedColorScheme;
    // set color scheme radio button
    $(`[name="color-scheme"][value="${storedColorScheme}"]`).checked = true;
  }

  setColorScheme(colorScheme);
}

// EVENTS

// if OS color scheme setting is changed
window.matchMedia("(prefers-color-scheme: light)").addEventListener('change', () => {
  const colorSchemeRadioValue = $('[name="color-scheme"]:checked').value;
  if(colorSchemeRadioValue == "system") {
    setColorScheme("system");
  }
});

// if color scheme radio is selected
$$('[name="color-scheme"]').forEach(colorSchemeRadio => {
  colorSchemeRadio.onchange = handleColorSchemeChange;
});

// INI
iniColorscheme();





////////////////////
// REDUCED MOTION //
////////////////////

function setReducedMotion(reducedMotion) {
  if(reducedMotion == "system") {
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setAttr("data-reduced-motion", "reduce");
    } else {
      setAttr("data-reduced-motion", "no-preference");
    }
  } else {
    setAttr("data-reduced-motion", reducedMotion);
  }
}


function handleReducedMotionChange(e) {
  // value of reduced motion radio
  const reducedMotion = e.currentTarget.value;
  storeItem("reducedMotion", reducedMotion);
  setReducedMotion(reducedMotion);
}


function iniReducedMotion() {
  // default
  let reducedMotion = "system";

   // if in local storage
  const storedReducedMotion = retrieveItem("reducedMotion");
  if(storedReducedMotion) {
    reducedMotion = storedReducedMotion;
    // set reduced motion radio button
    $(`[name="reduced-motion"][value="${storedReducedMotion}"]`).checked = true;
  }

  setReducedMotion(reducedMotion);
}

// EVENTS

// if OS color scheme setting is changed
window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener('change', () => {
  const reducedMotionRadioValue = $('[name="reduced-motion"]:checked').value;
  if(reducedMotionRadioValue == "system") {
    setReducedMotion("system");
  }
});

// if font family radio is selected
$$('[name="reduced-motion"]').forEach(reducedMotionRadio => {
  reducedMotionRadio.onchange = handleReducedMotionChange;
});

// INI
iniReducedMotion();





////////////////
// COLORBLIND //
////////////////

function setColorblind(colorblind) {
  setAttr("data-colorblind", colorblind);
}

function handleColorblindChange(e) {
  // value of colorblind radio
  const colorblind = e.currentTarget.value;
  setColorblind(colorblind);
}

// EVENTS

// if colorblind checkbox is selected
$('[name="colorblind"]').onchange = handleColorblindChange;
$('[name="colorblind"]').onkeypress = handleColorblindChange;






/////////////////
// FONT FAMILY //
/////////////////

function setFontFamily(fontFamily) {
  setAttr("data-font-family", fontFamily);
}


function handleFontFamilyChange(e) {
  // value of font family radio
  const fontFamily = e.currentTarget.value;
  storeItem("fontFamily", fontFamily);
  setFontFamily(fontFamily);
}


function iniFonts() {
  // if in local storage
  const storedFontFamily = retrieveItem("fontFamily");
  if(storedFontFamily) {
    // set font family radio button
    $(`[name="font-family"][value="${storedFontFamily}"]`).checked = true;
    setFontFamily(storedFontFamily);
  }
}

// EVENTS

// if font family radio is selected
$$('[name="font-family"]').forEach(fontFamilyRadio => {
  fontFamilyRadio.onchange = handleFontFamilyChange;
});

// INI
iniFonts();





////////////////////////////
// RANGES - ACCESSIBILITY //
////////////////////////////

const rangeSettingsAccessibility = $$('#settings-accessibility .range-setting input');

function iniRangeSettingAccessibility(rangeSetting) {
  const setting =  rangeSetting.name;
  let value = rangeSetting.value;

  const storedValue = retrieveItem("--setting--"+setting);
  if(storedValue) {
    value = storedValue;
  }

  rangeSetting.value = storedValue;
  setCustProp("--setting--"+setting, storedValue);
}

function updateSettingAccessibility(e) {
  const setting =  e.currentTarget.name;
  const value = e.currentTarget.value;

  setCustProp("--setting--"+setting, value);
  storeItem("--setting--"+setting, value);
}

rangeSettingsAccessibility.forEach(rangeSetting => {
  iniRangeSettingAccessibility(rangeSetting);
  rangeSetting.addEventListener("input", updateSettingAccessibility);
});






/////////////////////////
// RANGES - EXPERIENCE //
/////////////////////////
const rangeSettingsExperience = $$('#settings-experience .range-setting input');

function updateSettingExperience(e) {
  const setting =  e.currentTarget.name;
  const value = e.currentTarget.value;

  setCustProp("--setting--"+setting, value);
}

rangeSettingsExperience.forEach(rangeSetting => {
  rangeSetting.addEventListener("input", updateSettingExperience);
});







////////////////////
// RANDOM LETTERS //
////////////////////

let textNodes = [];

let letterChangeChance = .1; // .1 = 10%;
let letterChangeTempo = 250; // ms

let letterChangeInterval;


function iniDyslexia() {
  findTextNodes();
  iniDyslexiaRange();
}


function updateSettingDyslexia(e) {
  const valueDyslexia = e.target.value;

  switch (valueDyslexia) {
    case '0':
      stopMessUpWords();
      break;
    case '1':
      startMessUpWords(.1, 250);
      break;
    case '2':
      startMessUpWords(.2, 100);
      break;
    case '3':
      startMessUpWords(.3, 40);
      break;
    case '4':
      startMessUpWords(1, 1);
      break;
  }
}

function iniDyslexiaRange() {
  const rangeDyslexia = $('#settings-experience [name="dyslexia"]');
  rangeDyslexia.addEventListener("input", updateSettingDyslexia);
}


function findTextNodes() {
  function findWordsMeta(textNode) {
    let wordsMeta = [];
    let re = /\w+/g;
    let match;
    // find words 🤯
    while ((match = re.exec(textNode.nodeValue)) != null) {
      let wordMeta = match[0];
      let position = match.index;
      wordsMeta.push({
        length: wordMeta.length,
        position: position
      });
    }
    return wordsMeta;
  }

  // find nodes
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while(walker.nextNode()) {
    let textNode = walker.currentNode;
    
    if (textNode.wholeText.trim() != "") {
      let wordsMeta = findWordsMeta(textNode);
      
      textNodes.push({
        text: textNode,
        wordsMeta: wordsMeta
      });
    }
  }
}



function messUpWords() {
  function messUpWord(word) {
    if (word.length < 4) {
      return word;
    }
    
    // fixed first and last letter
    return word[0] + messUpMessyPart(word.slice(1, -1)) + word[word.length - 1];
    // fixed first letter
    // return word[0] + messUpMessyPart(word.slice(1));
  }


  function messUpMessyPart(messyPart) {
    let a, b, newWord;
    while (!(a < b)) {
      a = getRandomInt(0, messyPart.length - 1);
      b = getRandomInt(0, messyPart.length - 1);
    }
    
    newWord = messyPart.slice(0, a) + messyPart[b] + messyPart.slice(a+1, b) + messyPart[a] + messyPart.slice(b+1)
    
    return newWord;
  }

  textNodes.forEach(textNode => {
    // mess up each word
    textNode.wordsMeta.forEach(wordMeta => {
      // if lucky
      if ( letterChangeChance > Math.random() ) {
        // text before and after word
        let before = textNode.text.nodeValue.slice(0, wordMeta.position);
        let after = textNode.text.nodeValue.slice(wordMeta.position + wordMeta.length);
        // the word
        let word = textNode.text.nodeValue.slice(wordMeta.position, wordMeta.position + wordMeta.length);
        // update textNode with messed up word
        textNode.text.nodeValue = before + messUpWord(word) + after;
      }
    });
  });
}

function startMessUpWords(chance, tempo) {
  stopMessUpWords();
  console.log("start");
  letterChangeChance = chance;
  letterChangeTempo = tempo;
  letterChangeInterval = setInterval(messUpWords, letterChangeTempo);
}

function stopMessUpWords() {
  console.log("stop");
  clearInterval(letterChangeInterval);
}


iniDyslexia();