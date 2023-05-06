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
playerNameList[playerNameList.length - 1] = (playerNameList[0])
playerNameList[0] = "이름"
for (let idx = playerNameList.length - 1; idx >= 0; idx--) {
    if (playerNameList[idx] == "") {
        playerNameList.splice(idx, 1)
    }
}


let roomNumber = "방번호"
let numOfPlayers = "수"
let idxOfPlayer = 0

//numOfPlayers = 7

let numOfEnactedLiberalPolicies = 0
let numOfEnactedFascistPolicies = 0

let policyStage = false

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

    let btnRoleBig = document.getElementById("btnRoleBig")
    if (btnRoleBig != null) {
        btnRoleBig.style.display = "none"
    }


    let pWarning = document.getElementById("pWarning")
    if (pWarning != null) {
        pWarning.style.display = "none"
    }


    let imgBG = funcInsertElement("imgBG", "img", null, 0, 0, 1, 1)
    imgBG.src = "img/bg2.jpg"
        //imgBG.style.opacity = 0.5
    let inputRoom = funcInsertElement("inputRoom", "input", "sltTrans",
        0.093, 0.0560, 0.65, 0.16
    )
    inputRoom.onclick = function() {
        inputRoom.value = prompt("방번호를 입력하세요.")
        roomNumber = inputRoom.value
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
            if (numOfPlayers == 10) {
                numOfPlayers = 5
            }
        }
        event.srcElement.innerHTML = numOfPlayers

    }
    let btnPlayerName = funcInsertElement("btnPlayerName", "button", "sltTrans",
        0.093, 0.18, 0.65, 0.18 + 0.16 - 0.0560
    )

    let shadowDepth = 0.015 * pageWidth

    let btnPolicyStart = funcInsertElement("btnPolicyStart", "button", "btnTrans",
        0.093, 0.0560 + (0.18 - 0.0560) * 2, 0.45, 0.0560 + (0.18 - 0.0560) * 2 + 0.16 - 0.0560
    )


    let btnTofuBg = funcInsertElement("btnTofuBg", "button", "btnTrans",
        0.15,
        0.0560 + (0.18 - 0.0560) * 2,
        0.85,
        0.95
    )
    btnTofuBg.style.backgroundImage = "url('img/tofu/bg.png')"
    btnTofuBg.style.boxShadow = shadowDepth + "px " + shadowDepth + "px gray"
    btnTofuBg.style.borderRadius = "7%"
    btnTofuBg.style.backgroundColor = "black"
    btnTofuBg.style.color = "white"
        //btnTofuBg.style.height = Number(btnPolicyStart.style.height.replace("px", "")) * 1.5 + "px"
    btnPolicyStart.innerHTML = "정책"
    btnPolicyStart.style.display = "none"

    let voteHeight = btnPolicyStart.style.height.replace("px", "")
    let voteWidth = voteHeight / 9 * 6
    let bottomLine = pageHeight * (0.0560 + (0.18 - 0.0560) * 2 + 0.16 - 0.0560)

    let btnVoteYes = funcInsertElement("btnVoteYes", "button", "btnTrans",
        0.5,
        0.0560 + (0.18 - 0.0560) * 2,
        0.5 + voteWidth / pageWidth * 2 + 0.05,
        0.0560 + (0.18 - 0.0560) * 2 + voteHeight / pageHeight
    )
    btnVoteYes.style.display = "none"



    btnPlayerName.innerHTML = playerNameList[idxOfPlayer]
    btnPlayerName.onclick = function() {
        idxOfPlayer++
        if (idxOfPlayer == numOfPlayers + 1) {
            idxOfPlayer = 1
        }
        event.srcElement.innerHTML = playerNameList[idxOfPlayer]
    }

    let btnStart = funcInsertElement("btnStart", "button", "sltTrans",
        0.67, 0.18, 0.91, 0.18 + 0.16 - 0.0560
    )
    btnStart.onclick = funcStartGame
    btnStart.innerHTML = "역할"
    btnStart.style.whiteSpace = "nowrap"

    let palleteWidth = pageWidth * (0.91 - 0.093)
    let policyWidth = palleteWidth * 0.3
    let policyHeight = policyWidth / 6 * 9


    for (let idx = 0; idx < 3; idx++) {
        let btnPolicy = funcInsertElement("btnPolicy" + idx, "button", "btnTrans",
            0.093 + idx * policyWidth / pageWidth + idx * 0.05 * palleteWidth / pageWidth,
            0.944 - policyHeight / pageHeight,
            0.093 + (idx + 1) * policyWidth / pageWidth + idx * 0.05 * palleteWidth / pageWidth,
            0.944
        )
        btnPolicy.style.backgroundImage = "url('img/secrethitler/policybg.png')"
        btnPolicy.style.boxShadow = shadowDepth + "px " + shadowDepth + "px gray"
        btnPolicy.onclick = function() { funcSelectPolicy(idx) }
        if (policyStage == false) {
            btnPolicy.style.display = "none"
        }
    }

    //console.log(palleteWidth)

    let topValue = Number(btnVoteYes.style.top.replace("px", "")) +
        Number(btnVoteYes.style.height.replace("px", "")) + 0.023 * pageHeight

    let bottomValue = Number(document.getElementById("btnPolicy0").style.top.replace("px", "")) -
        0.023 * pageHeight

    let btnHidden = funcInsertElement("btnHidden", "button", "btnTrans",
        0.15,
        topValue / pageHeight,
        0.48,
        bottomValue / pageHeight
    )
    btnHidden.style.boxShadow = shadowDepth + "px " + shadowDepth + "px gray"
    btnHidden.style.backgroundColor = "black"
    btnHidden.style.color = "white"
    btnHidden.innerHTML = "숨김"
    btnHidden.style.fontSize = Number(btnHidden.style.fontSize.replace("px", "")) / 2 + "px"
    if (policyStage == false) {
        btnHidden.style.display = "none"
    }
    let btnWithdraw = funcInsertElement("btnWithdraw", "button", "btnTrans",
        0.52,
        topValue / pageHeight,
        0.85,
        bottomValue / pageHeight
    )
    btnWithdraw.style.boxShadow = shadowDepth + "px " + shadowDepth + "px gray"
    btnWithdraw.style.backgroundColor = "black"
    btnWithdraw.style.color = "white"
    btnWithdraw.innerHTML = "무정부"
    btnWithdraw.style.fontSize = btnHidden.style.fontSize
    if (numOfEnactedFascistPolicies != 5 || policyStage != false) {
        btnWithdraw.style.display = "none"
    }




    //console.log("here", topValue, bottomValue)
}

let isHidden = false


let playerRole
let policyDeck = new Array(17)
for (let idx = 0; idx < policyDeck.length; idx++) {
    policyDeck[idx] = 0
}
let numOfDrawDeck = 17
let genRole = false

function funcStartGame() {
    if (idxOfPlayer == 0 || numOfPlayers == "수") {
        return
    }

    if (genRole == false) {
        playerRole = new Array(numOfPlayers)

        let seed = roomNumber + "_"
        let d = new Date()
        seed += (d.getFullYear() + "_")
        if (d.getHours() >= 1 && d.getHours() < 24) {
            seed += (d.getMonth() + "_" + d.getDate() + "_")
        }
        if (d.getMinutes() >= 5 && d.getMinutes() < 56) {
            seed += (d.getHours() + "_")
        }

        //console.log(seed)
        let tempArr = new Array()
        MMath.seedrandom(seed)
        while (true) {

            tempArr = new Array()
            for (let idx = 0; idx < numOfPlayers; idx++) {
                let loc = MMath.getRandom(0, numOfPlayers)
                while (tempArr[loc] >= 0) {
                    loc = MMath.getRandom(0, numOfPlayers)
                }
                tempArr[loc] = idx
            }
            if (!(tempArr[0] == null || (tempArr[1] == null && tempArr[3] == null))) {
                break

            }
        }
        //console.log(playerRole)
        genRole = true
        for (let idx = 0; idx < 8; idx++) {
            if (tempArr[idx] != null) {
                playerRole[tempArr[idx]] = idx
            }
        }
    }

    let btnVote = funcInsertElement("btnRoleBig", "button", "btnTrans",
        0.1,
        0.05,
        0.9,
        1.0,
        6 / 9
    )
    btnVote.style.display = "inline"
    btnVote.onclick = function() {
        event.srcElement.style.display = "none"
    }
    btnVote.style.borderRadius = "5%"




    let princessIdx = null
    let queenIdx = null
    let usedRole = new Array()

    for (let idx = 0; idx < playerRole.length; idx++) {
        if (playerRole[idx] != null) {
            if (playerRole[idx] == 1) {
                princessIdx = idx
            } else if (playerRole[idx] == 2) {
                queenIdx = idx
            }
            usedRole[playerRole[idx]] = true
        }
    }
    let contents = ""
    if (princessIdx != null) {
        console.log("공주:" + playerNameList[princessIdx + 1])
        contents += "공주:" + playerNameList[princessIdx + 1] + "<br>"
    }
    if (queenIdx != null) {
        console.log("여왕:" + playerNameList[queenIdx + 1])
        contents += "여왕:" + playerNameList[queenIdx + 1] + "<br>"
    }
    for (let idx = 0; idx <= numOfPlayers; idx++) {
        if (usedRole[idx] != true) {
            console.log("role:" + idx)
            contents += "남는역할:"
            switch (idx) {
                case 1:
                    contents += "공주"
                    break;

                case 2:
                    contents += "여왕"
                    break;
                case 3:
                    contents += "시녀"
                    break;
                case 4:
                    contents += "경호원"
                    break;
                case 5:
                    contents += "요리사"
                    break;
                case 6:
                    contents += "대신"
                    break;
                case 7:
                    contents += "스파이"
                    break;
                default:
                    break;
            }
        }
    }
    btnVote.innerHTML = contents
    btnVote.style.whiteSpace = "nowrap"
    btnVote.style.lineHeight = btnVote.style.height.replace("px", "") / 10 + "px"
    btnVote.style.fontSize = btnVote.style.height.replace("px", "") / 10 + "px"
    btnVote.style.color = "orange"
    btnVote.style.fontWeight = "bold"

    if (playerRole[idxOfPlayer - 1] == 0) {
        btnVote.style.backgroundImage = "url('img/tofu/prince.png')"
        btnVote.innerHTML = ""
    } else if (playerRole[idxOfPlayer - 1] == 1) {
        btnVote.style.backgroundImage = "url('img/tofu/princess.png')"
            //btnVote.innerHTML = ""
        btnVote.style.color = "red"
    } else if (playerRole[idxOfPlayer - 1] == 2) {
        btnVote.style.backgroundImage = "url('img/tofu/queen.png')"
            //btnVote.innerHTML = ""
        btnVote.style.color = "blue"
    } else if (playerRole[idxOfPlayer - 1] == 3) {
        btnVote.style.backgroundImage = "url('img/tofu/waitress.png')"
            //btnVote.innerHTML = ""
    } else if (playerRole[idxOfPlayer - 1] == 4) {
        btnVote.style.backgroundImage = "url('img/tofu/guard.png')"
            //btnVote.innerHTML = ""
        btnVote.style.color = "blue"

    } else if (playerRole[idxOfPlayer - 1] == 5) {
        btnVote.style.backgroundImage = "url('img/tofu/cooker.png')"
            //btnVote.innerHTML = ""
        btnVote.style.color = "red"
    } else if (playerRole[idxOfPlayer - 1] == 6) {
        btnVote.style.backgroundImage = "url('img/tofu/major.png')"
            //btnVote.innerHTML = ""
        btnVote.style.color = "blue"

    } else if (playerRole[idxOfPlayer - 1] == 7) {
        btnVote.style.backgroundImage = "url('img/tofu/spy.png')"
            //btnVote.innerHTML = ""
    }


}

let ENACTED = 2
let DISCARDED = 1
let UNUSED = 0

let curPickedPolicyCards = new Array()

let lastCard = false


funcDrawSHPersonal()
