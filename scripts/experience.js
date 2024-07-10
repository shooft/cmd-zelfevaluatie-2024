const settingReaders = $("#setting-readers");

function updateSettingReaders(e) {
  const setting =  e.currentTarget.id;
  const value = e.currentTarget.value;

  console.log(setting + ": " + value);

  document.documentElement.setAttribute("data-"+setting, value);
}

settingReaders.addEventListener("input", updateSettingReaders);