const NAME = 0
const DURATION = 1
const START_TIME = 2
const END_TIME = 3
let numOfThemas
let numOfUsers

let userSelectTimeInfor = []

let arrStartTimes = []
let arrMinutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']

let colorRefer = ['#324856', '#4a746a', '#d18237', '#6a92cc', '#706fab', '#50293c', '#859f3c', '#12406a', '#efb730', '#030305', '#b9cd74']
let selectedThemaColor = []
for (let idx = 9; idx < 23; idx++) {
    arrMinutes.forEach(element => {
        arrStartTimes.push("" + idx + ":" + element)
    });
}

let themaInfor = []


function funcDrawThemaInforTable() {
    numOfThemas = Number(document.getElementById('inputNumOfThemas').value)
    selectedThemaColor = []
    for (let idx = 0; idx < numOfThemas; idx++) {
        selectedThemaColor[idx] = idx
    }
    numOfUsers = Number(document.getElementById('inputNumOfUsers').value)
        //console.log(numOfThemas, numOfUsers)

    let tblThemaInfor = document.getElementById('tblThemaInfor')
    while (tblThemaInfor.childElementCount > 0) {
        tblThemaInfor.removeChild(tblThemaInfor.childNodes[0])
    }
    //tblThemaInfor.innerHTML = "<tr></tr>"
    let tr = document.createElement('tr')
    tr.innerHTML = "<th rowspan>테마명</th><th >길이(분)</th><th colspan='10'>테마시간</th><th rowspan='4' valign='middle'>&nbsp&nbsp&nbsp&nbsp<button onclick='funcDrawUserInputTable()'>그리기</button></th>"
    tblThemaInfor.appendChild(tr)
    for (let idx = 0; idx < numOfThemas; idx++) {
        let tr = document.createElement('tr')
        tr.id = 'tr-' + idx
        let td = document.createElement('td')
        let inputBox = document.createElement('input')
        inputBox.value = 'thema_' + idx
        inputBox.size = 5
        inputBox.id = "themaName" + idx
        inputBox.onchange = function() {
            funcDrawUserInputTable()
        }
        td.appendChild(inputBox)
        tr.appendChild(td)

        let td2 = document.createElement('td')
        let inputBox2 = document.createElement('input')
        inputBox2.value = 60
        inputBox2.size = 1
        inputBox2.id = "themaDuration" + idx
        inputBox2.onchange = function() {
            funcDrawUserInputTable()
        }

        td2.appendChild(inputBox2)
        tr.appendChild(td2)

        let td25 = document.createElement('td')
        let insertedSlt = document.createElement('select')
        insertedSlt.id = "startTime-" + idx + "-0"
        insertedSlt.onchange = function() {
            funcUpdateThemaInfor()
            funcDrawUserInputTable()
            funcDraw()
        }

        insertedSlt.size = 1
        arrStartTimes.forEach(element => {
            let insertedOpt = document.createElement('option')
            insertedOpt.innerHTML = element
            insertedSlt.appendChild(insertedOpt)
        });
        td25.appendChild(insertedSlt)
        tr.appendChild(td25)

        let td3 = document.createElement('td')
        let insertedBtn = document.createElement('button')
        insertedBtn.id = 'btn' + idx
        insertedBtn.innerHTML = '추가'
        insertedBtn.onclick = function() {
            funcAddTime()
        }
        td3.appendChild(insertedBtn)
        tr.appendChild(td3)


        tblThemaInfor.appendChild(tr)
    }
}


function jhGetTime(hour, minute) {
    return new Date(2021, 0, 1, hour, minute)
}

function jhAddMinutes(startTime, minutes) {
    let retDate = new Date()
    retDate.setTime(startTime.getTime() + minutes * 60 * 1000)
    return retDate
}

function jhOverlapTime(time1, time2) {
    if (time1[1] <= time2[0] || time2[1] <= time1[0]) {
        return false
    }
    return true
}

function funcUpdateThemaInfor() {
    themaInfor = []
    for (let idx = 0; idx < numOfThemas; idx++) {
        let thisInfor = {}
        thisInfor[NAME] = document.getElementById('themaName' + idx).value
        thisInfor[DURATION] = document.getElementById('themaDuration' + idx).value
        thisInfor[START_TIME] = []
        thisInfor[END_TIME] = []
        for (let idx3 = 0; idx3 < document.getElementById('tr-' + idx).childElementCount - 3; idx3++) {
            let timeStr = document.getElementById('tr-' + idx).children[2 + idx3].children[0].value.split(':')
            thisInfor[START_TIME].push(jhGetTime(timeStr[0], timeStr[1]))
            thisInfor[END_TIME].push(jhAddMinutes(thisInfor[START_TIME][idx3], thisInfor[DURATION]))
        }

        themaInfor.push(thisInfor)
    }
}

function funcDrawUserInputTable() {

    funcUpdateThemaInfor()


    let tempStr = 'abcdefghijklmnopqrstuvwxyz'
    let tblUserInput = document.getElementById('tblUserInput')

    while (tblUserInput.childElementCount > 0) {
        tblUserInput.removeChild(tblUserInput.childNodes[0])
    }
    let headRow = document.createElement('tr')
    headRow.appendChild(document.createElement('th'))
    for (let idx = 0; idx < numOfUsers; idx++) {
        let th = document.createElement('th')
        let userName = document.createElement('input')
        userName.id = "userName" + idx
        userName.value = 'user_' + tempStr[idx]
        userName.size = 2
        userName.style.backgroundColor = 'transparent'
        userName.style.border = "0px"
        userName.onchange = function() {
            funcDraw()
        }
        th.appendChild(userName)
        headRow.appendChild(th)
    }
    tblUserInput.appendChild(headRow)
    for (let idx = 0; idx < numOfThemas; idx++) {
        let tr = document.createElement('tr')
        let td = document.createElement('td')
        td.innerHTML = document.getElementById('themaName' + idx).value
        tr.appendChild(td)
        for (let idx2 = 0; idx2 < numOfUsers; idx2++) {
            let td = document.createElement('td')
            let slt = document.createElement('select')
            slt.id = "sltThema-" + idx + "-user-" + idx2
            slt.onchange = function() {
                funcDraw()
            }

            let opt = document.createElement('option')
            opt.innerHTML = "-"
            slt.appendChild(opt)
                //console.log(document.getElementById('tr-' + idx).childElementCount)
            for (let idx3 = 0; idx3 < document.getElementById('tr-' + idx).childElementCount - 3; idx3++) {
                let opt = document.createElement('option')
                opt.innerHTML = document.getElementById('tr-' + idx).children[2 + idx3].children[0].value
                slt.appendChild(opt)

            }
            td.appendChild(slt)
            tr.appendChild(td)
        }
        tblUserInput.appendChild(tr)
    }

    funcDraw()
}



function funcAddTime(eventTarget) {
    if (eventTarget == undefined) {
        eventTarget = event.target
    }
    let curTd = eventTarget.parentElement
    let tr = curTd.parentElement

    let insertedSlt = document.createElement('select')
        //console.log(tr.id)
        //console.log("hit")
    insertedSlt.id = "startTime-" + tr.id.split('-')[1] + "-" + (tr.childElementCount - 3)
    insertedSlt.onchange = function() {
        funcUpdateThemaInfor()
        funcDrawUserInputTable()
        funcDraw()
    }
    insertedSlt.size = 1
    arrStartTimes.forEach(element => {
        let insertedOpt = document.createElement('option')
        insertedOpt.innerHTML = element
        insertedSlt.appendChild(insertedOpt)
    });
    curTd.appendChild(insertedSlt)
    let insertedTd = document.createElement('td')
    insertedTd.appendChild(eventTarget)
    tr.appendChild(insertedTd)
        //console.log(tr.childElementCount)
}

function funcUpdateThemaName() {
    //console.log('funcUpdateThemaName called')
}

function funcUpdateThemaDuration() {
    //console.log('funcUpdateThemaDuration called')
}

function funcUpdateThemaTimes() {

}

//funcDrawThemaInforTable()

function resizeTextArea(obj) {
    obj.style.height = "1px";
    obj.style.height = (obj.scrollHeight) + "px";
}


function funcSave() {
    funcUpdateThemaInfor()
    let savedStr = ""
    savedStr += numOfUsers + " ||| " + numOfThemas + " |||\n"
    for (let idx = 0; idx < numOfThemas; idx++) {
        savedStr += themaInfor[idx][NAME] + "||| "
        savedStr += themaInfor[idx][DURATION] + " ||| "
        savedStr += themaInfor[idx][START_TIME].length + " ||| "
        themaInfor[idx][START_TIME].forEach(element => {
            savedStr += "" + element.getHours() + ":" + element.getMinutes() + " ||| "
        });
        savedStr += '\n'
    }
    for (let idx = 0; idx < numOfUsers; idx++) {
        savedStr += document.getElementById('userName' + idx).value + "|||"
    }
    savedStr += '\n'
    for (let idx = 0; idx < numOfThemas; idx++) {
        for (let idx2 = 0; idx2 < numOfUsers; idx2++) {
            savedStr += document.getElementById("sltThema-" + idx + "-user-" + idx2).selectedIndex + " ||| "
        }
        if (idx < numOfThemas - 1) {
            savedStr += "\n"
        }

    }
    document.getElementById("themeInforArea").innerHTML = savedStr
    resizeTextArea(document.getElementById("themeInforArea"))

    //saveAsFile(savedStr, "output.txt");

}


function processFile(file) {
    var reader = new FileReader();
    reader.onload = function() {
        document.getElementById("themeInforArea").value = reader.result;
    };
    reader.readAsText(file, /* optional */ "euc-kr");
}

function funcLoad() {

    // var input = document.createElement("input");
    // input.type = "file";
    // input.accept = "text/plain"; // 확장자가 xxx, yyy 일때, ".xxx, .yyy"
    // input.onchange = function(event) {
    //     processFile(event.target.files[0]);
    // };
    // input.click();


    let splitStr = document.getElementById("themeInforArea").value.split("|||")
    numOfUsers = Number(splitStr[0])
    document.getElementById('inputNumOfUsers').value = numOfUsers
    numOfThemas = Number(splitStr[1])
    document.getElementById('inputNumOfThemas').value = numOfThemas
    let strIdx = 2
    funcDrawThemaInforTable()
    for (let idx = 0; idx < numOfThemas; idx++) {
        document.getElementById('themaName' + idx).value = splitStr[strIdx++].trim()
        document.getElementById('themaDuration' + idx).value = splitStr[strIdx++].trim()
        let thisTr = document.getElementById('tr-' + idx)
        while (thisTr.childElementCount > 3) {
            thisTr.removeChild(thisTr.children[2])
        }
        let numOfTimes = Number(splitStr[strIdx++])
        for (let idx2 = 0; idx2 < numOfTimes; idx2++) {
            funcAddTime(document.getElementById('btn' + idx))
            let HM = splitStr[strIdx++].split(":")
            document.getElementById("startTime-" + idx + "-" + idx2).selectedIndex = 12 * (Number(HM[0]) - 9) + Number(HM[1]) / 5
        }
    }
    funcUpdateThemaInfor()
    funcDrawUserInputTable()

    for (let idx = 0; idx < numOfUsers; idx++) {
        document.getElementById('userName' + idx).value = splitStr[strIdx++].trim()
    }

    for (let idx = 0; idx < numOfThemas; idx++) {
        for (let idx2 = 0; idx2 < numOfUsers; idx2++) {
            let sltThis = document.getElementById('sltThema-' + idx + '-user-' + idx2)
            sltThis.selectedIndex = Number(splitStr[strIdx++])
        }
    }

    funcDraw()
}

function funcGetTimeFromDate(dateObj) {
    return (dateObj.getHours() >= 10 ? dateObj.getHours() : "0" + dateObj.getHours()) + ":" + (dateObj.getMinutes() >= 10 ? dateObj.getMinutes() : "0" + dateObj.getMinutes())
}



function funcUpdateUserSelectTimeInfor() {
    for (let idx = 0; idx < numOfThemas; idx++) {
        userSelectTimeInfor[idx] = []
        for (let idx2 = 0; idx2 < numOfUsers; idx2++) {
            userSelectTimeInfor[idx][idx2] = document.getElementById('sltThema-' + idx + '-user-' + idx2).selectedIndex
        }
    }
}

function funcChangeThemaColor(idx) {
    //console.log(idx)
    selectedThemaColor[idx]++
        if (selectedThemaColor[idx] == colorRefer.length) {
            selectedThemaColor[idx] = 0
        }
    funcDraw()
}

let tableDivStartLoc = 0

function funcDraw() {
    funcUpdateUserSelectTimeInfor()

    let tableDiv = document.getElementById('tableArea')

    let tableHeight = 800
    let smallestTime = 23;
    let largestTime = 9;

    for (let idx = 0; idx < numOfThemas; idx++) {
        for (let idx2 = 0; idx2 < themaInfor[idx][START_TIME].length; idx2++) {
            if (themaInfor[idx][START_TIME][idx2].getHours() < smallestTime) {
                smallestTime = themaInfor[idx][START_TIME][idx2].getHours()
            }
            if (themaInfor[idx][START_TIME][idx2].getHours() == smallestTime && themaInfor[idx][START_TIME][idx2].getMinutes() < 30) {
                smallestTime = themaInfor[idx][START_TIME][idx2].getHours() - 1
            }
            if (themaInfor[idx][END_TIME][idx2].getHours() + 1 > largestTime) {
                largestTime = themaInfor[idx][END_TIME][idx2].getHours() + 1
            }
        }

    }
    let maxTime = new Date(2021, 0, 1, largestTime, 0) - new Date(2021, 0, 1, smallestTime, 0)

    if (tableDivStartLoc < tableDiv.getBoundingClientRect().y + 50) {
        tableDivStartLoc = tableDiv.getBoundingClientRect().y + 50
    }






    while (tableDiv.hasChildNodes()) {
        tableDiv.removeChild(tableDiv.firstChild)
    }

    tableDiv.style.height = tableHeight + "px"
    let themaWidth = 100

    for (let idx = smallestTime; idx <= largestTime; idx++) {
        var loc = new Date(new Date(2021, 0, 1, smallestTime, 0).getTime() + (idx - smallestTime) * 60 * 60 * 1000)
        var btn = document.createElement("button")
        btn.innerHTML = idx
        btn.style.border = "1px dotted"
        btn.style.backgroundColor = "white"
        btn.style.textAlign = "left"
        btn.style.borderBottom = "0px"
        btn.style.verticalAlign = "top"
        btn.style.borderRadius = "0%"
        btn.style.flex = 1
        btn.style.flexDirection = "column"
        btn.style.position = "absolute"
        btn.style.height = (60 * 60 * 1000) / maxTime * tableHeight + "px"
        btn.style.width = (50 + (numOfThemas + numOfUsers + 0.7) * themaWidth) + "px"


        btn.style.top = tableDivStartLoc + ((loc - new Date(2021, 0, 1, smallestTime, 0)) / maxTime) * tableHeight + "px"
        tableDiv.appendChild(btn)
    }
    let themeInfor = themaInfor
    for (let idx = 0; idx < themeInfor.length; idx++) {
        var titleText = document.createElement("p")
        titleText.style.border = "1px dotted black"
        titleText.style.left = (50 + (idx) * themaWidth) + "px"
        titleText.style.width = (themaWidth) * 0.9 + "px"
        titleText.style.textAlign = "center"
        titleText.style.top = (tableDivStartLoc - 50) + "px"
        titleText.style.position = "absolute"
        titleText.style.color = 'white'
        titleText.style.backgroundColor = colorRefer[selectedThemaColor[idx]]
        titleText.style.border = '0px'
        titleText.style.borderRadius = '5%'
        titleText.onclick = function() {
            funcChangeThemaColor(idx)
        }
        titleText.innerHTML = themeInfor[idx][0]
        tableDiv.appendChild(titleText)

        var boxHeight = (themeInfor[idx][1] * 60 * 1000) / maxTime * tableHeight + "px"
        for (let idx2 = 0; idx2 < themeInfor[idx][2].length; idx2++) {
            var topLoc = themeInfor[idx][2][idx2]
            var endLoc = themeInfor[idx][3][idx2]
            var btn = document.createElement("button")
            btn.innerHTML = funcGetTimeFromDate(topLoc) + " ~ " + funcGetTimeFromDate(endLoc)
            btn.style.position = "absolute"
            btn.style.backgroundColor = colorRefer[selectedThemaColor[idx]]
            btn.style.color = 'white'
            btn.style.border = "0.5px solid"
            btn.style.borderColor = 'white'
                //console.log(boxHeight)
            btn.style.height = boxHeight
            btn.style.top = tableDivStartLoc + ((topLoc - new Date(2021, 0, 1, smallestTime, 0)) / maxTime) * tableHeight + "px"
                //btn.style.left = 150 * (idx + 1) + "px"
            btn.style.left = (50 + (idx) * themaWidth) + "px"
            btn.style.width = (themaWidth) * 0.9 + "px"
            tableDiv.appendChild(btn)

        }

    }

    let btnTemp = document.createElement('button')
    btnTemp.style.position = "absolute"

    btnTemp.style.top = (tableDivStartLoc - 50) + "px"
    btnTemp.style.left = (40 + (numOfThemas + 0 + 0.5) * themaWidth) + "px"
    btnTemp.style.width = (numOfUsers * themaWidth + 10) + "px"
    btnTemp.style.height = (10 + (60 * 60 * 1000) / maxTime * tableHeight * (largestTime - smallestTime + 1)) + "px"
    btnTemp.style.backgroundColor = 'gray'
    btnTemp.style.borderRadius = "0%"
    btnTemp.style.opacity = '0.25'
    tableDiv.appendChild(btnTemp)

    for (let idx = 0; idx < numOfUsers; idx++) {
        var titleText = document.createElement("p")
        titleText.style.border = "1px dotted black"
        titleText.style.left = (50 + (numOfThemas + idx + 0.5) * themaWidth) + "px"
        titleText.style.width = (themaWidth) * 0.9 + "px"
        titleText.style.textAlign = "center"
        titleText.style.top = (tableDivStartLoc - 50) + "px"
        titleText.style.position = "absolute"
        titleText.style.border = '0px'

        titleText.innerHTML = document.getElementById('userName' + idx).value
        let breakCondition = false;
        for (let idx2 = 0; idx2 < numOfThemas; idx2++) {
            for (let idx3 = idx2 + 1; idx3 < numOfThemas; idx3++) {
                if (userSelectTimeInfor[idx2][idx] == 0 || userSelectTimeInfor[idx3][idx] == 0) {
                    continue
                }
                if (jhOverlapTime(
                        [
                            themeInfor[idx2][START_TIME][userSelectTimeInfor[idx2][idx] - 1],
                            themeInfor[idx2][END_TIME][userSelectTimeInfor[idx2][idx] - 1]
                        ], [
                            themeInfor[idx3][START_TIME][userSelectTimeInfor[idx3][idx] - 1],
                            themeInfor[idx3][END_TIME][userSelectTimeInfor[idx3][idx] - 1]
                        ]) == true) {
                    titleText.style.backgroundColor = 'red'
                    titleText.style.borderRadius = '10%'
                    titleText.style.color = 'white'
                    breakCondition = true
                    break;

                }

            }
            if (breakCondition == true) {
                break
            }
        }
        tableDiv.appendChild(titleText)

        for (let idx2 = 0; idx2 < themeInfor.length; idx2++) {
            var boxHeight = (themeInfor[idx2][1] * 60 * 1000) / maxTime * tableHeight + "px"

            if (userSelectTimeInfor[idx2][idx] == 0) {
                continue
            }
            var topLoc = themeInfor[idx2][2][userSelectTimeInfor[idx2][idx] - 1]
            var endLoc = themeInfor[idx2][3][userSelectTimeInfor[idx2][idx] - 1]
            var btn = document.createElement("button")
            btn.innerHTML = themeInfor[idx2][NAME] + "<br>" + funcGetTimeFromDate(topLoc) + " ~ " + funcGetTimeFromDate(endLoc)
            btn.style.position = "absolute"
            btn.style.color = 'white'
            btn.style.backgroundColor = colorRefer[selectedThemaColor[idx2]]
                //console.log(boxHeight)
            btn.style.height = boxHeight
            btn.style.top = tableDivStartLoc + ((topLoc - new Date(2021, 0, 1, smallestTime, 0)) / maxTime) * tableHeight + "px"
                //btn.style.left = 150 * (idx + 1) + "px"
            btn.style.left = (50 + (numOfThemas + idx + 0.5) * themaWidth) + "px"
            btn.style.width = (themaWidth) * 0.9 + "px"
            tableDiv.appendChild(btn)

        }
    }

    let userCoCount = []

    for (let idx = 0; idx < numOfThemas; idx++) {
        for (let idx2 = 0; idx2 < numOfUsers; idx2++) {
            if (userSelectTimeInfor[idx][idx2] == 0) {
                continue;
            }
            for (let idx3 = idx2 + 1; idx3 < numOfUsers; idx3++) {
                if (userSelectTimeInfor[idx][idx2] == userSelectTimeInfor[idx][idx3]) {
                    if (userCoCount[idx2] == undefined) {
                        userCoCount[idx2] = []
                    }
                    if (userCoCount[idx2][idx3] == undefined) {
                        userCoCount[idx2][idx3] = 1
                    } else {
                        userCoCount[idx2][idx3]++
                    }
                }
            }

        }
    }

    //console.log(userCoCount)
    let coTable = document.createElement('table')
    coTable.style.border = '1px solid'

    {
        let tr = document.createElement('tr')
        tr.innerHTML = "<th colspan=100>함께 한 횟수</th>"
        coTable.appendChild(tr)
    }
    let tr = document.createElement('tr')
    let th = document.createElement('th')
    tr.appendChild(th)
    for (let idx = 0; idx < numOfUsers; idx++) {
        let tdUser = document.createElement('th')
        tdUser.style.border = '1px solid'
        tdUser.innerText = document.getElementById('userName' + idx).value
        tr.appendChild(tdUser)
    }
    coTable.appendChild(tr)
    for (let idx = 0; idx < numOfUsers - 1; idx++) {
        let tr = document.createElement('tr')
        let tdUser = document.createElement('th')
        tdUser.style.border = '1px solid'

        tdUser.innerText = document.getElementById('userName' + idx).value
        tr.appendChild(tdUser)
        for (let idx2 = 0; idx2 < numOfUsers; idx2++) {
            let tdUser = document.createElement('td')
            if (idx2 > idx) {
                tdUser.style.border = '1px solid'
            }
            if (userCoCount[idx] != undefined && userCoCount[idx][idx2] != undefined) {
                tdUser.innerText = userCoCount[idx][idx2]
            }
            tr.appendChild(tdUser)
        }
        coTable.appendChild(tr)
    }

    coTable.style.position = 'absolute'
    coTable.style.top = ((tableDivStartLoc - 50) + (10 + (60 * 60 * 1000) / maxTime * tableHeight * (largestTime - smallestTime + 2))) + "px"
    coTable.style.left = '50px'


    tableDiv.appendChild(coTable)






    //console.log("funcDraw")
}

function saveAsFile(str, filename) {
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURI(str);
    hiddenElement.target = '_blank';
    hiddenElement.download = filename;
    hiddenElement.click();
}

resizeTextArea(document.getElementById("themeInforArea"))
    //funcDraw()
    //funcLoad()
