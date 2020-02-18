var pageHeight = document.documentElement.clientHeight
var pageWidth = document.documentElement.clientWidth

if (pageHeight > pageWidth) {
    pageHeight = pageWidth * 760 / 360
} else {
    
}
var mainDiv = document.getElementById("main")
var body = document.getElementById("body")

mainDiv.style.height = pageHeight + "px"
mainDiv.style.width = pageWidth + "px"
mainDiv.style.backgroundSize = pageWidth + "px " + pageHeight + "px"

var seed = Math.floor(Math.random() * 100000);

function getRandom(bound) {
    var x = Math.sin(seed++) * 100000;
    return Math.floor((x - Math.floor(x)) * bound)
}

function appendElement(_type, _id, _className, _left, _top, _width, _height, _fontSize) {
    var newElement = document.createElement(_type)
    newElement.id = _id
    newElement.className = _className
    newElement.style.left = _left * pageWidth + "px"
    newElement.style.top = _top * pageHeight + "px"
    newElement.style.width = _width * pageWidth + "px"
    newElement.style.height = _height * pageHeight + "px"
    newElement.style.fontSize = _fontSize * pageWidth + "px"
    newElement.style.lineHeight = _height * pageHeight + "px"

    mainDiv.appendChild(newElement)
    return newElement
}

var usedCards = new Array()
for (let idx = 0; idx < 17; idx++) {
    usedCards[idx] = false
}
var cardImgSrc = new Array(
    "a0",
    "a1",
    "a2",
    "a3",
    "e0",
    "e1",
    "e2",
    "e3",
    "e4",
    "e5",
    "e6",
    "e7",
    "e8",
    "e9",
    "e10",
    "e11",
    "e12"
)

var cardTimeStamps = new Array(
    0, 0, 0, 0,
    0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 0
)

var seasonTimeThres = new Array(8, 8, 7, 6)

var roundReady = false
var curSeason = 0
var curDrawnCards = 0
var seasonTimeStamp = 0

function drawCGCardDrawer() {

    var leftIter = 0.05
    for (let idx = 0; idx < 4; idx++) {
        var cardEdict = appendElement("button", "btnCardEdict" + idx, "cards", leftIter, 0.05 / pageHeight * pageWidth, 0.85 / 4, 0.85 / 4 * 9 / 6.5 * pageWidth / pageHeight, 0.1)
        cardEdict.style.backgroundImage = "url('img/cartographers/cards/bg" + idx + ".png')"
        cardEdict.onclick = funcDrawScore
        leftIter += 0.90 / 4
        if (pageHeight < pageWidth) {
            cardEdict.style.left = 0.015 * pageWidth + idx*(0.31 * pageHeight / 9 * 6.5)+ "px"
            cardEdict.style.top = 0.025 * pageHeight + "px"
            cardEdict.style.height = 0.30 * pageHeight + "px"
            cardEdict.style.width = 0.30 * pageHeight / 9 * 6.5 + "px"

           
        }

    }

    var topIter = 0.05 / pageHeight * pageWidth + 0.090 * 4 / pageHeight * pageWidth - 0.02
    var cardBG = appendElement("button", "btnCardBG", "cards", 0.05, topIter, 0.065 * 5, 0.065 * 5 / 90 * 65 / pageHeight * pageWidth, 0.1)
    var leftLoc = 0.05 * pageWidth
    var rightLoc = leftLoc + 0.065 * 5 * pageWidth
    var centerLoc = (leftLoc + rightLoc) / 2
    //console.log(centerLoc)
    cardBG.style.width = 0.065 * 5 / 90 * 65 / 90 * 65 * pageWidth + "px"
    cardBG.style.left = centerLoc - 0.065 * 5 / 90 * 65 / 90 * 65 * pageWidth / 2 + "px"
    if (pageWidth>pageHeight)
    {

        cardBG.style.left = 0.015 * pageWidth + 4*(0.32 * pageHeight / 9 * 6.5)+ "px"
        cardBG.style.top = 0.025 * pageHeight + "px"
        cardBG.style.height=0.30 * pageHeight+"px"
        cardBG.style.width = 0.30 * pageHeight / 9 * 6.5 + "px"


    }

    //cardBG.style.backgroundImage = "url('img/cartographers/cards/bg.png')"
    cardBG.style.backgroundSize = "100%"
    cardBG.style.border = 0.005 * pageWidth + "px dashed black"
    cardBG.onclick = funcDrawCards


    for (let idx = 0; idx < 2; idx++) {
        var cardScoreShow = appendElement("button", "btnScoreShow" + idx, "cards", 0.05, topIter + 0.12 + idx * 0.22, 0.065 * 5, 0.090 * 5 / pageHeight * pageWidth, 0.1)
        if (pageHeight<pageWidth)
        {
            cardScoreShow.style.display="none"

        }
        cardScoreShow.onclick = funcZoom
            //cardScoreShow.style.border = 0.005 * pageWidth + "px dashed black"

    }


    for (let idx = 0; idx < 15; idx++) {
        var cardLoc = appendElement("button", "btnDrawnCard" + idx, "cards", 0.05 + 0.065 * 5 + 0.05, topIter, 0.065 * 8, 0.090 * 8 / pageHeight * pageWidth, 0.1)
        cardLoc.style.display = "none"

        if (pageWidth>pageHeight)
        {
            var idx2 = idx
            if (idx>7)
            {
                idx2=7
            }
            cardLoc.style.left = 0.02 * pageWidth + idx2*0.25*0.95*(pageHeight - 0.35 * pageHeight)/90*65+  "px"
            cardLoc.style.top= 0.35 * pageHeight + "px"
            cardLoc.style.width = 0.95*(pageHeight - 0.35 * pageHeight)/90*65 +"px"
            cardLoc.style.height = 0.95*(pageHeight - 0.35 * pageHeight) +"px"
        }
        else{
            topIter += 0.05
        }

        cardLoc.onclick = funcSeasonEnd
        
       

    }
}

var arrScoreCard = new Array()
var scoreReady = false

function funcDrawScore() {
    if (scoreReady == true) {
        if (pageHeight<pageWidth)
        {
            funcZoom()
            return
        }
        var check = confirm("새로운 점수카드를 뽑겠습니까?")
        if (check == false || check == null) {
            return
        }
    }
    var tempArr = new Array()
    for (let idx = 0; idx < 16; idx++) {
        tempArr[idx] = false
    }
    for (let idx = 0; idx < 4; idx++) {
        var curLoc = getRandom(16)
        while (tempArr[curLoc] == true) {
            curLoc = getRandom(16)
        }
        tempArr[curLoc] = true
        arrScoreCard[idx] = curLoc
        for (let idx2 = 4 * Math.floor(curLoc / 4); idx2 < 4 * Math.floor(curLoc / 4) + 4; idx2++) {
            tempArr[idx2] = true
        }
        var cardEdict = document.getElementById("btnCardEdict" + idx)
        cardEdict.style.backgroundImage = "url('img/cartographers/cards/s" + curLoc + ".png')"

    }
    scoreReady = true

}

function funcDrawCards() {
    if (curSeason >= 4) {
        alert("게임이 종료되었습니다!")
        return
    }
    if (scoreReady == false) {
        alert("점수 카드를 뽑아주세요.")
        return
    }
    //console.log("funcDrawCards")
    if (roundReady == false) {
        seasonTimeStamp = 0
        usedCards[curSeason] = true
        for (let idx = 4; idx < 17; idx++) {
            usedCards[idx] = true
        }
        event.srcElement.style.backgroundImage = "url('img/cartographers/cards/bg" + curSeason + ".png')"
        event.srcElement.style.border = "0px"
        roundReady = true
        curDrawnCards = 0


        for (let idx = 0; idx < 2; idx++) {
            var btnScoreShow = document.getElementById("btnScoreShow" + idx)
            btnScoreShow.style.backgroundImage = "url('img/cartographers/cards/s" + arrScoreCard[(curSeason + idx) % 4] + ".png')"

            if (pageWidth> pageHeight)
            {
                var cardEdict = document.getElementById("btnCardEdict"+((idx+curSeason)%4))
                cardEdict.style.border = 0.005*pageWidth +"px solid red"
            }
        }
        return
    }
    if (seasonTimeStamp >= seasonTimeThres[curSeason]) {
        alert("계절이 종료되었습니다!")
        return
    }
    var drawnCardID = getRandom(17)
    while (usedCards[drawnCardID] == false) {
        drawnCardID = getRandom(17)
    }

    if (pageHeight < pageWidth) {
        if (curDrawnCards == 8) {
            for (let idx = 0; idx < 15; idx++) {

                var cardLoc = document.getElementById("btnDrawnCard" + idx)
                //cardLoc.style.display = "none"
                cardLoc.style.left = 0.02 * pageWidth + idx * 0.15 * 0.95 * (pageHeight - 0.35 * pageHeight) / 90 * 65 + "px"
            }

        }
    }
    usedCards[drawnCardID] = false
    var cardLoc = document.getElementById("btnDrawnCard" + curDrawnCards)
    cardLoc.style.display = "inline"
    cardLoc.style.backgroundImage = "url('img/cartographers/cards/" + cardImgSrc[drawnCardID] + ".png')"
    curDrawnCards++
    seasonTimeStamp += cardTimeStamps[drawnCardID]

}

function funcSeasonEnd() {
    if (curSeason >= 3) {
        alert("게임이 종료되었습니다!")
        curSeason++
        return
    }
    if (pageWidth> pageHeight)
    {
        for (let idx = 0; idx < 4; idx++) {
            var cardEdict = document.getElementById("btnCardEdict"+idx)
            cardEdict.style.border = "0px"
        }

        
        for (let idx = 0; idx < 15; idx++) {

                var cardLoc = document.getElementById("btnDrawnCard" + idx)
                //cardLoc.style.display = "none"
                var idx2 = idx
                if(idx>7)
                {
                    idx2=7
                }
                cardLoc.style.left = 0.02 * pageWidth + idx2 * 0.25 * 0.95 * (pageHeight - 0.35 * pageHeight) / 90 * 65 + "px"
        }

    }

    curSeason++
    roundReady = false
    for (let idx = 0; idx < curDrawnCards; idx++) {
        var cardLoc = document.getElementById("btnDrawnCard" + idx)
        cardLoc.style.display = "none"


        for (let idx = 0; idx < 2; idx++) {
            var btnScoreShow = document.getElementById("btnScoreShow" + idx)
            btnScoreShow.style.backgroundImage = "url('')"
        }

    }
    var cardBG = document.getElementById("btnCardBG")
    cardBG.style.backgroundImage = "url('')"
    cardBG.style.border = 0.005 * pageWidth + "px dashed black"
}

function funcZoom() {
    var zoomCard = document.getElementById("zoomCard")
    if (zoomCard == null) {
        if (pageHeight<pageWidth)
        {
            zoomCard = appendElement("button", "zoomCard", "cards", 0.3, 0.1, 0.8*65/90*pageHeight/pageWidth, 0.8, 0.1)
        }
        else{
            zoomCard = appendElement("button", "zoomCard", "cards", 0.1, 0.1, 0.8, 0.8 * 90 / 65 * pageWidth / pageHeight, 0.1)
        }
    }
    zoomCard.style.display = "inline"
    zoomCard.style.backgroundImage = event.srcElement.style.backgroundImage
    zoomCard.onclick = funcDisable

}

function funcDisable() {
    event.srcElement.style.display = "none"
}
drawCGCardDrawer()
