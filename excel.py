from typing import List
import xlwings as xw
from tkinter import filedialog
from tkinter import messagebox

def DP(boolean):
    if boolean==False:
        print("error")
        input()


class Node:
    def __init__(self,name) -> None:
        self.name = name
        self.children = []

    def insert(self, nameList: List[str], idx:int):
        if self.name != nameList[idx]:
            return False
        
        if len(nameList) <= idx+1:
            return True
        
        for i in range(len(self.children)):
            if self.children[i].insert(nameList,idx+1) == True:
                return True
        
        newNode = Node(nameList[idx+1])
        self.children.append(newNode)
        newNode.insert(nameList,idx+1)
        
        return True
    
    def merge(self, otherNode):
        DP(self.name == otherNode.name)
        lastMatch = 0
        for i in range(len(otherNode.children)):
            found = False
            for j in range(len(self.children)):
                if self.children[j].name == otherNode.children[i].name:
                    lastMatch = j
                    self.children[j].merge(otherNode.children[i])
                    found = True
                    break
            if found == False:
                self.children.insert(lastMatch,otherNode.children[i])
            
                
        
        

class Header:
    def __init__(self) -> None:
        self.root = Node('root')
        
    def insert(self, str: List[str]):
        """ col정보 (str)을 입력

        Args:
            str (List[str]): col 이름이 순서대로 적혀있는 List
            ex) ['주문중개','주문금액','바로결제주문금액']
        """
        self.root.insert(str,0)
    
    def merge(self, otherHeader):
        self.root.merge(otherHeader.root)
        pass
        

    
intToChar = [None]
for i in range(26):
    intToChar.append(chr(ord('A')+i))


def getCellName(row,col):
    return intToChar[col]+str(row)

class RefinedData:
    def __init__(self) -> None:
        self.code = None
        self.header = Header()
        self.startRow = None
        self.startCol = None
        self.maxCol = None
        self.maxRow = None
        self.startDataRow = None
        self.data = []
        self.sh = None
        self.colName = None
        
    def readFile(self,filepath):
        self.code = filepath.split(' ')[0]
        wb = xw.Book(filepath)
        idx = 0
        while '상세' not in wb.sheet_names[idx]:
            idx+=1
        self.sh = wb.sheets[idx]  

    
    def extractorHeader(self):
        ret = self.header
        sh = self.sh
        block = sh['c5'].expand().address.replace('$','')
        maxRow = int(block[block.index(':')+2:]) 
        maxCol = ord(block[block.index(':')+1])-ord('A')+1 # 'A' = 1 'Z' = 26
        startRow = maxRow
        startCol = maxCol
        while sh[getCellName(startRow,maxCol)].value != None:
            startRow -=1
        startRow += 1

        while startCol>0 and sh[getCellName(maxRow,startCol)].value != None:
            startCol-=1
        startCol+= 1
        
        startDataRow = startRow
        while True:
            found = False
            for i in range(startCol, maxCol+1):
                if type(sh[getCellName(startDataRow,i)].value)!=str:
                    found = True
                    break
            if found == True:
                break
            startDataRow+=1
        for col in range(startCol,maxCol+1):
            colHier=['root']
            for row in range(startRow, startDataRow):
                if sh[getCellName(row,col)].value!=colHier[-1]:
                    colHier.append(sh[getCellName(row,col)].value)
            ret.insert(colHier)
            
        self.startRow = startRow
        self.startCol = startCol
        self.maxCol = maxCol
        self.maxRow = maxRow
        self.startDataRow = startDataRow
        self.colName = [0] * (self.maxCol-self.startCol +2)
        for col in range(self.startCol, self.maxCol+1):
            self.colName[col] = self.sh[getCellName(startDataRow-1,col)].value
        return

            
    def extractData(self):
        for row in range(self.startDataRow, self.maxRow+1):
            tempDict = {}
            for col in range(self.startCol, self.maxCol+1):
                tempDict[self.colName[col]] = self.sh[getCellName(row,col)].value
            self.data.append(tempDict)
        pass
        
            
# exData = RefinedData()
# exData.readFile("KO012 temp.xlsx")
# exData.extractorHeader()
# exData.extractData()

if __name__ == "__main__":
    app = xw.App(visible=False)
    list_file = []
    files = filedialog.askopenfilenames(initialdir="C://Users//kim.jinhyun//Documents//VSCodeProjects//python",\
                 title = "파일을 선택 해 주세요",\
                    filetypes = (("*.xlsx","*xlsx"),("*.xls","*xls")))
    if files == '':
        messagebox.showwarning('경고','파일을 선택해주세요')
        exit()
    baseHeader = None
    maxHeaderLen = 0
    for f in files:
        exData = RefinedData()
        exData.readFile(f)
        exData.extractorHeader()
        exData.extractData()
        if maxHeaderLen < len(exData.colName):
            baseHeader = exData.header
            maxHeaderLen = len(exData.colName)
        list_file.append(exData)
    
    for ex in list_file:
        baseHeader.merge(ex.header)
    
    
    app.kill()
    input()
