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

const docRefStats = doc(db, "myJivotno", "stats");
let docSnapStats = await getDoc(docRefStats);
let dbDataStats = docSnapStats.data();

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
    docSnapStats = await getDoc(docRefStats);
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