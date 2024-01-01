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
        funcCalculate(100000)
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
let colorTable = funcAddChild("table",document.getElementById("body"))
tr = funcAddChild("tr",colorTable)
td = funcAddChild("td",tr)
td.rowSpan=4
td.innerHTML="blue"
td = funcAddChild("td",tr)
td.id="id_blue_0"
td.innerHTML=td.id
td = funcAddChild("td",tr)
td.rowSpan=4
td.innerHTML="orange"
td = funcAddChild("td",tr)
td.id="id_orange_0"
td.innerHTML=td.id
td = funcAddChild("td",tr)
td.rowSpan=4
td.innerHTML="red"
td = funcAddChild("td",tr)
td.id="id_red_0"
td.innerHTML=td.id
td = funcAddChild("td",tr)
td.rowSpan=4
td.innerHTML="black"
td = funcAddChild("td",tr)
td.id="id_black_0"
td.innerHTML=td.id

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
            let ret = []
            let result = [0,0,0,0,0,0,0,0,0]
            result[target]=1
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
                    result[i]=2
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
                        result[i]=3
                    }
                }
            }
            //console.log("locs",locs)
            //console.log("result",result)
            for (let horse = 0; horse < 9; horse++) {
                ret[horse] = []
                for (let i = 0; i < 7; i++) {
                    ret[horse][i]=[]
                    for (let chip = 0; chip < 4; chip++) {
                        if (i<3){
                            if (result[horse]==1){
                                ret[horse][i][chip]=(chip+2)*ratios[horse][i][0]
                            } else{
                                ret[horse][i][chip]=-1*ratios[horse][i][1]
                            }
                        } else if (i<5){
                            if (result[horse]==1 || result[horse]==2){
                                ret[horse][i][chip]=(chip+2)*ratios[horse][i][0]
                            } else{
                                ret[horse][i][chip]=-1*ratios[horse][i][1]
                            }

                        }
                        else{
                            if (result[horse]==1 || result[horse]==2 || result[horse]==3){
                                ret[horse][i][chip]=(chip+2)*ratios[horse][i][0]
                            } else{
                                ret[horse][i][chip]=-1*ratios[horse][i][1]
                            }

                        }
                    }
                    
                }                
            }
            return ret
        }
    }
}

function funcCalculate(numOfTries){
    let total = []
    for (let horse = 0; horse < 9; horse++) {
        total[horse]=[]
        for (let bet = 0; bet < 7; bet++) {
            total[horse][bet]=[0,0,0,0]
        }
    }
    for (let index = 0; index < numOfTries; index++) {
        let ret = funcSimul()
        //console.log("ret",ret)
        for (let i = 0; i < total.length; i++) {
            for (let j  = 0; j < total[i].length; j++) {
                for (let k = 0; k < total[i][j].length; k++) {
                    total[i][j][k]+=ret[i][j][k]                    
                }
            }
        }
        continue

    }

    for (let i = 0; i < total.length; i++) {
        for (let j  = 0; j < total[i].length; j++) {
            for (let k = 0; k < total[i][j].length; k++) {
                document.getElementById("id_"+i+"_"+j+"_"+k).innerHTML=Math.round(100*total[i][j][k]/numOfTries)/100
            }
        }
    }

}