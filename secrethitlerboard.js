funcWidthPerHeight(4096 / 2918)

funcUpdatePageSize(true)

//funcPrepareGetLocation()

var fascisttrackIdx = 1

function funcChangeFascistBrd() {
    fascisttrackIdx++
    if (fascisttrackIdx == 4) {
        fascisttrackIdx = 1
    }
    funcInsertElement("imgFascistBoard", "img", "null", 0, 0.5, 1, 1, 4096 / 2918).src = "img/secrethitler/fascisttrack" + fascisttrackIdx + ".png"
}

let arrLiberalEnacted = new Array()
let arrFascistEnacted = new Array()


let curElectionTracker = 0

function fucDrawSecretHitlerBoard() {
    // let imgLiberalBoard = funcInsertElement("imgLiberalBoard", "img", "null", 0, 0, 1, 1, 4096 / 2918)
    // imgLiberalBoard.src = "img/secrethitler/liberaltrack.png"
    // funcInsertElement("imgFascistBoard", "img", "null", 0, 0.5, 1, 1, 4096 / 2918).src = "img/secrethitler/fascisttrack" + fascisttrackIdx + ".png"

    let btnChangeFascistBrd = funcInsertElement("btnChangeFascistBoard", "button", "btnTrans",
        0.9, 0.3, 1.0, 0.4)
    btnChangeFascistBrd.innerHTML = "chage Board"
    btnChangeFascistBrd.onclick = funcChangeFascistBrd

    let locArr = new Array(0.1488, 0.1136, 0.2924, 0.3807)

    let length = locArr[2] - locArr[0];
    for (let idx = 0; idx < 5; idx++) {
        //let btnLiberal = 
        funcInsertElement("btnLiberal" + idx, "button", "btnTrans",
            locArr[0] + idx * length,
            locArr[1],
            locArr[2] + idx * length,
            locArr[3]
        ).onclick = function() {
            if (arrLiberalEnacted[idx] == true) {
                arrLiberalEnacted[idx] = false
                event.srcElement.style.backgroundImage = "url('')"
            } else {
                arrLiberalEnacted[idx] = true
                event.srcElement.style.backgroundImage = "url('img/secrethitler/policycards.png')"
                let btnElectTrack = document.getElementById("btnElect" + curElectionTracker)
                btnElectTrack.style.backgroundColor = "transparent"
                btnElectTrack.style.boxShadow = " 0px 0px transparent"

                curElectionTracker = 0
                btnElectTrack = document.getElementById("btnElect" + curElectionTracker)
                btnElectTrack.style.backgroundColor = "black"
                btnElectTrack.style.boxShadow = shadowOffset + "px " + shadowOffset + "px gray"
            }
        }
    }

    locArr = new Array(0.1488, 0.6136, 0.2724, 0.8807)
    length = locArr[2] - locArr[0];
    for (let idx = 0; idx < 6; idx++) {
        //let btnLiberal = 
        funcInsertElement("btnFascist" + idx, "button", "btnTrans",
            locArr[0] + idx * length,
            locArr[1],
            locArr[2] + idx * length,
            locArr[3]
        ).onclick = function() {
            if (arrFascistEnacted[idx] == true) {
                arrFascistEnacted[idx] = false
                event.srcElement.style.backgroundImage = "url('')"
            } else {
                arrFascistEnacted[idx] = true
                event.srcElement.style.backgroundImage = "url('img/secrethitler/policycards.png')"

                let btnElectTrack = document.getElementById("btnElect" + curElectionTracker)
                btnElectTrack.style.backgroundColor = "transparent"
                btnElectTrack.style.boxShadow = " 0px 0px transparent"

                curElectionTracker = 0
                btnElectTrack = document.getElementById("btnElect" + curElectionTracker)
                btnElectTrack.style.backgroundColor = "black"
                btnElectTrack.style.boxShadow = shadowOffset + "px " + shadowOffset + "px gray"


            }
        }
    }

    locArr = new Array(0.2, 0.5, 0.3, 0.6)
    length = 0.2

    let shadowOffset = 0.03 * pageWidth
    for (let idx = 0; idx < 4; idx++) {
        //let btnLiberal = 
        funcInsertElement("btnElect" + idx, "button", "btnTrans",
            locArr[0] + idx * length,
            locArr[1],
            locArr[2] + idx * length,
            locArr[3]
        ).onclick = function() {
            if (idx + 1 == curElectionTracker || idx - 1 == curElectionTracker) {
                let btnElectTrack = document.getElementById("btnElect" + curElectionTracker)
                btnElectTrack.style.backgroundColor = "transparent"
                btnElectTrack.style.boxShadow = " 0px 0px transparent"

                curElectionTracker = idx
                btnElectTrack = document.getElementById("btnElect" + curElectionTracker)
                btnElectTrack.style.backgroundColor = "black"
                btnElectTrack.style.boxShadow = shadowOffset + "px " + shadowOffset + "px gray"
            }
        }
    }
    let btnElectTrack = document.getElementById("btnElect" + curElectionTracker)
    btnElectTrack.style.backgroundColor = "black"
    btnElectTrack.style.boxShadow = shadowOffset + "px " + shadowOffset + "px gray"


}

fucDrawSecretHitlerBoard()
