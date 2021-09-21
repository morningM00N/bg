let schedules
let firstContact

let rawFile = new XMLHttpRequest();
rawFile.open("GET", 'duruduru.txt', false);
rawFile.setRequestHeader('Content-Type', 'text/html;charset=utf-8')
rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
            let allText = rawFile.responseText;
            schedules = allText.split("|||")[0]
            firstContact = allText.split("|||")[1]
        }
    }
}

rawFile.send(null);

let DATE = 0
let PUBLIC = 1
let PARTICIPANTS = 2
let FIRSTCONTACT = 3

let dataSchedules = []
let dataCoOccuranceList = {}
let dataFirstContact = {}
let dataBonus = {}
let dataScores = []

schedules.split('|').forEach(elemOri => {
    let splitElemOri = elemOri.split(',')
    let elem = splitElemOri[0]
    let tmpToken = elem.split('\t')
    if (tmpToken.length < 4) {
        return
    }
    let tmpArr = []
    tmpArr[DATE] = tmpToken[0]
    if (tmpToken[1] == 'Y') {
        tmpArr[PUBLIC] = true
    } else {
        tmpArr[PUBLIC] = false
    }
    tmpArr[PARTICIPANTS] = []
    for (let idx = 2; idx < tmpToken.length; idx++) {
        if (tmpToken[idx].length > 0) {
            tmpArr[PARTICIPANTS].push(tmpToken[idx])
        }

    }
    if (splitElemOri.length>1){
        tmpArr[FIRSTCONTACT] = []
        splitElemOri[1].split(/ |\t/).forEach(elem2 =>{
            tmpArr[FIRSTCONTACT].push(elem2)
        })
    }
    dataSchedules.push(tmpArr)
})

console.log("dataSchedules",dataSchedules)

dataSchedules.forEach(elem => {
    for (let idx = 0; idx < elem[PARTICIPANTS].length - 1; idx++) {
        let user1 = elem[PARTICIPANTS][idx].trim()
        if (dataCoOccuranceList[user1] == undefined) {
            dataCoOccuranceList[user1] = new Set()
            dataFirstContact[user1] = new Set()
            dataBonus[user1] = 0
        }

        for (let idx2 = idx + 1; idx2 < elem[PARTICIPANTS].length; idx2++) {
            let user2 = elem[PARTICIPANTS][idx2].trim()
            if (dataCoOccuranceList[user2] == undefined) {
                dataCoOccuranceList[user2] = new Set()
                dataFirstContact[user2] = new Set()
                dataBonus[user2] = 0
            }
            dataCoOccuranceList[user1].add(user2)
            dataCoOccuranceList[user2].add(user1)
        }

    }

    if (elem[FIRSTCONTACT]!=undefined){
        elem[FIRSTCONTACT].forEach(elem2 =>{
            let firstUserIdx = Math.floor(elem2/10)
            let secondUserIdx = elem2%10
            let user1 = elem[PARTICIPANTS][firstUserIdx-1].trim()
            let user2 = elem[PARTICIPANTS][secondUserIdx-1].trim()
            dataFirstContact[user1].add(user2)
            dataFirstContact[user2].add(user1)        
        })
    }
    if (elem[PUBLIC] == true) {
        dataBonus[elem[PARTICIPANTS][0].trim()] += 2
        for (let idx = 1; idx < elem[PARTICIPANTS].length; idx++) {
            dataBonus[elem[PARTICIPANTS][idx].trim()] += 1
        }
    }

});

/*
firstContact.split('|').forEach(elem => {
    if (elem.length == 0) {
        return
    }
    let tmpToken = elem.split('\t')
    if (tmpToken.length < 2) {
        return
    }
    let user1 = tmpToken[0].trim()
    let user2 = tmpToken[1].trim()
    if (dataFirstContact[user1] == undefined || dataFirstContact[user2] == undefined) {
        return
    }
    dataFirstContact[user1].add(user2)
    dataFirstContact[user2].add(user1)
})
*/

for (const key in dataBonus) {
    dataScores.push({ score: dataBonus[key] + dataCoOccuranceList[key].size + dataFirstContact[key].size, name: key })
}

dataScores.sort(function(a, b) {
    return a.score > b.score ? -1 : a.score < b.score ? 1 : a.name > b.name ? 1 : a.name < b.name ? -1 : 0
})

console.log("dataSchedules", dataSchedules)
console.log("dataCoOccuranceList", dataCoOccuranceList)
console.log("dataBonus", dataBonus)
console.log("dataScores", dataScores)

let tlbTopBoard = document.getElementById("tlbTopBoard")
let rankingIdx = 1
let prevRankingIdx = 0
let prevScore = 0
dataScores.forEach(elem => {
    let tr = document.createElement('tr')
    tlbTopBoard.appendChild(tr)

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        if (prevScore != elem.score) {
            td.innerHTML = rankingIdx

        } else {
            td.innerHTML = prevRankingIdx
        }
        prevRankingIdx = td.innerHTML
        rankingIdx += 1
        prevScore = elem.score

    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = elem.name
    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        let tmpVal = elem.score + " = " + (dataCoOccuranceList[elem.name].size) + " (함께한 사람수)"
        if (elem.score - dataCoOccuranceList[elem.name].size > 0) {
            tmpVal = tmpVal + " + " + (elem.score - dataCoOccuranceList[elem.name].size) + " (가산점)"
        }
        td.innerHTML = tmpVal
    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        let tmpVal = ""
        dataCoOccuranceList[elem.name].forEach(elem2 => {
            tmpVal += "<span"
            if (dataFirstContact[elem.name].has(elem2) == true) {
                tmpVal += " class='colorRed'"
            }
            tmpVal += ">"
            tmpVal += elem2
            tmpVal += "</span> "

        })
        td.innerHTML = tmpVal
    }
})

let tblSchdules = document.getElementById("tblSchdules")
dataSchedules.forEach(elem => {
    let tr = document.createElement('tr')
    tblSchdules.appendChild(tr)

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = elem[DATE]
    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        if (elem[PUBLIC] == true) {
            td.innerHTML = "Y"
        } else {
            td.innerHTML = "N"
        }
    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = elem[PARTICIPANTS][0]
    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        let tmpVal = ""
        for (let idx = 1; idx < elem[PARTICIPANTS].length; idx++) {
            tmpVal += (elem[PARTICIPANTS][idx] + " ")
        }
        td.innerHTML = tmpVal
    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.setAttribute("class","colorRed")
        let tmpVal = ""
        if (elem[FIRSTCONTACT]!=undefined){
            console.log(elem[FIRSTCONTACT])
            elem[FIRSTCONTACT].forEach(elem2 =>{
                
                let firstUserIdx = Math.floor(elem2/10)
                let secondUserIdx = elem2%10
                let user1 = elem[PARTICIPANTS][firstUserIdx-1].trim()
                let user2 = elem[PARTICIPANTS][secondUserIdx-1].trim()
                tmpVal += " (" + user1 +", "+user2+") "
            })
        }
            td.innerHTML = tmpVal
    }


})
