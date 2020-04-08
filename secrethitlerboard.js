let userfullscreen = confirm("꽉찬 화면으로 표시하겠습니까?\n(화면이 깨질 수 있습니다.)")
//let userfullscreen = false

if (userfullscreen==true)
{
    funcWidthPerHeight(0)
}
else{

funcWidthPerHeight(4096 / 2918)
}

var doResize = true
$(window).resize(function () {
    funcUpdatePageSize(true)
    fucDrawSecretHitlerBoard()
});


funcUpdatePageSize(true)

//funcPrepareGetLocation()

var fascisttrackIdx = 1

function funcChangeFascistBrd() {
    fascisttrackIdx++
    if (fascisttrackIdx == 4) {
        fascisttrackIdx = 1
    }
    document.getElementById("imgFascistBoard").src = "img/secrethitler/fascisttrack" + fascisttrackIdx + ".png"
}

let arrLiberalEnacted = new Array()
let arrFascistEnacted = new Array()


let curElectionTracker = 0

function fucDrawSecretHitlerBoard() {
    

     let imgLiberalBoard = funcInsertElement("imgLiberalBoard", "img", "null", 0, 0, 1, 1, pageWidth/pageHeight*2)
     imgLiberalBoard.src = "img/secrethitler/liberaltrack.png"
     funcInsertElement("imgFascistBoard", "img", "null", 0, 0.5, 1, 1, pageWidth/pageHeight*2).src = "img/secrethitler/fascisttrack" + fascisttrackIdx + ".png"

    let btnChangeFascistBrd = funcInsertElement("btnChangeFascistBoard", "button", "btnTrans",
    0.4037, 0.5474, 0.5967, 0.6170
        )
    //btnChangeFascistBrd.innerHTML = "chage Board"
    btnChangeFascistBrd.onclick = funcChangeFascistBrd

    let locArr = new Array(0.1540, 0.1136, 0.2924, 0.3807)

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
                event.srcElement.style.backgroundImage = "url('img/secrethitler/liberalpolicys.png')"
                let btnElectTrack = document.getElementById("btnElect" + curElectionTracker)
                btnElectTrack.style.backgroundColor = "transparent"
                btnElectTrack.style.boxShadow = " 0px 0px transparent"

                curElectionTracker = 0
                btnElectTrack = document.getElementById("btnElect" + curElectionTracker)
                btnElectTrack.style.backgroundColor = "#2980B9"
                btnElectTrack.style.boxShadow = shadowOffset + "px " + shadowOffset + "px gray"
            }
        }
    }

    locArr = new Array(0.0886, 0.6228, 0.22652, 0.8878)
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
                event.srcElement.style.backgroundImage = "url('img/secrethitler/fascistpolicys.png')"

                let btnElectTrack = document.getElementById("btnElect" + curElectionTracker)
                btnElectTrack.style.backgroundColor = "transparent"
                btnElectTrack.style.boxShadow = " 0px 0px transparent"

                curElectionTracker = 0
                btnElectTrack = document.getElementById("btnElect" + curElectionTracker)
                btnElectTrack.style.backgroundColor = "#2980B9"
                btnElectTrack.style.boxShadow = shadowOffset + "px " + shadowOffset + "px gray"


            }
        }
    }

    locArr = new Array(0.3321, 0.3907, 0.3707, 0.4429)
    length = 0.094

    let shadowOffset = 0.004 * pageWidth
    for (let idx = 0; idx < 4; idx++) {
        //let btnLiberal = 
        funcInsertElement("btnElect" + idx, "button", "btnCircle",
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
                btnElectTrack.style.backgroundColor = "#2980B9"
                btnElectTrack.style.boxShadow = shadowOffset + "px " + shadowOffset + "px gray"
            }
        }
    }
    let btnElectTrack = document.getElementById("btnElect" + curElectionTracker)
    btnElectTrack.style.backgroundColor = "#2980B9"
    btnElectTrack.style.boxShadow = shadowOffset + "px " + shadowOffset + "px gray"
    funcInsertFullScreenButton(0.02,0.47,0.08,0.525)
    


}

fucDrawSecretHitlerBoard()
