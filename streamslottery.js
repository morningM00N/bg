funcWidthPerHeight(0)
funcUpdatePageSize(true)

let arrValues = new Array()

let numOfToken = 20

for (let idx = 0; idx < 30; idx++) {
    arrValues[idx]=idx+1
}

for (let idx = 0; idx < 9; idx++) {
    arrValues[idx+30]=idx+11
}

arrValues[39]="&#9734"

function funcDrawStreamsLottery()
{
    let area = pageHeight* pageWidth
    area = area / 40
    let length = Math.sqrt(area)
    length = length/1.7/pageWidth
    
    let roundBtn = funcInsertElement("btnDice0","button","txtRound",
        0.0,0.01,0.1,0.1)
    roundBtn.innerHTML="20"
    roundBtn.onclick=funcFullScreen
    
    for (let idx = 1; idx <= 40; idx++) {
        let leftTopX = 0.01+getRandom(100)/100
        let leftTopY = 0.01+getRandom(100)/100
        let newDice = funcInsertElement("btnDice"+idx,"button","btnDice",
        leftTopX, leftTopY, leftTopX+length, leftTopY,
        1)
        let count = 0
        while (isValidLoc("btnDice",idx)==false)
        {
            if (count>1000)
            {
                break;
            }
            count++
             leftTopX = 0.01+getRandom(100)/100
             leftTopY = 0.01+getRandom(100)/100
             funcInsertElement("btnDice"+idx,"button","btnDice",
             leftTopX, leftTopY, leftTopX+length, leftTopY,
             1)
     
            
        }
        let longer = pageHeight
        if (pageWidth>pageHeight)
        {
            longer = pageWidth
        }
        newDice.style.backgroundColor="#ABB2B9"

        newDice.style.boxShadow=0.01*longer+"px "+ 0.01*longer+"px"
        newDice.style.fontSize=length*pageWidth/1.5+"px"
        newDice.style.transform = "rotate(" + (getRandom(21)-10) + "deg)"
        newDice.onclick=function(){
            
            let thisDice = document.getElementById("btnDice"+idx)
            let numOfRound = document.getElementById("btnDice0")
            if (thisDice.innerHTML==arrValues[idx-1])
            {
                
                numOfToken++
                
                thisDice.innerHTML=""
                thisDice.style.backgroundColor="#ABB2B9"
            }
            else{
                if (numOfToken==0){
                    return
                }
                numOfToken--
                thisDice.style.backgroundColor="white"
                thisDice.innerHTML=arrValues[idx-1]
            }
            numOfRound.innerHTML=numOfToken
        }

    }
}

funcDrawStreamsLottery()