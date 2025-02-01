import { getStatsSnap, getCurrencySnap } from "./firebase-config";

let dbDataStats = await getStatsSnap();
let dbDataCurrency = await getCurrencySnap();

const indexInitCurr = () => {
    headerInit();

    const inttValue = document.getElementById("int-value");
    inttValue.innerHTML = dbDataStats.intt;
}

const headerInit = () => {
    const goldValue = document.getElementById("gold-value");
    const luckValue = document.getElementById("luck-value");
    const minisValue = document.getElementById("minis-value");

    goldValue.innerHTML = `Gold: ${dbDataCurrency.gold}`;
    luckValue.innerHTML = `Luck: ${dbDataCurrency.luck}`;
    minisValue.innerHTML = `Minis: ${dbDataCurrency.minis}`;
}

export {indexInitCurr, headerInit};