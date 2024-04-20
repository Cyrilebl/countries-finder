let darkMode = localStorage.getItem("darkMode");

const colorMode = document.querySelector(".colorMode");

const colorName = document.querySelector(".colorMode p");
const colorIcon = document.querySelector(".colorMode img");

const enabledarkMode = () => {
  document.body.classList.add("darkMode");

  colorName.textContent = "Light Mode";
  colorIcon.src = "./assets/images/icon-sun.png";
  colorIcon.alt = "sun icon";

  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  document.body.classList.remove("darkMode");

  colorName.textContent = "Dark Mode";
  colorIcon.src = "./assets/images/icon-moon.png";

  localStorage.setItem("darkMode", null);
};

if (darkMode === "enabled") {
  enabledarkMode();
}

colorMode.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "enabled") {
    enabledarkMode();
  } else {
    disableDarkMode();
  }
});
