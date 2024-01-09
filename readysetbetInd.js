
function funcShowLog(log) {
    console.log(log)
}


function funcSetChip(i) {
    for (let j = 0; j < 5; j++) {
        let img = document.getElementById("idChips_" + j)
        img.style.opacity = "50%"
    }
    let img = document.getElementById("idChips_" + i)
    coinValue = i + 1
    img.style.opacity = ""
}


var webSocket = undefined

async function funcConnect() {
    webSocket = new WebSocket("ws://m0rningm00n.ddns.net:9998")
    webSocket.onopen = function (message) {
        funcShowLog("Server connect...")
    };
    webSocket.onmessage = function (message) {
        funcShowLog("Recieve From Server => " + message.data)
        let event = JSON.parse(message.data);
        switch (event.type) {
            case "join":
                if (event.value == "false") {
                    if (event.error == "NOROOM") {
                        roomNumber = prompt("방이 존재하지 않습니다. 방번호를 입력하세요.")
                    } else if (event.error == "EXISTNAME") {
                        nameID = prompt("이름이 존재합니다. 다른 이름을 입력하세요.")
                    } else if (event.error == "FULL") {
                        alert("인원이 다 찾습니다.")
                        return
                    }
                    if (roomNumber==undefined || nameID == undefined){
                        return
                    }
                    let event2 = {
                        type: "join",
                        room: roomNumber,
                        name: nameID
                    }
                    webSocket.send(JSON.stringify(event2))

                }
                else if (event.value == "true") {
                    alert("" + roomNumber + " 방에 들어갔습니다.")

                    for (let i = 0; i < 5; i++) {
                        let img = document.getElementById("idChips_" + i)
                        img.onclick = function () { funcSetChip(i) }
                        if (i<4){
                            img.src = "http://morningm00n.github.io/bg/img/readysetbet/chips/" + event.color + " (" + (i + 1) + ").png"
                        }
                    }

                }
                break
            case "set":
                switch (event.target) {
                    case "exotic":
                        let exotic = document.getElementById("btnExotic_" + event.loc)
                        exotic.src = "img/readysetbet/exotic/exs" + event.value + ".png"
                        exotic.style.visibility = ""
                        break
                    case "prop":
                        let prop = document.getElementById("btnProp_" + event.loc)
                        prop.src = "img/readysetbet/propbets/pro (" + event.value + ").png"
                        prop.style.visibility = ""
                        break
                    case "color":
                        let color = document.getElementById("btnColorBet_" + event.loc)
                        color.style.visibility = ""
                        break
                    case "horse":
                        funcSetSlot(event.horse, event.order, event.product, event.minus)
                        break
                    case "vip":
                        let vip1 = document.getElementById("vip_0")
                        vip1.src = "img/readysetbet/vip/vip ("+event.value1+").png"
                        vip1.style.visibility=""
                        let vip2 = document.getElementById("vip_1")
                        vip2.src = "img/readysetbet/vip/vip ("+event.value2+").png"
                        vip2.style.visibility=""
                        break
                    case "chip":
                        let img = document.getElementById("idChips_4")
                        if (event.color=="none"){
                            img.src =""    
                        }else{
                        img.src = "http://morningm00n.github.io/bg/img/readysetbet/chips/" + event.color + " (" + event.value + ").png"
                        }
                        break
                }
                break

            case "bet":
                switch (event.target) {
                    case "exotic":
                        if (event.value == "False") {
                            alert("다른 사람이 배팅하였습니다.")
                        } else if (event.value == "done") {
                            let img = document.getElementById("btnExotic_" + event.loc)
                            img.style.visibility = "hidden"
                        }
                        break
                    case "prop":
                        if (event.value == "False") {
                            alert("다른 사람이 배팅하였습니다.")
                        } else if (event.value == "done") {
                            let img = document.getElementById("btnProp_" + event.loc)
                            img.style.visibility = "hidden"
                        }
                        break
                    case "color":
                        if (event.value == "False") {
                            alert("다른 사람이 배팅하였습니다.")
                        } else if (event.value == "done") {
                            let img = document.getElementById("btnColorBet_" + event.loc)
                            img.style.visibility = "hidden"
                        }
                        break
                    case "error":
                        alert("다른 칩을 선택해 주세요.")
                        if (coinValue <= 3) {
                            funcSetChip(coinValue)
                        }
                        else {
                            funcSetChip(0)
                        }

                        break
                }
                break
        }

    };
    webSocket.onclose = function (message) {
        funcShowLog("Server Disconnect...")
    };    // 소켓 통신 중에 에러가 발생되면 호출되는 함수    
    webSocket.onerror = function (message) {
        funcShowLog("error...")
    };
}


funcConnect()
let roomNumber = undefined
let nameID = undefined
//function funcDebug(namein)
{
    roomNumber = 1 
    roomNumber = prompt("방번호를 입력하세요.")
    //nameID = namein
    nameID = prompt("이름을 입력하세요.")
    const event = {
        type: "join",
        room: roomNumber,
        name: nameID
    }
    if (roomNumber != undefined && nameID != undefined) {
        setTimeout(() => {
            webSocket.send(JSON.stringify(event))
        }, 500);
    }
}


pageHeight = document.documentElement.clientHeight
pageWidth = document.documentElement.clientWidth

mainBody.style.border = "0px"
mainBody.style.margin = "0px"
mainBody.style.paddingTop = "0px"

mainDiv.style.border = "0px"
mainDiv.style.margin = "0px"
mainDiv.style.paddingTop = pageWidth / 5 + "px"



function funcSetSlot(horseNumber, order, product, minus) {
    let td = document.getElementById("betslot_" + horseNumber + "_" + order)
    td.innerHTML = product + "x"
    if (product == 0) {
        td.innerHTML = "-"
    }
    if (minus > 0) {
        let btn = funcAddChild("button", td)
        btn.className = "btnCircle"
        btn.innerHTML = "-" + minus
        btn.style.backgroundColor = "red"
        btn.style.width = btn.style.height = pageWidth / 20 + "px"
        btn.style.color = "white"
    }
}



function funcAddChild(type, parent) {
    let child = document.createElement(type)
    parent.appendChild(child)
    return child
}

let coinValue = 1
async function funcColorBet(loc) {
    console.log("funcColorBet_" + loc)
    event = {
        "type": "bet",
        "target": "color",
        "loc": loc,
        "value": coinValue
    }
    await webSocket.send(JSON.stringify(event))
}

async function funcPropBet(loc) {
    console.log("funcColorBet_" + loc)
    event = {
        "type": "bet",
        "target": "prop",
        "loc": loc,
        "value": coinValue
    }
    await webSocket.send(JSON.stringify(event))
}

async function funcExoticBet(loc) {
    console.log("funcExoticBet_" + loc)
    event = {
        "type": "bet",
        "target": "exotic",
        "loc": loc,
        "value": coinValue
    }
    await webSocket.send(JSON.stringify(event))
}

async function funcVIP(i){
    console.log("funcVIP_"+i)
    if (i==0){
        document.getElementById("vip_1").style.visibility="hidden"
    }
    else{
        document.getElementById("vip_0").style.visibility="hidden"
    }
    event = {
        "type": "vip",
        "value": i
    }
    await webSocket.send(JSON.stringify(event))
    
}

async function funcHorseBet(horse, order) {
    console.log("funcHorseBet" + horse + "_" + order)
    event = {
        "type": "bet",
        "target": "horse",
        "horse": horse,
        "order": order,
        "value": coinValue
    }
    await webSocket.send(JSON.stringify(event))
}





function funcDraw() {
    let headerChip = document.getElementById("headChips")

    headerChip.style.margin = "0px"
    headerChip.style.padding = "0px"
    headerChip.style.border = "0px"
    headerChip.style.height = pageWidth / 5 + "px"



    let tblChip = funcAddChild("table", headerChip)
    tblChip.style.width = "100%"
    let trChip = funcAddChild("tr", tblChip)
    for (let i = 0; i < 5; i++) {
        let tdChip = funcAddChild("td", trChip)
        tdChip.style.width = "10%"

        let img = funcAddChild("img", tdChip)
        img.id = "idChips_" + i
        img.style.width = pageWidth / 6 + "px"
        img.style.borderRadius = "100%"
        img.style.boxShadow = "10px 10px gray"
    }

    let tblMain = document.getElementById('tblInd')


    tblMain.style.width = "100%"
    let tr = funcAddChild("tr", tblMain)
    let td = funcAddChild("td", tr)
    let tblProp = funcAddChild("table", td)
    tr = funcAddChild("tr", tblProp)
    let idxProp = 1
    for (let i = 0; i < 3; i++) {
        td = funcAddChild("td", tr)
        td.style.width = "10%"
        let img = funcAddChild("img", td)
        img.onclick = function () { funcPropBet(i + 1) }
        img.id = "btnProp_" + idxProp++
        //img.src = "http://morningm00n.github.io/bg/img/readysetbet/propbets/pro ("+i+").png"
        img.style.width = pageWidth / 3.2 + "px"
    }
    tr = funcAddChild("tr", tblMain)
    td = funcAddChild("td", tr)

    let tblProp2 = funcAddChild("table", td)
    tr = funcAddChild("tr", tblProp2)
    for (let i = 0; i < 2; i++) {
        td = funcAddChild("td", tr)
        td.style.width = "10%"
        td.style.textAlign = "right"
        if (i == 1) {
            td.style.textAlign = "left"
        }
        let img = funcAddChild("img", td)
        img.onclick = function () { funcPropBet(i + 4) }
        img.id = "btnProp_" + idxProp++
        //img.src = "http://morningm00n.github.io/bg/img/readysetbet/propbets/pro ("+(i+5)+").png"
        img.style.width = pageWidth / 3.2 + "px"
    }

    tr = funcAddChild("tr", tblMain)
    td = funcAddChild("td", tr)
    let tblInd = funcAddChild("table", td)
    tr = funcAddChild("tr", tblInd)
    td = funcAddChild("td", tr)
    td.style.width = "10%"
    let img = funcAddChild("img", td)
    img.id = "btnColorBet_" + 0
    img.onclick = function () { funcColorBet(0) }
    img.src = "http://morningm00n.github.io/bg/img/readysetbet/horse/blue.png"
    img.style.width = pageWidth / 4.4 + "px"
    td = funcAddChild("td", tr)
    td.style.width = "10%"
    img = funcAddChild("img", td)
    img.id = "btnColorBet_" + 1
    img.onclick = function () { funcColorBet(1) }
    img.src = "http://morningm00n.github.io/bg/img/readysetbet/horse/orange.png"
    img.style.width = pageWidth / 4.4 + "px"
    td = funcAddChild("td", tr)
    td.style.width = "10%"
    img = funcAddChild("img", td)
    img.id = "btnColorBet_" + 2
    img.onclick = function () { funcColorBet(2) }
    img.src = "http://morningm00n.github.io/bg/img/readysetbet/horse/red.png"
    img.style.width = pageWidth / 4.4 + "px"
    td = funcAddChild("td", tr)
    td.style.width = "10%"
    img = funcAddChild("img", td)
    img.id = "btnColorBet_" + 3
    img.onclick = function () { funcColorBet(3) }
    img.src = "http://morningm00n.github.io/bg/img/readysetbet/horse/black.png"
    img.style.width = pageWidth / 4.4 + "px"

    tr = funcAddChild("tr", tblInd)

    td = funcAddChild("td", tr)
    td.innerHTML = "SHOW"
    td.style.fontSize = pageWidth / 15 + "px"
    td.className = "fontSHOW"

    td = funcAddChild("td", tr)
    td.innerHTML = "PLACE"
    td.style.fontSize = pageWidth / 15 + "px"
    td.className = "fontPLACE"
    td = funcAddChild("td", tr)
    td.innerHTML = "WIN"
    td.style.fontSize = pageWidth / 15 + "px"
    td.className = "fontWIN"


    for (let i = 0; i < 9; i++) {

        tr = funcAddChild("tr", tblInd)

        td = funcAddChild("td", tr)
        td.id = "betslot_" + i + "_2"
        td.onclick = function () { funcHorseBet(i, 2) }
        td.style.fontSize = pageWidth / 8 + "px"
        td.className = "fontSHOW"

        td = funcAddChild("td", tr)
        td.id = "betslot_" + i + "_1"
        td.onclick = function () { funcHorseBet(i, 1) }
        td.style.fontSize = pageWidth / 8 + "px"
        td.className = "fontPLACE"

        td = funcAddChild("td", tr)
        td.id = "betslot_" + i + "_0"
        td.onclick = function () { funcHorseBet(i, 0) }
        td.style.fontSize = pageWidth / 8 + "px"
        td.className = "fontWIN"

        td = funcAddChild("td", tr)
        td.style.width = "10%"
        let img = funcAddChild("img", td)
        img.src = "http://morningm00n.github.io/bg/img/readysetbet/horse/horse" + i + ".png"
        img.style.width = pageWidth / 4.2 + "px"

    }
    for (let j = 0; j < 2; j++) {
        tr = funcAddChild("tr", tblInd)
        for (let i = 0; i < 2; i++) {
            td = funcAddChild("td", tr)
            td.colSpan = 2
            let img = funcAddChild("img", td)
            img.id = "btnExotic_" + (j * 2 + i + 1)
            img.onclick = function () {
                funcExoticBet(j * 2 + i + 1)
            }
            img.style.width = pageWidth / 2.1 + "px"
            img.style.borderRadius="5%"
        }
    }

    tr = funcAddChild("tr", tblInd)
    for (let i = 0; i < 2; i++) {
        td = funcAddChild("td", tr)
        td.colSpan = 2
        let img = funcAddChild("img", td)
        img.id = "vip_" + i
        img.onclick = function(){
            funcVIP(i)
        }
        img.style.borderRadius="5%"
        img.style.width = pageWidth / 2.1 + "px"
    
    }






}

funcDraw()

funcSetChip(0)
