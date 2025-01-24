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