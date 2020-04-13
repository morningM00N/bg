funcWidthPerHeight(1312 / 1892)

funcUpdatePageSize(true)

let typeChecked = new Array()
for (let idx = 0; idx < 5; idx++) {
    typeChecked[idx] = 0
}

let page=1

function funcDrawPage(){
    let strPage = "onepage_"
    if (page == 2)
    {
        strPage = "twopage_"
    }
    
    for (let idx = 0; idx < nameOfRelocatedElements.length; idx++) {
        if (nameOfRelocatedElements[idx].indexOf(strPage)>=0)
        {
            document.getElementById(nameOfRelocatedElements[idx]).style.display = "inline"
        }
        else{
            document.getElementById(nameOfRelocatedElements[idx]).style.display = "none"
        }
    }
}

function funcChangePage(){
    if (page == 1)
    {
        page=2
        document.getElementById("main").style.backgroundImage="url('img/fleet/right.png')"
        funcDrawPage()
    }
    else{
        page =1
        document.getElementById("main").style.backgroundImage="url('img/fleet/left.png')"
        funcDrawPage()
    }
}
function funcDrawFleetSheet() {

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 10; col++) {
            if (col>5)
            {
            let btnTemp =
                funcInsertElement("onepage_round_tracker_"+row+"_"+col,
                    "button", "btnTrans",
                    0.3708 + col*0.0333,
                    0.8452 + row*0.02,
                    0.3966 + col*0.0333,
                    0.8649 + row*0.02)
                btnTemp.onclick = function(){
                    if (event.srcElement.innerHTML=="X")
                    {
                        event.srcElement.innerHTML=""
                    }
                    else{
                        event.srcElement.innerHTML="X"
                    }
                }
            
            }
            else{
                let btnTemp =
                funcInsertElement("onepage_round_tracker_"+row+"_"+col,
                    "button", "btnTrans",
                    0.3668 + col*0.035,
                    0.8452 + row*0.02,
                    0.3926 + col*0.035,
                    0.8649 + row*0.02)
                    btnTemp.onclick = function(){
                        if (event.srcElement.innerHTML=="X")
                        {
                            event.srcElement.innerHTML=""
                        }
                        else{
                            event.srcElement.innerHTML="X"
                        }
                    }
                
            }


        }

    }

    let inputName = funcInsertElement("onepage_input_name",
    "input", "btnTrans",
    0.3671, 0.9558, 0.5258, 0.9860)
    inputName.style.fontFamily="'Nanum Pen Script', cursive"

    let inputDate = funcInsertElement("onepage_input_date",
    "input", "btnTrans",
    0.6058, 0.9558, 0.7058, 0.9860)
    inputDate.style.fontFamily="'Nanum Pen Script', cursive"

    let btnFinalScore = funcInsertElement("onepage_score",
    "button", "btnTrans",
    0.7187, 0.8414, 0.9614, 0.9871)

   
    let  btnChange = funcInsertElement("onepage_change",
    "button", "btnTrans",
    0.0280, 0.8479, 0.2489, 0.9277)
    btnChange.onclick=funcChangePage

    let  btnChange2 = funcInsertElement("twopage_change",
    "button", "btnTrans",
    0.6176, 0.0151, 0.8307, 0.0680)
    btnChange2.onclick=funcChangePage

    
    

    let _typeMod = 0.185
    for (let _type = 0; _type < 5; _type++) {

        if (_type == 3) {
            _typeMod = 0.19
        }
        else if (_type == 4) {
            _typeMod = 0.189
        }
        let btnType = funcInsertElement("onepage_Type" + _type,
            "button", "btnTrans",
            _type * _typeMod + 0.0788,
            0.020,
            _type * _typeMod + 0.1575,
            0.0685)

        btnType.onclick = function () {
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

        btnTypeInc.onclick = function () {
            if (typeChecked[_type] == 12) {
                return
            }
            document.getElementById("onepage_" + _type + "_" + typeChecked[_type]).innerHTML = "X"
            typeChecked[_type]++
        }


        if (_type == 1) {
            _typeMod = 0.185
        }
        else if (_type == 2) {
            _typeMod = 0.18
        }
        else if (_type == 3) {
            _typeMod = 0.185
        }
        else if (_type == 4) {
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
            btn.onclick = function () {
                if (idx + 1 == typeChecked[_type]) {
                    event.srcElement.innerHTML = ""
                    typeChecked[_type]--
                }
            }

        }

        if (_type == 1) {
            _typeMod = 0.180
        }
        else if (_type == 2) {
            _typeMod = 0.189
        }
        else if (_type == 3) {
            _typeMod = 0.190
        }
        else if (_type == 4) {
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
            btn.onclick = function () {
                let btnTarget = document.getElementById("onepage_licence_" + _type + "_" + idx)
                if (btnTarget.innerHTML == "X") {
                    btnTarget.innerHTML = ""
                }
                else {
                    btnTarget.innerHTML = "X"
                }
            }

        }

        if (_type == 1) {
            _typeMod = 0.19
        }
        else if (_type == 2) {
            _typeMod = 0.194
        }
        else if (_type == 3) {
            _typeMod = 0.190
        }
        else if (_type == 4) {
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
                        _type * _typeMod + 0.0606 + __xmod * (idx2 % 5) +Math.floor(idx2%5/3)*0.02,
                        0.606 + _yMod * idx + Math.floor(idx2 / 5) * 0.015+Math.floor(idx2%5/3)*0.002,
                        _type * _typeMod + 0.0901 + __xmod * (idx2 % 5) +Math.floor(idx2%5/3)*0.02,
                        0.622 + _yMod * idx + Math.floor(idx2 / 5) * 0.015+Math.floor(idx2%5/3)*0.002
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
            btn2.onclick = function () {
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

            btn3.onclick = function () {
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


$(window).resize(function () {
    funcUpdatePageSize(true)
    funcDrawFleetSheet()
});

funcPrepareGetLocation()

funcDrawFleetSheet()