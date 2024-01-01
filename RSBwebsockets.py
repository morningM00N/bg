import asyncio
import random
import websockets
import json
import time

def DP(b):
    if b==False:
        print("err")
        input()

false = False
true = True
class ReadySetBet:
    def __init__(self) -> None:
        try:
            self.ratios = [None]*9
            self.ratios[0] = [[[9, 2], [8, 2], [7, 2],[0,0]], [[5, 3], [5, 4],[0,0]], [[4, 3], [4, 4],[0,0]]]
            self.ratios[1] = [[[7, 0], [6, 0], [5, 1],[0,0]], [[4, 0], [4, 1],[0,0]], [[3, 0], [3, 1],[0,0]]]
            self.ratios[2] = [[[5, 0], [4, 0], [4, 2],[0,0]], [[3, 2], [2, 2],[0,0]], [[2, 0], [2, 3],[0,0]]]
            self.ratios[3] = [[[3, 0], [3, 1], [3, 2],[0,0]], [[2, 1], [2, 5],[0,0]], [[1, 0], [1, 2],[0,0]]]
            self.ratios[4] = [[[3, 2], [3, 3], [3, 4],[0,0]], [[2, 5], [2, 6],[0,0]], [[1, 1], [1, 3],[0,0]]]
            self.ratios[5] = self.ratios[3]
            self.ratios[6] = self.ratios[2]
            self.ratios[7] = self.ratios[1]
            self.ratios[8] = self.ratios[0]

            self.colors=["blue", "brown", "dark", "green", "pink", "purple", "silver", "yellow"]
            self.host=None
            self.curRound = 0
            self.exoticOrder=[]
            for _ in range(4):
                idx = random.randint(0,4)
                while idx in self.exoticOrder:
                    idx = random.randint(0,4)
                self.exoticOrder.append(idx)
            self.propOrder=[]
            for _ in range(20):
                idx = random.randint(0,27)
                while idx in self.propOrder:
                    idx = random.randint(0,27)
                self.propOrder.append(idx)
            self.vip=[]
            for _ in range(32):
                self.vip.append(False)
            self.players={}
            self.betColors=None
            self.betProp=None
            self.betExotic=None
            self.betHorse=None
            self.usedCoins={}
            self.sendVIPs={}
            self.initBet()
                
        except Exception as e:
            print(e)
        pass
    
    async def toHost(self,message):
        await self.host.send(message)  

    async def broadcast(self,message):
        for key in self.players:
            await self.players[key][0].send(message)
          
    def joinPlayer(self,name,wc):
        if len(self.players)>=8:
            return "FULL"
        if name in self.players:
            return False
        color = self.colors[len(self.players)]
        self.players[name] = (wc,color)
        print(f"player {color} join")
        self.usedCoins[color] = [0,0,0,0,0]
        self.sendVIPs[color] = [None,None]
        return color
    
    def leavePlayer(self,wc):
        removedKey = None
        for key in self.players:
            if self.players[key][0]==wc:
                removedKey = key
                break
        if removedKey!=None:
            print(f"player {self.players[key][1]} leave")
            self.players.pop(removedKey)
    def getColor(self,wc):
        for key in self.players:
            if self.players[key][0]==wc:
                return self.players[key][1]
        DP(False)
        
    def initBet(self):
        self.betColors=[False,False,False,False]
        self.betProp=[False,False,False,False,False]
        self.betExotic=[0,0,0,0]
        self.betHorse=[
            [0,0,0],
            [0,0,0],
            [0,0,0],
            [0,0,0],
            [0,0,0],
            [0,0,0],
            [0,0,0],
            [0,0,0],
            [0,0,0]]
        for key in self.usedCoins:
            self.usedCoins[key] = [0,0,0,0,0]
        for key in self.sendVIPs:
            self.sendVIPs[key] = [None,None]
        
            
                
        
        

games={}
wcToGame={}
async def handler(websocket):
    print("connected")
    while True:
        try:
            message = await websocket.recv()
            event=json.loads(message)
            print(event)
            if event['type']=='newgame':
                if event['room'] in games:
                    event2 = {
                        "type":"newgame",
                        "value": "false"
                    }
                    await websocket.send(json.dumps(event2))    
                else:
                    newGame =ReadySetBet()
                    newGame.host = websocket
                    games[event['room']] =newGame 
                    event2 = {
                        "type":"newgame",
                        "value": "true"
                    }
                    wcToGame[websocket] = newGame
                    await newGame.toHost(json.dumps(event2))    
            elif event['type']=='join':
                if event['room'] not in games:
                    event2 = {
                        "type":"join",
                        "value": "false",
                        "error": "NOROOM"
                    }
                    await websocket.send(json.dumps(event2))    
                else:
                    thisGame:ReadySetBet = games[event['room']]
                    color = thisGame.joinPlayer(event['name'],websocket)
                    if color==False:
                        event2 = {
                            "type":"join",
                            "value": "false",
                            "error": "EXISTNAME"
                        }
                        await websocket.send(json.dumps(event2))    
                    elif color =="FULL":
                        event2 = {
                            "type":"join",
                            "value": "false",
                            "error": "FULL"
                        }
                        await websocket.send(json.dumps(event2))    
                    else:
                        event2 = {
                            "type":"join",
                            "value": "true",
                            "color":color
                        }
                        wcToGame[websocket]=thisGame
                        await websocket.send(json.dumps(event2))    
                    continue
                
            elif event['type']=='vip':
                color = thisGame.getColor(websocket)
                if type(thisGame.sendVIPs[color])==int:
                    return

                selectIdx = int(event['value'])
                selectVIPIdx = thisGame.sendVIPs[color][selectIdx]
                returnVIPIdx = thisGame.sendVIPs[color][(selectIdx+1)%2]
                
                thisGame.sendVIPs[color] = selectVIPIdx
                DP(thisGame.vip[selectVIPIdx]==True)
                DP(thisGame.vip[returnVIPIdx]==True)
                thisGame.vip[returnVIPIdx]=False
                
                if selectVIPIdx>=2 and selectVIPIdx<=7:
                    event2 = {
                        "type":"set",
                        "target":"chip",
                        "color":"white",
                        "value":(selectVIPIdx-1)
                    }
                    await websocket.send(json.dumps(event2))
                elif selectVIPIdx>=8 and selectVIPIdx<=13:
                    event2 = {
                        "type":"set",
                        "target":"chip",
                        "color":"black",
                        "value":(selectVIPIdx-7)
                    }
                    await websocket.send(json.dumps(event2))
                
                
                
                
            elif event['type']=='round':
                print(event)
                DP(websocket in wcToGame)
                thisGame:ReadySetBet = wcToGame[websocket]
                DP(thisGame.host == websocket)
                if thisGame.curRound+1 != event["value"]:
                    event2 = {
                        "type":"round",
                        "value": "false"
                    }
                    await newGame.toHost(json.dumps(event2))    
                else:
                    thisGame.initBet()
                    thisGame.curRound+=1
                    
                    event2 = {
                        "type":"set",
                        "target":"chip",
                        "color":"none"
                    }
                    await thisGame.broadcast(json.dumps(event2))   
                    
                    event2 = {
                        "type":"set",
                        "target":"exotic",
                        "loc":thisGame.curRound,
                        "value":thisGame.exoticOrder[thisGame.curRound-1]
                    }
                    await websocket.send(json.dumps(event2)) 
                    await thisGame.broadcast(json.dumps(event2))   
                    
                    for i in range(5):
                        event2 = {
                            "type":"set",
                            "target":"prop",
                            "loc":(i+1),
                            "value":thisGame.propOrder[i+5*(thisGame.curRound-1)]
                        }
                        await websocket.send(json.dumps(event2)) 
                        await thisGame.broadcast(json.dumps(event2))   
                    for i in range(4):
                        event2 = {
                            "type":"set",
                            "target":"color",
                            "loc":i,
                        }
                        await thisGame.broadcast(json.dumps(event2))   
                    for horse in range(9):
                        for order in range(3):
                            event2 = {
                                "type":"set",
                                "target":"horse",
                                "horse":horse,
                                "order":order,
                                "product":thisGame.ratios[horse][order][0][0],
                                "minus":thisGame.ratios[horse][order][0][1]
                            }
                            await thisGame.broadcast(json.dumps(event2))   
                    for p in thisGame.players:
                        color = thisGame.players[p][1]
                        wc = thisGame.players[p][0]
                        vip1 = random.randint(0,31)
                        while thisGame.vip[vip1]==True:
                            vip1 = random.randint(0,31)
                        thisGame.vip[vip1]=True
                        vip2 = random.randint(0,31)
                        while thisGame.vip[vip2]==True:
                            vip2 = random.randint(0,31)
                        thisGame.vip[vip2]=True
                        thisGame.sendVIPs[color]=[vip1,vip2]
                        event2 = {
                            "type":"set",
                            "target":"vip",
                            "value1":vip1,
                            "value2":vip2
                        }
                        await wc.send(json.dumps(event2))   
                        
                        
                        
                        
                        
            elif event['type'] == 'bet':
                color = thisGame.getColor(websocket)
                coinValue = int(event['value'])
                if (coinValue==2 and thisGame.usedCoins[color][coinValue-1]>=2) or (coinValue!=2 and thisGame.usedCoins[color][coinValue-1]>=1):
                    event2 = {
                        "type":"bet",
                        "target":"error",
                        "value":"coinFalse"
                    }
                    await websocket.send(json.dumps(event2))
                else:

                    newColor = color
                    newValue = coinValue
                    
                    if coinValue==5:
                        DP(thisGame.sendVIPs[color]>=2 and thisGame.sendVIPs[color]<=13)
                        newColor = "white"
                        newValue = thisGame.sendVIPs[color]-1
                        if thisGame.sendVIPs[color]>=8 and thisGame.sendVIPs[color]<=13:
                            newColor="black"
                            newValue = thisGame.sendVIPs[color]-7
                    
                    if event['target'] == 'color':
                        thisGame:ReadySetBet = wcToGame[websocket]
                        if thisGame.betColors[int(event['loc'])]==False:
                            thisGame.betColors[int(event['loc'])]=True
                            thisGame.usedCoins[color][coinValue-1]+=1
                            event2 = {
                                "type":"bet",
                                "target":"color",
                                "loc": event['loc'],
                                "color":newColor,
                                "value":newValue
                            }
                            await thisGame.toHost(json.dumps(event2))    
                            event2 = {
                                "type":"bet",
                                "target":"color",
                                "loc": event['loc'],
                                "value":"done"
                            }
                            await thisGame.broadcast(json.dumps(event2))    

                        else:
                            event2 = {
                                "type":"bet",
                                "target":"color",
                                "value":"False"
                            }
                            await websocket.send(json.dumps(event2))    
                            
                            pass
                            
                        pass
                    elif event['target'] == 'prop':
                        print("prop loop")
                        thisGame:ReadySetBet = wcToGame[websocket]
                        if thisGame.betProp[int(event['loc'])-1]==False:
                            thisGame.betProp[int(event['loc'])-1]=True
                            thisGame.usedCoins[color][coinValue-1]+=1
                            event2 = {
                                "type":"bet",
                                "target":"prop",
                                "loc": event['loc'],
                                "color":newColor,
                                "value":newValue
                            }
                            await thisGame.toHost(json.dumps(event2))    
                            event2 = {
                                "type":"bet",
                                "target":"prop",
                                "loc": event['loc'],
                                "value":"done"
                            }
                            await thisGame.broadcast(json.dumps(event2))    
                        else:
                            event2 = {
                                "type":"bet",
                                "target":"prop",
                                "value":"False"
                            }
                            await websocket.send(json.dumps(event2))    
                    elif event['target'] == 'exotic':
                        print("exotic loop")
                        thisGame:ReadySetBet = wcToGame[websocket]
                        if thisGame.betExotic[int(event['loc'])-1]<3:
                            event2 = {
                                "type":"bet",
                                "target":"exotic",
                                "loc": str(event['loc'])+"_"+str(thisGame.betExotic[int(event['loc'])-1]),
                                "color":newColor,
                                "value":newValue
                            }
                            await thisGame.toHost(json.dumps(event2))
                            if thisGame.betExotic[int(event['loc'])-1]==2:
                                event2 = {
                                    "type":"bet",
                                    "target":"exotic",
                                    "loc": event['loc'],
                                    "value":"done"
                                }
                                await thisGame.broadcast(json.dumps(event2))    
                            thisGame.betExotic[int(event['loc'])-1]+=1
                            thisGame.usedCoins[color][coinValue-1]+=1
                        else:
                            event2 = {
                                "type":"bet",
                                "target":"prop",
                                "value":"False"
                            }
                            await websocket.send(json.dumps(event2))  
                    elif event['target'] == 'horse':
                        print("horse loop")
                        thisGame:ReadySetBet = wcToGame[websocket]
                        horseNumber = int(event["horse"])
                        orderValue = int(event["order"])
                        if thisGame.betHorse[horseNumber][orderValue]<2 or (orderValue==0 and thisGame.betHorse[horseNumber][orderValue]<3):
                            tmpOrder = 0
                            if orderValue==0:
                                tmpOrder=6-thisGame.betHorse[horseNumber][orderValue]
                            elif orderValue==1:
                                tmpOrder=3-thisGame.betHorse[horseNumber][orderValue]
                            else:
                                tmpOrder=1-thisGame.betHorse[horseNumber][orderValue]
                            event2 = {
                                "type":"bet",
                                "target":"horse",
                                "loc": str(tmpOrder)+"_"+str(horseNumber),
                                "color":newColor,
                                "value":newValue
                            }
                            await thisGame.toHost(json.dumps(event2))
                            thisGame.betHorse[horseNumber][orderValue]+=1
                            thisGame.usedCoins[color][coinValue-1]+=1
                            event2 = {
                                "type":"set",
                                "target":"horse",
                                "horse":horseNumber,
                                "order":orderValue,
                                "product":thisGame.ratios[horseNumber][orderValue][thisGame.betHorse[horseNumber][orderValue]][0],
                                "minus":thisGame.ratios[horseNumber][orderValue][thisGame.betHorse[horseNumber][orderValue]][1]
                            }
                            await thisGame.broadcast(json.dumps(event2))    
                        else:
                            event2 = {
                                "type":"bet",
                                "target":"horse",
                                "value":"False"
                            }
                            await websocket.send(json.dumps(event2))                            
                pass                    
          
        except websockets.exceptions.ConnectionClosedOK as e:
            if websocket in wcToGame:
                thisGame:ReadySetBet = wcToGame[websocket]
                if thisGame.host == websocket:
                    event = {
                        "type":"TERMINATED"
                    }
                    thisGame.broadcast(json.dumps(event))
                    eraseKey = None
                    for key in games:
                        if games[key] == thisGame:
                            eraseKey=key
                            break
                    games.pop(eraseKey)
                        
                else:
                    thisGame.leavePlayer(websocket)
            return
        except Exception as e:
            print(e)
            return



async def main():
    async with websockets.serve(handler, "192.168.1.139", 9998):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    print("run server")
    asyncio.run(main())
    print("run server")
