//firebase stuff
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDwyE3RpdPyXTuyQmr_mR-KIcjXSGnBZ9w",
    authDomain: "jivotnoclone.firebaseapp.com",
    projectId: "jivotnoclone",
    storageBucket: "jivotnoclone.firebasestorage.app",
    messagingSenderId: "842665722245",
    appId: "1:842665722245:web:5fb34666dc58e1b6c8c4ec",
    measurementId: "G-DYP8FBCXFS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const docRefEquipment = doc(db, "myJivotno", "equipment");
const docSnapEquipment = await getDoc(docRefEquipment);
let dbDataEquipment = docSnapEquipment.data();

const docRefInventory = doc(db, "myJivotno", "inventory");
const docSnapInventory = await getDoc(docRefInventory);
let dbDataInventory = docSnapInventory.data();

//init loading stuff
const loadingScreen = document.getElementById("loading-screen");
loadingScreen.addEventListener("animationend", () => {
    loadingScreen.remove();
})



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