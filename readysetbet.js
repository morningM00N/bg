//let userfullscreen = confirm("꽉찬 화면으로 표시하겠습니까?\n(화면이 깨질 수 있습니다.)")


var webSocket = undefined

async function funcConnect() {
    varwebSocket = new WebSocket("ws://m0rningm00n.ddns.net:9998")
    webSocket.onopen = function (message) {
        funcShowLog("Server connect...")
    };
    webSocket.onmessage = function (message) {
        funcShowLog("Recieve From Server => " + message.data)
        const event = JSON.parse(message.data);
        switch (event.type) {
            case "newgame":
                if (event.value == "false") {
                    roomNumber = prompt("이미 존재합니다. 새로운 방번호를 입력하세요.")
                    if (roomNumber != undefined) {
                        const event = {
                            type: "newgame",
                            room: roomNumber
                        }
                        webSocket.send(JSON.stringify(event))

                    }
                }
                else if (event.value == "true") {
                    alert("" + roomNumber + " 방이 생성되었습니다.")
                }
                break
            case "set":
                switch (event.target) {
                    case "exotic":
                        let exotic = document.getElementById("btnExotic_" + event.loc)
                        exotic.style.backgroundImage = "url('img/readysetbet/exotic/ex" + event.value + ".png')"
                        break
                    case "prop":
                        let prop = document.getElementById("btnProp_" + event.loc)
                        prop.style.backgroundImage = "url('img/readysetbet/propbets/pro (" + event.value + ").png')"
                        break
                }
                break
            case "round":
                if (event.value == "false"){
                    alert("순서대로 클릭해주세요.")
                }

                break
            case "bet":
                switch (event.target) {
                    case "exotic":
                        let exotic = document.getElementById("btnExoticChip_" + event.loc)
                        exotic.style.backgroundImage = "url('img/readysetbet/chips/" + event.color + " (" + event.value + ").png')"
                        exotic.style.boxShadow = shadowDepth2 + "px " + shadowDepth2 + "px gray"
                        break
                    case "prop":
                        let chip = document.getElementById("btnPropChip_" + event.loc)
                        chip.style.backgroundImage = "url('img/readysetbet/chips/" + event.color + " (" + event.value + ").png')"
                        chip.style.boxShadow = shadowDepth + "px " + shadowDepth + "px gray"
                        break
                    case "color":
                        let chip2 = document.getElementById("btnColorBetChip_" + event.loc)
                        chip2.style.backgroundImage = "url('img/readysetbet/chips/" + event.color + " (" + event.value + ").png')"
                        chip2.style.boxShadow = shadowDepth + "px " + shadowDepth + "px gray"
                        break
                    case "horse":
                        let chip3 = document.getElementById("btnBet_" + event.loc)
                        chip3.style.backgroundImage = "url('img/readysetbet/chips/" + event.color + " (" + event.value + ").png')"
                        chip3.style.boxShadow = shadowDepth + "px " + shadowDepth + "px gray"
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

let roomNumber = 1
roomNumber = prompt("방번호를 입력하세요.")

const event = {
    type: "newgame",
    room: roomNumber
}

if (roomNumber!=undefined)
{
setTimeout(() => {
    webSocket.send(JSON.stringify(event))
}, 500);
}

let userfullscreen = false


if (userfullscreen == true) {
    funcWidthPerHeight(0)
}
else {
    funcWidthPerHeight(2717 / 4075)
}

var doResize = true
$(window).resize(function () {
    funcUpdatePageSize(true)
    fucDrawReadySetBetBoard()
});


funcUpdatePageSize(true)

//funcPrepareGetLocation()

let coinSizePerWidth = 1 / 17
let coinSizeOrigin = 1 / 11.5
let shadowDepth = pageWidth / 200
let shadowDepth2 = pageWidth / 300

let occupied = {}

let colors = ["black", "blue", "brown", "dark", "green", "pink", "purple", "silver", "white", "yellow"]

let exoticOrder = [0, 1, 2, 3, 4]
let propOrder = []

async function funcProp(i, color, number) {

    console.log("funcProp", i)
    if (i >= 1 && i <= 5) {
        if (occupied["btnPropChip_" + i] != undefined) {
            return
        }

        if (color == undefined) {
            color = colors[getRandom(colors.length, 0)]

            if (color == "black" || color == "white") {
                number = getRandom(6, 0) + 1
            } else {
                number = getRandom(3, 0) + 1
            }
            console.log(color, number)
        }

        occupied["btnPropChip_" + i] = color + number
        let chip = document.getElementById("btnPropChip_" + i)
        chip.style.backgroundImage = "url('img/readysetbet/chips/" + color + " (" + number + ").png')"
        chip.style.boxShadow = shadowDepth + "px " + shadowDepth + "px gray"

    }

}

function funcColorBet(i, color, number) {
    console.log("funcColor", i)
    if (occupied["btnColorBetChip_" + i] != undefined) {
        return
    }

    if (color == undefined) {
        color = colors[getRandom(colors.length, 0)]

        if (color == "black" || color == "white") {
            number = getRandom(6, 0) + 1
        } else {
            number = getRandom(3, 0) + 1
        }
        console.log(color, number)
    }

    occupied["btnColorBetChip_" + i] = color + number
    let chip = document.getElementById("btnColorBetChip_" + i)
    chip.style.backgroundImage = "url('img/readysetbet/chips/" + color + " (" + number + ").png')"
    chip.style.boxShadow = shadowDepth + "px " + shadowDepth + "px gray"

}

function funcBet(x, y, color, number) {
    console.log("funcBet", x, y)
    if (occupied["btnBet_" + x + "_" + y] != undefined) {
        return
    }

    if (color == undefined) {
        color = colors[getRandom(colors.length, 0)]

        if (color == "black" || color == "white") {
            number = getRandom(6, 0) + 1
        } else {
            number = getRandom(3, 0) + 1
        }
        console.log(color, number)
    }

    occupied["btnBet_" + x + "_" + y] = color + number
    let chip = document.getElementById("btnBet_" + x + "_" + y)
    chip.style.backgroundImage = "url('img/readysetbet/chips/" + color + " (" + number + ").png')"
    chip.style.boxShadow = shadowDepth + "px " + shadowDepth + "px gray"
}

function funcShowLog(log) {
    console.log(log)
}

function funcClear() {
    for (let i = 1; i <= 4; i++) {
        for (let j = 0; j < 3; j++) {
            let exotic = document.getElementById("btnExoticChip_" + i + "_" + j)
            exotic.style.backgroundImage = "url('')"
            exotic.style.boxShadow = ""
        }
    }
    for (let i = 1; i <= 5; i++) {
        let chip = document.getElementById("btnPropChip_" + i)
        chip.style.backgroundImage = "url('')"
        chip.style.boxShadow = ""
    }
    for (let i = 0; i <= 3; i++) {
        let chip = document.getElementById("btnColorBetChip_" + i)
        chip.style.backgroundImage = "url('')"
        chip.style.boxShadow = ""
    }
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 9; j++) {
            let chip = document.getElementById("btnBet_" + i + "_" + j)
            chip.style.backgroundImage = "url('')"
            chip.style.boxShadow = ""
        }
    }
}
let curRace = 0
async function funcExotic(i, color, number) {

    if (i==0){
        return
    }
    const event = {
        type: "round",
        value: i
    }
    funcClear()
    await webSocket.send(JSON.stringify(event))

    return


    return
    console.log("funcExotic", i)
    if (i == 0) {
        if (curRace == 4) {
            return
        }
        for (let key in occupied) {
            console.log(key)
            let chip = document.getElementById(key)
            chip.style.backgroundImage = "url('')"
            chip.style.boxShadow = ""
        }
        occupied = {}
        ++curRace
        let exotic = document.getElementById("btnExotic_" + curRace)
        exotic.style.backgroundImage = "url('img/readysetbet/exotic/ex" + exoticOrder[curRace - 1] + ".png')"

        for (let j = 1; j <= 5; j++) {
            let prop = document.getElementById("btnProp_" + j)
            prop.style.backgroundImage = "url('img/readysetbet/propbets/pro (" + propOrder[j - 1 + 5 * (curRace - 1)] + ").png')"

        }
        return
    }
    if (i >= 1 && i <= curRace) {
        for (let t = 0; t < 3; t++) {
            if (occupied["btnExoticChip_" + i + "_" + t] == undefined) {
                if (color == undefined) {
                    color = colors[getRandom(colors.length, 0)]

                    if (color == "black" || color == "white") {
                        number = getRandom(6, 0) + 1
                    } else {
                        number = getRandom(3, 0) + 1
                    }
                    console.log(color, number)
                }
                occupied["btnExoticChip_" + i + "_" + t] = color + number
                let chip = document.getElementById("btnExoticChip_" + i + "_" + t)
                chip.style.backgroundImage = "url('img/readysetbet/chips/" + color + " (" + number + ").png')"
                chip.style.boxShadow = shadowDepth2 + "px " + shadowDepth2 + "px gray"
                return

            }

        }

    }
}

function fucDrawReadySetBetBoard() {


    let board = funcInsertElement("imgBoard", "img", "null", 0, 0, 1, 1, pageWidth / pageHeight)
    board.src = "img/readysetbet/main.jpg"

    let xGap = 0.1658
    for (let i = 0; i < 6; i++) {
        let btnExotic = funcInsertElement("btnExotic_" + i, "button", "btnTrans", 0.015 + i * xGap, 0.86, 0.155 + i * xGap, 0.99)
        btnExotic.onclick = function () { funcExotic(i) }
        if (i == 0) {
            btnExotic.style.backgroundImage = "url('img/readysetbet/exotic/bg.png')"
        } else if (i == 5) {
            btnExotic.style.backgroundImage = "url('img/readysetbet/vip/bg.png')"
            btnExotic.onclick = function () { funcFullScreen() }
        }

        if (i >= 1 && i <= 4) {
            let xLoc = (0.015 + 0.155 - coinSizePerWidth) / 2

            let btnExoticChip1 = funcInsertElement("btnExoticChip_" + i + "_0", "button", "btnCircle", xLoc + i * xGap, 0.905, xLoc + coinSizePerWidth + i * xGap, 0.99, 1)

            xLoc = xLoc - 0.195 + xGap
            let btnExoticChip2 = funcInsertElement("btnExoticChip_" + i + "_1", "button", "btnCircle", xLoc + i * xGap, 0.945, xLoc + coinSizePerWidth + i * xGap, 0.99, 1)

            xLoc = xLoc + 0.20 + coinSizePerWidth / 2 - xGap
            let btnExoticChip3 = funcInsertElement("btnExoticChip_" + i + "_2", "button", "btnCircle", xLoc + i * xGap, 0.945, xLoc + coinSizePerWidth + i * xGap, 0.99, 1)

            btnExoticChip1.onclick = function () { funcExotic(i) }
            btnExoticChip2.onclick = function () { funcExotic(i) }
            btnExoticChip3.onclick = function () { funcExotic(i) }


        }



    }

    xGap = 0.164
    for (let i = 0; i < 6; i++) {
        let btnProp = funcInsertElement("btnProp_" + i, "button", "btnTrans", 0.015 + i * xGap, 0.0084, 0.165 + i * xGap, 0.0703)
        if (i == 0) {
            btnProp.style.backgroundImage = "url('img/readysetbet/propbets/bg.png')"
        }
        btnProp.onclick = function () { funcProp(i) }
        let xLoc = (0.015 + 0.165) / 2 - coinSizeOrigin / 2
        let btnPropChip = funcInsertElement("btnPropChip_" + i, "button", "btnCircle", xLoc + i * xGap, 0.0084, xLoc + coinSizeOrigin + i * xGap, 0.0703, 1)
        btnPropChip.onclick = function () { funcProp(i) }


    }

    xGap = 0.218
    for (let i = 0; i < 4; i++) {
        if (i >= 2) {
            xGap = 0.21
        }
        let btnColorBet = funcInsertElement("btnColorBet_" + i, "button", "btnTrans", 0.1007 + i * xGap, 0.0829, 0.2707 + i * xGap, 0.1427)
        btnColorBet.onclick = function () { funcColorBet(i) }
        let xLoc = (0.1007 + 0.2707 - coinSizeOrigin) / 2
        let btnColorBetChip = funcInsertElement("btnColorBetChip_" + i, "button", "btnCircle", xLoc + i * xGap, 0.0841, xLoc + i * xGap + coinSizeOrigin, 0.1427, 1)
        btnColorBetChip.onclick = function () { funcColorBet(i) }
    }

    xGap = 0.095
    let xGap2 = 0.02
    let yGap = 0.065
    let yGap2 = 0.008
    for (let x = 0; x < 7; x++) {
        for (let y = 0; y < 9; y++) {
            let xLoc = 0.0929 + x * xGap
            let xLoc2 = 0.1826 + x * xGap
            xLoc2 = xLoc + coinSizeOrigin
            if (x >= 2) {
                xLoc += xGap2
                xLoc2 += xGap2
            }
            if (x >= 4) {
                xLoc += xGap2
                xLoc2 += xGap2
            }

            let yLoc = 0.2004 + y * yGap
            let yLoc2 = 0.2634 + y * yGap
            if (y >= 2) {
                yLoc += yGap2
                yLoc2 += yGap2
            }
            if (y >= 7) {
                yLoc += yGap2
                yLoc2 += yGap2
            }
            let btnBet = funcInsertElement("btnBet_" + x + "_" + y, "button", "btnCircle", xLoc, yLoc, xLoc2, yLoc2, 1)
            btnBet.onclick = function () { funcBet(x, y) }
        }
    }

}

fucDrawReadySetBetBoard()
