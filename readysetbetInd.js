
var webSocket = new WebSocket("ws://localhost:9998");

webSocket.onopen = function(message){      
    console.log("Server connect...")    
};

webSocket.onmessage = function(message){      // 출력 area에 메시지를 표시한다.      
    console.log("Recieve From Server => "+message.data)    
};

pageHeight = document.documentElement.clientHeight
pageWidth = document.documentElement.clientWidth

mainBody.style.border = "0px"
mainBody.style.margin = "0px"
mainBody.style.paddingTop ="0px"

mainDiv.style.border = "0px"
mainDiv.style.margin = "0px"
mainDiv.style.paddingTop = pageWidth/5+"px" 

let ratios=[]
ratios[0]=[[[9,2],[8,2],[7,2]],[[5,3],[5,4]],[[4,3],[4,4]]]
ratios[1]=[[[7,0],[6,0],[5,1]],[[4,0],[4,1]],[[3,0],[3,1]]]
ratios[2]=[[[5,0],[4,0],[4,2]],[[3,2],[2,2]],[[2,0],[2,3]]]
ratios[3]=[[[3,0],[3,1],[3,2]],[[2,1],[2,5]],[[1,0],[1,2]]]
ratios[4]=[[[3,2],[3,3],[3,4]],[[2,5],[2,6]],[[1,1],[1,3]]]
ratios[5]=ratios[3]
ratios[6]=ratios[2]
ratios[7]=ratios[1]
ratios[8]=ratios[0]

let selectCoin = 0
let idcolor = "green"
let currentAvailabelSlots=[]
for (let i = 0; i < 9; i++) {
    currentAvailabelSlots.push([0,0,0])
}

function funcBet(color,selectCoidID,i,j){
    console.log(color,selectCoidID,i,j)
    webSocket.send(color+"_"+selectCoidID+"_"+i+"_"+j);
}



function funcSlotOccupied(i,j){
    let td = document.getElementById("betslot_"+i+"_"+j)
    
    if (j==0 && currentAvailabelSlots[i][j]==2){
        td.innerHTML="-"
        return
    } else if (j>0 && currentAvailabelSlots[i][j]==1){
        td.innerHTML="-"
        return
    } 

    currentAvailabelSlots[i][j]++
    

    td.innerHTML=ratios[i][j][currentAvailabelSlots[i][j]][0]+"x"
    if (ratios[i][j][currentAvailabelSlots[i][j]][1]>0){
        let btn = funcAddChild("button",td)
        btn.className="btnCircle"
        btn.innerHTML="-"+ratios[i][j][currentAvailabelSlots[i][j]][1]
        btn.style.backgroundColor="red"
        btn.style.width = btn.style.height = pageWidth/20+"px"
        btn.style.color = "white"
    }

}

function funcAddChild(type,parent){
    let child = document.createElement(type)
    parent.appendChild(child)
    return child
}
function funcDraw(){
    let headerChip = document.getElementById("headChips")
    
    headerChip.style.margin="0px"
    headerChip.style.padding="0px"
    headerChip.style.border="0px"
    headerChip.style.height = pageWidth/5+"px"
    let tblChip = funcAddChild("table",headerChip)
    tblChip.style.width = "100%"
    let trChip = funcAddChild("tr",tblChip)
    for (let i = 0; i < 5; i++) {
        let tdChip = funcAddChild("td",trChip)
        tdChip.style.width="10%"
        
        let img = funcAddChild("img",tdChip)
        img.src = "img/readysetbet/chips/green ("+(i+1)+").png"
        if (i==4){
            img.src = "img/readysetbet/chips/black ("+(i)+").png"
        }
        img.style.width = pageWidth/6+"px"
        img.style.borderRadius="100%"
        img.style.boxShadow="10px 10px gray"

    }

    let tblMain = document.getElementById('tblInd')
    tblMain.style.width = "100%"
    let tr = funcAddChild("tr",tblMain)
    let td = funcAddChild("td",tr)
    let tblProp = funcAddChild("table",td)
    tr = funcAddChild("tr",tblProp)
    for (let i = 0; i < 3; i++) {
        td = funcAddChild("td",tr)
        td.style.width="10%"
        let img = funcAddChild("img",td)
        img.src = "img/readysetbet/propbets/pro ("+i+").png"
        img.style.width = pageWidth/3.2+"px"
    }
    tr = funcAddChild("tr",tblMain)
    td = funcAddChild("td",tr)
    
    let tblProp2 = funcAddChild("table",td)
    tr = funcAddChild("tr",tblProp2)
    for (let i = 0; i < 2; i++) {
        td = funcAddChild("td",tr)
        td.style.width="10%"
        td.style.textAlign="right"
        if (i==1){
            td.style.textAlign="left"
        }
        let img = funcAddChild("img",td)
        img.src = "img/readysetbet/propbets/pro ("+(i+5)+").png"
        img.style.width = pageWidth/3.2+"px"
    }

    tr = funcAddChild("tr",tblMain)
    td = funcAddChild("td",tr)
    let tblInd = funcAddChild("table",td)
    tr = funcAddChild("tr",tblInd)
    td = funcAddChild("td",tr)
    td.style.width="10%"
    let img = funcAddChild("img",td)
    img.src = "img/readysetbet/horse/blue.png"
    img.style.width = pageWidth/4.4+"px"
    td = funcAddChild("td",tr)
    td.style.width="10%"
    img = funcAddChild("img",td)
    img.src = "img/readysetbet/horse/orange.png"
    img.style.width = pageWidth/4.4+"px"
    td = funcAddChild("td",tr)
    td.style.width="10%"
    img = funcAddChild("img",td)
    img.src = "img/readysetbet/horse/red.png"
    img.style.width = pageWidth/4.4+"px"
    td = funcAddChild("td",tr)
    td.style.width="10%"
    img = funcAddChild("img",td)
    img.src = "img/readysetbet/horse/black.png"
    img.style.width = pageWidth/4.4+"px"

    tr = funcAddChild("tr",tblInd)

    td = funcAddChild("td",tr)
    td.innerHTML="SHOW"
    td.style.fontSize = pageWidth/15+"px"
    td.className = "fontSHOW"

    td = funcAddChild("td",tr)
    td.innerHTML="PLACE"
    td.style.fontSize = pageWidth/15+"px"
    td.className = "fontPLACE"
    td = funcAddChild("td",tr)
    td.innerHTML="WIN"
    td.style.fontSize = pageWidth/15+"px"
    td.className = "fontWIN"


    for (let i = 0; i < 9; i++) {

        tr = funcAddChild("tr",tblInd)

        td = funcAddChild("td",tr)
        td.innerHTML=ratios[i][2][0][0]+"x"
        td.id = "betslot_"+i+"_2"
        td.style.fontSize = pageWidth/8+"px"
        td.className = "fontSHOW"
        if (ratios[i][2][0][1]>0){
            let btn = funcAddChild("button",td)
            btn.className="btnCircle"
            btn.innerHTML="-"+ratios[i][2][0][1]
            btn.style.backgroundColor="red"
            btn.style.width = btn.style.height = pageWidth/20+"px"
            btn.style.color = "white"
        }
    
        td = funcAddChild("td",tr)
        td.innerHTML=ratios[i][1][0][0]+"x"
        td.id = "betslot_"+i+"_1"
        td.style.fontSize = pageWidth/8+"px"
        td.className = "fontPLACE"
        if (ratios[i][1][0][1]>0){
            let btn = funcAddChild("button",td)
            btn.className="btnCircle"
            btn.innerHTML="-"+ratios[i][1][0][1]
            btn.style.backgroundColor="red"
            btn.style.width = btn.style.height = pageWidth/20+"px"
            btn.style.color = "white"
        }
    
        td = funcAddChild("td",tr)
        td.innerHTML=ratios[i][0][0][0]+"x"
        td.id = "betslot_"+i+"_0"
        if (ratios[i][0][0][1]>0){
            let btn = funcAddChild("button",td)
            btn.className="btnCircle"
            btn.innerHTML="-"+ratios[i][0][0][1]
            btn.style.backgroundColor="red"
            btn.style.width = btn.style.height = pageWidth/20+"px"
            btn.style.color = "white"
        }
        td.style.fontSize = pageWidth/8+"px"
        td.className = "fontWIN"
        td.onclick=function(){funcBet(idcolor,selectCoin,i,0)}
 

        td = funcAddChild("td",tr)
        td.style.width="10%"
        let img = funcAddChild("img",td)
        img.src = "img/readysetbet/horse/horse"+i+".png"
        img.style.width = pageWidth/4.2+"px"
    
    }



}

funcDraw()