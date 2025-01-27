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
const getEquipmentSnap = async () => {
    const docSnapEquipment = await getDoc(docRefEquipment);
    return docSnapEquipment.data();
};

const docRefInventory = doc(db, "myJivotno", "inventory");
const getInventorySnap = async () => {
    const docSnapInventory = await getDoc(docRefInventory);
    return docSnapInventory.data();
};

const docRefStats = doc(db, "myJivotno", "stats");
const getStatsSnap = async () => {
    const docSnapStats = await getDoc(docRefStats);
    return docSnapStats.data();
};

export { app, db, getEquipmentSnap, getInventorySnap, getStatsSnap };
export { docRefEquipment, docRefInventory, docRefStats };