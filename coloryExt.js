let htmlsrc

let rawFile = new XMLHttpRequest();
rawFile.open("GET", 'colory.html', false);
rawFile.setRequestHeader('Content-Type', 'text/html;charset=utf-8')
rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
            htmlsrc = rawFile.responseText;
        }
    }
}

rawFile.send(null);

let contents = htmlsrc.split('<div class="chart-grad">')[1]
contents = contents.replace(/\r|\n|\t/g, '')
contents = contents.replace(/  /g, '')
let tokens = contents.split(/="|<|">/)
let locationName
let storeName
let count = {};
let countTotal = 0
for (let idx = 0; idx < tokens.length; idx++) {
    if (tokens[idx] == "select-area") {
        //console.log('지역명', tokens[idx + 1])
        locationName = tokens[idx + 1]
            ++idx
    }
    if (tokens[idx] == "grad-3" || tokens[idx] == "grad-3 done") {
        storeName = tokens[idx + 1]
            ++idx
            //console.log('매장명', tokens[idx + 1])
    }
    if (tokens[idx] == "grad-4 done") {
        console.log(locationName + "\t" + storeName + "\t" + tokens[idx + 1])
        if (count[locationName] == undefined) {
            count[locationName] = 1
        } else {
            ++count[locationName]
        }
        ++countTotal
    }
}
console.log(countTotal)
