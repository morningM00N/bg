funcWidthPerHeight(0)

funcUpdatePageSize(true)

funcWidthPerHeight(0)

funcUpdatePageSize(true)

$(window).resize(function() {
    funcUpdatePageSize(true)
    funcDrawCodenameBoard()
});

let wordDupCheck = new Array()

let wordList = new Array();
let rawFile = new XMLHttpRequest();
rawFile.open("GET", "wordlist.txt", false);
rawFile.setRequestHeader('Content-Type', 'text/html;charset=utf-8')
rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
            let allText = rawFile.responseText;
            let thisWord = ""
            for (let idx = 0; idx < allText.length; idx++) {
                if (allText[idx] == '\n' ||
                    allText[idx] == '\t' ||
                    allText[idx] == ' ' ||
                    Number(allText[idx]) == 0) {
                    if (thisWord.length > 0 && thisWord.length <= 4) {
                        if (wordDupCheck[thisWord] != 0) {
                            wordList.push(thisWord)
                            wordDupCheck[thisWord] = 0
                        }

                    }
                    thisWord = ""
                } else {
                    thisWord += allText[idx]
                }

            }
            //wordList = allText.split(/\n|\t| /);
        }
    }
}

rawFile.send(null);

let idxAssasin = null
let idxReds = null
let idxBlues = null

function funcSetSeed(roomNumber) {
    idxReds = new Array()
    idxBlues = new Array()
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
    MMath.seedrandom(seed)

    for (let idx = 0; idx < 1000 * wordList.length; idx++) {
        let idx1 = MMath.getRandom(0, wordList.length - 1)
        let idx2 = MMath.getRandom(0, wordList.length - 1)
        let tempWord = wordList[idx1]
        wordList[idx1] = wordList[idx2]
        wordList[idx2] = tempWord
    }

    let arrSelected = new Array()
    idxAssasin = MMath.getRandom(0, 24)
    arrSelected[idxAssasin] = true
    for (let idx = 0; idx < 9; idx++) {
        let selectedIdx = MMath.getRandom(0, 24)
        while (arrSelected[selectedIdx] == true) {
            selectedIdx = MMath.getRandom(0, 24)
        }
        arrSelected[selectedIdx] = true
        idxReds[idx] = selectedIdx
    }

    for (let idx = 0; idx < 8; idx++) {
        let selectedIdx = MMath.getRandom(0, 24)
        while (arrSelected[selectedIdx] == true) {
            selectedIdx = MMath.getRandom(0, 24)
        }
        arrSelected[selectedIdx] = true
        idxBlues[idx] = selectedIdx
    }
    console.log(idxAssasin, idxReds, idxBlues)

}

let change = false
let gameStarted = false
let allSee = false

function funcDrawCodenameBoard() {
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


    let inputRoomName = funcInsertElement("inputRoomName", "button", "sltTrans", 0.01, 0.02, 0.25, 0.08)
    inputRoomName.innerHTML = "방번호"
    inputRoomName.onclick = startGame

    let btnChange = funcInsertElement("btnChange", "button", "sltTrans", 0.26, 0.02, 0.50, 0.08)
    btnChange.innerHTML = "교체"
    if (change == false) {
        btnChange.style.opacity = 0.4
    } else {
        btnChange.style.opacity = 1.0
    }
    btnChange.onclick = function() {
        if (change == true) {
            change = false
            event.srcElement.style.opacity = 0.4
        } else {
            change = true
            event.srcElement.style.opacity = 1.0
        }
    }

    let btnAllShow = funcInsertElement("btnAllShow", "button", "sltTrans", 0.51, 0.02, 0.75, 0.08)
    btnAllShow.innerHTML = "확인"
    btnAllShow.onclick = function() {
        if (idxReds == null || idxBlues == null || idxAssasin == null) {
            return
        }
        if (confirm("정말 전체 단어를 확인하겠습니까?") != true) {
            return
        }
        if (allSee == true) {
            allSee = false
        } else {
            allSee = true
        }
        if (change == true) {
            change = false
            document.getElementById("btnChange").style.opacity = 0.5
        }
        for (let idx = 0; idx < 5; idx++) {
            for (let idx2 = 0; idx2 < 5; idx2++) {
                let btnSymbol = funcInsertElement("btnSym" + idx + "_" + idx2, "button", "sltTrans",
                    0.01 + idx * 0.94 / 5 + 0.01 * idx,
                    0.09 + idx2 * 0.86 / 5 + 0.01 * idx2,
                    0.01 + idx * 0.94 / 5 + 0.01 * idx + 0.02,
                    0.09 + idx2 * 0.86 / 5 + 0.01 * idx2 + 0.03,
                )
                btnSymbol.style.borderRadius = "30%"
                if (allSee == true) {
                    let showThis = false
                    let thisIdx = 5 * idx + idx2
                    if (thisIdx == idxAssasin) {
                        btnSymbol.style.backgroundColor = "black"
                        showThis=true
                        continue
                    }
                    for (let i = 0; i < idxReds.length; i++) {
                        if (idxReds[i] == thisIdx) {
                            btnSymbol.style.backgroundColor = "red"
                            showThis=true
                        }
                    }
                    for (let i = 0; i < idxBlues.length; i++) {
                        if (idxBlues[i] == thisIdx) {
                            btnSymbol.style.backgroundColor = "blue"
                            showThis=true
                        }
                    }
                    if (showThis==false)
                    {
                        btnSymbol.style.backgroundColor="transparent"
                    }

                } else {
                    btnSymbol.style.backgroundColor = "transparent"
                }



            }

        }
    }
    let btnFull = funcInsertElement("btnFull", "button", "sltTrans", 0.76, 0.02, 0.98, 0.08)
    btnFull.innerHTML = "전체화면"
    btnFull.onclick = funcFullScreen

    if (gameStarted) {
        for (let idx = 0; idx < 5; idx++) {
            for (let idx2 = 0; idx2 < 5; idx2++) {
                let btnWord = funcInsertElement("btnWord" + idx + "_" + idx2, "button", "sltTrans",
                    0.01 + idx * 0.94 / 5 + 0.01 * idx,
                    0.09 + idx2 * 0.86 / 5 + 0.01 * idx2,
                    0.01 + (idx + 1) * 0.94 / 5 + 0.01 * idx,
                    0.09 + (idx2 + 1) * 0.86 / 5 + 0.01 * idx2,
                )

                //btnWord.style.backgroundImage = "url('https://github.com/eettrrr/bg/blob/master/codename/img/codename.png?raw=true')"
                btnWord.style.borderRadius = "10%"
                    //btnWord.innerHTML = wordList[5 * idx + idx2]
                btnWord.style.fontFamily = "'Stylish', sans-serif"
                btnWord.style.fontSize = Number(btnWord.style.width.replace("px", "")) / 4 + "px"
                    //btnWord.style.paddingTop = Number(btnWord.style.height.replace("px", "")) / 7 + "px"
                btnWord.onclick = function() {
                    funcSelectCard(idx, idx2)
                }

                let btnSymbol = funcInsertElement("btnSym" + idx + "_" + idx2, "button", "sltTrans",
                    0.01 + idx * 0.94 / 5 + 0.01 * idx,
                    0.09 + idx2 * 0.86 / 5 + 0.01 * idx2,
                    0.01 + idx * 0.94 / 5 + 0.01 * idx + 0.02,
                    0.09 + idx2 * 0.86 / 5 + 0.01 * idx2 + 0.03,
                )
                btnSymbol.style.borderRadius = "30%"
                if (allSee == true) {
                    let thisIdx = 5*idx + idx2 
                    if (thisIdx == idxAssasin) {
                        btnSymbol.style.backgroundColor = "black"
                        continue
                    }
                    for (let i = 0; i < idxReds.length; i++) {
                        if (idxReds[i] == thisIdx) {
                            btnSymbol.style.backgroundColor = "red"
                        }
                    }
                    for (let i = 0; i < idxBlues.length; i++) {
                        if (idxBlues[i] == thisIdx) {
                            btnSymbol.style.backgroundColor = "blue"
                        }
                    }

                } else {
                    btnSymbol.style.backgroundColor = "transparent"
                }
            }

        }
    }

}

let arrWordChange = new Array()


funcDrawCodenameBoard()

function startGame() {
    allSee = false
    gameStarted = true
    let val = prompt("방번호를 입력해주세요.")
    if (val == null || val.length == 0) {
        //MMath.seedrandom(0)
        val = MMath.getRandom(0, 9999)
    }
    document.getElementById("inputRoomName").innerHTML = val

    funcSetSeed(val)

    for (let idx = 0; idx < 5; idx++) {
        for (let idx2 = 0; idx2 < 5; idx2++) {
            let btnWord = funcInsertElement("btnWord" + idx + "_" + idx2, "button", "sltTrans",
                0.01 + idx * 0.94 / 5 + 0.01 * idx,
                0.09 + idx2 * 0.86 / 5 + 0.01 * idx2,
                0.01 + (idx + 1) * 0.94 / 5 + 0.01 * idx,
                0.09 + (idx2 + 1) * 0.86 / 5 + 0.01 * idx2,
            )
            btnWord.style.backgroundImage = "url('https://github.com/eettrrr/bg/blob/master/codename/img/codename.png?raw=true')"
            btnWord.style.borderRadius = "10%"
            btnWord.innerHTML = wordList[5 * idx + idx2]
            btnWord.style.fontFamily = "'Stylish', sans-serif"
            btnWord.style.fontSize = Number(btnWord.style.width.replace("px", "")) / 4 + "px"
                //btnWord.style.paddingTop = Number(btnWord.style.height.replace("px", "")) / 7 + "px"
            btnWord.onclick = function() {
                funcSelectCard(idx, idx2)
            }
        }

    }

}

function funcSelectCard(idx, idx2) {
    console.log("function funcSelectCard(idx,idx2)")
    let thisIdx = 5 * idx + idx2
    if (change == true) {
        if (arrWordChange[thisIdx] > 0) {
            arrWordChange[thisIdx]++
        } else {
            arrWordChange[thisIdx] = 1
        }
        document.getElementById("btnWord" + idx + "_" + idx2).innerHTML = wordList[thisIdx + 25 * arrWordChange[thisIdx]]
        return
    }
    let drawed = false
    if (thisIdx == idxAssasin) {
        document.getElementById("btnWord" + idx + "_" + idx2).style.backgroundImage = "url('https://github.com/eettrrr/bg/blob/master/codename/img/assa.jpg?raw=true')"
        drawed = true
    }
    for (let i = 0; i < idxReds.length; i++) {
        if (idxReds[i] == thisIdx) {
            document.getElementById("btnWord" + idx + "_" + idx2).style.backgroundImage = "url('https://github.com/eettrrr/bg/blob/master/codename/img/red" + (i % 7) + ".jpg?raw=true')"
            drawed = true
        }
    }
    for (let i = 0; i < idxBlues.length; i++) {
        if (idxBlues[i] == thisIdx) {
            document.getElementById("btnWord" + idx + "_" + idx2).style.backgroundImage = "url('https://github.com/eettrrr/bg/blob/master/codename/img/blue" + (i % 7) + ".jpg?raw=true')"
            drawed = true
        }
    }
    if (drawed == false) {
        document.getElementById("btnWord" + idx + "_" + idx2).style.backgroundImage = "url('https://github.com/eettrrr/bg/blob/master/codename/img/ino" + MMath.getRandom(0, 3) + ".jpg?raw=true')"
    }
    if (document.getElementById("btnWord" + idx + "_" + idx2).style.color == "transparent") {
        document.getElementById("btnWord" + idx + "_" + idx2).style.color = "white"
    } else {
        document.getElementById("btnWord" + idx + "_" + idx2).style.color = "transparent"
    }
}

//startGame()
