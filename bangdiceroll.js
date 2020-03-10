funcWidthPerHeight(0)
funcUpdatePageSize(true)


function funcBangRoll() {
    for (let idx2 = 0; idx2 < numOfBangDice; idx2++) {
        funcStartRoll("btnDices", idx2, arrImgs)
    }
}

let arrFixedDice = new Array()

function funcColorChange() {
    if (arrFixedDice[event.srcElement.id] == true) {
        arrFixedDice[event.srcElement.id] = false
        event.srcElement.style.border = "0px"
    } else {
        arrFixedDice[event.srcElement.id] = true
        event.srcElement.style.border = "5px solid blue"
    }
}

function funcDrawBandDice() {
    let arrBangImgs = new Array("img/dice/W1.png", "img/dice/W2.png", "img/dice/W3.png", "img/dice/W4.png", "img/dice/W5.png", "img/dice/W6.png")

    let numOfBangDice = 5

    var btnBack = funcInsertElement("btnBack", "button", "btnDice",
        0.1, 0.1, 0.9, 0.9)

    funcDrawDice("btnDices", "btnDice", numOfBangDice,
        arrBangImgs,
        0.1, 0.1, 0.9, 0.9, 0.2, "black", funcColorChange)

    btnBack.style.borderRadius = "0%"
    btnBack.onclick = function() {
        for (let idx2 = 0; idx2 < numOfBangDice; idx2++) {
            if (arrFixedDice["btnDices" + idx2] == true) {
                continue
            }
            funcStartRoll("btnDices", idx2, arrBangImgs)
        }
    }
}

funcDrawBandDice()
