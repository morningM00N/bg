funcWidthPerHeight(0)
funcUpdatePageSize(true)

//funcPrepareGetLocation()


let arrFixedDice = new Array()

function funcColorChange() {
    if (arrFixedDice[event.srcElement.id] == true) {
        arrFixedDice[event.srcElement.id] = false
        event.srcElement.style.opacity = "1.0"
    } else {
        arrFixedDice[event.srcElement.id] = true
        event.srcElement.style.opacity = "0.5"
    }
}


let numOfBangDice = 5

let arrBangImgs = new Array(
    "img/dice/arrow.png",
    "img/dice/dynamite.png",
    "img/dice/range1.png",
    "img/dice/range2.png",
    "img/dice/beer.png",
    "img/dice/gatling.png"
)
let stage = 0
let curRoll = 0
function funcDrawBandDice() {


    var btnBack = funcInsertElement("btnBack", "button", "btnDice",
        0.0, 0.3, 1.0, 1.0)
    var btnDone = funcInsertElement("btnDone", "button", "btnDice",
        0.0, 0.0, 1.0, 0.3)

    funcSetLocation("btnDone", 0.0, 0.0, 0.5, 1.0, true)
    btnDone.style.opacity = "0.3"
    btnDone.style.backgroundColor = "black"
    btnDone.style.borderRadius = "0%"
    btnDone.onclick = function () {
        if (stage == 1) {
            return
        }
        curRoll=0
        stage = 1
        let countDiceValue = new Array()
        for (let idx = 0; idx < 6; idx++) {
            countDiceValue[idx] = 0
        }
        for (let idx = 0; idx < numOfBangDice; idx++) {
            let _id = "btnDices" + idx
            arrFixedDice[_id] = false
            let curObj = document.getElementById(_id)
            curObj.style.opacity = "1.0"
            intervalManager[_id][0]=intervalManager[_id][1]=intervalManager[_id][2]=0
            funcMove(_id, 0.05 + 0.2 * (diceValue[_id] % 2 * 0.5 + countDiceValue[diceValue[_id]]++), 0.03 + diceValue[_id] * 0.97 / 6, 1)

        }
    }

    funcSetLocation("btnBack", 0.5, 0.0, 1.0, 1.0, true)


    btnBack.style.borderRadius = "0%"
    btnBack.onclick = function () {
        if (stage == 1) {
            if (confirm("다시 굴리시겠습니까?") != true) {
                return;
            }
            for (let idx2 = 0; idx2 < numOfBangDice; idx2++) {
                arrFixedDice["btnDices" + idx2] = false
            }
            funcDrawDice("btnDices", "btnDice", numOfBangDice,
                arrBangImgs,
                0.1, 0.3, 0.9, 0.9, 0.2, "black", funcColorChange,
                0.5, 0.1, 0.9, 0.9, 0.1)
        }
        funcUpdatePageSize(true)
        funcRelocateElements()
        if (curRoll>=3)
        {
            if (confirm("다시 굴리시겠습니까?") != true) {
                return;
            }
        }

        for (let idx2 = 0; idx2 < numOfBangDice; idx2++) {
            if (arrFixedDice["btnDices" + idx2] == true) {
                continue
            }
            funcStartRoll("btnDices", idx2, arrBangImgs, function (_id) {
                if (diceValue[_id] == 1) {
                    document.getElementById(_id).style.opacity = "0.5"
                    arrFixedDice[_id] = true
                }
            })
        }
        stage = 0
        curRoll++
    }

    funcDrawDice("btnDices", "btnDice", numOfBangDice,
        arrBangImgs,
        0.1, 0.3, 0.9, 0.9, 0.2, "black", funcColorChange,
        0.5, 0.1, 0.9, 0.9, 0.1)

    funcInsertFullScreenButton(0.9305, 0.0163, 0.9875, 0.1037, 29 / 20)
    funcSetLocation("btnFull", 0.8612, 0.0203, 0.9788, 0.0742, false)


}
//seed = 4;
funcDrawBandDice()

funcUpdatePageSize(true)
funcRelocateElements()


