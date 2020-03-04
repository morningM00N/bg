funcWidthPerHeight(0)

funcUpdatePageSize(true)

//funcPrepareGetLocation()

var arrPathCards = new Array(
    1,1,1,
    2,2,2,
    3,3,3,
    4,4,4,
    5,5,5,5,
    6,6,6,6,
    "g1","g1","g1","g1",
    "g2","g2","g2","g2",
    "g3","g3","g3","g3",
    "g4","g4","g4","g4",
    "g5","g5","g5",
    "g6","g6","g6"
    )

var arrPicked = new Array()
var arrSanc = new Array(1,2,3,4,5,6)


function funcDrawAvenueCard()
{
    var btnFull = funcInsertElement(
        "btnFull",
        "button",
        "btnTrans",
        0.8862, 0.025, 0.9750, 0.0758,20/29
    )
    //btnFull.style.border = "1px solid black"
    btnFull.style.backgroundColor = "red"
    btnFull.onclick = funcFullScreen
    btnFull.style.backgroundImage="url('img/fullscreen.png')"
    btnFull.style.borderRadius = "10%"

    for (let idx = 0; idx < 100; idx++) {
        let loc1 = getRandom(6)
        let loc2 = getRandom(6)
        let temp = arrSanc[loc1]
        arrSanc[loc1]=arrSanc[loc2]
        arrSanc[loc2]=temp
    }

    var btnSanctuaryDeck = funcInsertElement(
        "btnSancDeck",
        "button",
        "btnTrans",
        0.03, 0.03, 0.28, 0.0640+(0.2453-0.0652)/pageHeight*pageWidth*90/65,
        1.5
    )
    btnSanctuaryDeck.style.backgroundImage="url('img/avenue/backsanctuary.png')"
    funcSetLocation("btnSancDeck",0.05, 0.02, 0.20, 0.0640+(0.2453-0.0652)/pageHeight*pageWidth*90/65,true)
    btnSanctuaryDeck.onclick=funcShowSanctuary

    var btnDecree = funcInsertElement(
        "btnDecree",
        "button",
        "btnTrans",
        0.60, 0.03, 0.85, 0.0640+(0.2453-0.0652)/pageHeight*pageWidth*90/65,
        1.5
    )
    btnDecree.style.backgroundImage="url('img/avenue/decree"+getRandom(16)+".png')"
    funcSetLocation("btnDecree",0.45, 0.02, 0.60, 0.0640+(0.2453-0.0652)/pageHeight*pageWidth*90/65,true)
    btnDecree.onclick=funcClickDecree

    var btnPathDeck = funcInsertElement(
        "btnPathDeck",
        "button",
        "btnTrans",
        0.03, 0.30, 0.28, 0.0640+(0.2453-0.0652)/pageHeight*pageWidth*90/65,
        1.5
    )
    btnPathDeck.style.backgroundImage="url('img/avenue/backpath.jpg')"
    funcSetLocation("btnPathDeck",0.03, 0.50, 0.18, 0.0640+(0.2453-0.0652)/pageHeight*pageWidth*90/65,true)
    btnPathDeck.onclick=funcDrawPath

}

var arrUsedCard = new Array()
function funcClear()
{
    for (let idx = 0; idx < curPathCards; idx++) {
        document.getElementById("drawedPathCard"+idx).style.display="none"
    }
    curPathCards=0
    curGoldCards=0
    for (let idx = 0; idx < arrPathCards.length; idx++) {
        arrUsedCard[idx]=false
    }
}

var curGoldCards = 0
var curPathCards = 0
function funcDrawPath()
{
    if (curGoldCards==4)
    {
        if (document.fullscreenElement)
        {
            document.exitFullscreen()
        }
        alert("현재 라운드는 종료되었습니다.")
        return
    }

    let btnPathCard = funcInsertElement(
        "drawedPathCard"+curPathCards,
        "button",
        "btnTrans",
        0.03, 0.30, 0.28, 0.0640+(0.2453-0.0652)/pageHeight*pageWidth*90/65,
        1.5
    )
    btnPathCard.style.display="inline"
    btnPathCard.style.backgroundImage="url('img/avenue/backsanctuary.png')"
    funcSetLocation("drawedPathCard"+curPathCards,0.03, 0.50, 0.18, 0.0640+(0.2453-0.0652)/pageHeight*pageWidth*90/65,true)
    let getNumber = getRandom(arrPathCards.length)
    while (arrUsedCard[getNumber]==true)
    {
        getNumber = getRandom(arrPathCards.length)
    }
    arrUsedCard[getNumber]=true
    if (getNumber>=20)
    {
        curGoldCards++
    }
    if (curPathCards>=5)
    {
        if (pageWidth < pageHeight) {
            var tic = 4 * 0.165 / (curPathCards)
            for (let idx = 0; idx < curPathCards; idx++) {
                funcMove("drawedPathCard" + idx, 0.03 + idx * tic, false, 0.5)
            }
            funcMove("drawedPathCard" + curPathCards, 0.03 + 4 * 0.165, 0.55, 0.5, "url('img/avenue/path" + arrPathCards[getNumber] + ".png')")
        }
        else {
            var tic = 4 * 0.15 / (curPathCards)
            for (let idx = 0; idx < curPathCards; idx++) {
                funcMove("drawedPathCard" + idx, 0.19 + idx * tic, 0.50, 0.5)
            }
            funcMove("drawedPathCard" + curPathCards, 0.19 + 4 * 0.15, 0.50, 0.5, "url('img/avenue/path" + arrPathCards[getNumber] + ".png')")
        }
    }
    else{
        if (pageWidth<pageHeight)
        {
            funcMove("drawedPathCard"+curPathCards,0.03+curPathCards*0.165,0.55,0.5,"url('img/avenue/path"+arrPathCards[getNumber]+".png')")
        }
        else{
            funcMove("drawedPathCard"+curPathCards,0.19+curPathCards*0.15,0.50,0.5,"url('img/avenue/path"+arrPathCards[getNumber]+".png')")
        }
    }
    curPathCards++
}

function funcClickDecree()
{
    if (confirm("카드를 바꾸겠습니까?")==true)
    {
        btnDecree.style.backgroundImage="url('img/avenue/decree"+(1+getRandom(16))+".png')"
    }
    
}

var numberOfRound = 0
var sancShow = false

function funcShowSanctuary()
{
    if (numberOfRound==0)
    {
        funcDrawSanctuary()
        return
    }
    if (sancShow == false) {
        if (confirm("다음 카드를 확인하겠습니까?") != true) {
            return
        }
        event.srcElement.style.backgroundImage="url('img/avenue/sanctuary"+arrSanc[numberOfRound]+".png')"
        sancShow=true
    }
    else{
        sancShow=false
        event.srcElement.style.backgroundImage="url('img/avenue/backsanctuary.png')"
    }

}
function funcDrawSanctuary()
{
    if (numberOfRound==5)
    {
        if (document.fullscreenElement)
        {
            document.exitFullscreen()
        }
        alert("게임이 종료되었습니다.")
        return
    }
    funcClear()
    var btnDecreeDeck = funcInsertElement(
        "drawedCard"+numberOfRound,
        "button",
        "btnTrans",
        0.03, 0.03, 0.28, 0.0640+(0.2453-0.0652)/pageHeight*pageWidth*90/65,
        1.5
    )
    btnDecreeDeck.onclick=funcDrawSanctuary
    btnDecreeDeck.style.backgroundImage="url('img/avenue/backsanctuary.png')"
    funcSetLocation("drawedCard"+numberOfRound,0.05, 0.02, 0.20, 0.0640+(0.2453-0.0652)/pageHeight*pageWidth*90/65,true)
    if (pageHeight>pageWidth)
    {
        funcMove("drawedCard"+numberOfRound,0.29, 0.03, 0.28,"url('img/avenue/sanctuary"+arrSanc[numberOfRound]+".png')")
    }
    else{
        funcMove("drawedCard"+numberOfRound,0.20, 0.02, 0.20,"url('img/avenue/sanctuary"+arrSanc[numberOfRound]+".png')")
    }
    numberOfRound++

}

funcDrawAvenueCard()