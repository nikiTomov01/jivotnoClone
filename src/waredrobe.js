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

// curr slots
const hatSlot = document.getElementById("hat-slot");
let currHat = "";

hatsBtn.addEventListener("click", (e) => {
    if (e.target.classList[0] === "selected-wardrobe") {
        return;
    }
    else {
        populateWardrobe(hatsInvetory);
        e.target.classList.add("selected-wardrobe");
        console.log(e.target.classList[0]);
    }
});

function populateWardrobe(inventory) {
    let newIcon = document.createElement("img");
    newIcon.classList.add("waredrobe-item-icon");
    for (let i = 0; i < inventory.length; i++) {
        newIcon.src = inventory[i];
        newIcon.addEventListener("click", () => {
            equipItem(newIcon);
        })
        waredrobe.appendChild(newIcon);
    }
}

function equipItem(item) {
    if (hatSlot.getAttribute("src") === "") {
        hatSlot.src = item.src;
    }
    else {
        hatSlot.src = "";
    }
}