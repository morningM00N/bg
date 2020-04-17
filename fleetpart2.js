
funcDrawFleetSheet()

function funcCountFish() {

    let scoreFish = 0

    for (let _type = 0; _type < 5; _type++) {
        for (let idx = 0; idx < 3; idx++) {
            for (let idx2 = 0; idx2 < 10; idx2++) {
                let curFish = document.getElementById("onepage_boat_fish_" + _type + "_" + idx + "_" + idx2)
                if (curFish != null && curFish.innerHTML == "X") {
                    scoreFish++
                }
            }

        }

    }

    for (let idx = 0; idx < 3; idx++) {
        for (let idx2 = 0; idx2 < 4; idx2++) {
            if (document.getElementById("twopage_kingcrap_boat_fish_" + idx + "_" + idx2).innerHTML == "X") {
                scoreFish++
            }
        }
    }

    for (let idx = 0; idx < 10; idx++) {
        if (document.getElementById("twopage_barge_fish" + idx).innerHTML == "X") {
            scoreFish++
        }
    }


    for (let idx = 0; idx < 2; idx++) {
        for (let idx2 = 0; idx2 < 4; idx2++) {
            if (document.getElementById("twopage_inuit_ship_fish" + idx + "_" + idx2).innerHTML == "X") {
                scoreFish++
            }
        }
    }

    return scoreFish
}

let numOfFish
let numOfBoat
let numOfBuilding
let numOfLicense

function funcCal() {

    numOfFish = numOfBoat = numOfBuilding = numOfLicense = 0
    let scoreFish = funcCountFish()
    numOfFish = scoreFish
    document.getElementById("onepage_scores_0").innerHTML = scoreFish

    let scoreBoat = 0
    for (let _type = 0; _type < 5; _type++) {
        for (let idx = 0; idx < 3; idx++) {
            let tempObj = document.getElementById("onepage_boat_act_" + _type + "_" + idx)
            if (tempObj != null && tempObj.innerHTML == "X") {
                if (_type == 0 || _type == 3) {
                    scoreBoat += 2
                } else {
                    scoreBoat++
                }
                numOfBoat++
            }
        }
    }
    for (let idx = 0; idx < 3; idx++) {
        if (document.getElementById("twopage_kingcrap_boat_" + idx).innerHTML == "X") {
            scoreBoat += 3
            numOfBoat++
        }
    }
    for (let idx = 0; idx < 2; idx++) {
        if (document.getElementById("twopage_research_ship_" + idx).innerHTML == "X") {
            scoreBoat += 1
            numOfBoat++
        }

    }
    if (document.getElementById("twopage_barge_ship").innerHTML == "X") {
        numOfBoat++
    }
    for (let idx = 0; idx < 2; idx++) {
        if (document.getElementById("twopage_inuit_ship" + idx).innerHTML == "X") {
            numOfBoat++
        }
    }
    document.getElementById("onepage_scores_1").innerHTML = scoreBoat
    let scoreLicense = 0
    for (let _type = 0; _type < 5; _type++) {
        for (let idx = 0; idx < 3; idx++) {
            let tempObj = document.getElementById("onepage_licence_" + _type + "_" + idx)
            if (tempObj != null && tempObj.innerHTML == "X") {
                numOfLicense++
            }
        }
    }
    if (document.getElementById("onepage_licence_0_2").innerHTML == "X") {
        scoreLicense += 5
    }
    if (document.getElementById("onepage_licence_1_2").innerHTML == "X") {
        scoreLicense += 6
    }
    if (document.getElementById("onepage_licence_2_2").innerHTML == "X") {
        scoreLicense += 7
    }
    if (document.getElementById("onepage_licence_3_2").innerHTML == "X") {
        scoreLicense += 4
    }
    if (document.getElementById("onepage_licence_4_2").innerHTML == "X") {
        scoreLicense += 3
    }
    if (document.getElementById("twopage_kingcrap_license").innerHTML == "X") {
        scoreLicense += 5
    }
    document.getElementById("onepage_scores_2").innerHTML = scoreLicense
    let scoreWharf = 0
    if (document.getElementById("twopage_casino_0").innerHTML == "X" &&
        document.getElementById("twopage_casino_1").innerHTML == "X") {
        scoreWharf += 2
        numOfBuilding++
    }
    if (document.getElementById("twopage_bank_0").innerHTML == "X" &&
        document.getElementById("twopage_bank_1").innerHTML == "X" &&
        document.getElementById("twopage_bank_2").innerHTML == "X") {
        scoreWharf += 3
        numOfBuilding++
    }
    if (document.getElementById("twopage_salvage_0").innerHTML == "X" &&
        document.getElementById("twopage_salvage_1").innerHTML == "X") {
        scoreWharf += 2
        numOfBuilding++
    }
    if (document.getElementById("twopage_baitshop_0").innerHTML == "X" &&
        document.getElementById("twopage_baitshop_1").innerHTML == "X") {
        scoreWharf += 2
        numOfBuilding++
    }
    if (document.getElementById("twopage_ridback").innerHTML == "X") {
        scoreWharf += 1
        numOfBuilding++
    }
    if (document.getElementById("twopage_smokehouse_0").innerHTML == "X" &&
        document.getElementById("twopage_smokehouse_1").innerHTML == "X") {
        scoreWharf += 3
        numOfBuilding++
    }
    if (document.getElementById("twopage_fisherman_0").innerHTML == "X" &&
        document.getElementById("twopage_fisherman_1").innerHTML == "X" &&
        document.getElementById("twopage_fisherman_2").innerHTML == "X" &&
        document.getElementById("twopage_fisherman_3").innerHTML == "X") {
        scoreWharf += 10
        numOfBuilding++
    }
    if (document.getElementById("twopage_seafood").innerHTML == "X") {
        let count = 0
        numOfBuilding++
        for (let idx = 0; idx < 5; idx++) {
            if (document.getElementById("twopage_seafood_" + idx).innerHTML == "X") {
                count++
            }
        }
        if (count == 1) {
            scoreWharf += 1
        } else if (count == 2) {
            scoreWharf += 3
        } else if (count == 3) {
            scoreWharf += 6
        } else if (count == 4) {
            scoreWharf += 10
        } else if (count == 5) {
            scoreWharf += 15
        }
    }
    document.getElementById("onepage_scores_3").innerHTML = scoreWharf
    let scoreBonus = 0
    numOfCoins = 0
    for (let idx = 0; idx < 118; idx++) {
        if (document.getElementById("twopage_coins_" + idx).innerHTML == "X") {
            numOfCoins++
        }

    }
    console.log(numOfFish, numOfBoat, numOfBuilding, numOfLicense, numOfCoins)
    if (document.getElementById("twopage_kingcrap_license").innerHTML == "X") {
        if (document.getElementById("twopage_kingcrap_license_option_0").innerHTML == "X") {
            scoreBonus = 2 * numOfBuilding
        } else if (document.getElementById("twopage_kingcrap_license_option_1").innerHTML == "X") {
            scoreBonus = Math.floor(numOfFish / 6)
        } else if (document.getElementById("twopage_kingcrap_license_option_2").innerHTML == "X") {
            scoreBonus = numOfLicense + 1
        } else if (document.getElementById("twopage_kingcrap_license_option_3").innerHTML == "X") {
            scoreBonus = Math.floor(numOfCoins / 10)
        }
    }
    document.getElementById("onepage_scores_4").innerHTML = scoreBonus
    document.getElementById("onepage_scores_5").innerHTML = scoreFish + scoreBoat + scoreLicense + scoreWharf + scoreBonus
}
