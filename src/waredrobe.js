const waredrobe = document.getElementById("waredrobe-item-list");

// waredrobe buttons
const hatsBtn = document.getElementById("hats-btn");
const shirtsBtn = document.getElementById("shirts-btn");
const pantsBtn = document.getElementById("pants-btn");
const shoesBtn = document.getElementById("shoes-btn");
const bgBtn = document.getElementById("backgrounds-btn");

// item lists
let hatsInvetory = ["../resources/waredrobe/clothing/hats/tempBlueHat.png"];
let shirtsInvetory = [];
let pantsInvetory = [];
let shoesInvetory = [];
let backgroundInvetory = [];


hatsBtn.addEventListener("click", () => {
    populateWardrobe(hatsInvetory);
});


function makeHat() {
    let newIcon = document.createElement("img");
    newIcon.classList.add("waredrobe-item-icon");
    newIcon.src = hatsInvetory[0];
    waredrobe.appendChild(newIcon);
} 

function populateWardrobe(inventory) {
    let newIcon = document.createElement("img");
    newIcon.classList.add("waredrobe-item-icon");
    for (let i = 0; i < inventory.length; i++) {
        newIcon.src = inventory[i];
        waredrobe.appendChild(newIcon);
    }
}