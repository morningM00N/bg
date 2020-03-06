funcWidthPerHeight(0)

//funcPrepareGetLocation()

funcUpdatePageSize(true)

var numberOfGoldDice = 0

var numberOfWhiteDice = 9
var stage = 0 // 0: 주사위 굴리기 , 1: 주사위 굴려짐, 
var diceValuePerLoc = new Array()

function funcSelect(idx) {
    if (stage == 2) {
        console.log(idx)
    }
    let thisValue = diceValuePerLoc[6 - idx]
    for (let idx = 0; idx < numberOfWhiteDice + numberOfGoldDice; idx++) {
        if (diceValue[idx] == thisValue) {
            document.getElementById("btnDice" + idx).style.display = "none"
        }
        if (idx >= numberOfWhiteDice) {
            document.getElementById("btnDice" + idx).style.display = "none"
        }

    }

}

function funcDrawCorinthDice() {




    for (let idx = 0; idx < 6; idx++) {
        let topTic = 0.163
        let btnSelect = funcInsertElement(
            "btnSelect" + idx,
            "button",
            "btnTrans",
            0.0488, 0.0375 + idx * topTic, 0.2125, 0.1445 + idx * topTic
        )
        btnSelect.onclick = function() {
            funcSelect(idx)
        }

    }

    let btnBack = funcInsertElement(
        "btnBack",
        "button",
        "btnTrans",
        0.25, 0.08, 1.0, 1.0
    )
    btnBack.onclick = funcBtnBack
    funcDrawDice()

    funcInsertFullScreenButton(0.8888, 0.0103, 0.9750, 0.0828, 20 / 29)


}

function funcDrawDice() {
    for (let idx = 0; idx < numberOfWhiteDice; idx++) {
        let _left = (getRandom(60) + 30) / 100
        let _top = (getRandom(30) + 30) / 100
        let btnDice = funcInsertElement(
            "btnDice" + idx,
            "button",
            "btnTrans",
            _left, _top, _left + 0.1, 1.0, 1.0
        )
        btnDice.style.display = "inline"
        let numOfTry = 100
        while (isValidLoc(idx) == false) {
            numOfTry--
            if (numOfTry == 0) {
                alert("cannnot" + idx)
                break;
            }
            _left = (getRandom(60) + 30) / 100
            _top = (getRandom(30) + 30) / 100
            btnDice = funcInsertElement(
                "btnDice" + idx,
                "button",
                "btnTrans",
                _left, _top, _left + 0.1, 1.0, 1.0
            )
        }

        btnDice.style.backgroundColor = "black"
        btnDice.style.backgroundImage = "url(img/dice/W" + (getRandom(6) + 1) + ".png)"
            // btnDice.style.color = "red"
            // btnDice.innerHTML = idx
        btnDice.style.borderRadius = "20%"
        btnDice.style.boxShadow = "1vw 1vw gray"
        btnDice.onclick = function() {
            if (stage == 0) {
                stage = 1
                for (let idx2 = 0; idx2 < numberOfWhiteDice + numberOfGoldDice; idx2++) {
                    funcStartRoll(idx2)
                }
            }

        }
    }
}

function isValidLoc(diceNumber) {
    if (diceNumber == 0) {
        return
    }
    let idxLoc = 0
    if (pageHeight < pageWidth) {
        idxLoc = 1
    }
    let overlap = true
    let locThis = mapLocationInfor["btnDice" + diceNumber].loc[idxLoc]
    let sizeThis = mapLocationInfor["btnDice" + diceNumber].size[idxLoc]
    for (let idx = 0; idx < diceNumber; idx++) {
        let locTarget = mapLocationInfor["btnDice" + idx].loc[idxLoc]
        if (locThis[0] > locTarget[0] + sizeThis[0] || locTarget[0] > locThis[0] + sizeThis[0] ||
            locThis[1] > locTarget[1] + sizeThis[1] || locTarget[1] > locThis[1] + sizeThis[1]) {
            overlap = false
        } else {
            overlap = true
            break
        }
    }
    return overlap == false

}

var intervalManager = new Array()
var curDegree = new Array()
var diceValue = new Array()


function funcStartRoll(diceNumber) {

    curDegree[diceNumber] = getRandom(360)
    if (intervalManager[diceNumber] == null) {
        intervalManager[diceNumber] = new Array()
    }
    intervalManager[diceNumber][0] = 10
    intervalManager[diceNumber][1] = 1
    intervalManager[diceNumber][2] = 1

    intervalManager[diceNumber][0] = 90 + getRandom(40)
    intervalManager[diceNumber][1] = 5 + getRandom(10)
    intervalManager[diceNumber][2] = 3 + getRandom(3)
    var passedTime1 = intervalManager[diceNumber][0] * 10
    let passedTime2 = passedTime1 + intervalManager[diceNumber][1] * 100
    let intFirstTry = setInterval(function() { funcRoll(diceNumber, 0, intFirstTry) }, 10)
    setTimeout(function() {
        let intervalNew = setInterval(function() { funcRoll(diceNumber, 1, intervalNew) }, 100)
    }, passedTime1)
    setTimeout(function() {
        let intervalNew = setInterval(function() { funcRoll(diceNumber, 2, intervalNew) }, 200)
    }, passedTime2)
    stage = 1

}

function funcRoll(diceNumber, idx, intFirstTry) {

    let _id = "btnDice" + diceNumber
    if (intervalManager[diceNumber][idx] == 0) {
        clearInterval(intFirstTry)
        return
    }
    --intervalManager[diceNumber][idx]
    let rolledObject = document.getElementById(_id)
    diceValue[diceNumber] = (getRandom(6) + 1)
    if (diceNumber <= 8) {
        rolledObject.style.backgroundImage = "url('img/dice/w" + diceValue[diceNumber] + ".png')"
    } else {
        rolledObject.style.backgroundImage = "url('img/dice/b" + diceValue[diceNumber] + ".png')"
    }
    if (getRandom(10) % 2 == 0) {
        curDegree[diceNumber] += 2
    } else {
        curDegree[diceNumber] -= 2
    }
    rolledObject.style.transform = "rotate(" + curDegree[diceNumber] + "deg)"


}


function funcBtnBack() {

    if (stage == 0) {
        // gold dice insert
        if (numberOfGoldDice == 3) {
            alert("더이상 추가할 수 없습니다.")
            return
        }
        let _left = (getRandom(60) + 30) / 100
        let _top = (getRandom(30) + 30) / 100
        let btnDice = funcInsertElement(
            "btnDice" + (numberOfGoldDice + 9),
            "button",
            "btnTrans",
            _left, _top, _left + 0.1, 1.0, 1.0
        )
        let numOfTry = 100
        while (isValidLoc(numberOfGoldDice + 9) == false) {
            numOfTry--
            if (numOfTry == 0) {
                alert("cannnot" + idx)
                break;
            }
            _left = (getRandom(60) + 30) / 100
            _top = (getRandom(30) + 30) / 100
            btnDice = funcInsertElement(
                "btnDice" + (numberOfGoldDice + 9),
                "button",
                "btnTrans",
                _left, _top, _left + 0.1, 1.0, 1.0
            )
        }
        ++numberOfGoldDice
        btnDice.style.backgroundColor = "yellow"
        btnDice.style.backgroundImage = "url(img/dice/B" + (getRandom(6) + 1) + ".png)"
            //btnDice.style.color = "red"
            //btnDice.innerHTML = idx
        btnDice.style.borderRadius = "20%"
        btnDice.style.boxShadow = "1vw 1vw gray"
        btnDice.onclick = function() {
            for (let idx2 = 0; idx2 < numberOfWhiteDice + numberOfGoldDice; idx2++) {
                funcStartRoll(idx2)
            }
        }
    } else if (stage == 1) // align
    {
        stage = 2
        let targetLoc = new Array()
        let numOfDiceValue = new Array()
        for (let idx = 1; idx <= 6; idx++) {
            targetLoc[idx] = 0
            numOfDiceValue[idx] = 0
        }
        let max = 0
        for (let idx = 0; idx < numberOfGoldDice + numberOfWhiteDice; idx++) {
            numOfDiceValue[diceValue[idx]]++
                if (diceValue[idx] > max) {
                    max = diceValue[idx]
                }
        }

        let iter = 1
        for (let idx = 1; idx < max; idx++) {
            if (numOfDiceValue[idx] > 0) {
                targetLoc[idx] = iter
                diceValuePerLoc[iter] = idx
                iter++
            }
        }
        targetLoc[max] = 6
        diceValuePerLoc[6] = max

        for (let idx = 1; idx <= 6; idx++) {
            numOfDiceValue[idx] = 0
        }
        for (let idx = 0; idx < numberOfGoldDice + numberOfWhiteDice; idx++) {
            let thisVal = diceValue[idx]
            let column = 1.03 - 0.16 * targetLoc[thisVal]
            let row = 0.30 + 0.12 * numOfDiceValue[thisVal]
            numOfDiceValue[thisVal] += 1
            funcMove("btnDice" + idx, row, column, 1)

        }

    } else {
        funcDrawDice()
        stage = 0
        numberOfGoldDice = 0
    }

}



funcDrawCorinthDice()
