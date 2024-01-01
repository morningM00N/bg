import asyncio;# 웹 소켓 모듈을 선언한다.
import websockets; # 클라이언트 접속이 되면 호출된다.
import random

true = True
false = False

def SWAP(arr,idx1,idx2):
    tmp = arr[idx1]
    arr[idx1]=arr[idx2]
    arr[idx2]=tmp
    return

def shuffle(arr):
    for _ in range(len(arr)*1000):
        idx1 = random.randint(0,len(arr)-1)
        idx2 = random.randint(0,len(arr)-1)
        SWAP(arr,idx1,idx2)

COLORS=["blue","brown","dark","green","pink","purple","silver","yellow"]
class ReadySetBet:
    def __init__(self) -> None:
        self.numOfExotic = 5
        self.numOfVips = 32
        self.numOfProps = 28
        self.curRound = 0
        self.exoticOrder=[]
        self.prosBets=[]
        self.vips=[]
        self.host = None
        self.players={}
        self.bet = {}
        
        for i in range(self.numOfExotic):
            self.exoticOrder.append(i)
        for i in range(self.numOfVips):
            self.vips.append(i)
        for i in range(self.numOfProps):
            self.prosBets.append(i)

        shuffle(self.exoticOrder)            
        shuffle(self.vips)            
        shuffle(self.prosBets)            
       
        self.bet["prop"]=[None]*5
        self.bet["color"]=[None]*4
        self.bet["exotic"]=[]
        for i in range(4):
            self.bet["exotic"].append([None]*3)
            
        self.bet["horse"]=[]
        for i in range(8):
            self.bet["horse"].append([[None]*3,[None]*2,[None*2]])
        pass

    def addUser(self,name,ws):
        if (len(self.players)>=8):
            return False
        if name in self.players:
            return False
        self.players[name]={"con":ws,"color":COLORS[len(self.players)]}
        return True
    
    def updateUserConnect(self,name,ws):
        if name not in self.players:
            return False
        self.players[name]["con"]=ws
        return True
    


print("server run")
clients = {}
async def accept(websocket, path):  
    while True:    # 클라이언트로부터 메시지를 대기한다.    
        try:
            if (websocket in clients)==False:
                clients[websocket]=0
                
            data = await websocket.recv()    
            print("receive : " + data)    # 클라인언트로 echo를 붙여서 재 전송한다.    
            for key in clients:
                if key==websocket: continue
                await key.send("echo : " + data) # 웹 소켓 서버 생성.호스트는 localhost에 port는 9998로 생성한다. 
        except Exception as e:
            print(e)
            pass

start_server = websockets.serve(accept, "192.168.1.139", 9998)# 비동기로 서버를 대기한다.
        
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

