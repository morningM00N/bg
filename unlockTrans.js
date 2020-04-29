funcWidthPerHeight(0)

funcUpdatePageSize(true)


let wordList = new Array();
let rawFile = new XMLHttpRequest();
let cardIDList = new Array();
rawFile.open("GET", "unlockTest.txt", false);
rawFile.setRequestHeader('Content-Type', 'text/html;charset=utf-8')
rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
            let allText = rawFile.responseText;
            let thisWord = ""
            wordList = allText.split('|')
            for (let idx = 0; idx < allText.length; idx++) {
                //console.log(allText[idx], allText.charCodeAt(idx))
                // if (allText[idx] == '\n' ||
                //     allText[idx] == '\t' ||
                //     allText[idx] == ' ' ||
                //     Number(allText[idx]) == 0) {
                //     if (thisWord.length > 0 && thisWord.length <= 4) {
                //         if (wordDupCheck[thisWord] != 0) {
                //             wordList.push(thisWord)
                //             wordDupCheck[thisWord] = 0
                //         }

                //     }
                //     thisWord = ""
                // } else {
                //     thisWord += allText[idx]
                // }

            }
            //wordList = allText.split(/\n|\t| /);
        }
    }
}

rawFile.send(null);

let contentInfor = new Array()
let removeInfor = new Array()
let idx = 1
while (idx < wordList.length) {
    cardIDList.push(wordList[idx])
    contentInfor[wordList[idx]] = wordList[idx + 1]
    removeInfor[wordList[idx]] = new Array()
    for (let idx2 = 0; idx2 < wordList[idx + 2]; idx2++) {
        removeInfor[wordList[idx]][idx2] = wordList[idx + 2 + idx2 + 1]
    }
    idx = idx + 3 + Number(wordList[idx + 2]) + 1
}
contentInfor.forEach(function(item, index, array) {
    console.log(item, index)
})

cardIDList.sort()
let heightRatio = 1.5 * pageWidth * 0.23 / pageHeight

let numberCount = new Array()
let numOfCha = 0
for (let idx2 = 0; idx2 < cardIDList.length; idx2++) {
    if (isNaN(Number(cardIDList[idx2]))) {
        numOfCha++
    } else {
        let bucket = Math.floor(Number(cardIDList[idx2]) / 10)
        if (numberCount[bucket] > 0) {
            numberCount[bucket]++
        } else {
            numberCount[bucket] = 1
        }

    }
}

let characterLoc = new Array()
for (let idx = 0; idx < 10; idx++) {
    characterLoc[idx] = new Array()
}

while (numOfCha > 0) {
    for (let idx = 0; idx < 10; idx++) {
        if (characterLoc[idx].length == 2 || characterLoc[idx].length + numberCount[idx] >= 8) {
            continue
        }
        characterLoc[idx].push(cardIDList[cardIDList.length - numOfCha])
        numOfCha--
        break
    }
}

function funcPickCards(idx) {
    for (let idx2 = 0; idx2 < cardIDList.length; idx2++) {
        let cardBack = document.getElementById("btnCardBack" + cardIDList[idx2])
        if (cardBack != null) {
            cardBack.style.display = "none"
        }

    }

    let numOfCards = 0
    for (let idx2 = 0; idx2 < cardIDList.length; idx2++) {
        if ((cardIDList[idx2] < 10 * (idx + 1) && cardIDList[idx2] >= idx * 10) || characterLoc[idx].includes(cardIDList[idx2])) {
            let cardBack = funcInsertElement("btnCardBack" + cardIDList[idx2],
                "button", "btnTrans",
                0.025 + numOfCards % 4 * 0.24,
                0.13 + Math.floor(numOfCards / 4) * 1.02 * heightRatio,
                0.025 + 0.23 + numOfCards % 4 * 0.24,
                0.13 + heightRatio + Math.floor(numOfCards / 4) * 1.02 * heightRatio)
            numOfCards++
            cardBack.innerHTML = cardIDList[idx2]
            cardBack.style.display = "inline"
            cardBack.style.fontSize = cardBack.style.fontSize.replace("px", "") / 2 + "px"
            cardBack.style.whiteSpace = "nowrap"
            cardBack.onclick = function() {
                funcShowTrans(cardIDList[idx2])
            }


        }
    }
}


function funcShowTrans(idx2) {
    let tableTrans = document.getElementById("tableTrans")
    let newRow = document.createElement("tr")
        //newRow.style.border = "1px solid black"

    //    newRow.style.height = 0.01 * pageHeight + "px"
    tableTrans.appendChild(newRow)

    {
        let newCol = document.createElement("td")
        newCol.innerHTML = idx2
        newCol.style.border = "1px solid black"
        if (tableTrans.childElementCount > 1) {
            newCol.style.borderTop = "0px"
        }
        newCol.style.borderRadius = "5px 0px 0px 5px"
        newCol.style.padding = "10px"
        newCol.style.textAlign = "center"
            //newCol.style.height = 0.01 * pageHeight + "px"
        newRow.appendChild(newCol)
        newRow.onclick = function() {
            newRow.remove()
            if (tableTrans.children[0] != null) {
                tableTrans.children[0].children[0].style.borderTop = "1px solid black"
                tableTrans.children[0].children[1].style.borderTop = "1px solid black"
            }
        }

    }

    {
        let newCol = document.createElement("td")
        newCol.innerHTML = contentInfor[idx2]
        newCol.style.border = "1px solid black"
        if (tableTrans.childElementCount > 1) {
            newCol.style.borderTop = "0px"
        }
        newCol.style.borderLeft = "0px"
        newCol.style.borderRadius = "0px 5px 5px 0px"
        newCol.style.padding = "10px"
        newCol.style.textAlign = "center"

        //        newCol.style.height = 0.01 * pageHeight + "px"
        newRow.appendChild(newCol)
    }
}

function funcDrawUnlock() {

    let tableTrans = funcInsertElement("tableTrans", "table", null,
            0.05,
            0.15 + heightRatio + 1 * 1.04 * heightRatio,
            0.95,
            0.95
        )
        //tableTrans.style.border = "1px solid black"
    tableTrans.style.fontSize = pageHeight / 30 + "px"
    tableTrans.style.lineHeight = null
    tableTrans.style.height = null
        //tableTrans.style.width = null

    for (let idx = 0; idx < 10; idx++) {
        let btnCards = funcInsertElement(
            "btnCards" + idx, "button", "btnTrans",
            0.025 + idx % 5 * 0.195,
            Math.floor(idx / 5) * 0.055 + 0.015,
            0.195 + idx % 5 * 0.195,
            Math.floor(idx / 5) * 0.055 + 0.065
        )
        btnCards.innerHTML = (idx * 10) + "~ "
        for (let idx2 = 0; idx2 < characterLoc[idx].length; idx2++) {
            btnCards.innerHTML = btnCards.innerHTML + "," + characterLoc[idx][idx2]

        }
        btnCards.style.whiteSpace = "nowrap"
        btnCards.style.fontSize = Number(btnCards.style.fontSize.replace("px", "")) / 3 + "px"
        btnCards.onclick = function() {
            funcPickCards(idx)
        }

    }



}


$(window).resize(function() {
    funcUpdatePageSize(true)
    funcDrawUnlock()
});

funcDrawUnlock()
