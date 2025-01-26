//init loading stuff
const loadingScreen = document.getElementById("loading-screen");
loadingScreen.addEventListener("animationend", () => {
    loadingScreen.remove();
})