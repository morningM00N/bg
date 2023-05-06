funcWidthPerHeight(1123 / 785)

funcUpdatePageSize(true)

//funcPrepareGetLocation()

var arrCoin = new Array()
var arrDonkey = new Array()
var arrFirst = new Array()


function drawCorinth() {
    var arrGlass = new Array()
    for (let idx = 0; idx < 13; idx++) {
        arrGlass[idx] = false

    }


    funcInsertFullScreenButton(0.010, 0.010, 0.0832, 0.0730, 29 / 20)


    var leftIter = 0.140189671
    var topIter = 3 * 0.321210191 - 2 * 0.131210191
    for (let idx = 0; idx < 13; idx++) {
        var btnLamp = appendElement("button", "btnGlass" + idx, "rect", leftIter, topIter, 0.03205699, 0.046312102, 0.05)
        var boundGlass = new Array(0, 2, 5, 8, 13)
        btnLamp.onclick = function() {
            funcClickItem(arrGlass, idx, boundGlass, "Glass")
        }
        if (idx == 1 || idx == 4 || idx == 7) {
            topIter = 3 * 0.321210191 - 2 * 0.131210191
            leftIter += 0.075
        }
        if (idx == 0 || idx == 2 || idx == 5 || idx == 9) {
            topIter += 0.055
        }
        if (idx == 2) {
            leftIter -= 0.016
        }
        if (idx == 3) {
            leftIter += 0.032
        }
        if (idx == 4) {
            leftIter -= 0.017
        }
        if (idx == 5) {
            leftIter -= 0.015
        }
        if (idx == 6) {
            leftIter += 0.032
        }
        if (idx == 7) {
            leftIter -= 0.015
        }
        if (idx == 8) {
            leftIter += 0.030
        }
        if (idx == 9) {
            leftIter -= 0.045
        }
        if (idx > 9) {
            leftIter += 0.030
        }

    }


    var arrBottle = new Array()
    for (let idx = 0; idx < 12; idx++) {
        arrBottle[idx] = false

    }

    var leftIter = 0.170189671
    var topIter = 2 * 0.321210191 - 0.131210191
    for (let idx = 0; idx < 12; idx++) {
        var btnLamp = appendElement("button", "btnBottle" + idx, "rect", leftIter, topIter, 0.03205699, 0.046312102, 0.05)
        var boundBottle = new Array(0, 2, 5, 8, 12)
        btnLamp.onclick = function() {
            funcClickItem(arrBottle, idx, boundBottle, "Bottle")
        }
        if (idx == 1 || idx == 4 || idx == 7 || idx == 9) {
            topIter = 2 * 0.321210191 - 0.131210191
            leftIter += 0.075
        }
        if (idx == 0 || idx == 2 || idx == 5 || idx == 8 || idx == 10) {
            topIter += 0.055
        }
        if (idx == 2) {
            leftIter -= 0.016
        }
        if (idx == 3) {
            leftIter += 0.032
        }
        if (idx == 4) {
            leftIter -= 0.017
        }
        if (idx == 5) {
            leftIter -= 0.015
        }
        if (idx == 6) {
            leftIter += 0.032
        }
        if (idx == 7) {
            leftIter -= 0.032
        }
        if (idx == 9) {
            leftIter -= 0.041
        }

    }

    var arrSilk = new Array()
    for (let idx = 0; idx < 9; idx++) {
        arrSilk[idx] = false

    }

    var topIter = 0.271
    for (let idx = 0; idx < 3; idx++) {
        var inputFirst = appendElement("button", "btnFirst" + idx, "circle", 0.018, topIter, 0.033, 0.047, 0.05)
        inputFirst.onclick = function() {
            funcDrawCircleX(arrFirst, idx + 1)
        }
        topIter += 0.19
    }


    var leftIter = 0.170189671
    var topIter = 0.321210191
    for (let idx = 0; idx < 9; idx++) {
        var btnLamp = appendElement("button", "btnSilk" + idx, "rect", leftIter, topIter, 0.03205699, 0.046312102, 0.05)

        // btnLamp.onclick=function()
        // {
        //     funcClickSilk(arrSilk,idx)
        // }
        var boundSilk = new Array(0, 2, 5, 9)

        btnLamp.onclick = function() {
            funcClickItem(arrSilk, idx, boundSilk, "Silk")
        }

        topIter += 0.055
        if (idx == 1) {
            leftIter += 0.112
            topIter = 0.321210191
        }
        if (idx == 2) {
            leftIter -= 0.015
        }
        if (idx == 3) {
            leftIter += 0.030
            topIter -= 0.055
        }
        if (idx == 4) {
            leftIter -= 0.015
        }
        if (idx > 2 && idx % 2 == 0) {
            leftIter += 0.112
            topIter = 0.321210191
            if (idx == 4) {
                leftIter -= 0.015
            }
            if (idx == 6) {
                leftIter -= 0.08
            }
        }

    }

    var arrLamp = new Array()
    for (let idx = 0; idx < 8; idx++) {
        arrLamp[idx] = false

    }


    var leftIter = 0.170189671
    var topIter = 0.131210191
    for (let idx = 0; idx < 8; idx++) {
        var btnLamp = appendElement("button", "btnLamp" + idx, "rect", leftIter, topIter, 0.03205699, 0.046312102, 0.05)
        var boundLamp = new Array(0, 2, 4, 8)

        btnLamp.onclick = function() {
            funcClickItem(arrLamp, idx, boundLamp, "Lamp")
        }
        topIter += 0.055
        if (idx % 2 == 1) {
            leftIter += 0.112
            topIter = 0.131210191
            if (idx == 3) {
                leftIter -= 0.015
            }
            if (idx == 5) {
                leftIter -= 0.08
            }
        }

    }

    var textName = appendElement("input", "textName", "textBox", 0.1487, 0.02065, 0.3081, 0.05478, 0.04478)


    var leftStart = 0.654496883 - 0.029385574
    var leftIter = leftStart
    var topIter = 0.4688
    var topIterDon = 0.594904459
    arrCoin[0] = 1
    arrDonkey[0] = 1

    for (let idx = 0; idx < 24; idx++) {
        var coin = appendElement("button", "btnCoin" + idx, "circle", leftIter, topIter, 0.0205, 0.029299, 0.029)
        coin.onclick = function() {
            funcDrawCircleX(arrCoin, idx)
        }
        var donkey = appendElement("button", "btnDonkey" + idx, "circle", leftIter - 0.0015, topIterDon, 0.0255, 0.045299, 0.045)
        donkey.onclick = function() {
            funcDrawCircleX(arrDonkey, idx)
        }
        leftIter += 0.029385574
        if (idx == 11) {
            leftIter = leftStart
            topIter = 0.518471338

            topIterDon = 0.644585987
        }

    }

    var step = 0
    var arrBuilding = new Array()
    for (let idx = 0; idx < 4; idx++) {
        var btnBuild = appendElement("button", "btnBuilding" + idx, "rect", 0.618878005 + step, 0.801273885, 0.020590383, 0.029025478, 0.03)
        btnBuild.onclick = function() {
            funcDrawX(arrBuilding, idx)
        }
        step += 0.102013802

    }

    var leftIter = 0.174532502
    var topIter = 0.095867516

    for (let idx = 0; idx < 3; idx++) {
        var btnDoneLamp = appendElement("button", "btnDoneLamp" + idx, "rect", leftIter, topIter, 0.023152271, 0.028025478, 0.03)
        leftIter += 0.111808994



    }

    var leftIter = 0.174532502
    var topIter = 0.284076433


    for (let idx = 0; idx < 3; idx++) {
        var btnDoneSilk = appendElement("button", "btnDoneSilk" + idx, "rect", leftIter, topIter, 0.023152271, 0.028025478, 0.03)
        leftIter += 0.111808994

    }

    var leftIter = 0.174532502
    var topIter = 0.097867516 + 2 * (0.284076433 - 0.095867516)
    for (let idx = 0; idx < 4; idx++) {
        var btnDoneBottle = appendElement("button", "btnDoneBottle" + idx, "rect", leftIter, topIter, 0.023152271, 0.028025478, 0.03)
        leftIter += 0.111808994 * 2 / 3
    }

    var leftIter = 0.144532502
    var topIter = 0.097867516 + 3 * (0.284076433 - 0.095867516)

    for (let idx = 0; idx < 4; idx++) {
        var btnDoneBottle = appendElement("button", "btnDoneGlass" + idx, "rect", leftIter, topIter, 0.023152271, 0.028025478, 0.03)
        leftIter += 0.111808994 * 2 / 3
        if (idx == 2) {
            leftIter += 0.016
        }

    }

    var leftIter = 0.471059662
    var topIter = 0.123566879

    for (let idx = 0; idx < 9; idx++) {
        if (idx < 8) {
            var pScore = appendElement("input", "pScore" + idx, "rect", leftIter, topIter, 0.054661621, 0.082624204, 0.042624204)
            pScore.onchange = funcCal
        }
        if (idx == 7) {
            topIter += 0.01
        }
        if (idx == 8) {
            var pScore = appendElement("p", "pScore" + idx, "rect", leftIter, topIter, 0.054661621, 0.082624204, 0.042624204)
            pScore.onclick = funcCalFinal;
            pScore.style.fontSize = 0.06 * pageWidth + "px"
        }
        topIter += 0.095

    }

    var leftIter = 0.051647373

    var topIter = 0.895993631

    var arrDice = new Array()
    for (let idx = 0; idx < 6; idx++) {
        var btnDice = appendElement("button", "btnDice" + idx, "rect", leftIter, topIter, 0.046304541, 0.075159236, 0.072624204)
        btnDice.onclick = function() {
            funcDrawX(arrDice, idx)
        }
        leftIter += 0.0655
        if (idx == 1) {
            leftIter += 0.0064
        }
    }

    var leftStart = 0.642139804
    var topIter = 0.024203822

    var pathSum0 = appendElement("input", "btnTravelSum0", "rect", 0.578, topIter, 0.049866429, 0.072611465, 0.045624204)
    var pathSum1 = appendElement("input", "btnTravelSum1", "rect", 0.932, topIter, 0.049866429, 0.072611465, 0.045624204)
    var pathSum2 = appendElement("input", "btnTravelSum2", "rect", 0.578, 0.024203822 + 4 * 0.079, 0.049866429, 0.072611465, 0.045624204)

    for (let idx = 0; idx < 5; idx++) {
        var leftIter = leftStart
        for (let idx2 = 0; idx2 < 5; idx2++) {
            var path = appendElement("p", "btnPath" + idx + "_" + idx2 + "_" + idx + "_" + (idx2 + 1), "rect", leftIter + 0.04, topIter + 0.032, 0.028, 0.01, 0.072624204)
            path.style.borderRadius = "30%"
            path.style.opacity = "0.7"
            var path2 = appendElement("p", "btnPath" + idx + "_" + idx2 + "_" + (idx + 1) + "_" + (idx2), "rect", leftIter + 0.021, topIter + 0.062, 0.007, 0.04, 0.072624204)
            path2.style.borderRadius = "30%"
            path2.style.opacity = "0.7"
            var btn = appendElement("button", "btnTravel" + idx + "_" + idx2, "circle", leftIter, topIter, 0.049866429, 0.072611465, 0.072624204)
            leftIter += 0.0565
            btn.onclick = function() {
                funcTravel(idx, idx2)
            }

        }
        topIter += 0.079

    }


}

var curLoc = new Array(2, 2)

var visitInfor = new Array()
for (let idx = 0; idx < 5; idx++) {
    visitInfor[idx] = new Array()
}

function funcTravel(idx, idx2) {
    if (idx == 2 && idx2 == 2) {
        alert("시작 위치입니다.")
        return
    }
    if (idx == curLoc[0] && idx2 == curLoc[1]) {
        if (visitInfor[idx][idx2] == 2) {
            // erase
            event.srcElement.style.border = "0px"
            visitInfor[idx][idx2] = 0

            {
                var btnPath = document.getElementById("btnPath" + (idx - 1) + "_" + idx2 + "_" + idx + "_" + idx2)
                if (btnPath != null && btnPath.style.backgroundColor == "black") {
                    curLoc[0] = idx - 1
                    curLoc[1] = idx2
                    btnPath.style.backgroundColor = "transparent"
                    return
                }
            }

            {
                var btnPath = document.getElementById("btnPath" + (idx) + "_" + (idx2 - 1) + "_" + idx + "_" + idx2)
                if (btnPath != null && btnPath.style.backgroundColor == "black") {
                    curLoc[0] = idx
                    curLoc[1] = idx2 - 1
                    btnPath.style.backgroundColor = "transparent"
                    return
                }
            }

            {
                var btnPath = document.getElementById("btnPath" + (idx) + "_" + idx2 + "_" + (idx + 1) + "_" + idx2)
                if (btnPath != null && btnPath.style.backgroundColor == "black") {
                    curLoc[0] = idx + 1
                    curLoc[1] = idx2
                    btnPath.style.backgroundColor = "transparent"
                    return
                }
            }

            {
                var btnPath = document.getElementById("btnPath" + (idx) + "_" + (idx2) + "_" + idx + "_" + (idx2 + 1))
                if (btnPath != null && btnPath.style.backgroundColor == "black") {
                    curLoc[0] = idx
                    curLoc[1] = idx2 + 1
                    btnPath.style.backgroundColor = "transparent"
                    return
                }
            }

        } else if (visitInfor[idx][idx2] == 1) {
            // make circle
            event.srcElement.style.border = 0.003 * pageWidth + "px dashed black"

            visitInfor[idx][idx2] = 2
            if (idx == 0 && idx2 == 0) {
                document.getElementById("btnTravelSum0").value = funcCountVisit()
            }
            if (idx == 0 && idx2 == 4) {
                document.getElementById("btnTravelSum1").value = funcCountVisit()
            }
            if (idx == 4 && idx2 == 0) {
                document.getElementById("btnTravelSum2").value = funcCountVisit()
            }
        }
        return
    }
    if (idx != curLoc[0] && idx2 != curLoc[1]) {
        alert("인접한 칸을 선택해주세요!")
        return
    }
    if (visitInfor[idx][idx2] == 1 || visitInfor[idx][idx2] == 2) {
        alert("이미 지나간 칸입니다!")
        return
    }
    if (idx == curLoc[0]) {
        if (idx2 == curLoc[1] + 1) {
            var btnPath = document.getElementById("btnPath" + curLoc[0] + "_" + curLoc[1] + "_" + idx + "_" + idx2)
            btnPath.style.backgroundColor = "black"
            visitInfor[idx][idx2] = 1
            curLoc[0] = idx
            curLoc[1] = idx2
        } else if (idx2 == curLoc[1] - 1) {
            var btnPath = document.getElementById("btnPath" + idx + "_" + idx2 + "_" + curLoc[0] + "_" + curLoc[1])
            btnPath.style.backgroundColor = "black"
            visitInfor[idx][idx2] = 1
            curLoc[0] = idx
            curLoc[1] = idx2
        } else {
            alert("인접한 칸을 선택해주세요!")
            return
        }
        return
    }
    if (idx2 == curLoc[1]) {
        if (idx == curLoc[0] + 1) {
            var btnPath = document.getElementById("btnPath" + curLoc[0] + "_" + curLoc[1] + "_" + idx + "_" + idx2)
            btnPath.style.backgroundColor = "black"
            visitInfor[idx][idx2] = 1
            curLoc[0] = idx
            curLoc[1] = idx2
        } else if (idx == curLoc[0] - 1) {
            var btnPath = document.getElementById("btnPath" + idx + "_" + idx2 + "_" + curLoc[0] + "_" + curLoc[1])
            btnPath.style.backgroundColor = "black"
            visitInfor[idx][idx2] = 1
            curLoc[0] = idx
            curLoc[1] = idx2
        } else {
            alert("인접한 칸을 선택해주세요!")
            return
        }
        return
    }
}

// function funcClickLamp(arr, idx) {
//     funcDrawX(arr, idx)

//     if (idx == 0 || idx == 1) {
//         var btnDoneLamp = document.getElementById("btnDoneLamp0")
//         if (arr[0] == true && arr[1] == true) {
//             btnDoneLamp.innerHTML = "X"
//         } else {
//             btnDoneLamp.innerHTML = ""
//         }
//     }
//     if (idx == 2 || idx == 3) {
//         var btnDoneLamp = document.getElementById("btnDoneLamp1")
//         if (arr[2] == true && arr[3] == true) {
//             btnDoneLamp.innerHTML = "X"
//         } else {
//             btnDoneLamp.innerHTML = ""
//         }
//     } else {
//         var btnDoneLamp = document.getElementById("btnDoneLamp2")
//         var startIdx = 4
//         var endIdx = 7
//         var allTrue = true
//         for (let idx2 = startIdx; idx2 <= endIdx; idx2++) {
//             if (arr[idx2] == false) {
//                 allTrue = false
//                 break
//             }
//         }
//         if (allTrue) {
//             btnDoneLamp.innerHTML = "X"
//         } else {
//             btnDoneLamp.innerHTML = ""
//         }

//     }
// }


function funcClickItem(arr, idx, bound, type) {
    funcDrawX(arr, idx)

    for (let ii = 0; ii < bound.length - 1; ii++) {
        if (idx >= bound[ii] && idx < bound[ii + 1]) {
            var btnDoneLamp = document.getElementById("btnDone" + type + ii)
            var allTrue = true
            for (let idx2 = bound[ii]; idx2 < bound[ii + 1]; idx2++) {
                if (arr[idx2] == false) {
                    allTrue = false
                    break
                }
            }
            if (allTrue) {
                btnDoneLamp.innerHTML = "X"
            } else {
                btnDoneLamp.innerHTML = ""
            }
            return
        }

    }
}



function funcDrawX(arr, idx) {
    if (arr[idx] == true) {
        event.srcElement.innerHTML = ""
        arr[idx] = false
    } else {
        event.srcElement.innerHTML = "X"
        arr[idx] = true
    }

}

function funcDrawCircleX(arr, idx) {
    if (arr[idx] == 2) {
        event.srcElement.innerHTML = ""
        event.srcElement.style.border = "0px"
        arr[idx] = 0
        if (idx == 0) {
            arr[idx] = 1
        }
    } else if (arr[idx] == 1) {
        event.srcElement.innerHTML = "X"
        arr[idx] = 2
    } else {
        event.srcElement.style.border = 0.002 * pageWidth + "px solid black"
        arr[idx] = 1
    }

}

function funcCal() {
    var sum = 0
    for (let idx = 0; idx < 8; idx++) {
        var val = document.getElementById("pScore" + idx).value

        if (isNaN(val) == false) {
            sum += Number(val)
        }
    }
    var sumVal = document.getElementById("pScore" + 8).value = sum

}

function funcCalFinal() {
    var subSum = new Array()
    var type = new Array("Lamp", "Silk", "Bottle", "Glass")
    var score = new Array(new Array(4, 5, 10), new Array(3, 5, 8), new Array(2, 3, 4, 6), new Array(1, 2, 3, 6))
    for (let idx = 0; idx < type.length; idx++) {
        subSum[2 * idx] = 0
        for (let idx2 = 0; idx2 < score[idx].length; idx2++) {
            var btn = document.getElementById("btnDone" + type[idx] + idx2)
            if (btn.innerHTML == "X") {
                subSum[2 * idx] += score[idx][idx2]
            }

        }
    }
    if (arrFirst[1] == 1) {
        subSum[2] += 3
    }
    if (arrFirst[2] == 1) {
        subSum[4] += 4
    }
    if (arrFirst[3] == 1) {
        subSum[6] += 5
    }

    for (let idx = 0; idx < 4; idx++) {
        document.getElementById("pScore" + (2 * idx)).value = subSum[2 * idx];
    }
    // subSum[3] : coin
    // subSum[5] : donkey
    // subSum[7] : building

    var numOfCoin = 0
    for (let idx = 0; idx < 24; idx++) {
        if (arrCoin[idx] == 1) {
            numOfCoin++
        }
    }
    subSum[3] = Math.floor(numOfCoin / 2)
    document.getElementById("pScore3").value = subSum[3];


    var numOfDonkey = 0
    for (let idx = 0; idx < 24; idx++) {
        if (arrDonkey[idx] == 1) {
            numOfDonkey++
        }
    }
    subSum[5] = Math.floor(numOfDonkey / 2)
    document.getElementById("pScore5").value = subSum[5];

    var numOfBuilding = 0

    if (document.getElementById("btnBuilding0").innerHTML == "X") {
        for (let idx = 0; idx < 4; idx++) {
            if (document.getElementById("btnBuilding" + idx).innerHTML == "X") {
                numOfBuilding++
            }
        }
    }
    subSum[7] = 3 * numOfBuilding
    document.getElementById("pScore7").value = subSum[7];

    subSum[1] = 0
    for (let idx = 0; idx < 3; idx++) {
        subSum[1] += Number(document.getElementById("btnTravelSum" + idx).value)
    }
    document.getElementById("pScore1").value = subSum[1];

    var totalSum = 0
    for (let idx = 0; idx < 8; idx++) {
        totalSum += Number(subSum[idx])
    }
    document.getElementById("pScore8").innerHTML = totalSum;
}

function funcCountVisit() {
    var ret = 0
    for (let idx = 0; idx < 5; idx++) {
        for (let idx2 = 0; idx2 < 5; idx2++) {
            if (visitInfor[idx][idx2] == 2) {
                ret++
            }

        }

    }
    if (visitInfor[0][3] == 2) {
        ret++
    }
    if (visitInfor[2][0] == 2) {
        ret++
    }
    if (visitInfor[2][4] == 2) {
        ret++
    }
    if (visitInfor[4][2] == 2) {
        ret++
    }

    return ret
}


drawCorinth()
