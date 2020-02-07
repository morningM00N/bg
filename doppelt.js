var arrYellow = new Array()
for (let idx = 0; idx < 10; idx++) {
    arrYellow[idx] = 0

}
var arrBlue = new Array()
var arrGreen = new Array()
var arrPink = new Array()

for (let index = 0; index <= 12; index++) {
    arrBlue[index] = arrPink[index] = arrGreen[index] = 0
}

var arrGray = new Array()
for (let idx = 0; idx < 4; idx++) {
    arrGray[idx] = new Array()
    for (let idx2 = 0; idx2 < 6; idx2++) {
        arrGray[idx][idx2] = false

    }

}

var numOfReroll = 0
var numOfUsedReroll = 0
var numOfPlus = 0
var numOfUsedPlus = 0
var numOfReturn = 0
var numOfUsedReturn = 0

var numOfFox = 0

var arrReroll = new Array()
var arrPlus = new Array()
var arrReturn = new Array()
var arrUseReroll = new Array()
var arrUsePlus = new Array()
var arrUseReturn = new Array()

var arrRound = new Array()
for (let idx = 0; idx < 6; idx++) {
    arrRound[idx] = false
}

for (let index = 0; index < 7; index++) {
    arrReturn[index] = arrUseReturn[index] = arrReroll[index] = arrPlus[index] = arrUsePlus[index] = arrUseReroll[index] = false
}

var pageHeight = document.documentElement.clientHeight
var pageWidth = document.documentElement.clientWidth
pageHeight = pageWidth / 567 * 681


function funcCal() {
    var scoreGray = 0
    var scoreYellow = 0
    var scoreBlue = 0
    var scoreGreen = 0
    var scorePink = 0

    var numOfGray = 0


    for (let idx = 0; idx < 6; idx++) {
        var check = true
        for (let idx2 = 0; idx2 < 4; idx2++) {
            if (arrGray[idx2][idx] == false) {
                check = false
                break;
            }

        }
        if (check == true) {
            ++numOfGray
        }

    }
    var tic = 2
    scoreGray = 2
    for (let idx = 1; idx < numOfGray; idx++) {
        scoreGray += tic;
        ++tic

    }
    if (numOfGray == 0) {
        scoreGray = 0
    }

    var numOfYellow = 0;
    for (let idx = 0; idx < 10; idx++) {
        if (arrYellow[idx] == 2) {
            ++numOfYellow
        }
    }

    tic = 3
    for (let idx = 0; idx < numOfYellow; idx++) {
        scoreYellow += tic
        tic += 1
        if (idx < 4) {
            tic += 3
        }
    }

    var tic = 1
    for (let idx = 0; idx < 12; idx++) {
        if (arrBlue[idx] > 0) {
            scoreBlue += tic
        } else {
            break
        }
        tic += 1

    }

    var multiGreen = new Array(2, 2, 2, 1, 3, 3, 3, 2, 3, 1, 4, 1)
    for (let idx = 0; idx < 6; idx++) {
        if (arrGreen[2 * idx + 1] > 0) {
            scoreGreen += (multiGreen[2 * idx] * arrGreen[2 * idx] - multiGreen[2 * idx + 1] * arrGreen[2 * idx + 1])
        }

    }

    for (let idx = 0; idx < 12; idx++) {
        scorePink += arrPink[idx]

    }


    console.log("" + scoreGray + "," + scoreYellow + "," + scoreBlue + "," + scoreGreen + "," + scorePink + "," + numOfFox)

    var minScore = scoreGray
    if (minScore > scoreYellow) {
        minScore = scoreYellow
    }
    if (minScore > scoreBlue) {
        minScore = scoreBlue
    }
    if (minScore > scoreGreen) {
        minScore = scoreGreen
    }
    if (minScore > scorePink) {
        minScore = scorePink
    }

    document.getElementById("p0").innerHTML = scoreGray
    document.getElementById("p1").innerHTML = scoreYellow
    document.getElementById("p2").innerHTML = scoreBlue
    document.getElementById("p3").innerHTML = scoreGreen
    document.getElementById("p4").innerHTML = scorePink
    document.getElementById("p5").innerHTML = minScore * numOfFox
    document.getElementById("p6").innerHTML = scoreGray + scoreYellow + scoreBlue + scoreGreen + scorePink + minScore * numOfFox
}

function funcReturn(a) {
    var button = document.getElementById("btnReturn" + a)

    if (arrReturn[a] == false) {
        alert("획득한 아이템을 사용해 주세요.")
        return
    } else if (arrUseReturn[a] == false) {
        ++numOfUsedReturn
        while (a - 1 >= 0 && arrUseReturn[a - 1] == false) {
            a -= 1
        }
        button = document.getElementById("btnReturn" + a)
        arrUseReturn[a] = true
        button.innerHTML = "x"
    } else {
        while (a + 1 < numOfReturn && arrUseReturn[a + 1] == true) {
            a += 1
        }
        button = document.getElementById("btnReturn" + a)
        button.innerHTML = ""
            --numOfUsedReturn
        arrUseReturn[a] = false
    }
}

function funcReroll(a) {
    var button = document.getElementById("btnReroll" + a)

    if (arrReroll[a] == false) {
        alert("획득한 아이템을 사용해 주세요.")
        return
    } else if (arrUseReroll[a] == false) {
        ++numOfUsedReroll
        while (a - 1 >= 0 && arrUseReroll[a - 1] == false) {
            a -= 1
        }
        button = document.getElementById("btnReroll" + a)
        arrUseReroll[a] = true
        button.innerHTML = "x"
    } else {
        while (a + 1 < numOfReroll && arrUseReroll[a + 1] == true) {
            a += 1
        }
        button = document.getElementById("btnReroll" + a)
        button.innerHTML = ""
            --numOfUsedReroll
        arrUseReroll[a] = false
    }
}

function funcPlus(a) {
    var button = document.getElementById("btnPlus" + a)

    if (arrPlus[a] == false) {
        alert("획득한 아이템을 사용해 주세요.")

        return
    } else if (arrUsePlus[a] == false) {
        ++numOfUsedPlus
        while (a - 1 >= 0 && arrUsePlus[a - 1] == false) {
            a -= 1
        }
        button = document.getElementById("btnPlus" + a)
        arrUsePlus[a] = true
        button.innerHTML = "x"
    } else {
        while (a + 1 < numOfPlus && arrUsePlus[a + 1] == true) {
            a += 1
        }
        button = document.getElementById("btnPlus" + a)
        button.innerHTML = ""
            --numOfUsedPlus
        arrUsePlus[a] = false
    }
}

function gainReroll() {
    if (numOfReroll == 6) {
        return
    }
    arrReroll[numOfReroll] = true
    if (numOfReroll == 5) {
        ++numOfFox
    }
    var button = document.getElementById("btnReroll" + numOfReroll)
        ++numOfReroll
    button.style.border = pageWidth / 200 + "px solid black"

}


function gainPlus() {
    if (numOfPlus == 6) {
        return
    }
    arrPlus[numOfPlus] = true
    var button = document.getElementById("btnPlus" + numOfPlus)
        ++numOfPlus
    button.style.border = pageWidth / 200 + "px solid black"
}

function gainReturn() {
    if (numOfReturn == 6) {
        return
    }
    arrReturn[numOfReturn] = true
    var button = document.getElementById("btnReturn" + numOfReturn)
        ++numOfReturn
    button.style.border = pageWidth / 200 + "px solid black"
}

function canBeLooseReroll() {
    if (numOfReroll == numOfUsedReroll) {
        return false
    }
    return true
}

function canBeLooseReturn() {
    if (numOfReturn == numOfUsedReturn) {
        return false
    }
    return true
}


function canBeLoosePlus() {
    if (numOfPlus == numOfUsedPlus) {
        return false
    }
    return true
}

function looseReroll() {
    if (numOfReroll == 6) {
        --numOfFox
    }
    --numOfReroll
    var button = document.getElementById("btnReroll" + numOfReroll)
    arrReroll[numOfReroll] = false
    button.style.border = "0px solid black"

}

function looseReturn() {
    --numOfReturn
    var button = document.getElementById("btnReturn" + numOfReturn)
    arrReturn[numOfReturn] = false
    button.style.border = "0px solid black"

}


function loosePlus() {
    --numOfPlus
    var button = document.getElementById("btnPlus" + numOfPlus)
    arrPlus[numOfPlus] = false
    button.style.border = "0px solid black"

}



function funcYellow(a) {
    var button = document.getElementById("btnYellow" + a)
    if (arrYellow[a] == 0) {
        button.style.border = pageWidth / 200 + "px solid black"
        arrYellow[a] = 1
        if (a == 0) {
            if (arrYellow[1] > 0) {
                gainReroll()
            }
            if (arrYellow[5] > 0) {
                gainReturn()
            }
        }
        if (a == 1) {
            if (arrYellow[0] > 0) {
                gainReroll()
            }
        }
        if (a == 2 || a == 3 || a == 4) {
            if (arrYellow[2] > 0 && arrYellow[3] > 0 && arrYellow[4] > 0) {
                gainPlus()
            }
        }
        if (a == 5) {
            if (arrYellow[0] > 0) {
                gainReturn()
            }
        }
        if (a == 7 || a == 8 || a == 9) {
            if (arrYellow[7] > 0 && arrYellow[8] > 0 && arrYellow[9] > 0) {
                {
                    ++numOfFox
                }
            }
        }
    } else if (arrYellow[a] == 2) {

        if (a == 0) {
            if (arrYellow[1] > 0) {
                if (canBeLooseReroll() == false) {
                    alert("아이템을 사용하였으므로 수정할 수 없습니다.")
                    return
                }
            }
            if (arrYellow[5] > 0) {
                if (canBeLooseReturn() == false) {
                    alert("아이템을 사용하였으므로 수정할 수 없습니다.")
                    return
                }
                looseReturn()
            }
            if (arrYellow[1] > 0) {
                looseReroll()
            }

        }
        if (a == 1) {
            if (arrYellow[0] > 0) {
                if (canBeLooseReroll() == false) {
                    alert("아이템을 사용하였으므로 수정할 수 없습니다.")
                    return
                }
                looseReroll()
            }
        }
        if (a == 2 || a == 3 || a == 4) {
            if (arrYellow[2] > 0 && arrYellow[3] > 0 && arrYellow[4] > 0) {
                if (canBeLoosePlus() == false) {
                    alert("아이템을 사용하였으므로 수정할 수 없습니다.")
                    return
                }
                loosePlus()
            }
        }
        if (a == 5) {
            if (arrYellow[0] > 0) {
                if (canBeLooseReturn() == false) {
                    alert("아이템을 사용하였으므로 수정할 수 없습니다.")
                    return
                }
                looseReturn()
            }
        }
        if (a == 7 || a == 8 || a == 9) {
            if (arrYellow[7] > 0 && arrYellow[8] > 0 && arrYellow[9] > 0) {
                {
                    --numOfFox
                }
            }
        }
        button.innerHTML = ""
        button.style.border = "0px"
        arrYellow[a] = 0
    } else {
        arrYellow[a] = 2
        button.innerHTML = "x"
    }

}

function funcGray(a, b) {
    var button = document.getElementById("btnGray" + a + "_" + b)
    if (arrGray[a][b] == false) {
        button.innerHTML = "x"
        arrGray[a][b] = true
        if (b == 0 && arrGray[0][0] == true && arrGray[1][0] == true && arrGray[2][0] == true && arrGray[3][0] == true) {
            gainPlus()
        }
        if (b == 2 && arrGray[0][b] == true && arrGray[1][b] == true && arrGray[2][b] == true && arrGray[3][b] == true) {
            ++numOfFox
        }

    } else {

        if (b == 0) {
            if (arrGray[0][0] == true && arrGray[1][0] == true && arrGray[2][0] == true && arrGray[3][0] == true) {
                if (canBeLoosePlus() == false) {
                    alert("아이템을 사용하였으므로 수정할 수 없습니다.")
                    return
                }
                loosePlus()
            }
        }

        if (b == 2 && arrGray[0][b] == true && arrGray[1][b] == true && arrGray[2][b] == true && arrGray[3][b] == true) {
            --numOfFox
        }
        button.innerHTML = ""
        arrGray[a][b] = false
    }

}

function funcBlue(idx) {
    var slt = document.getElementById("btnBlue" + idx)
    console.log(slt.selectedIndex)
    if (idx > 0 && slt.selectedIndex > arrBlue[idx - 1]) {
        alert("앞의 칸보다 큰 수를 입력할 수 없습니다.")
        slt.selectedIndex = 0
        return
    }
    arrBlue[idx] = slt.selectedIndex
    var btn = document.getElementById("btnRemoveBlue" + idx)
    btn.style.display = "inline"
    if (arrBlue[idx] > 0) {
        if (idx == 1 || idx == 9) {
            gainReturn()
        }
        if (idx == 4) {
            gainPlus()
        }
        if (idx == 5) {
            gainReturn()
        }
    }
}

function funcGreen(idx) {
    var slt = document.getElementById("btnGreen" + idx)
    arrGreen[idx] = slt.selectedIndex

    var btn = document.getElementById("btnRemoveGreen" + idx)
    btn.style.display = "inline"

    if (arrGreen[idx] > 0) {
        if (idx == 1) {

            gainReroll()
        }

        if (idx == 4) {

            gainReturn()
        }
        if (idx == 8) {

            gainPlus()
        }
        if (idx == 6) {
            ++numOfFox
        }

    }
}


var thresPink = new Array(1, 1, 2, 3, 4, 5, 6, 2, 3, 4, 5, 6)

function funcPink(idx) {
    var slt = document.getElementById("btnPink" + idx)
    if (slt.selectedIndex > 0 && slt.selectedIndex < thresPink[idx]) {
        alert("조건을 만족하지 않았습니다.")
        slt.selectedIndex = 0
        return
    }
    arrPink[idx] = slt.selectedIndex

    var btn = document.getElementById("btnRemovePink" + idx)
    btn.style.display = "inline"

    if (arrPink[idx] > 0) {
        if (idx == 4) {
            gainPlus()
        }
        if (idx == 3) {
            gainReturn()
        }
        if (idx == 2 || idx == 9) {
            gainReroll()
        }
        if (idx == 7) {
            ++numOfFox
        }
    }
}



function funcRound(a) {
    var button = document.getElementById("btnRound" + a)
    if (arrRound[a] == false) {
        for (let idx = 0; idx < a; idx++) {
            if (arrRound[idx] == false) {
                alert("" + (idx + 1) + " 라운드부터 시작해 주십시오.")
                return
            }

        }
        arrRound[a] = true
        button.innerHTML = "x"
        if (a == 0) {
            gainReroll()
        }
        if (a == 1) {
            gainPlus()
        }
        if (a == 2) {
            gainReturn()
        }
    } else {

        for (let idx = 5; idx > a; idx--) {
            if (arrRound[idx] == true) {
                alert("" + (idx + 1) + " 라운드부터 취소해 주십시오.")
                return
            }
        }
        if (a == 0) {
            if (canBeLooseReroll() == false) {
                alert("아이템을 사용했으므로 수정할 수 없습니다.")
                return
            }
            looseReroll()
        }
        if (a == 1) {
            if (canBeLoosePlus() == false) {
                alert("아이템을 사용했으므로 수정할 수 없습니다.")
                return
            }
            loosePlus()
        }
        if (a == 2) {
            if (canBeLooseReturn() == false) {
                alert("아이템을 사용했으므로 수정할 수 없습니다.")
                return
            }
            looseReturn()
        }

        arrRound[a] = false
        button.innerHTML = ""

    }
}


function drawTile() {




    var maindiv = document.getElementById("main")
    var mainbody = document.getElementById("body")

    var roundLeft = 0.85
    var roundTop = 0.035
    var roundTip = 0.138
    var roundWidth = 0.1
    var roundHeight = 0.1



    for (let idx = 0; idx < 7; idx++) {
        var pScore = document.createElement("p")
        pScore.id = "p" + idx
        pScore.className = "btnRound"
        pScore.style.left = roundLeft * pageWidth + "px"
        pScore.style.textAlign = "center"
        pScore.style.lineHeight = roundHeight * pageHeight + "px"
        pScore.style.top = roundTop * pageHeight + "px"
        pScore.style.width = roundWidth * pageWidth + "px"
        pScore.style.height = roundHeight * pageHeight + "px"
        pScore.style.margin = "0px"
        pScore.style.fontSize = 0.06 * pageWidth + "px"
        pScore.onclick = funcCal

        maindiv.appendChild(pScore)
        roundTop += roundTip

    }


    maindiv.style.height = pageHeight + "px"
    maindiv.style.width = pageWidth + "px"
    mainbody.style.height = pageHeight + "px"
    mainbody.style.width = pageWidth + "px"



    var roundLeftStart = 0.19
    var roundLeftTic = 0.1074
    var roundTop = 0.025
    var roundWidth = 0.052
    var roundHeight = 0.045
    var fontSize = 0.05

    for (let round = 0; round < 6; round++) {
        var btnRound = document.createElement("button")
        btnRound.id = "btnRound" + round
        btnRound.className = "btnRound"

        btnRound.style.left = roundLeftStart * pageWidth + "px"
        btnRound.style.top = roundTop * pageHeight + "px"
        btnRound.style.width = roundWidth * pageWidth + "px"
        btnRound.style.height = roundHeight * pageHeight + "px"
        btnRound.style.fontSize = fontSize * pageWidth + "px"
        btnRound.onclick = function() {
            funcRound(round)
        }
        maindiv.append(btnRound)
        roundLeftStart += roundLeftTic
    }

    var roundLeftStart = 0.273
    var roundLeftTic = 0.09
    var roundTop = 0.137
    var roundTopTic = 0.082
    var roundWidth = 0.047
    var roundHeight = 0.039

    for (let round = 0; round < 6; round++) {
        {
            var btnRound = document.createElement("button")
            btnRound.id = "btnReroll" + round
            btnRound.className = "btnItem"

            btnRound.style.left = roundLeftStart * pageWidth + "px"
            btnRound.style.top = roundTop * pageHeight + "px"
            btnRound.style.width = roundWidth * pageWidth + "px"
            btnRound.style.height = roundHeight * pageHeight + "px"
            btnRound.style.fontSize = 0.8 * fontSize * pageWidth + "px"

            btnRound.onclick = function() {
                funcReroll(round)
            }

            maindiv.append(btnRound)
        } {
            var btnRound = document.createElement("button")
            btnRound.id = "btnReturn" + round
            btnRound.className = "btnItem"

            btnRound.style.left = roundLeftStart * pageWidth + "px"
            btnRound.style.top = (roundTop + roundTopTic) * pageHeight + "px"
            btnRound.style.width = roundWidth * pageWidth + "px"
            btnRound.style.height = roundHeight * pageHeight + "px"
            btnRound.style.fontSize = 0.8 * fontSize * pageWidth + "px"

            btnRound.onclick = function() {
                funcReturn(round)
            }

            maindiv.append(btnRound)
        } {
            var btnRound = document.createElement("button")
            btnRound.id = "btnPlus" + round
            btnRound.className = "btnItem"

            btnRound.style.left = roundLeftStart * pageWidth + "px"
            btnRound.style.top = (roundTop + 2 * roundTopTic) * pageHeight + "px"
            btnRound.style.width = roundWidth * pageWidth + "px"
            btnRound.style.height = roundHeight * pageHeight + "px"
            btnRound.style.fontSize = 0.8 * fontSize * pageWidth + "px"

            btnRound.onclick = function() {
                funcPlus(round)
            }

            maindiv.append(btnRound)
        }
        roundLeftStart += roundLeftTic
    }


    var roundLeftStart = 0.039
    var roundLeftTic = 0.06
    var roundTopStart = 0.438
    var roundTopTic = 0.048
    var roundWidth = 0.052
    var roundHeight = 0.043

    var roundLeftIter = roundLeftStart
    var roundTopIter = roundTopStart

    for (let idx = 0; idx < 4; idx++) {
        for (let idx2 = 0; idx2 < 6; idx2++) {
            var btnRound = document.createElement("button")
            btnRound.id = "btnGray" + idx + "_" + idx2
            btnRound.className = "btnRound"

            btnRound.style.left = roundLeftIter * pageWidth + "px"
            btnRound.style.top = roundTopIter * pageHeight + "px"
            btnRound.style.width = roundWidth * pageWidth + "px"
            btnRound.style.height = roundHeight * pageHeight + "px"
            btnRound.style.fontSize = fontSize * pageWidth + "px"

            btnRound.onclick = function() {
                funcGray(idx, idx2)
            }
            maindiv.append(btnRound)
            roundLeftIter += roundLeftTic


        }
        roundLeftIter = roundLeftStart
        roundTopIter += roundTopTic

    }

    var roundLeft = 0.465
    var roundLeftTic = 0.064
    var roundTopStart = 0.47
    var roundTopStart2 = 0.439

    var roundTopTic = 0.063

    var roundTopIter = roundTopStart
    for (let idx = 0; idx < 10; idx++) {
        {
            var btnRound = document.createElement("button")
            btnRound.id = "btnYellow" + idx
            btnRound.className = "btnRound"

            btnRound.style.left = roundLeft * pageWidth + "px"
            btnRound.style.top = roundTopIter * pageHeight + "px"
            btnRound.style.width = roundWidth * pageWidth + "px"
            btnRound.style.height = roundHeight * pageHeight + "px"
            btnRound.style.fontSize = 0.8 * fontSize * pageWidth + "px"
            btnRound.style.textAlign = "center"

            btnRound.onclick = function() {
                funcYellow(idx)
            }
            maindiv.append(btnRound)
            if (idx == 1 || idx == 4 || idx == 6) {
                roundLeft += roundLeftTic
                if (idx == 4) {
                    roundTopIter = roundTopStart
                } else {
                    roundTopIter = roundTopStart2
                }
            } else {
                roundTopIter += roundTopTic

            }


        }

    }

    var roundLeft = 0.08
    var roundLeftTic = 0.0583

    var roundTop = 0.714
    var roundTopTic = 0.0975
    var roundLeftIter = roundLeft

    for (let idx = 0; idx < 12; idx++) {
        {
            var btnRound = document.createElement("select")
            var btnRound2 = document.createElement("button")
            btnRound.id = "btnBlue" + idx
            btnRound.className = "sltRound"

            btnRound.style.left = roundLeftIter * pageWidth + "px"
            btnRound.style.top = roundTop * pageHeight + "px"
            btnRound.style.width = roundWidth * pageWidth + "px"
            btnRound.style.height = roundHeight * pageHeight + "px"
            btnRound.style.fontSize = fontSize * pageWidth + "px"

            btnRound2.id = "btnRemoveBlue" + idx
            btnRound2.className = "sltRound"

            btnRound2.style.left = roundLeftIter * pageWidth + "px"
            btnRound2.style.top = roundTop * pageHeight + "px"
            btnRound2.style.width = roundWidth * pageWidth + "px"
            btnRound2.style.height = roundHeight * pageHeight + "px"
            btnRound2.style.fontSize = fontSize * pageWidth + "px"
            btnRound2.style.display = "none"

            btnRound.onchange = function() {
                funcBlue(idx)
            }
            btnRound2.onclick = function() {
                funcClickBlue(idx)
            }
            maindiv.append(btnRound)
            maindiv.append(btnRound2)
            roundLeftIter += roundLeftTic
            for (let idx2 = 0; idx2 <= 12; idx2++) {
                var opt = document.createElement("option")
                opt.innerHTML = (idx2)
                if (idx2 == 0) {
                    opt.selected = true
                    opt.innerHTML = ""
                }
                btnRound.appendChild(opt)
            }


        }

    }

    roundTop += roundTopTic
    var roundLeftIter = roundLeft

    for (let idx = 0; idx < 12; idx++) {
        {
            var btnRound2 = document.createElement("button")

            var btnRound = document.createElement("select")
            btnRound.id = "btnGreen" + idx
            btnRound.className = "sltRound"

            btnRound.style.left = roundLeftIter * pageWidth + "px"
            btnRound.style.top = roundTop * pageHeight + "px"
            btnRound.style.width = roundWidth * pageWidth + "px"
            btnRound.style.height = roundHeight * pageHeight + "px"
            btnRound.style.fontSize = fontSize * pageWidth + "px"

            btnRound2.id = "btnRemoveGreen" + idx
            btnRound2.className = "sltRound"
            btnRound2.style.display = "none"

            btnRound2.style.left = roundLeftIter * pageWidth + "px"
            btnRound2.style.top = roundTop * pageHeight + "px"
            btnRound2.style.width = roundWidth * pageWidth + "px"
            btnRound2.style.height = roundHeight * pageHeight + "px"
            btnRound2.style.fontSize = fontSize * pageWidth + "px"

            btnRound.onchange = function() {
                funcGreen(idx)
            }

            btnRound2.onclick = function() {
                funcClickGreen(idx)
            }
            maindiv.append(btnRound)
            maindiv.append(btnRound2)

            roundLeftIter += roundLeftTic
            for (let idx2 = 0; idx2 <= 6; idx2++) {
                var opt = document.createElement("option")
                opt.innerHTML = (idx2)
                if (idx2 == 0) {
                    opt.selected = true
                    opt.innerHTML = ""
                }
                btnRound.appendChild(opt)
            }


        }

    }

    roundTop += roundTopTic
    var roundLeftIter = roundLeft

    for (let idx = 0; idx < 12; idx++) {
        {
            var btnRound = document.createElement("select")
            var btnRound2 = document.createElement("button")
            btnRound.id = "btnPink" + idx
            btnRound.className = "sltRound"

            btnRound.style.left = roundLeftIter * pageWidth + "px"
            btnRound.style.top = roundTop * pageHeight + "px"
            btnRound.style.width = roundWidth * pageWidth + "px"
            btnRound.style.height = roundHeight * pageHeight + "px"
            btnRound.style.fontSize = fontSize * pageWidth + "px"
            btnRound.style.textAlign = "center"

            btnRound2.id = "btnRemovePink" + idx
            btnRound2.className = "sltRound"
            btnRound2.style.display = "none"
            btnRound2.style.left = roundLeftIter * pageWidth + "px"
            btnRound2.style.top = roundTop * pageHeight + "px"
            btnRound2.style.width = roundWidth * pageWidth + "px"
            btnRound2.style.height = roundHeight * pageHeight + "px"
            btnRound2.style.fontSize = fontSize * pageWidth + "px"
            btnRound2.style.textAlign = "center"

            btnRound.onchange = function() {
                funcPink(idx)
            }

            btnRound2.onclick = function() {
                funcClickPink(idx)
            }


            for (let idx2 = 0; idx2 <= 6; idx2++) {
                var opt = document.createElement("option")
                opt.innerHTML = (idx2)
                if (idx2 == 0) {
                    opt.selected = true
                    opt.innerHTML = ""
                }
                btnRound.appendChild(opt)
            }



            maindiv.append(btnRound)
            maindiv.append(btnRound2)

            roundLeftIter += roundLeftTic


        }

    }




}

function funcClickBlue(idx) {
    if (arrBlue[idx + 1] != 0) {
        alert("오른쪽칸부터 수정해 주십시오.")
    }
    if (idx > 0 && arrBlue[idx - 1] == 0) {
        alert("왼쪽칸부터 입력해 주십시오.")
    }
    var btn = document.getElementById("btnRemoveBlue" + idx)
    var btnval = document.getElementById("btnBlue" + idx)



    if (idx == 1 || idx == 9) {
        if (canBeLooseReturn() == false) {
            alert("아이템을 사용하였으므로 수정할 수 없습니다.")
            return
        }

    }
    if (idx == 4) {
        if (canBeLoosePlus() == false) {
            alert("아이템을 사용하였으므로 수정할 수 없습니다.")
            return
        }

    }
    if (idx == 5) {
        if (canBeLooseReturn() == false) {
            alert("아이템을 사용하였으므로 수정할 수 없습니다.")
            return
        }

    }

    var userRes = confirm("취소하시겠습니까?")
    if (userRes == true) {
        btn.style.display = "none"
        btnval.selectedIndex = 0
        if (idx == 1 || idx == 9) {
            looseReturn()
        }
        if (idx == 4) {
            loosePlus()

        }
        if (idx == 5) {
            looseReroll()
        }
        if (idx == 8) {
            --numOfFox
        }
    }
}

function funcClickGreen(idx) {
    if (arrGreen[idx + 1] != 0) {
        alert("오른쪽칸부터 수정해 주십시오.")
    }
    if (idx > 0 && arrGreen[idx - 1] == 0) {
        alert("왼쪽칸부터 입력해 주십시오.")
    }

    var btn = document.getElementById("btnRemoveGreen" + idx)
    var btnval = document.getElementById("btnGreen" + idx)

    if (idx == 1) {
        if (canBeLooseReroll() == false) {
            alert("아이템을 사용하였으므로 수정할 수 없습니다.")
            return
        }
    }

    if (idx == 4) {
        if (canBeLooseReturn() == false) {
            alert("아이템을 사용하였으므로 수정할 수 없습니다.")
            return
        }

    }
    if (idx == 8) {
        if (canBeLoosePlus() == false) {
            alert("아이템을 사용하였으므로 수정할 수 없습니다.")
            return
        }
    }

    var userRes = confirm("취소하시겠습니까?")
    if (userRes == true) {
        btn.style.display = "none"
        btnval.selectedIndex = 0
        if (idx == 4) {
            looseReturn()
        }
        if (idx == 8) {
            loosePlus()

        }
        if (idx == 1) {
            looseReroll()
        }
        if (idx == 6) {
            --numOfFox
        }
    }

}

function funcClickPink(idx) {
    if (arrPink[idx + 1] != 0) {
        alert("오른쪽칸부터 수정해 주십시오.")
    }
    if (idx > 0 && arrPink[idx - 1] == 0) {
        alert("왼쪽칸부터 입력해 주십시오.")
    }

    var btn = document.getElementById("btnRemovePink" + idx)
    var btnval = document.getElementById("btnPink" + idx)

    if (idx == 4) {
        if (canBeLoosePlus() == false) {
            alert("아이템을 사용하였으므로 수정할 수 없습니다.")
            return
        }
    }
    if (idx == 3) {
        if (canBeLooseReturn() == false) {
            alert("아이템을 사용하였으므로 수정할 수 없습니다.")
            return
        }
    }
    if (idx == 2 || idx == 9) {
        if (canBeLooseReroll() == false) {
            alert("아이템을 사용하였으므로 수정할 수 없습니다.")
            return
        }
    }

    var userRes = confirm("취소하시겠습니까?")
    if (userRes == true) {
        btn.style.display = "none"
        btnval.selectedIndex = 0
        if (idx == 3) {
            looseReturn()
        }
        if (idx == 4) {
            loosePlus()

        }
        if (idx == 2 || idx == 9) {
            looseReroll()
        }
        if (idx == 7) {
            --numOfFox
        }
    }

}


drawTile()
