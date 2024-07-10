const linkMenu = $('#link-menu');
const linkSettings = $('#link-settings');

const aside = $('aside');

const tabList = $('#tablist');

const tabMenu = $('#tab-menu');
const tabSettings = $('#tab-settings');
const tabClose = $('#tab-close');

const tabpanelMenu = $('#tabpanel-menu');
const tabpanelSettings = $('#tabpanel-settings');


// LOGIC
function openAside() {
  aside.removeAttribute("inert");
  linkMenu.setAttribute("inert", "");
  linkSettings.setAttribute("inert", "");
}

function closeAside() {
  aside.setAttribute("inert", "");
  aside.dataset.current = "none";

  linkMenu.removeAttribute("inert");
  linkSettings.removeAttribute("inert");
}

function openTab(tab) {
  const tabpanelName = tab.dataset.panelName;
  aside.dataset.current = tabpanelName;

  tabClose.setAttribute("aria-selected", false);

  tab.setAttribute("aria-selected", true);
  tab.setAttribute("tabindex", "0");

  const tabpanel = $(`#${tab.getAttribute("aria-controls")}`);  
  tabpanel.removeAttribute("hidden");
  tabpanel.removeAttribute("inert");
  tab.focus();
}

function closeTab(tab) {
  tab.setAttribute("aria-selected", false);
  tab.setAttribute("tabindex", "-1");

  const tabpanel = $(`#${tab.getAttribute("aria-controls")}`);  
  tabpanel.setAttribute("hidden", "");
  tabpanel.setAttribute("inert", "");
}


// EVENT HANDLERS
function openMenu(e) {
  e.preventDefault();
  openAside();
  openTab(tabMenu);
  tabpanelMenu.focus();
}

function openSettings(e) {
  e.preventDefault();
  openAside();
  openTab(tabSettings);
  tabpanelSettings.focus();
}

function toMenu() {
  closeTab(tabSettings);
  openTab(tabMenu);
}

function toSettings() {
  closeTab(tabMenu);
  openTab(tabSettings);
}

function closeNavSettings() {
  closeTab(tabSettings);
  closeTab(tabMenu);
  closeAside();
}

function blurTabClose() {
  setTimeout(() => {
    const visibleTabpanel = $('.tabpanel:not([inert])');
    if(visibleTabpanel) {
      const newTab = $(`#${visibleTabpanel.getAttribute("aria-labelledby")}`);

      if(newTab) {
        newTab.setAttribute("aria-selected", true);
        newTab.setAttribute("tabindex", "0");
      }
    }

    tabClose.setAttribute("tabindex", "-1");
    tabClose.setAttribute("aria-selected", false);

  }, "10");
}

function asideKeydown(e) {
  if(e.key == "Escape") {
    closeNavSettings();
  }
}

function switchTab(direction) {
  const currentTab = $('[aria-selected="true"]', tablist);
  let newTab;
  if (direction == "toTheRight") {
    newTab = currentTab.nextElementSibling;
    if(!newTab) {
      newTab = $("button:first-child", tablist);
    }
  } else {
    newTab = currentTab.previousElementSibling;
    if(!newTab) {
      newTab = $("button:last-child", tablist);
    }
  }

  if (newTab == tabMenu) {
    toMenu();
  } else if (newTab == tabSettings) {
    toSettings();
  } else {
    tabClose.focus();
    tabClose.setAttribute("aria-selected", true);
    tabClose.setAttribute("tabindex", "0");

    currentTab.setAttribute("tabindex", "-1");
    currentTab.setAttribute("aria-selected", false);
  }

}

function tabListKeydown(e) {
  if(e.key == "ArrowRight") {
    switchTab("toTheRight");
  } else if(e.key == "ArrowLeft") {
    switchTab("toTheLeft");
  }
}

// EVENTS
window.addEventListener("keydown", asideKeydown);
tabList.addEventListener("keydown", tabListKeydown);

linkMenu.addEventListener("click", openMenu);
linkSettings.addEventListener("click", openSettings);

tabMenu.addEventListener("click", toMenu);
tabSettings.addEventListener("click", toSettings);

tabClose.addEventListener("click", closeNavSettings);
tabClose.addEventListener("blur", blurTabClose);