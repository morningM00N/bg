var pageHeight
var pageWidth
var widthPerHeight = 580 / 838

var maindiv = document.getElementById("main")
var mainDiv = document.getElementById("main")
var mainBody = document.getElementById("body")

function funcUpdatePageSize(isMainDivSizeUpdate) {
    pageHeight = document.documentElement.clientHeight
    pageWidth = document.documentElement.clientWidth
    if (widthPerHeight != 0) {
        if (pageWidth > pageHeight * widthPerHeight) {
            pageWidth = pageHeight * widthPerHeight
        } else {
            pageHeight = pageWidth / widthPerHeight
        }
    }

    if (isMainDivSizeUpdate == true) {
        mainDiv.style.height = pageHeight + "px"
        mainDiv.style.width = pageWidth + "px"

        mainDiv.style.backgroundSize = pageWidth + "px " + pageHeight + "px"
    }
}

mainDiv.style.backgroundImage="url('img/gantsmod.png')"
funcUpdatePageSize(true)



var arrYellow = new Array();

for (var index = 0; index <= 3; index++) {
    arrYellow[index] = new Array();

    for (var idx2 = 0; idx2 <= 3; idx2++) {
        arrYellow[index][idx2] = false;
    }
}

arrYellow[0][3] = arrYellow[1][2] = arrYellow[2][1] = arrYellow[3][0] = true;
var arrBlue = new Array();

for (var _index = 0; _index <= 2; _index++) {
    arrBlue[_index] = new Array();

    for (var _idx = 0; _idx <= 3; _idx++) {
        arrBlue[_index][_idx] = false;
    }
}

arrBlue[0][0] = true;
var arrGreen = new Array();
var arrOrange = new Array();
var arrPurple = new Array();

for (var _index2 = 0; _index2 <= 10; _index2++) {
    arrGreen[_index2] = false;
    arrOrange[_index2] = arrPurple[_index2] = 0;
}

var numOfReroll = 0;
var numOfUsedReroll = 0;
var numOfPlus = 0;
var numOfUsedPlus = 0;
var numOfFox = 0;
var arrReroll = new Array();
var arrPlus = new Array();
var arrUseReroll = new Array();
var arrUsePlus = new Array();
var arrRound = new Array();

for (var idx = 0; idx < 6; idx++) {
    arrRound[idx] = false;
}

for (var _index3 = 0; _index3 < 7; _index3++) {
    arrReroll[_index3] = arrPlus[_index3] = arrUsePlus[_index3] = arrUseReroll[_index3] = false;
}

drawTile();


function funcCal() {
    var scoreY = 0
    var scoreB = 0
    var scoreO = 0
    var scoreP = 0
    var scoreG = 0

    for (let idx = 0; idx <= 3; idx++) {
        var inc = 0
        switch (idx) {
            case 0:
                inc = 10
                break;
            case 1:
                inc = 14
                break;
            case 2:
                inc = 16
                break;
            case 3:
                inc = 20
                break;

            default:
                break;
        }
        for (let idx2 = 0; idx2 <= 3; idx2++) {
            if (arrYellow[idx2][idx] == false) {
                inc = 0
            }
        }
        scoreY += inc
    }

    var numOfBlue = 0
    for (let idx = 0; idx <= 2; idx++) {
        for (let idx2 = 0; idx2 <= 3; idx2++) {
            if (arrBlue[idx][idx2] == true) {
                ++numOfBlue
            }
        }
    }
    --numOfBlue

    if (numOfBlue > 0) {
        scoreB = 1
    }
    for (let idx = 0; idx < numOfBlue; idx++) {
        scoreB += idx
    }

    var numOfGreen = 0
    for (let idx = 0; idx < 11; idx++) {
        if (arrGreen[idx] == true) {
            ++numOfGreen
        }
    }
    for (let idx = 1; idx <= numOfGreen; idx++) {
        scoreG += idx
    }

    for (let idx = 0; idx < 11; idx++) {
        scoreO += arrOrange[idx]
        if (idx == 3 || idx == 6 || idx == 8) {
            scoreO += arrOrange[idx]
        } else if (idx == 10) {
            scoreO += 2 * arrOrange[idx]
        }
    }

    for (let idx = 0; idx < 11; idx++) {
        scoreP += arrPurple[idx]
    }

    console.log("" + scoreY + "," + scoreB + "," + scoreG + "," + scoreO + "," + scoreP + "," + numOfFox)
    document.getElementById("spanY").innerHTML = scoreY
    document.getElementById("spanB").innerHTML = scoreB
    document.getElementById("spanG").innerHTML = scoreG
    document.getElementById("spanO").innerHTML = scoreO
    document.getElementById("spanP").innerHTML = scoreP

    var minScore = scoreY
    if (minScore > scoreB) {
        minScore = scoreB
    }
    if (minScore > scoreG) {
        minScore = scoreG
    }
    if (minScore > scoreO) {
        minScore = scoreO
    }
    if (minScore > scoreP) {
        minScore = scoreP
    }
    document.getElementById("spanF").innerHTML = numOfFox*minScore
    event.srcElement.innerHTML = Number(scoreY + scoreB + scoreG + scoreO + scoreP + minScore * numOfFox)

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
        button.value = "x"
    } else {
        while (a + 1 < numOfReroll && arrUseReroll[a + 1] == true) {
            a += 1
        }
        button = document.getElementById("btnReroll" + a)
        button.value = ""
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
        button.value = "x"
    } else {
        while (a + 1 < numOfPlus && arrUsePlus[a + 1] == true) {
            a += 1
        }
        button = document.getElementById("btnPlus" + a)
        button.value = ""
            --numOfUsedPlus
        arrUsePlus[a] = false
    }
}

function gainReroll() {
    if (numOfReroll == 7) {
        return
    }
    arrReroll[numOfReroll] = true
    var button = document.getElementById("btnReroll" + numOfReroll)
        ++numOfReroll
    button.style.border = "5px solid black"

}


function gainPlus() {
    if (numOfPlus == 7) {
        return
    }
    arrPlus[numOfPlus] = true
    var button = document.getElementById("btnPlus" + numOfPlus)
        ++numOfPlus
    button.style.border = "5px solid black"


}

function canBeLooseReroll() {
    if (numOfReroll == numOfUsedReroll) {
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
    --numOfReroll
    var button = document.getElementById("btnReroll" + numOfReroll)
    arrReroll[numOfReroll] = false
    button.style.border = "0px solid black"

}

function loosePlus() {
    --numOfPlus
    var button = document.getElementById("btnPlus" + numOfPlus)
    arrPlus[numOfPlus] = false
    button.style.border = "0px solid black"

}




function funcYellow(a, b) {
    if (a == 0 && b == 3) {
        return
    }
    if (a == 1 && b == 2) {
        return
    }
    if (a == 2 && b == 1) {
        return
    }
    if (a == 3 && b == 0) {
        return
    }
    var button = document.getElementById("btnYellow_" + a + "_" + b)
    if (arrYellow[a][b] == false) {
        button.value = "x"
        arrYellow[a][b] = true
        if (a == 3 && arrYellow[3][1] == true && arrYellow[3][2] == true && arrYellow[3][3] == true) {
            ++numOfFox
        }
        if (a == b) {
            if (arrYellow[0][0] == true && arrYellow[1][1] == true && arrYellow[2][2] == true && arrYellow[3][3] == true) {
                gainPlus()
            }
        }
    } else {

        if (a == b) {
            if (arrYellow[0][0] == true && arrYellow[1][1] == true && arrYellow[2][2] == true && arrYellow[3][3] == true) {
                if (canBeLoosePlus() == false) {
                    alert("아이템을 사용하였으므로 수정할 수 없습니다.")
                    return
                }
                loosePlus()

            }
        }

        if (a == 3 && arrYellow[3][1] == true && arrYellow[3][2] == true && arrYellow[3][3] == true) {
            --numOfFox
        }
        button.value = ""
        arrYellow[a][b] = false
    }

}

function funcBlue(a, b) {
    if (a == 0 && b == 0) {
        return;
    }
    var button = document.getElementById("btnBlue_" + a + "_" + b)
    if (arrBlue[a][b] == false) {
        button.value = "x"
        button.innerHTML = "x"
        arrBlue[a][b] = true

        if (a == 2 && arrBlue[a][0] == true && arrBlue[a][1] == true && arrBlue[a][2] == true && arrBlue[a][3] == true) {
            ++numOfFox
        }

        if (b == 0) {
            if (arrBlue[2][0] == true && arrBlue[1][0] == true) {
                gainReroll()
            }

        } else if (b == 3) {
            if (arrBlue[2][3] == true && arrBlue[1][3] == true && arrBlue[0][3] == true) {
                gainPlus()
            }

        }

    } else {

        if (b == 0) {
            if (arrBlue[2][0] == true && arrBlue[1][0] == true) {
                if (canBeLooseReroll() == false) {
                    alert("아이템을 사용하였으므로 수정할 수 없습니다.")
                    return
                }
                looseReroll()
            }
        } else if (b == 3) {
            if (arrBlue[2][3] == true && arrBlue[1][3] == true && arrBlue[0][3] == true) {
                if (canBeLoosePlus() == false) {
                    alert("아이템을 사용하였으므로 수정할 수 없습니다.")
                    return
                }
                loosePlus()

            }
        }
        if (a == 2 && arrBlue[a][0] == true && arrBlue[a][1] == true && arrBlue[a][2] == true && arrBlue[a][3] == true) {
            --numOfFox
        }

        button.value = ""
        button.innerHTML = ""
        arrBlue[a][b] = false

    }
}

function funcGreen(a) {
    var button = document.getElementById("btnGreen_" + a)
    if (arrGreen[a] == false) {
        for (let index = 0; index < a; index++) {
            if (arrGreen[index] == false) {
                alert("왼쪽칸부터 채워주십시오.")
                return;
            }
        }

        if (a == 6) {
            ++numOfFox
        }
        if (a == 3) {
            gainPlus()
        }
        if (a == 9) {
            gainReroll()
        }
        button.value = "x"
        arrGreen[a] = true
    } else {
        for (let index = a + 1; index <= 10; index++) {
            if (arrGreen[index] == true) {
                alert("오른쪽칸부터 수정해주십시오.")
                return
            }

        }

        if (a == 3) {
            if (canBeLoosePlus() == false) {
                alert("아이템을 사용하였으므로 수정할 수 없습니다.")
                return
            }
            loosePlus()
        }

        if (a == 9) {
            if (canBeLooseReroll() == false) {
                alert("아이템을 사용하였으므로 수정할 수 없습니다.")
                return
            }
            looseReroll()
        }
        if (a == 6) {
            --numOfFox
        }
        button.value = ""
        arrGreen[a] = false
    }

}

function funcOrange(a) {
    for (let index = 0; index < a; index++) {
        if (arrOrange[index] == 0) {
            alert("왼쪽칸부터 채워주십시오.")

            return;
        }
    }
    for (let index = a + 1; index <= 10; index++) {
        if (arrOrange[index] != 0) {
            alert("오른쪽칸부터 수정해주십시오.")

            return
        }

    }
    var button = document.getElementById("btnOrange_" + a)
    arrOrange[a] += 1
    var gainThisTime = true
    if (arrOrange[a] == 7) {
        arrOrange[a] = 0
        if (a == 5) {
            if (canBeLoosePlus() == false) {
                alert("아이템을 사용하였으므로 취소할 수 없습니다.")
                gainThisTime = false
                arrOrange[a] = 1
            }
        }

        if (a == 2) {
            if (canBeLooseReroll() == false) {
                alert("아이템을 사용하였으므로 취소할 수 없습니다.")
                gainThisTime = false
                arrOrange[a] = 1
            }
        }

    }
    if (arrOrange[a] == 0) {
        button.value = ""
        if (a == 5) {
            loosePlus()
        }
        if (a == 2) {
            looseReroll()
        }
        if (a == 7) {
            --numOfFox
        }
    } else {
        if (arrOrange[a] == 1 && gainThisTime == true) {

            if (a == 5) {
                gainPlus()
            }
            if (a == 2) {
                gainReroll()
            }
            if (a == 7) {
                ++numOfFox
            }
        }

        button.value = arrOrange[a]
    }
}

function funcPurple(a) {
    for (let index = 0; index < a; index++) {
        if (arrPurple[index] == 0) {
            alert("왼쪽칸부터 채워주십시오.")

            return;
        }
    }
    for (let index = a + 1; index <= 10; index++) {
        if (arrPurple[index] != 0) {
            alert("오른쪽칸부터 수정해주십시오.")

            return
        }

    }
    var button = document.getElementById("btnPurple_" + a)
    arrPurple[a] += 1
    if (a > 0 && arrPurple[a - 1] != 6) {
        while (arrPurple[a] <= arrPurple[a - 1]) {
            arrPurple[a] += 1
        }
    }
    var gainThisTime = true

    if (arrPurple[a] == 7) {
        if (a == 4 || a == 10) {
            if (canBeLoosePlus() == false) {
                alert("아이템을 사용하였으므로 취소할 수 없습니다.")
                gainThisTime = false
                arrPurple[a] = arrPurple[a - 1] + 1
                if (arrPurple[a] == 7) {
                    arrPurple[a] = 1
                }
            } else {
                arrPurple[a] = 0
            }
        } else if (a == 2 || a == 7) {
            if (canBeLooseReroll() == false) {
                alert("아이템을 사용하였으므로 취소할 수 없습니다.")
                gainThisTime = false
                arrPurple[a] = arrPurple[a - 1] + 1
                if (arrPurple[a] == 7) {
                    arrPurple[a] = 1
                }
            } else {
                arrPurple[a] = 0
            }
        } else {
            arrPurple[a] = 0
        }

    }
    if (arrPurple[a] == 0) {
        if (a == 4 || a == 10) {
            loosePlus()
        }
        if (a == 2 || a == 7) {
            looseReroll()
        }
        if (a == 6) {
            --numOfFox
        }
        button.value = ""
    } else {
        if (gainThisTime && (arrPurple[a] == arrPurple[a - 1] + 1 || arrPurple[a] == 1)) {
            if (a == 4 || a == 10) {
                gainPlus()
            } else if (a == 2 || a == 7)

            {
                gainReroll()
            } else if (a == 6) {
                ++numOfFox
            }
        }
        button.value = arrPurple[a]
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
        button.value = "x"
        if (a == 0 || a == 2) {
            gainReroll()
        }
        if (a == 1) {
            gainPlus()
        }
    } else {

        for (let idx = 5; idx > a; idx--) {
            if (arrRound[idx] == true) {
                alert("" + (idx + 1) + " 라운드부터 취소해 주십시오.")
                return
            }
        }
        if (a == 0 || a == 2) {
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
        arrRound[a] = false
        button.value = ""

    }
}


function drawTile() {


    document.getElementById("spanY").style.left=pageWidth* 7/360+"px"
    document.getElementById("spanY").style.top=pageWidth* 480/360+"px"
    document.getElementById("spanY").style.fontSize = pageWidth* 25/360+"px"
    //document.getElementById("spanY").innerHTML="10"
    document.getElementById("spanY").style.width = 0.1*pageWidth+"px"
    document.getElementById("spanY").style.textAlign="center"

    document.getElementById("spanB").style.left=pageWidth* 57/360+"px"
    document.getElementById("spanB").style.top=pageWidth* 480/360+"px"
    document.getElementById("spanB").style.fontSize = pageWidth* 25/360+"px"
    //document.getElementById("spanB").innerHTML="20"
    document.getElementById("spanB").style.width = 0.1*pageWidth+"px"
    document.getElementById("spanB").style.textAlign="center"

    document.getElementById("spanG").style.left=pageWidth* 106/360+"px"
    document.getElementById("spanG").style.top=pageWidth* 480/360+"px"
    document.getElementById("spanG").style.fontSize = pageWidth* 25/360+"px"
    //document.getElementById("spanG").innerHTML="30"
    document.getElementById("spanG").style.width = 0.1*pageWidth+"px"
    document.getElementById("spanG").style.textAlign="center"

    document.getElementById("spanO").style.left=pageWidth* 155/360+"px"
    document.getElementById("spanO").style.top=pageWidth* 480/360+"px"
    document.getElementById("spanO").style.fontSize = pageWidth* 25/360+"px"
    //document.getElementById("spanO").innerHTML="40"
    document.getElementById("spanO").style.width = 0.1*pageWidth+"px"
    document.getElementById("spanO").style.textAlign="center"

    document.getElementById("spanP").style.left=pageWidth* 205/360+"px"
    document.getElementById("spanP").style.top=pageWidth* 480/360+"px"
    document.getElementById("spanP").style.fontSize = pageWidth* 25/360+"px"
    //document.getElementById("spanP").innerHTML="40"
    document.getElementById("spanP").style.width = 0.1*pageWidth+"px"
    document.getElementById("spanP").style.textAlign="center"

    document.getElementById("spanF").style.left=pageWidth* 253/360+"px"
    document.getElementById("spanF").style.top=pageWidth* 480/360+"px"
    document.getElementById("spanF").style.fontSize = pageWidth* 25/360+"px"
    document.getElementById("spanF").style.width = 0.1*pageWidth+"px"
    //document.getElementById("spanF").innerHTML="70"
    //document.getElementById("spanF").style.border="1px dotted red"
    document.getElementById("spanF").style.textAlign="center"

    document.getElementById("spanScore").style.left=pageWidth* 313/360+"px"
    document.getElementById("spanScore").style.top=pageWidth* 480/360+"px"
    document.getElementById("spanScore").style.fontSize = pageWidth* 25/360+"px"
    document.getElementById("spanScore").style.width = 0.1*pageWidth+"px"
    document.getElementById("spanScore").style.height = 0.08*pageWidth+"px"
    //document.getElementById("spanScore").style.backgroundColor="black"
    //document.getElementById("spanScore").innerHTML="80"
    //document.getElementById("spanScore").style.border="1px dotted red"
    document.getElementById("spanScore").style.textAlign="center"
    

    




    var ratio = 43 / 360
    for (let index = 0; index <= 10; index++) {
        var button = document.createElement("input")
        button.type = "button"
        button.id = "btnPurple_" + index
        maindiv.appendChild(button)
        button.className = "btnRound"
            //var button = document.getElementById(btnID)
        button.style.left = pageWidth * ratio + "px"
        button.style.width = button.style.height = pageWidth * 25 / 360 + "px"
        button.style.top = pageWidth * 426 / 360 + "px"
        button.style.fontSize = pageWidth * 15 / 360 + "px"
        button.onclick = function() {
            funcPurple(index)
        }
        ratio += 276 / 3600
        button.value = ""
        button.style.borderColor = "Transparent"
        //button.style.border = "2px dotted red"
    }


    var ratio = 43 / 360
    for (let index = 0; index <= 10; index++) {
        var button = document.createElement("input")
        button.type = "button"
        button.id = "btnOrange_" + index
        button.className = "btnRound"

        maindiv.appendChild(button)

        button.style.left = pageWidth * ratio + "px"
        button.style.width = button.style.height = pageWidth * 25 / 360 + "px"
        button.style.top = pageWidth * 378 / 360 + "px"
        button.style.fontSize = pageWidth * 15 / 360 + "px"
        button.value = ""
        button.style.border = "0px"
        //button.style.border = "2px dotted red"

        button.onclick = function() {
            funcOrange(index)
        }
        ratio += 276 / 3600
    }

    var ratio = 43 / 360
    for (let index = 0; index <= 10; index++) {

        var button = document.createElement("input")
        button.type = "button"
        button.id = "btnGreen_" + index
        button.className = "btnRound"

        maindiv.appendChild(button)

        button.style.left = pageWidth * ratio + "px"
        button.style.width = button.style.height = pageWidth * 25 / 360 + "px"
        button.style.top = pageWidth * 330 / 360 + "px"
        button.style.fontSize = pageWidth * 15 / 360 + "px"
        button.style.border = "0px"
        //button.style.border = "2px dotted red"

        button.onclick = function() {
            funcGreen(index)
        }
        ratio += 276 / 3600
        button.value = ""
    }

    var ratio = 70 / 360
    for (let index = 0; index <= 5; index++) {

        var button = document.createElement("input")
        button.type = "button"
        button.id = "btnRound" + index
        button.className = "btnRound"

        maindiv.appendChild(button)


        button.style.left = pageWidth * ratio + "px"
        button.style.width = button.style.height = pageWidth * 25 / 360 + "px"
        button.style.top = pageWidth * 9 / 360 + "px"
        button.style.fontSize = pageWidth * 15 / 360 + "px"
        button.style.border = "0px"
        //button.style.border = "2px dotted red"

        button.onclick = function() {
            funcRound(index)
        }
        ratio += 50.3 / 360
        button.value = ""
    }

    ratio = 113 / 375
    for (let index = 0; index <= 6; index++) {

        var button = document.createElement("input")
        button.type = "button"
        button.id = "btnReroll" + index
        button.className = "btnItem"

        maindiv.appendChild(button)

        button.style.left = pageWidth * ratio + "px"
        button.style.width = button.style.height = pageWidth * 25 / 375 + "px"
        button.style.top = pageWidth * 72 / 375 + "px"
        button.style.fontSize = pageWidth * 15 / 375 + "px"
        button.style.border = "0px"
        //button.style.border = "2px dotted red"

        button.onclick = function() {
            funcReroll(index)
        }
        ratio += 359 / 3750
        button.value = ""
    }

    ratio = 113 / 375
    for (let index = 0; index <= 6; index++) {

        var button = document.createElement("input")
        button.type = "button"
        button.id = "btnPlus" + index
        button.className = "btnItem"

        maindiv.appendChild(button)

        button.style.left = pageWidth * ratio + "px"
        button.style.width = button.style.height = pageWidth * 26 / 375 + "px"
        button.style.top = pageWidth * 124 / 375 + "px"
        button.style.fontSize = pageWidth * 15 / 375 + "px"
        button.style.border = "0px"
        //button.style.border = "2px dotted red"

        button.onclick = function() {
            funcPlus(index)
        }

        ratio += 359 / 3750
        button.value = ""
    }


    var topratio = 167 / 360
    for (let _x = 0; _x <= 3; _x++) {

        var leftratio = 17 / 360
        for (let _y = 0; _y <= 3; _y++) {

            var button = document.createElement("input")
            button.type = "button"
            button.id = "btnYellow_" + _x + "_" + _y
            button.className = "btnRound"

            maindiv.appendChild(button)

            button.style.left = pageWidth * leftratio + "px"
            button.style.width = button.style.height = pageWidth * 25 / 360 + "px"
            button.style.top = pageWidth * topratio + "px"
            button.style.fontSize = pageWidth * 15 / 360 + "px"
            button.style.border = "0px"
            //button.style.border = "2px dotted red"

            button.onclick = function() {
                funcYellow(_x, _y)
            }
            leftratio += 31 / 360
            button.value = ""

        }
        topratio += 270 / 3600


    }

    0.6247, 0.4227, 0.6917, 0.4668
    topratio = 216 / 360
    let xtic = 0.052
    let ytic = 0.087
    for (let _x = 0; _x <= 2; _x++) {

        var leftratio = 194 / 360
        for (let _y = 0; _y <= 3; _y++) {

            // var button = document.createElement("input")
            // button.type = "button"
            // button.id = "btnBlue_" + _x + "_" + _y
            // button.className = "btnRound"

            // maindiv.appendChild(button)

            // button.style.left = pageWidth * leftratio + "px"
            // button.style.width = button.style.height = pageWidth * 25 / 360 + "px"
            // button.style.top = pageWidth * topratio + "px"
            // button.style.fontSize = pageWidth * 15 / 360 + "px"
            // button.style.border = "0px"

            var button = funcInsertElement("btnBlue_" + _x + "_" + _y, "button", "btnRound",
                    0.538 + _y * ytic,
                    0.380 + _x * xtic,
                    0.606 + _y * ytic,
                    0.428 + _x * xtic)
                //button.style.border = "1px solid black"
            button.style.border = "0px"
            button.value = ""
            button.innerHTML = ""
            button.style.fontSize = pageWidth * 15 / 360 + "px"
            button.onclick = function() {
                funcBlue(_x, _y)
            }
            leftratio += 31 / 360
            //button.style.border = "2px dotted red"

        }
        topratio += 295 / 3600


    }
}

//funcPrepareGetLocation()
