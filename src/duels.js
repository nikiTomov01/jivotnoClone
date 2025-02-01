import { updateDoc } from "firebase/firestore";
import { getCurrencySnap, getMonstersSnap } from "./firebase-config";

let dbDataCurrency = await getCurrencySnap();
let currGold = dbDataCurrency.gold;
let currLuck = dbDataCurrency.luck;

let dbDataMonsters = await getMonstersSnap();
let monsterList = dbDataMonsters.monsterList;
let monstersAmount = monsterList.length;

//log stuff
const logBoard = document.getElementById("duel-text-container");

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
let turnCount = 0;

let start = async function startDuel() {
    clearDuelLog();
    setNewMonster();
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
const duelTab = document.getElementById("duel-tab");
const duelBtn = document.getElementById("duel-btn");
duelBtn.addEventListener("click", start);

const playerHealthBar = document.getElementById("character-health");
const monsterHealthBar = document.getElementById("monster-health");

// clear duel log 
function clearDuelLog() {
    let e = logBoard.lastChild;
    while(e) {
        e.remove();
        e = logBoard.lastChild;
    }
}

function setNewMonster() {
    let newMonster = document.createElement("div");
    newMonster.id = "monster";

    let monsterImg = document.createElement("img");
    let monsterType = Math.floor(Math.random() * (monstersAmount));
    monsterImg.src = monsterList[monsterType];
    newMonster.appendChild(monsterImg);

    duelTab.appendChild(newMonster);
    monsterHp = 50;
    monsterHealthBar.innerHTML = `Monster HP: ${monsterHp}`;
    return 0;
}

// players turn 
async function playerTurn() {
    console.log("Players turn");
    await playAnimation("character");
    monsterHp -= playerDmg;
    monsterHealthBar.innerHTML = `Monster HP: ${monsterHp}`;
    if (monsterHp <= 0) {
        document.getElementById("monster").remove();
    }
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