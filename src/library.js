import { updateDoc } from "firebase/firestore";
import { getEquipmentSnap, getInventorySnap, getStatsSnap, docRefStats } from "./firebase-config";
import { headerInit } from "./statLoading";

headerInit();

let dbDataEquipment = await getEquipmentSnap();
let dbDataInventory = await getInventorySnap();
let dbDataStats = await getStatsSnap();

//load necessities
const hatSlot = document.getElementById("hat-slot");
hatSlot.src = dbDataInventory.hats[dbDataEquipment.hat];

// library mechanics
const readBtn = document.getElementById("read-btn");
const writeBtn = document.getElementById("write-btn");
const mathBtn = document.getElementById("math-btn");

readBtn.addEventListener("click", () => {
    gainKnowledge(2);
})

writeBtn.addEventListener("click", () => {
    gainKnowledge(1);
})
mathBtn.addEventListener("click", () => {
    gainKnowledge(3);
})

async function gainKnowledge(inttAmount) {
    // docSnapStats = await getDoc(docRefStats);
    dbDataStats = await getStatsSnap();
    let currInt = dbDataStats.intt;
    let oldTimeStamp = dbDataStats.lastStudy;
    let newTimeStamp = Date.now();
    let diffInMilli = newTimeStamp - oldTimeStamp;
    let diffInHours = diffInMilli / (1000 * 60 * 60);
    if (diffInHours >= 24) {
        console.log("24 hours have passed.");
        updateLibraryTime();
        await updateDoc(docRefStats, {
            intt: currInt + inttAmount
        });
    }
    else {
        console.log("24 hours have not passed.");
    }
}

async function updateLibraryTime() {
    let currTime = Date.now()
    await updateDoc(docRefStats, {
        lastStudy: currTime
    });
}

//init loading stuff
// const loadingScreen = document.getElementById("loading-screen");
// loadingScreen.addEventListener("animationend", () => {
//     loadingScreen.remove();
// })