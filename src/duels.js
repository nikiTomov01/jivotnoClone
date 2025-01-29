import { updateDoc } from "firebase/firestore";
import { getCurrencySnap, getMonstersSnap } from "./firebase-config";

let dbDataCurrency = await getCurrencySnap();
let currGold = dbDataCurrency.gold;
let currLuck = dbDataCurrency.luck;

let dbDataMonsters = await getMonstersSnap();
let monsterList = dbDataMonsters.monsterList;

// setting up monster
let monsterHp = 50;
let monsterDmg = 5;
let monsterSpeed = 5;

//setting up player
const player = document.getElementById("character");
let playerHp = 100;
let playerDmg = 10;
let playerSpeed = 5;

let currTurn = "character";

let start = async function startDuel() {
    while (monsterHp > 0) {
        if (currTurn === "character") {
            await playerTurn();
            monsterHp -= 10;
            console.log("SOMETHING HAPPEND PLAYER TURN")
            currTurn = "monster";
        }
        else {
            await monsterTurn();
            currTurn = "character";
        }
    }
}

// ui stuff
const duelBtn = document.getElementById("duel-btn");
duelBtn.addEventListener("click", start);

// players turn 
async function playerTurn() {
    console.log("Players turn");
    await playAnimation("character");
    await delay(500);
}

async function monsterTurn() {
    console.log("monster turn");
    await playAnimation("monster");
    await delay(500);
}

// play animation
async function playAnimation(character) {
    const element = document.getElementById(character);
    element.classList.add(`${character}-attack`);

    await waitForAnimationEnd(element);

    element.classList.remove(`${character}-attack`);

}

//helper function to wait for animation end
function waitForAnimationEnd(element) {
    return new Promise(resolve => {
        element.addEventListener("animationend", function onAnimationEnd() {
            element.removeEventListener("animationend", onAnimationEnd);
            resolve();
        }, { once: true});
    })
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}