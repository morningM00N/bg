funcWidthPerHeight(0)

funcUpdatePageSize(true)

$(window).resize(function() {
    funcUpdatePageSize(true)
    funcDrawFleetRole()
});

let numOfPlayers = 4

let arrShipDiceImg = new Array(
    "img/fleet/cod.png",
    "img/fleet/gold.png",
    "img/fleet/lobster.png",
    "img/fleet/oyster.png",
    "img/fleet/shrimp.png",
    "img/fleet/swordfish.png"
)

let arrHarborDiceImg = new Array(
    "img/fleet/harbor.png",
    "img/fleet/harbor.png",
    "img/fleet/market.png",
    "img/fleet/market.png",
    "img/fleet/wharf.png",
    "img/fleet/wharf.png"
)



let reroll = false

function funcDrawFleetRole() {
    if (pageWidth < pageHeight) {
        for (let idx = 0; idx < nameOfRelocatedElements.length; idx++) {
            document.getElementById(nameOfRelocatedElements[idx]).style.display = "none"
        }
        let pWarning = funcInsertElement("pWarning", "p", "sltTrans", 0.1, 0.1, 0.9, 0.2)
        pWarning.innerHTML = "가로 모드로 실행해 주세요"
        pWarning.style.display = "inline"
        return
    }

    for (let idx = 0; idx < nameOfRelocatedElements.length; idx++) {
        document.getElementById(nameOfRelocatedElements[idx]).style.display = "inline"
    }
    let pWarning = document.getElementById("pWarning")
    if (pWarning != null) {
        pWarning.style.display = "none"
    }


    let btnPlayer = funcInsertElement("btnPlayer", "button", "btnTrans",
        0.9, 0.02, 0.98, 0.10)
    btnPlayer.innerHTML = numOfPlayers
    btnPlayer.onclick = function() {
        numOfPlayers++
        if (numOfPlayers == 5) {
            numOfPlayers = 2
        }
        event.srcElement.innerHTML = numOfPlayers
    }

    let btnShipPhase = funcInsertElement("btnShipPhase", "button", "sltTrans",
        0.02, 0.02, 0.37, 0.1)
    btnShipPhase.innerHTML = "출항 단계"


    btnShipPhase.onclick = function() {

        reroll = false

        for (let idx = 0; idx < 5; idx++) {
            let tempObj = document.getElementById("diceShip" + idx)
            if (tempObj != null) {
                tempObj.style.display = "none"
            }
            tempObj = document.getElementById("diceHarbor" + idx)
            if (tempObj != null) {
                tempObj.style.display = "none"
            }

        }

        funcDrawDice("diceShip", "btnTrans", numOfPlayers + 1,
            arrShipDiceImg,
            0.1, 0.15, 0.9, 0.9, 0.15, "black",
            function() {
                if (reroll == true) {
                    let idx = event.srcElement.id.replace("diceShip", "")
                    funcStartRoll("diceShip", idx, arrShipDiceImg, null)
                    return
                }
                if (event.srcElement.style.opacity != 0.5) {
                    event.srcElement.style.opacity = 0.5
                } else {
                    event.srcElement.style.opacity = 1.0
                }
            },
            0.1, 0.15, 0.9, 0.9, 0.15)

        for (let idx = 0; idx < numOfPlayers + 1; idx++) {
            document.getElementById("diceShip" + idx).style.display = "inline"
            funcStartRoll("diceShip", idx, arrShipDiceImg, null)

        }

    }



    let btnHarborPhase = funcInsertElement("btnHarborPhase", "button", "sltTrans",
        0.40, 0.02, 0.75, 0.1)
    btnHarborPhase.innerHTML = "타운 단계"

    btnHarborPhase.onclick = function() {

        reroll = false

        for (let idx = 0; idx < 5; idx++) {
            let tempObj = document.getElementById("diceShip" + idx)
            if (tempObj != null) {
                tempObj.style.display = "none"
            }
            tempObj = document.getElementById("diceHarbor" + idx)
            if (tempObj != null) {
                tempObj.style.display = "none"
            }
        }

        funcDrawDice("diceHarbor", "btnTrans", numOfPlayers + 1,
            arrShipDiceImg,
            0.1, 0.15, 0.9, 0.9, 0.15, "black",
            function() {
                if (reroll == true) {
                    let idx = event.srcElement.id.replace("diceHarbor", "")
                    if (Number(idx) == 0) {
                        funcStartRoll("diceHarbor", idx, arrShipDiceImg, null)
                    } else {
                        funcStartRoll("diceHarbor", idx, arrHarborDiceImg, null)
                    }
                    return
                }
                if (event.srcElement.style.opacity != 0.5) {
                    event.srcElement.style.opacity = 0.5
                } else {
                    event.srcElement.style.opacity = 1.0
                }
            },
            0.1, 0.15, 0.9, 0.9, 0.15)

        for (let idx = 0; idx < numOfPlayers + 1; idx++) {

            document.getElementById("diceHarbor" + idx).style.display = "inline"
            if (idx != 0) {
                funcStartRoll("diceHarbor", idx, arrHarborDiceImg, null)
            } else {
                funcStartRoll("diceHarbor", idx, arrShipDiceImg, null)

            }


        }

    }

    let btnReroll = funcInsertElement("btnReroll", "button", "btnTrans",
        0.80, 0.02, 0.88, 0.1)
    btnReroll.innerHTML = "NO"
    btnReroll.onclick = function() {
        if (reroll == false) {
            reroll = true
            event.srcElement.innerHTML = "RE"
        } else {
            reroll = false
            event.srcElement.innerHTML = "NO"
        }
    }
}

funcDrawFleetRole()
