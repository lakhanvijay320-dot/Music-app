const themeButton = document.getElementById("themeBtn");

themeButton.addEventListener("click", function () {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    themeButton.textContent = "☀️";
  } else {
    themeButton.textContent = "🌙";
  }
});

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {
  console.log("Search:", searchInput.value);
});

console.log("Y+ Music started successfully!");
