let tpageHeight = document.documentElement.clientHeight
let tpageWidth = document.documentElement.clientWidth

let ratio = tpageWidth/tpageHeight
if (tpageHeight>tpageWidth)
{
    ratio = 1/ratio
}

$(window).resize(function () {
    if (doResize == false) {
        return
    }
    let tpageHeight = document.documentElement.clientHeight
let tpageWidth = document.documentElement.clientWidth

let ratio = tpageWidth/tpageHeight
if (tpageHeight>tpageWidth)
{
    ratio = 1/ratio
}
funcWidthPerHeight(ratio,ratio)

    funcUpdatePageSize(true)
    funcRelocateElements()
});

funcWidthPerHeight(ratio,ratio)

funcUpdatePageSize(true)

//funcPrepareGetLocation()

let arrWDiceImages = new Array(
    "img/dice/W1.png",
    "img/dice/W2.png",
    "img/dice/W3.png",
    "img/dice/W4.png",
    "img/dice/W5.png",
    "img/dice/W6.png"
)

let arrBDiceImages = new Array(
    "img/dice/B1.png",
    "img/dice/B2.png",
    "img/dice/B3.png",
    "img/dice/B4.png",
    "img/dice/B5.png",
    "img/dice/B6.png"
)

function getNumber(val) {
    return Number(val.replace("px", ""))
}

function getDiceValue(idx) {
    let imgSrc = document.getElementById("btnDice" + idx).style.backgroundImage
    imgSrc = imgSrc.replace('.png")', "")
    imgSrc = imgSrc.replace('url("img/dice/W', "")
    imgSrc = imgSrc.replace('url("img/dice/B', "")

    return Number(imgSrc)
}

let arrActivate = new Array()
let arrSelected = new Array()
let numOfSelected = 0

var palleteLeft
var palleteTop
var palleteWidth
var palleteHeight
var palleteRight
var palleteMiddle
var palleteBottom




function funcDrawGantsRoll() {
    let length = pageHeight * 59 / pageWidth / 174

    

  

    




    let selectedDice =
        funcInsertElement("imgSelected", "img", null,
            0, 0, length, 1, 59 / 174)
    selectedDice.src = "img/gantsroll.png"


    let btnSilverPlate =
        funcInsertElement("btnPlate", "img", null,
            0.6, 0, 1, 1)
    btnSilverPlate.src = "img/silverplate.png"

    palleteLeft = getNumber(selectedDice.style.width)
    palleteRight = getNumber(btnSilverPlate.style.left)

    palleteTop = getNumber(btnSilverPlate.style.top)
    palleteWidth = palleteRight-palleteLeft
    palleteHeight = getNumber(btnSilverPlate.style.height)

    
    palleteMiddle = (palleteLeft + palleteRight) / 2
    palleteLeft = length*pageWidth
    palleteRight = getNumber(btnSilverPlate.style.left)
    palleteBottom = palleteTop + palleteHeight

    console.log(palleteLeft,palleteRight)



    let leftStart = 0.05
    let line = 0.24
    let topStart = 0.043
    let topTic = 0.335
    for (let idx = 0; idx < 3; idx++) {
        let btnInserted = funcInsertElement("btnSelectDice" + idx, "button", "btnTrans",
            0.0352, 0.3812, 0.1742, 0.6062)
        btnInserted.style.left = leftStart * pageHeight + "px"
        btnInserted.style.width = line * pageHeight + "px"
        btnInserted.style.top = (topStart + topTic * idx) * pageHeight + "px"
        btnInserted.style.height = line * pageHeight + "px"
    }



    console.log(palleteLeft, palleteRight, palleteTop, palleteBottom)

    funcDrawDice("btnDice", "btnTrans", 6, arrBDiceImages,
        palleteLeft / pageWidth, 0.25,
        palleteRight / pageWidth, 0.75,
        0.1,
        "yellow",
        funcSelectDice,
        palleteLeft / pageWidth, 0.2,
        palleteRight / pageWidth, 0.95, 0.1
    )

    document.getElementById("btnDice0").style.backgroundColor = "yellow"
    document.getElementById("btnDice1").style.backgroundColor = "blue"
    document.getElementById("btnDice2").style.backgroundColor = "green"
    document.getElementById("btnDice3").style.backgroundColor = "orange"
    document.getElementById("btnDice4").style.backgroundColor = "purple"
    document.getElementById("btnDice5").style.backgroundColor = "white"

    let btnRoll = funcInsertElement("btnRoll", "button", "btnTrans",
    palleteLeft / pageWidth, 0.03, palleteLeft / pageWidth+0.2, 0.1, 2)
    btnRoll.innerHTML = "Roll"
    btnRoll.style.color = "white"
    btnRoll.onclick = funcRollDice

    funcInsertFullScreenButton(
        palleteLeft / pageWidth+0.25, 0.033, palleteLeft / pageWidth+0.25+0.13, 0.1900,
        29 / 20)

}

let arrDiceDeactive = new Array()
let numOfDeactivated = 0
let destDeactivateDice=new Array()
function funcSelectDice() {
    let idxDice = event.srcElement.id.replace("btnDice", "")
    
    let des = document.getElementById("btnSelectDice"+numOfSelected)
    let desLeft = getNumber(des.style.left)
    let desTop = getNumber(des.style.top)
    let desRight = desLeft + getNumber(des.style.width)
    let desBottom = desTop+ getNumber(des.style.height)
    console.log(desLeft,desRight,desTop,desBottom)

    desLeft = (desLeft+desRight)/2 - getNumber(event.srcElement.style.width)/2
    desTop = (desTop+desBottom)/2 - getNumber(event.srcElement.style.width)/2
    event.srcElement.style.transform="rotate(0deg)"

    {
        let newElement = funcInsertElement("selectDie" + event.srcElement.id, "button", "btnTrans",
            0, 0, 0, 0)
        newElement.style.display = "inline"
        newElement.style.left = event.srcElement.style.left
        newElement.style.top = event.srcElement.style.top
        newElement.style.width = event.srcElement.style.width
        newElement.style.height = event.srcElement.style.height
        newElement.style.backgroundColor = event.srcElement.style.backgroundColor
        newElement.style.backgroundImage = event.srcElement.style.backgroundImage
        newElement.style.backgroundSize = event.srcElement.style.backgroundSize
        newElement.style.boxShadow = event.srcElement.style.boxShadow
        newElement.onclick = function () {
            event.srcElement.style.display = "none"
            let diceID = event.srcElement.id.replace("selectDie", "")
            document.getElementById(diceID).style.display = "inline"
            numOfSelected--
            let idxDice = diceID.replace("btnDice", "")
            arrSelected[idxDice] = false

        }
        event.srcElement.style.display = "none"

        funcMove(newElement.id, desLeft / pageWidth, desTop / pageHeight, 0.5)
    }
    arrSelected[idxDice] = true
    //event.srcElement.style.opacity = 0.1
    let thisNumber = getDiceValue(idxDice)
    console.log(thisNumber)
    numOfSelected++

    for (let idx = 0; idx < 6; idx++) {
        if (arrActivate[idx] != false && arrSelected[idx] != true && (numOfSelected==3||thisNumber > getDiceValue(idx))) {
            
            let thisDice = document.getElementById("btnDice" + idx)
            document.getElementById("btnDice" + idx).style.display = "none"

            let newElement = funcInsertElement("deselectDiebtnDice" + idx,"button","btnTrans",
            0,0,0,0)
            newElement.style.display="inline"
            newElement.style.left = thisDice.style.left
            newElement.style.top = thisDice.style.top
            newElement.style.width = thisDice.style.width
            newElement.style.height = thisDice.style.height
            newElement.style.backgroundColor=thisDice.style.backgroundColor
            newElement.style.backgroundImage=thisDice.style.backgroundImage
            newElement.style.backgroundSize=thisDice.style.backgroundSize
            newElement.style.boxShadow=thisDice.style.boxShadow
            newElement.onclick = function(){
                event.srcElement.style.display="none"
                let diceID = event.srcElement.id.replace("deselectDie","")
                document.getElementById(diceID).style.display="inline"
                let idxDice = diceID.replace("btnDice", "")
                for (let idx4 = 0; idx4 < numOfDeactivated; idx4++) {
                    if (destDeactivateDice[idx4][2]==idxDice){
                        destDeactivateDice[idx4]=destDeactivateDice[numOfSelected-1]
                    }
                }
                numOfDeactivated--
                arrActivate[idxDice] = true
        
            }
            
            let plateLeft = getNumber(document.getElementById("btnPlate").style.left)
            let movedLeft = MMath.getRandom(plateLeft+0.2*getNumber(newElement.style.width),pageWidth-1.2*getNumber(newElement.style.width))
            let movedTop = MMath.getRandom(0.2*pageHeight,0.8*pageHeight-1.2*getNumber(newElement.style.width))

            let count= 0
            while (true)
            {
                let termi = true
                for (let idx2 = 0; idx2 < numOfDeactivated; idx2++) {
                   
                        if (isOverlap(
                            movedLeft,
                            movedTop,
                            getNumber(newElement.style.width),
                            getNumber(newElement.style.width),
                            destDeactivateDice[idx2][0],
                            destDeactivateDice[idx2][1],
                            getNumber(newElement.style.width),
                            getNumber(newElement.style.width)
                        )==true)
                        {
                            termi=false
                            break
                        }
                   
                    
                }

                if (termi==true || count==100)
                {
                    break
                }

                 movedLeft = MMath.getRandom(plateLeft+0.2*getNumber(newElement.style.width),pageWidth-1.2*getNumber(newElement.style.width))
                 movedTop = MMath.getRandom(0.2*pageHeight,0.8*pageHeight-1.2*getNumber(newElement.style.width))
    
                count++
            }

            destDeactivateDice[numOfDeactivated]=new Array(movedLeft,movedTop,idx)
            numOfDeactivated++



            funcMove(newElement.id, movedLeft/pageWidth, movedTop/pageHeight, 0.5)

            arrActivate[idx] = false
        

        }

    }
}

function funcRollDice() {
    if (numOfDeactivated+numOfSelected==6)
    {
        numOfDeactivated=0
        numOfSelected=0
        for (let idx = 0; idx < 6; idx++) {
            arrSelected[idx]=false
            arrActivate[idx]=true
            let desDie = document.getElementById("deselectDiebtnDice"+idx)
            if (desDie!=null)
            {
                desDie.style.display="none"
            }
            let selDie = document.getElementById("selectDiebtnDice"+idx)
            if (selDie!=null)
            {
                selDie.style.display="none"
            }
        }
    }
    funcDrawDice("btnDice", "btnTrans", 6, arrBDiceImages,
        palleteLeft / pageWidth, 0.25,
        palleteRight / pageWidth, 0.75,
        0.1,
        "yellow",
        funcSelectDice,
        palleteLeft / pageWidth, 0.2,
        palleteRight / pageWidth, 0.95, 0.1
    )
    for (let idx = 0; idx < 6; idx++) {
        if (arrSelected[idx]==true || arrActivate[idx]==false)
        {
            document.getElementById("btnDice"+idx).style.display="none"
        }
        
    }


    document.getElementById("btnDice0").style.backgroundColor = "yellow"
    document.getElementById("btnDice1").style.backgroundColor = "blue"
    document.getElementById("btnDice2").style.backgroundColor = "green"
    document.getElementById("btnDice3").style.backgroundColor = "orange"
    document.getElementById("btnDice4").style.backgroundColor = "purple"
    document.getElementById("btnDice5").style.backgroundColor = "white"
    for (let idx = 0; idx < 6; idx++) {
        if (arrActivate[idx] != false && arrSelected[idx] != true) {
            funcStartRoll("btnDice", idx, arrBDiceImages)
        }
    }
}

funcDrawGantsRoll()