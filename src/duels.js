import { updateDoc } from "firebase/firestore";
import { getCurrencySnap, getMonstersSnap } from "./firebase-config";

let dbDataCurrency = await getCurrencySnap();
let currGold = dbDataCurrency.gold;
let currLuck = dbDataCurrency.luck;

let dbDataMonsters = await getMonstersSnap();
let monsterList = dbDataMonsters.monsterList;

//log stuff
const logBoard = document.getElementById("duel-text-container");

// setting up monster
let monsterHp = 50;
let monsterDmg = 5;
let monsterSpeed = 5;

//setting up player
const player = document.getElementById("character");
const monster = document.getElementById("monster");
let playerHp = 100;
let playerDmg = 10;
let playerSpeed = 5;

let currTurn = "character";
let turnCount = 0;

let start = async function startDuel() {
    turnCount = 0;
    while (monsterHp > 0) {
        if (currTurn === "character") {
            await playerTurn();
            turnCount++;
            currTurn = "monster";
        }
        else {
            await monsterTurn();
            turnCount++;
            currTurn = "character";
        }
    }
}

// ui stuff - start btn
const duelBtn = document.getElementById("duel-btn");
duelBtn.addEventListener("click", start);

const playerHealthBar = document.getElementById("character-health");
const monsterHealthBar = document.getElementById("monster-health");

// players turn 
async function playerTurn() {
    console.log("Players turn");
    await playAnimation("character");
    monsterHp -= playerDmg;
    if (monsterHp <= 0) {
        monster.remove();
    }
    monsterHealthBar.innerHTML = `Monster HP: ${monsterHp}`;
    addLog("character");
    await delay(500);
}

async function monsterTurn() {
    console.log("monster turn");
    await playAnimation("monster");
    playerHp -= monsterDmg;
    playerHealthBar.innerHTML = `Character HP: ${playerHp}`;
    addLog("monster");
    await delay(500);
}

async function addLog(character) {
    let logMsg = document.createElement("p");
    logMsg.classList.add("log-text");
    if (character === "character") {
        logMsg.innerHTML = 
        `
        Turn: ${turnCount} - ${character} <br>
        Dealt: ${playerDmg} to monster. <br>
        Took: 0 damage.
        `;
    }
    else {
        logMsg.innerHTML = 
        `
        Turn: ${turnCount} - ${character} <br>
        Dealt: ${monsterDmg} to player. <br>
        Took: 0 damage.
        `;
    }
    logBoard.appendChild(logMsg);
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