funcWidthPerHeight(2253 / 2064)

//funcPrepareGetLocation()

funcUpdatePageSize(true)

var numOfFeeds = 0
var arrPlant = new Array()
var arrChecked = new Array()
for (let idx = 0; idx < 6; idx++) {
    arrPlant[idx] = new Array()
    for (let idx2 = 0; idx2 < 3; idx2++) {
        arrPlant[idx][idx2] = 0
    }
}

function funcCheckwithX() {
    let _id = event.srcElement.id
    //console.log(_id)
    if (arrChecked[_id] == true) {
        arrChecked[_id] = false
        event.srcElement.innerHTML = ""
    }
    else {
        arrChecked[_id] = true
        event.srcElement.innerHTML = "X"
    }
}
function funcPlant(idx, idx2) {
    arrPlant[idx][idx2]++
    if (arrPlant[idx][idx2] == 4) {
        arrPlant[idx][idx2] = 0
    }

    //let btnFarm = document.getElementById("btnFarm" + idx + "_" + idx2)
    switch (arrPlant[idx][idx2]) {
        case 1:
            event.srcElement.style.backgroundImage = "url('img/harvestdice/carrot.png')"
            // event.srcElement.backgroundSize = "100%"
            // event.srcElement.backgroundPositionX="0%"

            break;
        case 2:
            event.srcElement.style.backgroundImage = "url('img/harvestdice/lettuce.png')"
            //  event.srcElement.backgroundSize = "85%"
            //  event.srcElement.backgroundPositionX="50%"

            break;
        case 3:
            event.srcElement.style.backgroundImage = "url('img/harvestdice/tomato.png')"
            //  event.srcElement.backgroundSize = "85%"
            //  event.srcElement.backgroundPositionX="50%"

            break;
        case 0:
            event.srcElement.style.backgroundImage = "url('')"
            break;

        default:
            break;
    }
}
function funcDrawHarvestDice() {

    funcInsertFullScreenButton(0.8849, 0.0170, 0.9707, 0.0894, 29 / 20)
    let leftTic = 0.127
    let topTic = 0.13
    for (let idx = 0; idx < 6; idx++) {
        for (let idx2 = 0; idx2 < 3; idx2++) {
            let btnFarm = funcInsertElement("btnFarm" + idx + "_" + idx2, "button", "btnTrans",
                0.2310 + leftTic * (idx - 1), 0.1588 + idx2 * topTic, 0.3252 + leftTic * (idx - 1), 0.2500 + idx2 * topTic
            )
            btnFarm.style.transform = "rotate(" + (getRandom(61) - 30) + "deg)"
            let imgSrc = "lettuce"
            let ranN = getRandom(3)
            if (ranN == 0) {
                imgSrc = "carrot"
            }
            else if (ranN == 1) {
                imgSrc = "tomato"
            }
            //btnFarm.style.backgroundSize = "90%"
            //btnFarm.backgroundPositionX = "50%"

            btnFarm.onclick = function () {
                funcPlant(idx, idx2)
            }


        }
    }

    leftTic = 0.0355
    topTic = 0.0386
    leftMod = 0.0005

    let idxNumOfFeeds = 0
    for (let idx2 = 0; idx2 < 7; idx2++) {

        for (let idx = 0; idx < 6; idx++) {
            funcInsertElement("btnFeed" + idxNumOfFeeds++, "button", "btnCircle",
                0.0777 + leftTic * (idx) + idx2 * leftMod, 0.650 + idx2 * topTic, 0.1094 + leftTic * (idx) + idx2 * leftMod, 0.6802 + idx2 * topTic
            )
        }
    }
    topTic = 0.0395
    leftTic = 0.001
    for (let idx = 0; idx < 7; idx++) {
        funcInsertElement("btnFeedDone" + idx, "button", "btnTrans",
            0.3058 + leftTic * idx, 0.6435 + idx * topTic, 0.3407 + leftTic * idx, 0.6782 + idx * topTic
        ).onclick = funcCheckwithX

    }
    topTic = 0
    leftTic = 0.105
    for (let idx = 0; idx < 5; idx++) {
        funcInsertElement("btnScore" + idx, "button", "btnTrans",
            0.4589 + leftTic * idx, 0.8439 + idx * topTic, 0.5137 + leftTic * idx, 0.8960 + idx * topTic
        )
    }
    document.getElementById("btnScore0").style.transform = "rotate(5deg)"
    document.getElementById("btnScore1").style.transform = "rotate(-5deg)"
    document.getElementById("btnScore2").style.transform = "rotate(5deg)"
    document.getElementById("btnScore3").style.transform = "rotate(-5deg)"
    document.getElementById("btnScore4").style.transform = "rotate(5deg)"

    funcInsertElement("btnScoreFinal", "button", "btnTrans",
        0.6196, 0.9287, 0.7696, 0.9711
    ).onclick = funcFinalScoreCal


    topTic = 0.0385
    vegMod = 0.172
    leftTic = 0.04
    leftMod = 0.001
    for (let veg = 0; veg < 3; veg++) {
        for (let idx = 0; idx < 2; idx++) {
            for (let idx2 = 0; idx2 < 3; idx2++) {
                funcInsertElement("btnVegitable" + veg + "_" + idx + "_" + idx2, "button", "btnCircle",
                    veg * vegMod + 0.475 + leftTic * (idx) + idx2 * leftMod, 0.6773 + idx2 * topTic,
                    veg * vegMod + 0.5096 + leftTic * (idx) + idx2 * leftMod, 0.7081 + idx2 * topTic
                ).onclick = funcCheckwithX
            }
        }
    }

    funcInsertElement("btnFScore0", "button", "btnCircle",
        0.8508, 0.1734, 0.8985, 0.2235
    ).onclick = funcCheckwithX

    funcInsertElement("btnFScore1", "button", "btnCircle",
        0.8599, 0.2909, 0.9040, 0.3391
    ).onclick = funcCheckwithX


    funcInsertElement("btnFScore2", "button", "btnCircle",
        0.8667, 0.4181, 0.9143, 0.4701
    ).onclick = funcCheckwithX

    funcInsertElement("btnFScore3", "button", "btnCircle",
        0.3437, 0.5647, 0.3896, 0.6167
    ).onclick = funcCheckwithX

    funcInsertElement("btnFScore4", "button", "btnCircle",
        0.5578, 0.5453, 0.6107, 0.5992
    ).onclick = funcCheckwithX

    funcInsertElement("btnFScore5", "button", "btnCircle",
        0.7308, 0.5491, 0.7749, 0.5973
    ).onclick = funcCheckwithX

    funcInsertElement("btnFScore6", "button", "btnCircle",
        0.9022, 0.5454, 0.9481, 0.6013
    ).onclick = funcCheckwithX


    leftTic = 0.13
    for (let idx = 0; idx < 6; idx++) {
        funcInsertElement("btnDoFeed" + idx, "button", "btnTrans",
            0.1024 + idx * leftTic, 0.0443, 0.1712 + idx * leftTic, 0.0963
        ).onclick = function () {
            funcDoFeed(idx)
        }
    }

    funcInsertElement("btnDecreaseFeed", "button", "btnTrans",
        0.1228, 0.5298, 0.2281, 0.6383
    ).onclick = function () {
        if (numOfFeeds == 0) {
            return
        }
        {
            numOfFeeds--
            document.getElementById("btnFeed" + numOfFeeds).innerHTML = ""
        }
    }

}


function funcDoFeed(feedVal) {
    for (let idx = 0; idx <= feedVal; idx++) {
        document.getElementById("btnFeed" + numOfFeeds).innerHTML = "X"
        numOfFeeds++
    }
}

function funcFinalScoreCal() {
    let finalScore = 0
    let numOfFScore = 0
    for (let idx = 0; idx < 7; idx++) {
        if (arrChecked["btnFScore" + idx] == true) {
            numOfFScore++
        }

    }
    finalScore+= 5 * numOfFScore
    document.getElementById("btnScore3").innerHTML = 5 * numOfFScore

    let feedScore = Math.floor(numOfFeeds / 6)
    if (feedScore == 7) {
        feedScore++
    }

    let vegiPerScore = new Array()
    let vegiCount = new Array()
    for (let veg = 0; veg < 3; veg++) {
        vegiPerScore[veg] = 0
        vegiCount[veg] = 0
    }

    for (let idx = 0; idx < 6; idx++) {
        for (let idx2 = 0; idx2 < 3; idx2++) {
            if (arrPlant[idx][idx2]>0) {
                vegiCount[arrPlant[idx][idx2]-1]++
            }
            
        }
    }    

    for (let veg = 0; veg < 3; veg++) {

        for (let idx = 0; idx < 2; idx++) {
            for (let idx2 = 0; idx2 < 3; idx2++) {
                if (arrChecked["btnVegitable" + veg + "_" + idx + "_" + idx2] == true) {
                    vegiPerScore[veg]++
                }
            }
        }

        document.getElementById("btnScore"+veg).innerHTML = vegiCount[veg]*vegiPerScore[veg]
        finalScore+=vegiCount[veg]*vegiPerScore[veg]
    }



    //console.log(vegiPerScore)
    //console.log(vegiCount)

    document.getElementById("btnScore4").innerHTML = 2 * feedScore
    finalScore+=2*feedScore

    event.srcElement.innerHTML=finalScore
}

funcDrawHarvestDice()