let temppageHeight = document.documentElement.clientHeight
let temppageWidth = document.documentElement.clientWidth
let ratio = temppageWidth / temppageHeight
if (ratio < 1) {
    ratio = 1 / ratio
}

funcWidthPerHeight(ratio)

funcUpdatePageSize(true, true)

$(window).resize(function() {
    if (doResize == false) {
        return
    }
    funcUpdatePageSize(true, true)
    funcRelocateElements()
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

function funcDrawSHPersonal() {
    let inputRoom = funcInsertElement("inputRoom", "input", "sltTrans",
        0, 0, 0.4, 0.1)
    inputRoom.value = "방번호"
    let btnNumOfP = funcInsertElement("btnNumOfP", "p", "sltTrans",
        0.5, 0, 0.7, 0.111)
    btnNumOfP.innerHTML = 5
    btnNumOfP.onclick = function() {
        let numOfPlayer = Number(event.srcElement.innerHTML) + 1
        if (numOfPlayer == 11) {
            numOfPlayer = 5
        }
        event.srcElement.innerHTML = numOfPlayer

    }
    let sltNumOfPlayers = funcInsertElement("sltPlayers", "select", "sltTrans",
        0.8, 0, 1.0, 0.111)

    let optHead = document.createElement("option")
    optHead.innerHTML = "이름"
    sltNumOfPlayers.appendChild(optHead)

    for (let idx = 0; idx < playerNameList.length; idx++) {
        let opt = document.createElement("option")
        opt.innerHTML = playerNameList[idx]

        sltNumOfPlayers.appendChild(opt)
    }
}

funcDrawSHPersonal()
