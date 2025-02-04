import { headerInit } from "./statLoading";

headerInit();

const clothingStore = document.getElementById("clothing-store-mall");
clothingStore.addEventListener("click", () => {
    generateStoreWindow();
})

function generateStoreWindow() {
    //code to generate a store window
    console.log("generating store window...");
}
