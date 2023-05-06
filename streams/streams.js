function drawComponents()
{
    var mainDiv = document.getElementById("main")
    for (let idx = 0; idx < 20; idx++) {
        var newSelect = document.createElement("select")       
        newSelect.id = "select"+idx
        newSelect.className = "trasBtn"
        mainDiv.appendChild(newSelect)
    }

}


drawComponents()

var pageHeight = document.documentElement.clientHeight
var modWidth = pageHeight/745*1021
var pageWidth = document.documentElement.clientWidth
if (pageWidth > modWidth)
{
    pageWidth = modWidth
}
else{
    pageHeight = pageWidth/1021*745
}


    {
        var pName = document.getElementById("calScore")
    }
    {
        var pName = document.getElementById("pName")
        pName.style.left = 750 / 1024 * pageWidth +"px"
        pName.style.top = 135 / 1024 * pageWidth +"px"
        pName.style.fontSize = 50 / 1024 * pageWidth +"px"
    }

    {
        var pName = document.getElementById("pScore")
        pName.style.left = 750 / 1024 * pageWidth +"px"
        pName.style.top = 210 / 1024 * pageWidth +"px"
        pName.style.fontSize = 50 / 1024 * pageWidth +"px"
    }


var arrChange = new Array()
function funcRemove(idx)
{
    var response = confirm("취소하시겠습니까??")
    if (response == true)
    {
        var btn =  document.getElementById("btnRemove"+idx)
        btn.style.display="none"
        arrChange[idx]=1
        var slt = document.getElementById("select"+idx)
        slt.style.fontStyle="normal"

    }
    console.log(response)
}

var colors = new Array()
colors[0] = "red"
colors[1] = "orange"
colors[2] = "#F4D03F"
colors[3] = "green"
colors[4] = "blue"
colors[5] = "darkblue"
colors[6] = "purple"
colors[7] = "#616A6B"

function setRandomNumber()
{
    for (let idx = 0; idx < 20; idx++) {
        selectedNumbers[idx]=Math.floor(Math.random()*30)+1
        var slt = document.getElementById("select"+idx)
        slt.selectedIndex=selectedNumbers[idx]
    }
    if (Math.random()*10>3)
    {
        
        starLoc = Math.floor(Math.random()*20)
        if (starLoc==20)
        {
            starLoc-=1
        }
        var slt = document.getElementById("select"+starLoc)
        slt.selectedIndex=31
    }

    calculate()
}

function calculate()
{
    var pCal = document.getElementById("calScore")
    while (pCal.childElementCount>0)
    {
        pCal.removeChild(pCal.children[0])
    }

    if (starLoc!=-1)
    {
        if (starLoc == 0)
        {
            selectedNumbers[starLoc]=1
        }
        else if (starLoc == 19)
        {
            selectedNumbers[starLoc] = 30
        }
        else{
            var prev = starLoc-1
            while (prev-1>=0 && selectedNumbers[prev]>=selectedNumbers[prev-1])
            {
                if (selectedNumbers[prev]==0)
                {
                    break
                }
                --prev
            }
            prev = starLoc-prev
            var next = starLoc+1
            while (next+1<=19 && selectedNumbers[next]<=selectedNumbers[next+1])
            {
                if (selectedNumbers[next]==0)
                {
                    break
                }
                ++next
            }
            next = next-starLoc
            if (prev>next)
            {
                selectedNumbers[starLoc]=selectedNumbers[starLoc-1]
            }
            else{
                selectedNumbers[starLoc]=selectedNumbers[starLoc+1]
            }
            console.log(prev+","+next)
        }
    }
    colorIdx = 0
    var startIdx = 0
    var curSize = 1
    var finalScore = 0
    var countScores = 0
    while (startIdx <= 19)
    {
        var slt = document.getElementById("select"+startIdx)
        slt.style.color = colors[colorIdx]
        if (arrChange[startIdx] == 2) {
            slt.style.color = colors[7]
        }
        if (startIdx == 19) {
            if (curSize > 1)
            {
                var newSpan = document.createElement("span")
                newSpan.style.color = colors[colorIdx]
               
                newSpan.innerHTML = " + "+scores[curSize]
                finalScore+=scores[curSize]
                pCal.appendChild(newSpan)
            }
            break;
        }
        if (selectedNumbers[startIdx]==0 || selectedNumbers[startIdx]>selectedNumbers[startIdx+1])
        {
            if (curSize>1)
            {
                var newSpan = document.createElement("span")
                newSpan.style.color = colors[colorIdx]
                newSpan.innerHTML = "+"+scores[curSize]
                finalScore+=scores[curSize]
                pCal.appendChild(newSpan)
                ++countScores
            }
            curSize = 0
            ++colorIdx
            if (colorIdx==7)
            {
                colorIdx= 0
            }
        }
        ++curSize
        startIdx++
    }

    var newSpan = document.createElement("span")
    newSpan.style.color = "BLACK"
    newSpan.innerHTML = " = " + finalScore
    pCal.appendChild(newSpan)
    console.log(countScores)

    { // mod pCal

        pCal.style.left = 660 / 1024 * pageWidth +"px"
        pCal.style.top = 350 / 1024 * pageWidth +"px"
        pCal.style.fontSize = 30 / 1024 * pageWidth +"px"
        pCal.style.width = 330 / 1024 * pageWidth +"px"
        pCal.style.height = 100 / 1024 * pageHeight +"px"
        pCal.style.backgroundColor="white"
        pCal.style.borderRadius="5%"
        pCal.style.textAlign="center"
        pCal.style.textAlignLast="center"
        pCal.style.lineHeight=100 / 1024 * pageHeight +"px"

    }

    document.getElementById("pScore").innerHTML = finalScore
}
var starLoc = -1
function funcChange(idx)
{
    var slt = document.getElementById("select"+idx)
    selectedNumbers[idx]=slt.selectedIndex
    slt.style.fontStyle="italic"

    if (arrChange[idx]==1 || arrChange[idx]==2)
    {
        arrChange[idx]=2
        slt.style.fontWeight="bold"
        slt.style.color=colors[7]
    }
    

    if (idx == starLoc && slt.selectedIndex == 0)
    {
        starLoc = -1
    }
    
    if (slt.selectedIndex==31)
    {
        starLoc = idx
    }
    if (slt.selectedIndex==0)
    {
        return
    }
    var btn = document.getElementById("btnRemove"+idx)
    if (btn==null)
    {


        btn = document.createElement("button")
        btn.id = "btnRemove" + idx
        btn.style.left = slt.style.left
        btn.style.top = slt.style.top
        btn.style.position = "absolute"
        btn.style.width = slt.style.width
        btn.style.height = slt.style.height
        btn.style.backgroundColor="transparent"
        btn.style.border = "0px"
        btn.onclick = function () {
            funcRemove(idx)
        }
        

        document.getElementById("main").appendChild(btn)
    }
    else{
        btn.style.display="inline"
    }
}

function funcClick(idx)
{
    if (selectedNumbers[idx]==0)
    {
        return;
    }
    
}

var scores = new Array()
scores[1] = 0
scores[2] = 1
scores[3] = 3
scores[4] = 5
scores[5] = 7
scores[6] = 9
scores[7] = 11
scores[8] = 15
scores[9] = 20
scores[10] = 25
scores[11] = 30
scores[12] = 35
scores[13] = 40
scores[14] = 50
scores[15] = 60
scores[16] = 70
scores[17] = 80
scores[18] = 100
scores[19] = 150
scores[20] = 300

var selectedNumbers = new Array()
for (let idx = 0; idx < 20; idx++) {
    selectedNumbers[idx]=0
}

var maindiv = document.getElementById("main")
var mainbody = document.getElementById("body")

maindiv.style.height = pageHeight + "px"
maindiv.style.width = pageWidth + "px"
mainbody.style.height = pageHeight + "px"
mainbody.style.width = pageWidth + "px"

var topStart= 23
var leftStart = 18
var leftTic = 90
var topTic = 67
var fontScale = 40
var widthScale = 85
var heightScale = 68
for (let idx = 0; idx <= 19; idx++) {
    if (idx == 5)
    {
        leftStart-=1
    }
    else if (idx==6)
    {
        topStart+=1
    }
    else if (idx==15)
    {
        leftStart+=10
       
    }
    else if (idx==14)
    {
        topStart-=5
    }
    var slt = document.getElementById("select"+idx)
    slt.style.border="none"
    slt.style.fontSize = fontScale/1024*pageWidth+"px"
    slt.style.height = heightScale/1024*pageWidth+"px"
    slt.style.width = widthScale/1024*pageWidth+"px"
    slt.onchange=function()
    {
        funcChange(idx)
    }
    slt.onclick=function()
    {
        funcClick(idx)
    }
    
    slt.style.left = leftStart/1024*pageWidth +"px"
    slt.style.top = topStart/1024*pageWidth +"px"
    for (let idx2 = 0; idx2 <= 31; idx2++) {
        var opt = document.createElement("option")
        opt.innerHTML = (idx2)
        if (idx2==0 )
        {
            opt.innerHTML = ""
        }
        
        if (idx2==31)
        {
            opt.innerHTML = "&#9734"
        }
        slt.appendChild(opt)
            
    }
    if (idx<5)
    {
        leftStart+=leftTic
    }
    else if (idx <14)
    {
        topStart+=topTic
    }
    else{
        leftStart+=(leftTic-1)
    }
}


function setName()
    {
        var pName = document.getElementById("pName")
        var name =prompt("이름을 입력해 주세요.")
        if (name!=null)
        {
            pName.innerHTML=name
        }
    }