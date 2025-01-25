// firebase stuff
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

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

const docRef = doc(db, "myJivotno", "equipment");
const docSnap = await getDoc(docRef);
let dbData = docSnap.data();
console.log(dbData.hat);

// if (docSnap.exists()) {
//     console.log("Document data: ", docSnap.data());
// }
// else {
//     console.log("No such document.");
// }

// stuff for init loading
// item lists
let hatsInvetory = ["0" ,"../resources/waredrobe/clothing/hats/tempBlueHat.png"];
let shirtsInvetory = [];
let pantsInvetory = [];
let shoesInvetory = [];
let backgroundInvetory = [];

const hatSlot = document.getElementById("hat-slot");
hatSlot.src = hatsInvetory[dbData.hat];


// stuff for stats
const walkMeter = document.getElementById("walk-meter");
const hungerMeter = document.getElementById("food-meter");
const showerMeter = document.getElementById("shower-meter");
const hydrationMeter = document.getElementById("hydration-meter");

const walkBtn = document.getElementById("walk-btn");
const hungerBtn = document.getElementById("food-btn");
const showerBtn = document.getElementById("shower-btn");
const hydrationBtn = document.getElementById("hydration-btn");

let currWalk = 100;
let currHunger = 100;
let currShower = 100;
let currHydration = 100;

window.onload = () => {
    dropStats();
}

setInterval(() => {
    dropStats();
}, 1000)

function dropStats() {
    walkMeter.style.width = `${currWalk}%`;
    hungerMeter.style.width = `${currHunger}%`;
    showerMeter.style.width = `${currShower}%`;
    hydrationMeter.style.width = `${currHydration}%`

    currWalk--;
    currHunger--;
    currShower--;
    currHydration--;

    if (currWalk < 0) {
        currWalk = 0;
    }
    if (currHunger < 0) {
        currHunger = 0;
    }
    if (currShower < 0) {
        currShower = 0;
    }
    if (currHydration < 0) {
        currHydration = 0;
    }
}

let addStat = (e) => {
    let pressedBtn = e.target;
    if (pressedBtn.id === "walk-btn") {
        currWalk += 10;
        if (currWalk > 100) {
            currWalk = 100;
        }
    }
    else if (pressedBtn.id === "food-btn") {
        currHunger += 10;
        if (currHunger > 100) {
            currHunger = 100;
        }
    }
    else if (pressedBtn.id === "shower-btn") {
        currShower += 10;
        if (currShower > 100) {
            currShower = 100;
        }
    }
    else if (pressedBtn.id === "hydration-btn") {
        currHydration += 10;
        if (currHydration > 100) {
            currHydration = 100;
        }
    }
}

walkBtn.addEventListener("click", addStat);
hungerBtn.addEventListener("click", addStat);
showerBtn.addEventListener("click", addStat);
hydrationBtn.addEventListener("click", addStat);