import random
import time
DEBUG = False
def DP(b):
    if b==False:
        print("err")
        input()
def genInput(n,k,ratio):
    arr = []
    for _ in range(n):
        arr.append([0]*n)
        
    numOfFruits = int(n*n*ratio)
    if numOfFruits == 0:
        numOfFruits = 1
        
    for _ in range(numOfFruits):
        idx1 = random.randint(0,n-1)
        idx2 = random.randint(0,n-1)

        while arr[idx1][idx2] != 0:
            idx1 = random.randint(0,n-1)
            idx2 = random.randint(0,n-1)
            
        if random.randint(0,1) == 0:
            arr[idx1][idx2] = 1
        else:
            arr[idx1][idx2] = 2
            
    filters = []
    for _ in range(k):
        filters.append((random.randint(1,n),random.randint(1,n)))
    filters[0]=(10,10)
    if n<10:
        filters[0]=(n,n)
    idx1 = random.randint(1,len(filters)-1)
    while idx1==len(filters)-1:
        idx1 = random.randint(0,len(filters)-1)
    filters[-1] = (n>>1,n>>1)
    filters[idx1] = (random.randint(1,n>>1),random.randint(1,n>>1))
        
    return (arr,filters)

def naive(arr,filters):
    n = len(arr)
    numOfTwos = 0
    for i in range(n):
        for j in range(n):
            if arr[i][j]==2:
                numOfTwos+=1
                
    optimalSolution = numOfTwos
    for k in filters:
        #print(k)
        for i in range(n):
            if i+k[0] > n:
                break
            for j in range(n):
                if j+k[1] > n:
                    break
                delta = 0 
                for i2 in range(i,i+k[0]):
                    for j2 in range(j,j+k[1]):
                        #print(f"({i2},{j2}):{arr[i2][j2]}",end=" ")
                        if arr[i2][j2]==1:
                            delta+=1
                        elif arr[i2][j2]==2:
                            delta-=1
                    #print("")
                #print("")
                if optimalSolution < delta +numOfTwos:
                    optimalSolution = delta +numOfTwos
    return optimalSolution
                
def ad(arr,filters):
    n = len(arr)
    pTable=[]
    for _ in range(n+1):
        pTable.append([0]*(n+1))
    for i in range(1,n+1):
        pTable[0][i] = pTable[i][0]=0

    for i in range(0,n):
        for j in range(0,n):
            pTable[i+1][j+1] = pTable[i][j+1]+pTable[i+1][j]-pTable[i][j]
            if arr[i][j]==1:
                pTable[i+1][j+1]+=1
            elif arr[i][j]==2:
                pTable[i+1][j+1]-=1
    if DEBUG:
        for i in range(n):
            for j in range(n):
                val = 0
                for i2 in range(i+1):
                    for j2 in range(j+1):
                        if arr[i2][j2]==1:
                            val+=1
                        elif arr[i2][j2]==2:
                            val-=1
                DP(val == pTable[i+1][j+1])
                            
        
    #show(pTable)
    numOfTwos = 0
    for i in range(n):
        for j in range(n):
            if arr[i][j]==2:
                numOfTwos+=1
                
    optimalSolution = numOfTwos
    
    
    for k in filters:
        for i in range(n):
            if i+k[0] > n:
                break
            for j in range(n):
                if j+k[1] > n:
                    break
                delta = pTable[i][j]+pTable[i+k[0]][j+k[1]]-pTable[i+k[0]][j]-pTable[i][j+k[1]]
                if optimalSolution < delta +numOfTwos:
                    optimalSolution = delta +numOfTwos
    return optimalSolution
        
        
def show(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n):
            print(f"({i},{j}):{arr[i][j]}",end=" ")
        print("")

random.seed(0)

while True:      
    seedVal = random.randint(0,10000000)
    print(seedVal)
    random.seed(seedVal)
    ratio = random.randint(3,6)/10
    n=random.randint(10,1000)
    k= random.randint(10,20)
    print(f"n:{n} k:{k}")
    (arr,F) = genInput(n,k,ratio)
    #show(arr)
    start = time.time()
    #opt1 = naive(arr,F)
    time1 = time.time()-start
    start = time.time()
    opt2 = ad(arr,F)
    time2 = time.time()-start
    #DP(opt1==opt2)
    print(time1,time2)
    #print("")


input()
#print(arr)
    
        
