funcWidthPerHeight(1312 / 1892)

funcUpdatePageSize(true)

let typeChecked = new Array()
for (let idx = 0; idx < 5; idx++) {
    typeChecked[idx] = 0
}

let page = 1

function funcDrawPage() {
    let strPage = "onepage_"
    if (page == 2) {
        strPage = "twopage_"
    }

    for (let idx = 0; idx < nameOfRelocatedElements.length; idx++) {
        if (nameOfRelocatedElements[idx].indexOf(strPage) >= 0) {
            document.getElementById(nameOfRelocatedElements[idx]).style.display = "inline"
        } else {
            document.getElementById(nameOfRelocatedElements[idx]).style.display = "none"
        }
    }
}

funcChangePage()

function funcChangePage() {
    if (page == 1) {
        page = 2
        document.getElementById("main").style.backgroundImage = "url('img/fleet/right.png')"
        funcDrawPage()
    } else {
        page = 1
        document.getElementById("main").style.backgroundImage = "url('img/fleet/left.png')"
        funcDrawPage()
    }
}

let kingcrapIdx = 0

let captionIdx = 0

let inuitIdx = 0

function funcMarkX() {
    if (event.srcElement.innerHTML == "X") {
        event.srcElement.innerHTML = ""
    } else {
        event.srcElement.innerHTML = "X"
    }
}

function funcDrawFleetSheet() {

    let twopageFontSize
    let btnKingDec = funcInsertElement("twopage_kingcrapDec",
        "button", "btnTrans",
        0.0478, 0.0114, 0.1450, 0.0685)

    btnKingDec.onclick = function() {
        if (kingcrapIdx == 0) {
            return
        }
        kingcrapIdx--
        document.getElementById("twopage_kingcrap_" + kingcrapIdx).innerHTML = ""

    }



    let btnKingInc = funcInsertElement("twopage_kingcrapInc",
        "button", "btnTrans",
        0.0283, 0.0724, 0.1674, 0.3181)
    btnKingInc.onclick = function() {
        if (kingcrapIdx == 11) {
            return
        }
        document.getElementById("twopage_kingcrap_" + kingcrapIdx).innerHTML = "X"
        kingcrapIdx++
    }


    {

        let topTic = 0.0195
        for (let idx = 0; idx < 11; idx++) {
            let btnKingcrap = funcInsertElement("twopage_kingcrap_" + idx,
                "button", "btnTrans",
                0.040,
                0.0940 + idx * topTic,
                0.068,
                0.112 + idx * topTic)
            btnKingcrap.onclick = function() {
                if (idx == kingcrapIdx - 1) {
                    kingcrapIdx--
                    event.srcElement.innerHTML = ""
                }
            }

            twopageFontSize = btnKingcrap.style.fontSize

            //btnKingcrap.style.border = "1px dotted red"

        }
    }

    {

        {
            let btnCaptainInc = funcInsertElement("twopage_captainInc",
                "button", "btnTrans", 0.1911, 0.1639, 0.3245, 0.2639
            )
            btnCaptainInc.onclick = function() {
                if (captionIdx == 8) {
                    return
                }
                document.getElementById("twopage_captain_" + captionIdx).innerHTML = "X"
                captionIdx++
            }
        }

        {
            let btnCaptainDec = funcInsertElement("twopage_captainDec",
                "button", "btnTrans",
                0.1911, 0.0788, 0.3245, 0.1639)
            btnCaptainDec.onclick = function() {
                if (captionIdx == 0) {
                    return
                }
                captionIdx--
                document.getElementById("twopage_captain_" + captionIdx).innerHTML = ""

            }
        }
        let topTic = 0.0195





        for (let idx = 0; idx < 8; idx++) {
            let btnCaptain = funcInsertElement("twopage_captain_" + idx,
                "button", "btnTrans",
                0.210,
                0.096 + idx * topTic,
                0.238,
                0.114 + idx * topTic)
            btnCaptain.style.fontSize = twopageFontSize
            btnCaptain.onclick = function() {
                if (idx == captionIdx - 1) {
                    captionIdx--
                    event.srcElement.innerHTML = ""
                }
            }
        }


    }

    { // twopage_area
        {
            let btnKingcrapLicense = funcInsertElement("twopage_kingcrap_license",
                "button", "btnTrans",
                0.0214, 0.3226, 0.0494, 0.3367)
            btnKingcrapLicense.innerHTML = "X"
            btnKingcrapLicense.style.fontSize = twopageFontSize
            btnKingcrapLicense.onclick = funcMarkX

            for (let idx = 0; idx < 4; idx++) {
                let btnKingcrapLicenseOption = funcInsertElement("twopage_kingcrap_license_option_" + idx,
                    "button", "btnTrans",
                    0.1371,
                    0.3998 + idx * 0.0365,
                    0.1598,
                    0.4158 + idx * 0.0365)
                btnKingcrapLicenseOption.innerHTML = "X"
                btnKingcrapLicenseOption.style.fontSize = twopageFontSize
                btnKingcrapLicenseOption.onclick = funcMarkX


            }
        }

        {
            for (let idx = 0; idx < 3; idx++) {


                let xTic = 0.028
                for (let idx2 = 0; idx2 < 4; idx2++) {

                    let btnKingcrapboatfish = funcInsertElement("twopage_kingcrap_boat_fish_" + idx + "_" + idx2,
                        "button", "btnTrans",
                        0.0675 + idx2 * xTic,
                        0.6151 + idx * 0.078,
                        0.0906 + idx2 * xTic,
                        0.6340 + idx * 0.078)

                    //btnKingcrapboatfish.innerHTML = "X"
                    btnKingcrapboatfish.style.fontSize = twopageFontSize
                    btnKingcrapboatfish.onclick = funcMarkX

                }


                let btnKingcrapfishInc = funcInsertElement("twopage_kingcrap_boat_fish_inc_" + idx,
                    "button", "btnTrans",
                    (0.1944 + 0.0148) / 2,
                    0.5758 + idx * 0.078,
                    0.1944,
                    0.6466 + idx * 0.078)
                btnKingcrapfishInc.onclick = function() {
                    for (let idx2 = 0; idx2 < 4; idx2++) {
                        if (document.getElementById("twopage_kingcrap_boat_fish_" + idx + "_" + idx2).innerHTML == "") {
                            document.getElementById("twopage_kingcrap_boat_fish_" + idx + "_" + idx2).innerHTML = "X"
                            return
                        }

                    }
                }

                let btnKingcrapfishDec = funcInsertElement("twopage_kingcrap_boat_fish_dec_" + idx,
                    "button", "btnTrans",
                    0.0148,
                    0.5758 + idx * 0.078,
                    (0.1944 + 0.0148) / 2,
                    0.6466 + idx * 0.078)
                btnKingcrapfishDec.onclick = function() {
                    for (let idx2 = 3; idx2 >= 0; idx2--) {
                        if (document.getElementById("twopage_kingcrap_boat_fish_" + idx + "_" + idx2).innerHTML == "X") {
                            document.getElementById("twopage_kingcrap_boat_fish_" + idx + "_" + idx2).innerHTML = ""
                            return
                        }

                    }
                }

                let btnKingcrapboat = funcInsertElement("twopage_kingcrap_boat_" + idx,
                    "button", "btnTrans",
                    0.036,
                    0.5930 + idx * 0.078,
                    0.0560,
                    0.6021 + idx * 0.078)
                btnKingcrapboat.innerHTML = "X"
                btnKingcrapboat.style.fontSize = twopageFontSize
                btnKingcrapboat.onclick = funcMarkX
            }
        }

    }

    { //barge area
        let topTic = 0.020
        for (let idx = 0; idx < 3; idx++) {
            let btnBarge = funcInsertElement("twopage_barge_" + idx,
                "button", "btnTrans",
                0.2241,
                0.5575 + idx * topTic,
                0.2438,
                0.5724 + idx * topTic)

            btnBarge.innerHTML = "X"
            btnBarge.style.fontSize = twopageFontSize

            btnBarge.onclick = funcMarkX

        }

        topTic = 0.018
        let leftTic = 0.032
        for (let idx = 0; idx < 10; idx++) {
            let btnBargeFish = funcInsertElement("twopage_barge_fish" + idx,
                "button", "btnTrans",
                0.327 + (idx % 5) * leftTic,
                0.5495 + Math.floor(idx / 5) * topTic,
                0.3443 + (idx % 5) * leftTic,
                0.5678 + Math.floor(idx / 5) * topTic)
            btnBargeFish.innerHTML = "X"
            btnBargeFish.style.fontSize = twopageFontSize

        }

        0., 0., 0., 0.

        let btnBargeShipDec = funcInsertElement("twopage_barge_ship_dec",
            "button", "btnTrans",
            0.3031,
            0.5061,
            (0.4893 + 0.3031) / 2,
            0.6055)
        btnBargeShipDec.onclick = function() {
            for (let idx2 = 9; idx2 >= 0; idx2--) {
                if (document.getElementById("twopage_barge_fish" + idx2).innerHTML == "X") {
                    document.getElementById("twopage_barge_fish" + idx2).innerHTML = ""
                    return
                }

            }
        }

        let btnBargeShipInc = funcInsertElement("twopage_barge_ship_inc",
            "button", "btnTrans",
            (0.4893 + 0.3031) / 2,
            0.5061,
            (0.4893 + 0.4893) / 2,
            0.6055)
        btnBargeShipInc.onclick = function() {
            for (let idx2 = 0; idx2 <= 9; idx2++) {
                if (document.getElementById("twopage_barge_fish" + idx2).innerHTML == "") {
                    document.getElementById("twopage_barge_fish" + idx2).innerHTML = "X"
                    return
                }

            }
        }

        let btnBargeShip = funcInsertElement("twopage_barge_ship",
            "button", "btnTrans",
            (0.3278 + 0.3278) / 2,
            0.52,
            (0.3493 + 0.3493) / 2,
            0.5289)
        btnBargeShip.innerHTML = "X"
        btnBargeShip.style.fontSize = twopageFontSize
        btnBargeShip.onclick = funcMarkX





    }

    { // innui area



        // {
        //     let btnInuitInc = funcInsertElement("twopage_inuit_inc",
        //         "button", "btnTrans",
        //         0.2273,
        //         0.7300,
        //         0.3213,
        //         0.7300 + 0.7300 - 0.6832)
        //     btnInuitInc.onclick = function() {
        //         if (inuitIdx == 3) {
        //             return
        //         }
        //         document.getElementById("twopage_inuit_" + inuitIdx).innerHTML = "X"
        //         inuitIdx++
        //     }

        //     let btnInuitDec = funcInsertElement("twopage_inuit_dec",
        //         "button", "btnTrans",
        //         0.2273,
        //         0.6832,
        //         0.3213,
        //         0.7300)
        //     btnInuitDec.onclick = function() {
        //         if (inuitIdx == 0) {
        //             return
        //         }
        //         inuitIdx--
        //         document.getElementById("twopage_inuit_" + inuitIdx).innerHTML = ""
        //     }
        // }

        let topTic = 0.021
        for (let idx = 0; idx < 3; idx++) {
            let btnInuit = funcInsertElement("twopage_inuit_" + idx,
                "button", "btnTrans",
                0.2372,
                0.7174 + idx * topTic,
                0.2586,
                0.7300 + idx * topTic)

            //btnInuit.innerHTML = "X"
            btnInuit.style.fontSize = twopageFontSize

            btnInuit.onclick = funcMarkX

        }

        {
            let topTic = 0.054
            for (let idx = 0; idx < 2; idx++) {

                for (let idx2 = 0; idx2 < 4; idx2++) {

                    let leftTic = 0.028
                    let btnInuitShipFish = funcInsertElement("twopage_inuit_ship_fish" + idx + "_" + idx2,
                        "button", "btnTrans",
                        0.3575 + idx2 * leftTic,
                        0.7106 + idx * topTic,
                        0.3806 + idx2 * leftTic,
                        0.7254 + idx * topTic)
                    btnInuitShipFish.innerHTML = "X"
                    btnInuitShipFish.style.fontSize = twopageFontSize


                }

                let btnInuitShipDec = funcInsertElement("twopage_inuit_ship_dec" + idx,
                    "button", "btnTrans",
                    0.3443,
                    0.6832 + idx * topTic,
                    (0.4728 + 0.3443) / 2,
                    0.7323 + idx * topTic)
                btnInuitShipDec.onclick = function() {
                    for (let idx2 = 3; idx2 >= 0; idx2--) {
                        if (document.getElementById("twopage_inuit_ship_fish" + idx + "_" + idx2).innerHTML == "X") {
                            document.getElementById("twopage_inuit_ship_fish" + idx + "_" + idx2).innerHTML = ""
                            return
                        }

                    }
                }

                let btnInuitShipInc = funcInsertElement("twopage_inuit_ship_inc" + idx,
                    "button", "btnTrans",
                    (0.4728 + 0.3443) / 2,
                    0.6832 + idx * topTic,
                    0.4728,
                    0.7323 + idx * topTic)
                btnInuitShipInc.onclick = function() {
                    for (let idx2 = 0; idx2 <= 3; idx2++) {
                        if (document.getElementById("twopage_inuit_ship_fish" + idx + "_" + idx2).innerHTML == "") {
                            document.getElementById("twopage_inuit_ship_fish" + idx + "_" + idx2).innerHTML = "X"
                            return
                        }

                    }
                }



                let btnInuitShip = funcInsertElement("twopage_inuit_ship" + idx,
                    "button", "btnTrans",
                    0.3381,
                    0.6883 + idx * topTic,
                    0.3575,
                    0.7014 + idx * topTic)
                btnInuitShip.innerHTML = "X"
                btnInuitShip.style.fontSize = twopageFontSize
                btnInuitShip.onclick = funcMarkX

            }
        }




    }

    {

        for (let idx = 0; idx < 2; idx++) {
            let topTic = 0.021
            let btnResearchVessel = funcInsertElement("twopage_research_" + idx,
                "button", "btnTrans",
                0.2310,
                0.363 + idx * topTic,
                0.2570,
                0.3781 + idx * topTic)
            btnResearchVessel.innerHTML = "X"
            btnResearchVessel.style.fontSize = twopageFontSize

            btnResearchVessel.onclick = funcMarkX

            topTic = 0.068
            let btnResearchVesselShip = funcInsertElement("twopage_research_ship_" + idx,
                "button", "btnTrans",
                0.3450 - idx * 0.01,
                0.3194 + idx * topTic,
                0.3641,
                0.3347 + idx * topTic)
            btnResearchVesselShip.innerHTML = "X"
            btnResearchVesselShip.style.fontSize = twopageFontSize

            btnResearchVesselShip.onclick = funcMarkX

        }
    }

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 10; col++) {
            if (col > 5) {
                let btnTemp =
                    funcInsertElement("onepage_round_tracker_" + row + "_" + col,
                        "button", "btnTrans",
                        0.3708 + col * 0.0333,
                        0.8452 + row * 0.02,
                        0.3966 + col * 0.0333,
                        0.8649 + row * 0.02)
                btnTemp.onclick = function() {
                    if (event.srcElement.innerHTML == "X") {
                        event.srcElement.innerHTML = ""
                    } else {
                        event.srcElement.innerHTML = "X"
                    }
                }

            } else {
                let btnTemp =
                    funcInsertElement("onepage_round_tracker_" + row + "_" + col,
                        "button", "btnTrans",
                        0.3668 + col * 0.035,
                        0.8452 + row * 0.02,
                        0.3926 + col * 0.035,
                        0.8649 + row * 0.02)
                btnTemp.onclick = function() {
                    if (event.srcElement.innerHTML == "X") {
                        event.srcElement.innerHTML = ""
                    } else {
                        event.srcElement.innerHTML = "X"
                    }
                }

            }


        }

    }

    let inputName = funcInsertElement("onepage_input_name",
        "input", "btnTrans",
        0.3671, 0.9558, 0.5258, 0.9860)
    inputName.style.fontFamily = "'Nanum Pen Script', cursive"

    let inputDate = funcInsertElement("onepage_input_date",
        "input", "btnTrans",
        0.6058, 0.9558, 0.7058, 0.9860)
    inputDate.style.fontFamily = "'Nanum Pen Script', cursive"

    let btnFinalScore = funcInsertElement("onepage_score",
        "button", "btnTrans",
        0.7187, 0.8414, 0.9614, 0.9871)


    let btnChange = funcInsertElement("onepage_change",
        "button", "btnTrans",
        0.0280, 0.8479, 0.2489, 0.9277)
    btnChange.onclick = funcChangePage

    let btnChange2 = funcInsertElement("twopage_change",
        "button", "btnTrans",
        0.6176, 0.0151, 0.8307, 0.0680)
    btnChange2.onclick = funcChangePage




    let _typeMod = 0.185
    for (let _type = 0; _type < 5; _type++) {

        if (_type == 3) {
            _typeMod = 0.19
        } else if (_type == 4) {
            _typeMod = 0.189
        }
        let btnType = funcInsertElement("onepage_Type" + _type,
            "button", "btnTrans",
            _type * _typeMod + 0.0788,
            0.020,
            _type * _typeMod + 0.1575,
            0.0685)

        btnType.onclick = function() {
            if (typeChecked[_type] == 0) {
                return
            }
            typeChecked[_type]--
                document.getElementById("onepage_" + _type + "_" + typeChecked[_type]).innerHTML = ""

        }

        if (_type == 3) {
            _typeMod = 0.187
        }
        let btnTypeInc = funcInsertElement("onepage_TypeInc" + _type,
            "button", "btnTrans",
            _type * _typeMod + 0.0513,
            0.0723,
            _type * _typeMod + 0.1882,
            0.3269)

        btnTypeInc.onclick = function() {
            if (typeChecked[_type] == 12) {
                return
            }
            document.getElementById("onepage_" + _type + "_" + typeChecked[_type]).innerHTML = "X"
            typeChecked[_type]++
        }


        if (_type == 1) {
            _typeMod = 0.185
        } else if (_type == 2) {
            _typeMod = 0.18
        } else if (_type == 3) {
            _typeMod = 0.185
        } else if (_type == 4) {
            _typeMod = 0.1880
        }

        let _yMod = 0.0195
        for (let idx = 0; idx < 12; idx++) {
            let btn = funcInsertElement("onepage_" + _type + "_" + idx,
                "button", "btnTrans",
                _type * _typeMod + 0.072,
                0.0950 + _yMod * idx,
                _type * _typeMod + 0.095,
                0.113 + _yMod * idx)
            if (idx > 7) {
                btn = funcInsertElement("onepage_" + _type + "_" + idx,
                    "button", "btnTrans",
                    _type * _typeMod + 0.072,
                    0.0950 + (_yMod - 0.00055) * idx,
                    _type * _typeMod + 0.095,
                    0.113 + (_yMod - 0.00055) * idx)
            }
            btn.onclick = function() {
                if (idx + 1 == typeChecked[_type]) {
                    event.srcElement.innerHTML = ""
                    typeChecked[_type]--
                }
            }

        }

        if (_type == 1) {
            _typeMod = 0.180
        } else if (_type == 2) {
            _typeMod = 0.189
        } else if (_type == 3) {
            _typeMod = 0.190
        } else if (_type == 4) {
            _typeMod = 0.1900
        }
        _yMod = 0.0815
        for (let idx = 0; idx < 3; idx++) {
            let btn = funcInsertElement("onepage_licence_" + _type + "_" + idx,
                "button", "btnTrans",
                _type * _typeMod + 0.030,
                0.324 + _yMod * idx,
                _type * _typeMod + 0.056,
                0.342 + _yMod * idx)

        }

        for (let idx = 0; idx < 3; idx++) {
            let btn = funcInsertElement("onepage_licence_commit_" + _type + "_" + idx,
                "button", "btnTrans",
                _type * _typeMod + 0.0404,
                0.3301 + _yMod * idx + idx * 0.008,
                _type * _typeMod + 0.1913,
                0.3905 + _yMod * idx + idx * 0.008)
            btn.onclick = function() {
                let btnTarget = document.getElementById("onepage_licence_" + _type + "_" + idx)
                if (btnTarget.innerHTML == "X") {
                    btnTarget.innerHTML = ""
                } else {
                    btnTarget.innerHTML = "X"
                }
            }

        }

        if (_type == 1) {
            _typeMod = 0.19
        } else if (_type == 2) {
            _typeMod = 0.194
        } else if (_type == 3) {
            _typeMod = 0.190
        } else if (_type == 4) {
            _typeMod = 0.1900
        }
        _yMod = 0.079
        for (let idx = 0; idx < 3; idx++) {
            if (_type == 4) {
                _typeMod = 0.1860
            }
            let btnAct = funcInsertElement("onepage_boat_act_" + _type + "_" + idx,
                "button", "btnTrans",
                _type * _typeMod + 0.0340,
                0.5930 + _yMod * idx + idx * 0.008,
                _type * _typeMod + 0.0515,
                0.612 + _yMod * idx + idx * 0.008)

            _yMod = 0.079
            let __xmod = 0.028
            for (let idx2 = 0; idx2 < 4; idx2++) {

                let btn = funcInsertElement("onepage_boat_fish_" + _type + "_" + idx + "_" + idx2,
                    "button", "btnTrans",
                    _type * _typeMod + 0.0576 + __xmod * idx2,
                    0.6214 + _yMod * idx,
                    _type * _typeMod + 0.0871 + __xmod * idx2,
                    0.6375 + _yMod * idx)

            }

            _yMod = 0.070

            let btn2 = funcInsertElement("onepage_boat_inc_" + _type + "_" + idx,
                "button", "btnTrans",
                _type * _typeMod + 0.1051,
                0.5912 + _yMod * idx + idx * 0.008,
                _type * _typeMod + 0.1851,
                0.6472 + _yMod * idx + idx * 0.008)



            let btn3 = funcInsertElement("onepage_boat_dec_" + _type + "_" + idx,
                "button", "btnTrans",
                _type * _typeMod + 0.0280,
                0.5912 + _yMod * idx + idx * 0.008,
                _type * _typeMod + 0.1051,
                0.6472 + _yMod * idx + idx * 0.008)


            _yMod = 0.078
            if (_type == 4) {
                for (let idx2 = 0; idx2 < 10; idx2++) {

                    let btn = funcInsertElement("onepage_boat_fish_" + _type + "_" + idx + "_" + idx2,
                        "button", "btnTrans",
                        _type * _typeMod + 0.0606 + __xmod * (idx2 % 5) + Math.floor(idx2 % 5 / 3) * 0.02,
                        0.606 + _yMod * idx + Math.floor(idx2 / 5) * 0.015 + Math.floor(idx2 % 5 / 3) * 0.002,
                        _type * _typeMod + 0.0901 + __xmod * (idx2 % 5) + Math.floor(idx2 % 5 / 3) * 0.02,
                        0.622 + _yMod * idx + Math.floor(idx2 / 5) * 0.015 + Math.floor(idx2 % 5 / 3) * 0.002
                    )

                }


                _yMod = 0.070

                btn2 = funcInsertElement("onepage_boat_inc_" + _type + "_" + idx,
                    "button", "btnTrans",
                    _type * _typeMod + 0.1251,
                    0.5912 + _yMod * idx + idx * 0.008,
                    _type * _typeMod + 0.2251,
                    0.6472 + _yMod * idx + idx * 0.008)

                btn3 = funcInsertElement("onepage_boat_dec_" + _type + "_" + idx,
                    "button", "btnTrans",
                    _type * _typeMod + 0.0280,
                    0.5912 + _yMod * idx + idx * 0.008,
                    _type * _typeMod + 0.1251,
                    0.6472 + _yMod * idx + idx * 0.008)
            }
            _yMod = 0.070
            btn2.onclick = function() {
                if (document.getElementById("onepage_boat_act_" + _type + "_" + idx).innerHTML == "") {
                    document.getElementById("onepage_boat_act_" + _type + "_" + idx).innerHTML = "X"
                    return
                }
                let numOfFish = 3
                if (_type == 4) {
                    numOfFish = 9
                }
                for (let idx2 = 0; idx2 <= numOfFish; idx2++) {
                    let foundBtn = document.getElementById("onepage_boat_fish_" + _type + "_" + idx + "_" + idx2)
                    if (foundBtn.innerHTML == "") {
                        foundBtn.innerHTML = "X"
                        return
                    }
                }
            }

            btn3.onclick = function() {
                let numOfFish = 3
                if (_type == 4) {
                    numOfFish = 9
                }
                for (let idx2 = numOfFish; idx2 >= 0; idx2--) {
                    let foundBtn = document.getElementById("onepage_boat_fish_" + _type + "_" + idx + "_" + idx2)
                    if (foundBtn.innerHTML == "X") {
                        foundBtn.innerHTML = ""
                        return
                    }
                }
                if (document.getElementById("onepage_boat_act_" + _type + "_" + idx).innerHTML == "X") {
                    document.getElementById("onepage_boat_act_" + _type + "_" + idx).innerHTML = ""
                    return
                }
            }



        }

    }
    funcDrawPage()
}


$(window).resize(function() {
    funcUpdatePageSize(true)
    funcDrawFleetSheet()
});

funcPrepareGetLocation()

funcDrawFleetSheet()
