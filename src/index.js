import { updateDoc } from "firebase/firestore";
import { docRefStats, getEquipmentSnap, getInventorySnap, getStatsSnap } from "./firebase-config";
let dbDataEquipment = await getEquipmentSnap();
let dbDataInventory = await getInventorySnap();
let dbDataStats = await getStatsSnap();

// stuff for init loading
const inttValue = document.getElementById("int-value");
inttValue.innerHTML = dbDataStats.intt;

//loading screen commented to save time when working
// const loadingScreen = document.getElementById("loading-screen");
// loadingScreen.addEventListener("animationend", () => {
//     loadingScreen.remove
// })

// item lists
let hatsInvetory = dbDataInventory.hats;
let shirtsInvetory = dbDataInventory.shirts;
let pantsInvetory = dbDataInventory.pants;
let shoesInvetory = dbDataInventory.shoes;
let backgroundInvetory = dbDataInventory.backgrounds;

const hatSlot = document.getElementById("hat-slot");
hatSlot.src = hatsInvetory[dbDataEquipment.hat];

// stuff for stats
const walkMeter = document.getElementById("walk-meter");
const hungerMeter = document.getElementById("food-meter");
const showerMeter = document.getElementById("shower-meter");
const hydrationMeter = document.getElementById("hydration-meter");

const walkBtn = document.getElementById("walk-btn");
const hungerBtn = document.getElementById("food-btn");
const showerBtn = document.getElementById("shower-btn");
const hydrationBtn = document.getElementById("hydration-btn");

let currWalk = dbDataStats.walk;
let currHunger = dbDataStats.food;
let currShower = dbDataStats.bath;
let currHydration = dbDataStats.water;

window.onload = () => {
    dropStats();
}

setInterval(() => {
    dropStats();
}, 1000)

async function dropStats() {
    walkMeter.style.width = `${currWalk}%`;
    hungerMeter.style.width = `${currHunger}%`;
    showerMeter.style.width = `${currShower}%`;
    hydrationMeter.style.width = `${currHydration}%`

    currWalk--;
    currHunger--;
    currShower--;
    currHydration--;

    await updateDoc(docRefStats, {
        walk: currWalk,
        food: currHunger,
        bath: currShower,
        water: currHydration
    })

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

let addStat = async (e) => {
    let pressedBtn = e.target;
    if (pressedBtn.id === "walk-btn") {
        currWalk += 10;
        await updateDoc(docRefStats, {
            walk: currWalk
        })
        if (currWalk > 100) {
            currWalk = 100;
            await updateDoc(docRefStats, {
                walk: 100
            })
        }
    }
    else if (pressedBtn.id === "food-btn") {
        currHunger += 10;
        await updateDoc(docRefStats, {
            food: currHunger
        })
        if (currHunger > 100) {
            currHunger = 100;
            await updateDoc(docRefStats, {
                food: 100
            })
        }
    }
    else if (pressedBtn.id === "shower-btn") {
        currShower += 10;
        await updateDoc(docRefStats, {
            bath: currShower
        })
        if (currShower > 100) {
            currShower = 100;
            await updateDoc(docRefStats, {
                bath: 100
            })
        }
    }
    else if (pressedBtn.id === "hydration-btn") {
        currHydration += 10;
        await updateDoc(docRefStats, {
            water: currHydration
        })
        if (currHydration > 100) {
            currHydration = 100;
            await updateDoc(docRefStats, {
                water: 100
            })
        }
    }
}

walkBtn.addEventListener("click", addStat);
hungerBtn.addEventListener("click", addStat);
showerBtn.addEventListener("click", addStat);
hydrationBtn.addEventListener("click", addStat);