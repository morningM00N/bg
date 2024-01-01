
let tries = 100000

let next = 1
function random(max){
    return Math.random()*max|0
}

function funcAddChild(tag,parent){
    let ret = document.createElement(tag)
    parent.appendChild(ret)
    return ret
}
let ratios = []
ratios[0]=[[9,2],[8,2],[7,2],[5,3],[5,4],[4,3],[4,4]]
ratios[1]=[[7,0],[6,0],[5,1],[4,0],[4,1],[3,0],[3,1]]
ratios[2]=[[5,0],[4,0],[4,2],[3,2],[2,2],[2,0],[2,3]]
ratios[3]=[[3,0],[3,1],[3,2],[2,4],[2,5],[1,0],[1,2]]
ratios[4]=[[3,3],[3,3],[3,4],[2,5],[2,6],[1,1],[1,3]]
ratios[5]=ratios[3]
ratios[6]=ratios[2]
ratios[7]=ratios[1]
ratios[8]=ratios[0]

let curLoc = [0,0,0,0,0,0,0,0,0]
let lastSelect = undefined

let tr,td
let colorTable = funcAddChild("table",document.getElementById("body"))
tr = funcAddChild("tr",colorTable)

td = funcAddChild("td",tr)
td.colSpan=2
td.innerHTML="blue"

td = funcAddChild("td",tr)
td.colSpan=2
td.innerHTML="orange"

td = funcAddChild("td",tr)
td.colSpan=2
td.innerHTML="red"

td = funcAddChild("td",tr)
td.colSpan=2
td.innerHTML="black"

tr = funcAddChild("tr",colorTable)
td = funcAddChild("td",tr)
td.id="id_blue_0"
td.innerHTML=td.id
td = funcAddChild("td",tr)
td.id="id_blue_percent"
td.rowSpan=5
td.innerHTML=td.id
td = funcAddChild("td",tr)
td.id="id_orange_0"
td.innerHTML=td.id
td = funcAddChild("td",tr)
td.id="id_orange_percent"
td.rowSpan=5
td.innerHTML=td.id
td = funcAddChild("td",tr)
td.id="id_red_0"
td.innerHTML=td.id
td = funcAddChild("td",tr)
td.id="id_red_percent"
td.rowSpan=5
td.innerHTML=td.id
td = funcAddChild("td",tr)
td.id="id_black_0"
td.innerHTML=td.id
td = funcAddChild("td",tr)
td.id="id_black_percent"
td.rowSpan=5
td.innerHTML=td.id

for (let i = 0; i < 3; i++) {
    tr = funcAddChild("tr",colorTable)
    td = funcAddChild("td",tr)
    td.id = "id_blue_"+(i+1)
    td.innerHTML=td.id
    td = funcAddChild("td",tr)
    td.id = "id_orange_"+(i+1)
    td.innerHTML=td.id
    td = funcAddChild("td",tr)
    td.id = "id_red_"+(i+1)
    td.innerHTML=td.id
    td = funcAddChild("td",tr)
    td.id = "id_black_"+(i+1)
    td.innerHTML=td.id

}
funcAddChild("br",document.getElementById("body"))
let mainTable = funcAddChild("table",document.getElementById("body"))
tr = funcAddChild("tr",mainTable)
td = funcAddChild("td",tr)
td.rowSpan=2
td.colSpan=4
td.innerHTML = "show"
td = funcAddChild("td",tr)
td.rowSpan=2
td.colSpan=4
td.innerHTML = "place"
td = funcAddChild("td",tr)
td.rowSpan=2
td.colSpan=6
td.innerHTML = "win"
td = funcAddChild("td",tr)
td.rowSpan=2
td.innerHTML="horse"
td = funcAddChild("td",tr)
td.rowSpan=2
td.innerHTML="location"
td = funcAddChild("td",tr)
td.colSpan=3
td.innerHTML="ratio"
tr = funcAddChild("tr",mainTable)
td = funcAddChild("td",tr)
td.innerHTML="win"
td = funcAddChild("td",tr)
td.innerHTML="place"
td = funcAddChild("td",tr)
td.innerHTML="show"
for (let horse = 0; horse < 9; horse++) {
    tr = funcAddChild("tr",mainTable)
    for (let index = 6; index >= 0; index--) {
        td = funcAddChild("td",tr)
        td.rowSpan=4
        td.innerHTML=ratios[horse][index][0]+"x"
        if (ratios[horse][index][1]>0){
            td.innerHTML+="/-"+ratios[horse][index][1]
        }
        td = funcAddChild("td",tr)
        td.id = "id_"+horse+"_"+index+"_0"
        //td.innerHTML=td.id
    }
    for (let index = 0; index < 3; index++) {
        let tr = funcAddChild("tr",mainTable)    
        for (let i = 6; i >= 0; i--) {
            td = funcAddChild("td",tr)
            td.id = "id_"+horse+"_"+i+"_"+(index+1)
            //td.innerHTML=td.id
        }
           
    }
    td=funcAddChild("td",tr)
    td.rowSpan=4
    td.innerHTML=horse+3
    if (horse==0){
        td.innerHTML="2/3"
    } else if (horse==8){
        td.innerHTML="11/12"
    }
    td.onclick = function(){
        curLoc[horse]+=1
        lastSelect=horse
        document.getElementById("idLoc_"+horse).innerHTML=curLoc[horse]
        funcCalculate(tries)
    }
    td=funcAddChild("td",tr)
    td.rowSpan=4
    td.id = "idLoc_"+horse
    td.innerHTML=0

    for (let idx = 0; idx < 3; idx++) {
        td=funcAddChild("td",tr)
        td.rowSpan=4
        td.id = "idOrder_"+horse+"_"+idx
           
    }


}

let colorRatio={
    "blue":[5,1],
    "orange":[3,1],
    "red":[2,1],
    "black":[4,0],
}
funcAddChild("br",document.getElementById("body"))


let diceToIdx=[]
diceToIdx[2]=0
diceToIdx[3]=0
diceToIdx[4]=1
diceToIdx[5]=2
diceToIdx[6]=3
diceToIdx[7]=4
diceToIdx[8]=5
diceToIdx[9]=6
diceToIdx[10]=7
diceToIdx[11]=8
diceToIdx[12]=8

let bonus = []
bonus[0]=3
bonus[1]=3
bonus[2]=2
bonus[3]=1
bonus[4]=0
bonus[5]=1
bonus[6]=2
bonus[7]=3
bonus[8]=3

let color = []
color[0]=color[1]=color[7]=color[8]="blue"
color[2]=color[6]="orange"
color[3]=color[5]="red"
color[4]="black"

function funcSimul(){
    let locs = []
    let lastTarget = lastSelect
    for (let i = 0; i < curLoc.length; i++) {
        locs[i]=curLoc[i]
    }
    while (true){
        let dice1 = random(6)+1
        let dice2 = random(6)+1
        let target = diceToIdx[dice1+dice2]
        locs[target]+=1
        if (target==lastTarget){
            locs[target]+=bonus[target]
        }
        lastTarget=target
        if (locs[target]>=15 ){
            

            let numOfAdvanedTo7=0
            for (let i = 0; i < 9; i++) {
                if (locs[i]>locs[4]){
                    ++numOfAdvanedTo7
                }
            }
            let ret = [target,[],[],(numOfAdvanedTo7+1)]
            let maxLoc = 0
            for (let i = 0; i < 9; i++) {
                if (i==target){
                    continue
                }
                if (locs[i]>maxLoc){
                    maxLoc=locs[i]
                }
            }
            let numOfSecond=0
            for (let i = 0; i < 9; i++) {
                if (i==target){
                    continue
                }
                if (locs[i]==maxLoc){
                    ret[1].push(i)
                    numOfSecond+=1
                }
            }
            if (numOfSecond==1){
                let maxLoc2 = 0
                for (let i = 0; i < 9; i++) {
                    if (i==target){
                        continue
                    }
                    if (locs[i]==maxLoc){
                        continue
                    }
                    if (locs[i]>maxLoc2){
                        maxLoc2=locs[i]
                    }
                }
                for (let i = 0; i < 9; i++) {
                    if (i==target){
                        continue
                    }
                    if (locs[i]==maxLoc){
                        continue
                    }
                    if (locs[i]==maxLoc2){
                        ret[2].push(i)
                    }
                }
            }

            return ret
        }
    }
}

function funcCalculate(numOfTries){

    let startTime = Date.now()

    let blackWins = 0
    let wins=[]
    for (let horse = 0; horse < 9; horse++) {
        wins[horse]=[0,0,0]
    }
    for (let index = 0; index < numOfTries; index++) {
        let ret = funcSimul()
        wins[ret[0]][0]+=1
        for (let i = 0; i < ret[1].length; i++) {
            wins[ret[1][i]][1]+=1
        }
        for (let i = 0; i < ret[2].length; i++) {
            wins[ret[2][i]][2]+=1
        }
        if (ret[3]>=5){
            blackWins+=1
        }
    }

    let bestLocs=[
        [[0],[0],[0],[0],[0],[0]],
        [[0],[0],[0],[0],[0],[0]],
        [[0],[0],[0],[0],[0],[0]],
        [[0],[0],[0],[0],[0],[0]]
    ]

    for (let i = 0; i < 9; i++) {
        for (let j  = 0; j < 7; j++) {
            for (let k = 0; k < 4; k++) {
                let gain
                if (j<3){
                    gain = (k+2)*wins[i][0]*ratios[i][j][0]-(numOfTries-wins[i][0])*ratios[i][j][1]
                } else if (j<5){
                    gain = (k+2)*(wins[i][0]+wins[i][1])*ratios[i][j][0]-(numOfTries-wins[i][0]-wins[i][1])*ratios[i][j][1]
                } else{
                    gain = (k+2)*(wins[i][0]+wins[i][1]+wins[i][2])*ratios[i][j][0]-(numOfTries-wins[i][0]-wins[i][1]-wins[i][2])*ratios[i][j][1]
                }
                let targetIdx = 5
                for (let idx = 4; idx >= 0; --idx){
                    if (gain>bestLocs[k][idx][0]){
                        bestLocs[k][idx+1][0]=bestLocs[k][idx][0]
                        bestLocs[k][idx+1][1]=bestLocs[k][idx][1]
                        targetIdx=idx
                    }
                }
                bestLocs[k][targetIdx][0]=gain
                bestLocs[k][targetIdx][1]="id_"+i+"_"+j+"_"+k

                document.getElementById("id_"+i+"_"+j+"_"+k).innerHTML=Math.round(10*gain/numOfTries)/10
                document.getElementById("id_"+i+"_"+j+"_"+k).style.color=""
                document.getElementById("id_"+i+"_"+j+"_"+k).style.backgroundColor=""
            }
        }
        for (let j = 0; j < 3; j++) {
            document.getElementById("idOrder_"+i+"_"+j).innerHTML=Math.round(100*wins[i][j]/numOfTries)+"%"
        }
    }


    let blueWins = wins[0][0] + wins[1][0] + wins[7][0] + wins[8][0]
    let orangeWins = wins[2][0] + wins[6][0]
    let redWins = wins[3][0] + wins[5][0]

    for (let chip = 0; chip < 4; chip++) {
        let k = chip
        let gain = (chip+2)*blueWins*5-(numOfTries-blueWins)
        document.getElementById("id_blue_"+chip).innerHTML=Math.round(10*gain/numOfTries)/10
        document.getElementById("id_blue_"+chip).style.color=""
        document.getElementById("id_blue_"+chip).style.backgroundColor=""
        document.getElementById("id_blue_percent").innerHTML=Math.round(100*blueWins/numOfTries)+"%"

        let targetIdx = 5
        for (let idx = 4; idx >= 0; --idx){
            if (gain>bestLocs[k][idx][0]){
                bestLocs[k][idx+1][0]=bestLocs[k][idx][0]
                bestLocs[k][idx+1][1]=bestLocs[k][idx][1]
                targetIdx=idx
            }
        }
        bestLocs[k][targetIdx][0]=gain
        bestLocs[k][targetIdx][1]="id_blue_"+chip



        
        gain = (chip+2)*orangeWins*3-(numOfTries-orangeWins)
        document.getElementById("id_orange_"+chip).innerHTML=Math.round(10*gain/numOfTries)/10
        document.getElementById("id_orange_"+chip).style.color=""
        document.getElementById("id_orange_"+chip).style.backgroundColor=""
        document.getElementById("id_orange_percent").innerHTML=Math.round(100*orangeWins/numOfTries)+"%"
        targetIdx = 5
        for (let idx = 4; idx >= 0; --idx){
            if (gain>bestLocs[k][idx][0]){
                bestLocs[k][idx+1][0]=bestLocs[k][idx][0]
                bestLocs[k][idx+1][1]=bestLocs[k][idx][1]
                targetIdx=idx
            }
        }
        bestLocs[k][targetIdx][0]=gain
        bestLocs[k][targetIdx][1]="id_orange_"+chip


        gain = (chip+2)*redWins*2-(numOfTries-redWins)
        document.getElementById("id_red_"+chip).innerHTML=Math.round(10*gain/numOfTries)/10
        document.getElementById("id_red_"+chip).style.color=""
        document.getElementById("id_red_"+chip).style.backgroundColor=""
        document.getElementById("id_red_percent").innerHTML=Math.round(100*redWins/numOfTries)+"%"
        targetIdx = 5
        for (let idx = 4; idx >= 0; --idx){
            if (gain>bestLocs[k][idx][0]){
                bestLocs[k][idx+1][0]=bestLocs[k][idx][0]
                bestLocs[k][idx+1][1]=bestLocs[k][idx][1]
                targetIdx=idx
            }
        }
        bestLocs[k][targetIdx][0]=gain
        bestLocs[k][targetIdx][1]="id_red_"+chip
        gain = (chip+2)*blackWins*4
        document.getElementById("id_black_"+chip).innerHTML=Math.round(10*gain/numOfTries)/10
        document.getElementById("id_black_"+chip).style.color=""
        document.getElementById("id_black_"+chip).style.backgroundColor=""
        document.getElementById("id_black_percent").innerHTML=Math.round(100*orangeWins/numOfTries)+"%"
        targetIdx = 5
        for (let idx = 4; idx >= 0; --idx){
            if (gain>bestLocs[k][idx][0]){
                bestLocs[k][idx+1][0]=bestLocs[k][idx][0]
                bestLocs[k][idx+1][1]=bestLocs[k][idx][1]
                targetIdx=idx
            }
        }
        bestLocs[k][targetIdx][0]=gain
        bestLocs[k][targetIdx][1]="id_black_"+chip
    }

    for (let index = 0; index < bestLocs.length; index++) {
        
        for (let j = 0; j < 5; j++) {
            document.getElementById(bestLocs[index][j][1]).style.color="red"
        }
        document.getElementById(bestLocs[index][0][1]).style.backgroundColor="red"
        document.getElementById(bestLocs[index][0][1]).style.color="white"
    }
    
    console.log(Date.now()-startTime)

}

funcCalculate(tries)