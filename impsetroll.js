let pageHeightT = document.documentElement.clientHeight
let pageWidthT = document.documentElement.clientWidth

if (pageHeightT > pageWidthT) {
    funcWidthPerHeight(pageHeightT / pageWidthT, pageHeightT / pageWidthT)
}
else {
    funcWidthPerHeight(pageWidthT / pageHeightT, pageWidthT / pageHeightT)
}


funcUpdatePageSize(true)

//funcPrepareGetLocation()

let arrWorkerDiceImgs = new Array(
    "img/dice/impset/w3.png",
    "img/dice/impset/w4.png",
    "img/dice/impset/w4.png",
    "img/dice/impset/w4.png",
    "img/dice/impset/w4.png",
    "img/dice/impset/w5.png"
)

let arrResourceDiceImgs = new Array(
    "img/dice/impset/wood.png",
    "img/dice/impset/wood.png",
    "img/dice/impset/food.png",
    "img/dice/impset/food.png",
    "img/dice/impset/gold.png",
    "img/dice/impset/stone.png"
)


function funcSelect() {
    if (event.srcElement.style.opacity == 0.5) {
        event.srcElement.style.opacity = 1.0
    }
    else {
        event.srcElement.style.opacity = 0.5
    }
}

function funcAllDiceRoll() {
    for (let idx = 0; idx < 5; idx++) {
        document.getElementById("card"+idx).style.opacity="1.0"
        
    }

    funcDrawDice("diceWorker", "btnDice", 4,
        arrWorkerDiceImgs,
        0.1, 0.3, 0.9, 0.9, 0.2, "black", funcAllDiceRoll,
        (numOfCards + 1) / 2 * 0.5 * pageHeight / 9 * 6 / pageWidth + 0.05, 0.1, 0.95, 0.9, 0.1)
    funcUpdatePageSize(true)
    funcRelocateElements()

    for (let idx = 0; idx < 4; idx++) {
        if (idx == 0) {
            funcStartRoll("diceWorker", idx, arrWorkerDiceImgs, null)
        }
        else {
            funcStartRoll("diceWorker", idx, arrResourceDiceImgs, null)
        }
    }
}

let numOfCards = 5

let arrCardLoc = new Array()
arrCardLoc[0] = new Array(0.01, 0.02, 0.5 * pageHeight / 9 * 6 / pageWidth, 0.495 + 0.01)
arrCardLoc[1] = new Array(0.01, 0.505, 0.5 * pageHeight / 9 * 6 / pageWidth, 0.99 + 0.01)
arrCardLoc[2] = new Array(0.5 * pageHeight / 9 * 6 / pageWidth + 0.01, 0.02, 2 * 0.5 * pageHeight / 9 * 6 / pageWidth, 0.49)
arrCardLoc[3] = new Array(0.5 * pageHeight / 9 * 6 / pageWidth + 0.01, 0.505, 2 * 0.5 * pageHeight / 9 * 6 / pageWidth, 0.98)
arrCardLoc[4] = new Array(2 * 0.5 * pageHeight / 9 * 6 / pageWidth + 0.01, 0.02, 3 * 0.5 * pageHeight / 9 * 6 / pageWidth, 0.49)



let sltPlayer = funcInsertElement("player", "select", "cards",
   0.86, 0.0150, 0.92, 0.1037, 29 / 20)
//sltPlayer.style.fontSize="10px" 
sltPlayer.style.fontFamily = "'Nanum Pen Script', cursive"
sltPlayer.style.webkitAppearance = "none"
//sltPlayer.style.color="white"
//sltPlayer.style.backgroundColor=""
sltPlayer.style.borderRadius = "10%"
sltPlayer.onchange = function () {
    numOfCards = sltPlayer.selectedIndex + 3
    for (let idx = numOfCards; idx < 5; idx++) {
        document.getElementById("card"+idx).style.display="none"
    }
    funcDrawImpSetDice()
}


for (let idx = 0; idx < 3; idx++) {
    let opt = document.createElement("option")
    opt.innerHTML = idx + 2 + "명"
    sltPlayer.appendChild(opt)

}
sltPlayer.selectedIndex=2

let cardSelect=new Array()

function funcDrawImpSetDice() {
    for (let idx = 0; idx < 5; idx++) {
        cardSelect[idx]=false
    }
    for (let idx = 0; idx < numOfCards; idx++) {
        let card = funcInsertElement("card" + idx, "button", "cards", arrCardLoc[idx][0], arrCardLoc[idx][1], arrCardLoc[idx][2], arrCardLoc[idx][3], 6 / 9)
        card.style.opacity="1.0"
        card.style.display="inline"
        let selectCard = getRandom(5)
        while (cardSelect[selectCard]==true)
        {
            selectCard = getRandom(5)
        }
        cardSelect[selectCard]=true
        card.style.backgroundImage="url('img/dice/impset/card"+selectCard+".png')"
        card.onclick=funcSelect
    }


    funcDrawDice("diceWorker", "btnDice", 4,
        arrResourceDiceImgs,
        0.1, 0.03 + 0.3 * pageWidth / 6 * 9 / pageHeight, 0.9, 0.9, 0.2, "black", funcAllDiceRoll,
        (numOfCards + 1) / 2 * 0.5 * pageHeight / 9 * 6 / pageWidth + 0.05, 0.1, 0.95, 0.9, 0.1)
    document.getElementById("diceWorker0").style.backgroundImage = "url('img/dice/impset/w4.png')"

    funcInsertFullScreenButton(0.920, 0.015, 0.98, 0.1037, 29 / 20)


}

funcDrawImpSetDice()