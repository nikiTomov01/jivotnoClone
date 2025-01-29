import { updateDoc } from "firebase/firestore";
import { getEquipmentSnap, getInventorySnap, docRefEquipment } from "./firebase-config";

let dbDataEquipment = await getEquipmentSnap();
let dbDataInventory = await getInventorySnap();

//waredrobe stuff

const waredrobe = document.getElementById("waredrobe-item-list");

// waredrobe buttons
const hatsBtn = document.getElementById("hats-btn");
const shirtsBtn = document.getElementById("shirts-btn");
const pantsBtn = document.getElementById("pants-btn");
const shoesBtn = document.getElementById("shoes-btn");
const bgBtn = document.getElementById("backgrounds-btn");

// item lists
let hatsInvetory = dbDataInventory.hats;
let shirtsInvetory = dbDataInventory.shirts;
let pantsInvetory = dbDataInventory.pants;
let shoesInvetory = dbDataInventory.shoes;
let backgroundInvetory = dbDataInventory.backgrounds;
console.log(hatsInvetory);

// curr slots
const hatSlot = document.getElementById("hat-slot");

// stuff for init loading
hatSlot.src = hatsInvetory[dbDataEquipment.hat];

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
    for (let i = 1; i < inventory.length; i++) {
        newIcon.src = inventory[i];
        newIcon.addEventListener("click", () => {
            equipItem(newIcon);
        })
        waredrobe.appendChild(newIcon);
    }
}

async function equipItem(item) {
    if (hatSlot.getAttribute("src") !== item.getAttribute("src")) {
        hatSlot.src = item.src;
        await updateDoc(docRefEquipment, {
            hat: 1
        });
    }
    else {
        hatSlot.src = "";
        await updateDoc(docRefEquipment, {
            hat: 0
        });
    }
}