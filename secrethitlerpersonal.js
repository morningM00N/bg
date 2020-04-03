//funcPrepareGetLocation()

funcWidthPerHeight(0)

funcUpdatePageSize(true)

$(window).resize(function() {
    funcUpdatePageSize(true)
    funcDrawSHPersonal()
});


let playerNameList = new Array();
let rawFile = new XMLHttpRequest();
rawFile.open("GET", "playername.txt", false);
rawFile.setRequestHeader('Content-Type', 'text/html;charset=utf-8')
rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
            let allText = rawFile.responseText;
            playerNameList = allText.split(/\n|\t| /);
        }
    }
}

rawFile.send(null);
for (let idx = playerNameList.length - 1; idx >= 0; idx--) {
    if (playerNameList[idx] == "") {
        playerNameList.splice(idx, 1)
    }
}

console.log(playerNameList)

let roomNumber = "방번호"
let numOfPlayers = "수"
let idxOfPlayer = 0

function funcDrawSHPersonal() {
    if (pageWidth > pageHeight) {
        for (let idx = 0; idx < nameOfRelocatedElements.length; idx++) {
            document.getElementById(nameOfRelocatedElements[idx]).style.display = "none"
        }
        let pWarning = funcInsertElement("pWarning", "p", "sltTrans", 0.1, 0.1, 0.9, 0.2)
        pWarning.innerHTML = "세로 모드로 실행해 주세요"
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


    let imgBG = funcInsertElement("imgBG", "img", null, 0, 0, 1, 1)
        //imgBG.src = "img/secrethitler/rolebg.png"
    imgBG.style.opacity = 0.5
    let inputRoom = funcInsertElement("inputRoom", "input", "sltTrans",
        0.093, 0.0560, 0.65, 0.16
    )
    inputRoom.onchange = function() {
        roomNumber = event.srcElement.value
    }
    inputRoom.value = roomNumber
    let btnNumOfP = funcInsertElement("btnNumOfP", "p", "sltTrans",
        0.67, 0.0560, 0.91, 0.16
    )
    btnNumOfP.innerHTML = numOfPlayers
    btnNumOfP.onclick = function() {
        if (numOfPlayers == "수") {
            numOfPlayers = 5
        } else {
            numOfPlayers++
            if (numOfPlayers == 11) {
                numOfPlayers = 5
            }
        }
        event.srcElement.innerHTML = numOfPlayers

    }
    let sltNumOfPlayers = funcInsertElement("sltPlayers", "select", "sltTrans",
        0.093, 0.18, 0.65, 0.18 + 0.16 - 0.0560
    )

    let optHead = document.createElement("option")
    optHead.innerHTML = "이름"
    sltNumOfPlayers.appendChild(optHead)

    for (let idx = 0; idx < playerNameList.length; idx++) {
        let opt = document.createElement("option")
        opt.innerHTML = playerNameList[idx]

        sltNumOfPlayers.appendChild(opt)
    }
    sltNumOfPlayers.selectedIndex = idxOfPlayer
    sltNumOfPlayers.onchange = function() {
        idxOfPlayer = event.srcElement.selectedIndex
    }

    let btnStart = funcInsertElement("btnStart", "button", "sltTrans",
        0.67, 0.18, 0.91, 0.18 + 0.16 - 0.0560
    )
    btnStart.onclick = funcDrawPolicy
}

let playerRole
let policyDeck = new Array(17)
for (let idx = 0; idx < policyDeck.length; idx++) {
    policyDeck[idx] = 0
}
let numOfDrawDeck = 17

function funcStartGame() {
    numOfPlayers = 7
    playerRole = new Array(numOfPlayers)

    let seed = roomNumber + "_" + idxOfPlayer + "_"
    let d = new Date()
    seed += (d.getFullYear() + "_")
    if (d.getHours() >= 1 && d.getHours() < 24) {
        seed += (d.getMonth() + "_" + d.getDate() + "_")
    }
    if (d.getMinutes() >= 5 && d.getMinutes() < 56) {
        seed += (d.getHours() + "_")
    }

    console.log(seed)
    MMath.seedrandom(seed)
    console.log(MMath.getRandom(7))
    for (let idx = 0; idx < numOfPlayers; idx++) {
        let loc = MMath.getRandom(numOfPlayers - 1)
        while (playerRole[loc] >= 0) {
            loc = MMath.getRandom(numOfPlayers - 1)
        }
        playerRole[loc] = idx
    }
    console.log(playerRole)

}

let ENACTED = 2
let DISCARDED = 1
let UNUSED = 0

function funcDrawPolicy() {
    if (numOfDrawDeck < 3) {
        console.log("reshuffle...")
        numOfDrawDeck = 0
        for (let idx = 0; idx < policyDeck.length; idx++) {
            if (policyDeck[idx] != ENACTED) {
                policyDeck[idx] = UNUSED
                numOfDrawDeck++
            }
        }
    }
    numOfDrawDeck -= 3
    console.log("remain " + numOfDrawDeck + " cards")
    for (let idx = 0; idx < 3; idx++) {
        let thisCard = MMath.getRandom(0, policyDeck.length - 1)
        while (policyDeck[thisCard] != UNUSED) {
            thisCard = MMath.getRandom(0, policyDeck.length - 1)
        }
        if (thisCard < 6) {
            console.log(thisCard, "liberal")
        } else {
            console.log(thisCard, "fascist")
        }
        policyDeck[thisCard] = DISCARDED

    }
}
funcDrawSHPersonal()

funcStartGame()
