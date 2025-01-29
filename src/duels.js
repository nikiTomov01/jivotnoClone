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