let schedules = '\
9/6	Y	니쿠	디핑						|\
9/6	N	영혼을담은트롤링	Jul						|\
9/6	N	햄	BeSunny						|\
9/6	N	구름위로	빵꾸똥꾸						|\
9/6	N	파인	호카						|\
9/6	N	뮤지컬	마카롱						|\
9/6	N	양양C	신나고					|\
9/7	N	금속세포	현재						|\
9/7	Y	니쿠	나용	재흥					|\
9/7	N	레몽지	지니	현재					|\
9/7	N	니쿠	나용						|\
9/7	N	양이야	니쿠						|\
9/7	N	쩔미	10vely						|\
9/7	N	호카	신나고						|\
'

let firstContact = '\
구름위로	빵꾸똥꾸	|\
영혼을담은트롤링	Jul	|\
재흥	니쿠	|\
'
let DATE = 0
let PUBLIC = 1
let PARTICIPANTS = 2

let dataSchedules = []
let dataCoOccuranceList = {}
let dataFirstContact = {}
let dataBonus = {}
let dataScores = []

schedules.split('|').forEach(elem => {
    if (elem.length == 0) {
        return
    }
    let tmpToken = elem.split('\t')
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
    dataSchedules.push(tmpArr)
})

dataSchedules.forEach(elem => {
    for (let idx = 0; idx < elem[PARTICIPANTS].length - 1; idx++) {
        let user1 = elem[PARTICIPANTS][idx]
        if (dataCoOccuranceList[user1] == undefined) {
            dataCoOccuranceList[user1] = new Set()
            dataFirstContact[user1] = new Set()
            dataBonus[user1] = 0
        }

        for (let idx2 = idx + 1; idx2 < elem[PARTICIPANTS].length; idx2++) {
            let user2 = elem[PARTICIPANTS][idx2]
            if (dataCoOccuranceList[user2] == undefined) {
                dataCoOccuranceList[user2] = new Set()
                dataFirstContact[user2] = new Set()
                dataBonus[user2] = 0
            }
            dataCoOccuranceList[user1].add(user2)
            dataCoOccuranceList[user2].add(user1)
        }

    }

    if (elem[PUBLIC] == true) {
        dataBonus[elem[PARTICIPANTS][0]] += 2
        for (let idx = 1; idx < elem[PARTICIPANTS].length; idx++) {
            dataBonus[elem[PARTICIPANTS][idx]] += 1
        }
    }

});

firstContact.split('|').forEach(elem => {
    if (elem.length == 0) {
        return
    }
    let tmpToken = elem.split('\t')
    dataFirstContact[tmpToken[0]].add(tmpToken[1])
    dataFirstContact[tmpToken[1]].add(tmpToken[0])
})

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
})
