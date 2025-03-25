let points = 0;
let acoins = 10000000;

let wheat = 100.0;

let totalpoints = 0;
let currgs = 0;
let actgs = 0;

let pointsperclick = 1;
let critchance = 1;
let critmultiplier = 3;
let burnRate = 0;

const counterText = document.getElementById("counter");
const burnrateobj = document.getElementById("millburnrate");


const incrementButton = document.getElementById("incrementButton");
let clickstolevel = 11;
let clickstolevelbase = clickstolevel;
let curclicks = 0;

const gsdisplay = document.getElementById("gsdisplay");

let currlevel = 1;
let flu = 0;

function resetAll() {
    points = 0;
    totalpoints = 0;
    currgs = 0;
    actgs = 0;
    pointsperclick = 1;
    critchance = 1;
    critmultiplier = 3;
    clickstolevel = 11;
    clickstolevelbase = clickstolevel;
    curclicks = 0;
    currlevel = 1;
    resetPointUpgrades();
    updateTexts();
}

incrementButton.addEventListener("click", () => {
    
    
    currgs = Math.floor(1850 + 7 * (Math.log10(totalpoints) - 9) * (((Math.log10(totalpoints) - 100) / 9) + 1) * ((Math.log10(totalpoints) - 100) / 15 + 1));
    if (currgs < 0) {
        currgs = 0;
    }
   
    actgs = Math.floor(currgs * (upg3ap * 0.05 + 1));
   
    showPrestigeButton();
    
    flu = Math.pow(.95, upg1ap);
    //function here!

    curclicks++;
    
    clickstolevel = clickstolevelbase * flu;
  
    let propclick = (160 / (clickstolevel)); 
  
    const container = document.getElementById('bar1');
    const currentWidth = Math.floor(parseInt(window.getComputedStyle(container).width));
    let newW = Math.floor(propclick * curclicks);

    if (Math.floor(Math.random() * (100 - 0) + 0) < upg2ap) {
        acoins++;
    }

    container.setAttribute('width', newW);

    container.style.width = newW + 'px';

    if (curclicks >= clickstolevel) {

        curclicks -= clickstolevel;
        acoins += 5 * currlevel;
        currlevel++;

       

        clickstolevelbase = Math.floor(clickstolevelbase * 1.25);
        
        container.setAttribute('width', 0);

        container.style.width = 0 + 'px';
    }

    //Math.random() * (max - min) + min;
    let thesePointsPerClick = pointsperclick;
    let c = Math.floor(Math.random() * (1000 - 0) + 0);
    if (c < critchance) {
        thesePointsPerClick *= critmultiplier;
    }
    //document.getElementById("upgt2").textContent = c;

    points = Math.floor(points + (thesePointsPerClick * (1 + (0.01*(upg4ap + 1)) * wheat)));
    
    totalpoints += Math.floor(thesePointsPerClick * (1 + 0.01 * (1 + upg4ap) * wheat));
    mill();
    updateTexts();
});

const ltextmain = document.getElementById("lt1");
const acoindisplaytext = document.getElementById("acoindisplaytext");
const pointdisplaytext = document.getElementById("pointdisplaytext");

function updateTexts() {//update this each time you make a new text obj
    counterText.textContent = points;
    upgradeButton1.textContent = "Cost to upgrade: " + upg1c;
    upgradeButton2.textContent = "Cost to upgrade: " + upg2c;
    upgradeButton3.textContent = "Cost to upgrade: " + upg3c;
    gsdisplay.textContent = wheat;
    ltextmain.textContent = "Level " + currlevel;
    acoindisplaytext.textContent = acoins;
    pointdisplaytext.textContent = points;
    ptext.textContent = "Prestige resets all upgrades except A coin upgrades but you gain wheat (min. 100). Wheat gives 1% bonus points per click each and can be spent on upgrades. You will earn " + actgs + " if you prestige now.";
}
function resetPointUpgrades() {
    upg2c = 50;
    upg2cp = 0;
    upg3c = 100;
    upg3cp = 0;
    upg1c = 10;
    upg1cp = 0;
}

let upg2c = 50;
let upg2cp = 0;
const upgradeButton2 = document.getElementById("upgradebutton2");

upgradeButton2.addEventListener("click", () => {
    
    if (upg2c <= points && upg2cp != 100) {
        points -= upg2c;
        upg2c *= 1.5;
        upg2c = Math.floor(upg2c);
        critchance += 5;
        upg2cp++;
        document.getElementById("upgt2").textContent = "Increase the chance of a critical click by 0.5%. " + upg2cp + "/100";
    }
    updateTexts();
});

let upg3c = 100;
let upg3cp = 0;
const upgradeButton3 = document.getElementById("upgradebutton3");

upgradeButton3.addEventListener("click", () => {
    if (upg3c <= points) {
        points -= upg3c;
        upg3c *= 2;
        critmultiplier += 0.1;
        upg3cp++;
        document.getElementById("upgt3").textContent = "Increase the the value of a critical click by + x0.1%. currently: x" + (upg3cp * 0.1 + 3);
    }
    updateTexts();
});

let upg1c = 10;
let upg1cp = 0;
const upgradeButton1 = document.getElementById("upgradebutton1");

upgradeButton1.addEventListener("click", () => {
    if (upg1c <= points) {
        upg1cp++;
        points -= upg1c;
        upg1c += Math.floor(10 * Math.floor(upg1cp/5 + 1) * Math.floor(upg1cp/10 + 1));
        pointsperclick++;
    }
    updateTexts();
});

const mainBHolder = document.getElementById("mainbuttonholder");
const prestigeButton = document.getElementById("prestigetab");

let shownPrestige = false;
function showPrestigeButton() {
    if (shownPrestige) {
        return;
    }
    if (totalpoints >= 10000) {
        shownPrestige = true;
        mainBHolder.setAttribute('flex-direction', 'intial');
        mainBHolder.style.flexDirection = 'initial';
        prestigeButton.setAttribute('display', 'flex');
        prestigeButton.style.display = 'flex';

    }
}


///acoiins




let upg1a = 45;
let upg1ap = 0;
const aupgradeButton1 = document.getElementById("aupgradebutton1");

aupgradeButton1.addEventListener("click", () => {
    if (upg1a <= acoins && upg1ap < 20) {
        acoins -= upg1a;
        upg1a += 15;
        upg1a = Math.floor(upg1a);
       
        upg1ap++;
        document.getElementById("upga1").textContent = "Level up 5% faster (" + upg1ap + "/20)";
        if (upg1ap < 20) {
            aupgradeButton1.textContent = "Cost to upgrade: " + upg1a;
        } else {
            aupgradeButton1.textContent = "Maxed!";
        }
       
    }

    updateTexts();
});


let upg2a = 100;
let upg2ap = 0;
const aupgradeButton2 = document.getElementById("aupgradebutton2");

aupgradeButton2.addEventListener("click", () => {
    if (upg2a <= acoins && upg2ap < 50) {
        acoins -= upg2a;
        upg2a += 20;
        upg2a = Math.floor(upg2a);

        upg2ap++;
        document.getElementById("upga2").textContent = "+1% chance to get a A Coin from each click. (" + upg2ap + "/50)";
        if (upg2ap < 50) {
            aupgradeButton2.textContent = "Cost to upgrade: " + upg2a;
        } else {
            aupgradeButton2.textContent = "Maxed!";
        }

    }

    updateTexts();
});




let upg3a = 200;
let upg3ap = 0;
const aupgradeButton3 = document.getElementById("aupgradebutton3");

aupgradeButton3.addEventListener("click", () => {
    if (upg3a <= acoins && upg3ap < 40) {
        acoins -= upg3a;
        upg3a *= 1.2;
        upg3a = Math.floor(upg3a);

        upg3ap++;
        document.getElementById("upga3").textContent = "Earn 5% more Wheat. (" + upg3ap + "/40)";
        if (upg3ap < 40) {
            aupgradeButton3.textContent = "Cost to upgrade: " + upg3a;
        } else {
            aupgradeButton3.textContent = "Maxed!";
        }

    }

    updateTexts();
});

let upg4a = 300;
let upg4ap = 0;
const aupgradeButton4 = document.getElementById("aupgradebutton4");

aupgradeButton4.addEventListener("click", () => {
    if (upg4a <= acoins && upg4ap < 99) {
        acoins -= upg4a;
        upg4a += 50;
       
        upg4a = Math.floor(upg4a);
        
        upg4ap++;
        document.getElementById("upga4").textContent = "Earn +1% boost from wheat. (" + upg4ap + "/99)";
        if (upg4ap < 99) {
            aupgradeButton4.textContent = "Cost to upgrade: " + upg4a;
        } else {
            aupgradeButton4.textContent = "Maxed!";
        }

    }

    updateTexts();
});




/*
container.setAttribute('width', newW);

    container.style.width = newW + 'px';
    */

function closeallutabs(toskip) {
    if (toskip != 0) {
        prestigetabm.setAttribute("display", "none");
        prestigetabm.style.display = "none";
    }
}

const menutabgs = document.getElementById("menutabgs");
const menutabc = document.getElementById("menutabc");
const mentutabarray = [menutabgs, menutabc];
function closeallptabs() {
    for (let i = 0; i < mentutabarray.length; i++) {
        mentutabarray[i].setAttribute("display", "none");
        mentutabarray[i].style.display = "none";
    }
}
function switchtotab(theTab) {
    closeallptabs();
    mentutabarray[theTab].setAttribute("display", "flex");
    mentutabarray[theTab].style.display = "flex";
}

const ptabb = document.getElementById("gstab");
const ctabb = document.getElementById("ctab");

ptabb.addEventListener("click", () => {
    switchtotab(0);
});
ctabb.addEventListener("click", () => {
    switchtotab(1);
});

const prestigetabm = document.getElementById("mainpmenu");

prestigeButton.addEventListener("click", () => {
    closeallutabs(0);
    if (prestigetabm.getAttribute("display") == "none") {
        prestigetabm.setAttribute("display", "flex");
        prestigetabm.style.display = "flex";
    } else {
        prestigetabm.setAttribute("display", "none");
        prestigetabm.style.display = "none";
    }
});
const ptext = document.getElementById("prestigeTextAMT");


const pupgb = document.getElementById("pupgb");
pupgb.addEventListener("click", () => {
    if (actgs >= 100) {
        wheat += actgs;
        resetAll();
        

    }
});

let maxBurnRate = 0;
let pupg1c = 100;

const pupgb31 = document.getElementById("pupgradebutton1");
pupgb31.addEventListener("click", () => {
    if (wheat >= pupg1c) {
        maxBurnRate++;
        wheat -= pupg1c;
        pupg1c += 100;
        
        pupgb31.textContent = "Cost to upgrade: " + pupg1c;
        const l = document.getElementById("upgap1");
        l.textContent = "Crush wheat each click to convert it to A coins (1 wheat -> 2 A coins). Upgrade to increase max crush rate (max rate: " + maxBurnRate + ")";

    }
    updateTexts();
});
function mill() {
    burnRate = Math.floor(burnrateobj.value);
    
    if (!Number.isFinite(burnRate)) {
        burnRate = 0;
        burnrateobj.value = burnRate;
    }
    if (burnRate > maxBurnRate) {
        burnRate = maxBurnRate
        burnrateobj.value = burnRate;
    } else if (burnRate < 0) {
        burnRate = 0;
        burnrateobj.value = burnRate;
    }
    

    if (wheat >= burnRate) {
        wheat -= burnRate;
        acoins += burnRate * 2;
    }
}
