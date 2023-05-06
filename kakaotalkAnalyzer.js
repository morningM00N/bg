class User {

}

function openTextFile() {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = "text/plain"; // 확장자가 xxx, yyy 일때, ".xxx, .yyy"
    input.onchange = function(event) {
        processFile(event.target.files[0]);
    };
    input.click();
}


var rawText

// ---- for debug ----- //
let rawFile = new XMLHttpRequest();

rawFile.open("GET", "conversation.txt", false);
rawFile.setRequestHeader('Content-Type', 'text/html;charset=utf-8')
rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
            rawText = rawFile.responseText;
        }
    }
}

rawFile.send(null);
// --- for debug --- //


let refinedText = []

let mapUserToContents = {}
let mapUserToSeqContents = {}

function separateText(line) {
    let strPart1 = line.split(",")
    let date = null
    let userName = null
    let contents = null

    let strDates = strPart1[0].split(/년|월|일|:/)

    if (strDates.length != 5) {
        contents = line
    } else {
        if (strPart1.length == 1) {
            return null
        }
        let afternoon = false
        if (strDates[3].indexOf('오후') >= 0) {
            afternoon = true
        }
        strDates[3] = strDates[3].split(' ')[2]
        if (afternoon == true) {
            strDates[3] = Number(strDates[3]) + 12
            if (strDates[3] == 24) {
                strDates[3] = "12"
            }
        }
        date = new Date(strDates[0], strDates[1] - 1, strDates[2], strDates[3], strDates[4])
        let colonLoc = strPart1[1].indexOf(":")
        userName = strPart1[1].substr(1, colonLoc - 2)
        contents = strPart1[1].substr(colonLoc + 2).replace(/ㅋㅋ+/, 'ㅋㅋ').replace(/ㅎㅎ+/, 'ㅎㅎ').replace(/\.+/, ' ').replace(/  +/, ' ')
    }

    return { date: date, name: userName, contents: contents }

}

let sequenceText = []
let startDate
let endDate

let callingName = {}
let idf = {}

function parseText() {
    console.log("parseText start")
    let writeStart = false
    let lines = rawText.split(/\r\n/)
    for (let idx = 4; idx < lines.length; idx++) {
        parsedStr = (separateText(lines[idx]))
        if (parsedStr == null) continue;
        if (parsedStr.name != null) {
            if (parsedStr.date >= startDate) {
                writeStart = true
            }
            if (parsedStr.date > endDate) {
                break
            }
            if (writeStart == false) {
                continue
            }
            refinedText.push(parsedStr)
        } else if (writeStart == true) {
            refinedText[refinedText.length - 1].contents += "\n" + parsedStr.contents

        }
    }
    rawText = ""
    sequenceText.push({ name: refinedText[0].name, date: refinedText[0].date, contents: refinedText[0].contents })
    for (let idx = 1; idx < refinedText.length; idx++) {
        if (refinedText[idx].name == refinedText[idx - 1].name) {
            sequenceText[sequenceText.length - 1].contents += "\n" + refinedText[idx].contents
        } else {
            sequenceText.push({ name: refinedText[idx].name, date: refinedText[idx].date, contents: refinedText[idx].contents })
        }

    }

    refinedText.forEach(element => {
        if (mapUserToContents[element.name] == undefined) {
            mapUserToContents[element.name] = []
        }
        mapUserToContents[element.name].push({ date: element.date, contents: element.contents })
    });

    sequenceText.forEach(element => {
        if (mapUserToSeqContents[element.name] == undefined) {
            mapUserToSeqContents[element.name] = []
        }
        mapUserToSeqContents[element.name].push({ date: element.date, contents: element.contents })
    });

    for (let name in mapUserToSeqContents) {

        let sname = name.split('/')[0]

        if (sname.length != 0) {
            if (callingName[sname] == undefined) {
                callingName[sname] = 1
            } else {
                callingName[sname] += 1
            }
        }

        let infor = mapUserToSeqContents[name]
        let userIdf = {}
        infor.forEach(el => {
            let words = el.contents.split(/ |\n|\r|\~|\!|\?|\.|:|;|\/|\(|\)/)
            if (words != undefined) {
                words.forEach(e2 => {
                    if (e2.length == 0) {
                        return
                    }
                    if (userIdf[e2] == undefined) {
                        userIdf[e2] = 0
                        if (idf[e2] == undefined) {
                            idf[e2] = 1
                        } else {
                            idf[e2] += 1
                        }
                    }
                    if (e2.length >= 3 && e2.indexOf('형') >= 0) {
                        let tempName = e2.substr(0, e2.indexOf('형'))
                        if (tempName.length == 0 || tempName == "언니" || tempName == "아") {
                            tempName = ""
                        }
                        if (tempName.length != 0) {
                            if (callingName[tempName] == undefined) {
                                callingName[tempName] = 1
                            } else {
                                callingName[tempName] += 1
                            }
                        }
                    } else if (e2.length >= 2 && e2.indexOf('님') >= 0) {
                        let tempName = e2.substr(0, e2.indexOf('님'))
                        if (tempName.length == 0 || tempName == "언니" || tempName == "아") {
                            tempName = ""
                        }
                        if (tempName.length != 0)
                            if (callingName[tempName] == undefined) {
                                callingName[tempName] = 1
                            } else {
                                callingName[tempName] += 1
                            }
                    } else if (e2.length >= 3 && e2.indexOf('오빠') >= 0) {
                        let tempName = e2.substr(0, e2.indexOf('오빠'))
                        if (tempName.length == 0 || tempName == "언니" || tempName == "아") {
                            tempName = ""
                        }
                        if (tempName.length != 0) {
                            if (callingName[tempName] == undefined) {
                                callingName[tempName] = 1
                            } else {
                                callingName[tempName] += 1
                            }
                        }
                    } else if (e2.length >= 3 && e2.indexOf('언니') >= 0) {
                        let tempName = e2.substr(0, e2.indexOf('언니'))
                        if (tempName.length == 0 || tempName == "언니" || tempName == "아") {
                            tempName = ""
                        }
                        if (tempName.length != 0) {
                            if (callingName[tempName] == undefined) {
                                callingName[tempName] = 1
                            } else {
                                callingName[tempName] += 1
                            }
                        }
                    } else if (e2.length >= 3 && e2.indexOf('누나') >= 0) {
                        let tempName = e2.substr(0, e2.indexOf('누나'))
                        if (tempName.length == 0 || tempName == "언니" || tempName == "아") {
                            tempName = ""
                        }
                        if (tempName.length != 0) {
                            if (callingName[tempName] == undefined) {
                                callingName[tempName] = 1
                            } else {
                                callingName[tempName] += 1
                            }
                        }
                    }
                });
            }
        });
    }



    console.log("parseText end")
}

function getInformationForAUser(userName) {
    let numOfTalks = mapUserToContents[userName].length
    let numOfSeqTalks = mapUserToSeqContents[userName].length
    let freqWords = {}
    let callingFreq = {}
    mapUserToContents[userName].forEach(e => {
        let words = e.contents.split(/ |\n|\r|\~|\!|\?|\.|:|;|\/|\(|\)/)
        if (words != undefined) {
            words.forEach(e2 => {

                if (e2.length == 0) {
                    return
                }
                if (freqWords[e2] == undefined) {
                    freqWords[e2] = 1
                } else {
                    freqWords[e2] += 1
                }

                if (e2.indexOf('님') >= 0 ||
                    e2.indexOf('누나') >= 0 ||
                    e2.indexOf('형') >= 0 ||
                    e2.indexOf('언니') >= 0 ||
                    e2.indexOf('오빠') >= 0) {
                    for (let cName in callingName) {
                        if (e2.indexOf(cName) >= 0) {
                            if (callingFreq[cName] == undefined) {
                                callingFreq[cName] = 0
                            }
                            callingFreq[cName] += 1
                        }
                    }
                }

            });
        }
    });

    let arrCallingFreq = []
    for (let n in callingFreq) {
        if (callingFreq[n] >= 10)
            arrCallingFreq.push({ name: n, count: callingFreq[n] })
    }
    arrCallingFreq.sort((a, b) => {
        if (a.count > b.count) {
            return -1
        }
        return 1
    })

    let freqWordsArr = []
    let freqTfIdfArr = []
    for (let w in freqWords) {
        if (freqWords[w] < 10) {
            continue
        }
        freqWordsArr.push({ word: w, count: freqWords[w] })
        freqTfIdfArr.push({ word: w, count: freqWords[w] / idf[w] })
    }
    freqWordsArr.sort((a, b) => {
        if (a.count > b.count) {
            return -1
        }
        return 1
    })
    freqTfIdfArr.sort((a, b) => {
        if (a.count > b.count) {
            return -1
        }
        return 1
    })

    return { numOfTalks: numOfTalks, numOfSeqTalks: numOfSeqTalks, freqWords: freqWordsArr, freqTfIdf: freqTfIdfArr, callingFreq: arrCallingFreq }
}

userInfor = []

let sortAttribute = "numOfTalks"

let totalNumOfTalks = 0
let totalNumOfSeqTalks = 0

function sortTuple(a, b) {
    if (a.content[sortAttribute] > b.content[sortAttribute]) {
        return -1
    }
    return 1
}

function analyze() {
    console.log("analyze() start")
    startDate = new Date(2022, 10, 1)
    endDate = new Date(2022, 11, 1)
    parseText()


    for (let name in mapUserToContents) {
        let temp = getInformationForAUser(name)
        totalNumOfTalks += temp.numOfTalks
        totalNumOfSeqTalks += temp.numOfSeqTalks
        userInfor.push({ name: name, content: temp })
    }

    userInfor.sort(sortTuple)
    console.log(userInfor)
    console.log("analyze() end")
}

function processFile(file) {
    var reader = new FileReader();
    reader.onload = function() {
        rawText = reader.result;
    };
    reader.readAsText(file, /* optional */ "euc-kr");
}



analyze()
