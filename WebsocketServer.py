from __future__ import annotations

from enum import Enum

import asyncio
import random
import websockets
import json
import time

def DP(b):
    if b==False:
        print("err")
        input()

def getWWOF(name:str,word:str):
    if '가'<=name[-1]<='힣' and (ord(name[-1])-ord("가")) % 28 > 0:
        return name+word[0]
    else:
        return name+word[1]

false = False
true = True

class RoomState(Enum):
    END = 0
    PLAYING = 1
    READY = 2
    NEW = 3

class ErrorType(Enum):
    NO_ERROR = 0    
    DUPLICATED_NAME = 1
    NOT_NEW_STATE = 2
    FULL_PLAYERS = 3
    NOT_PLAYING_STATE = 4 
    NO_PLAYER = 5
    PLAYING_PLAYER = 6
    
class Room:
    def __init__(self,name:str,capacity:int,host:Player) -> None:
        self.name:str = name
        self.capacity:int = capacity
        self.host = host
        self.players:dict[str,Player] = {}
        self.state:RoomState = RoomState.NEW
    
    def join(self,player:Player) -> ErrorType:
        if self.state!=RoomState.NEW:
            return ErrorType.NOT_NEW_STATE
        elif self.capacity>=len(self.players):
            return ErrorType.FULL_PLAYERS
        elif player.name in self.players:
            return ErrorType.DUPLICATED_NAME
        player.room = self
        self.players[player.name] = player
        return ErrorType.NO_ERROR
    
    def reJoin(self,player:Player) -> ErrorType:
        if self.state!=RoomState.PLAYING:
            return ErrorType.NOT_PLAYING_STATE
        elif player.name not in self.players:
            return ErrorType.NO_PLAYER
        elif self.players[player.name] != None:
            return ErrorType.PLAYING_PLAYER
        player.room = self
        self.players[player.name] = player
        return ErrorType.NO_ERROR
        

class Player:
    def __init__(self,name:str=None,websocket:websockets=None,room:Room=None) -> None:
        self.name:str = name
        self.websocket:websockets = websocket
        self.room:Room = room
        self.ready:bool = False
        
    def join(self,room:Room) -> ErrorType:
        assert self.room==None, 'already join a room'
        errType = room.join(self)
        return errType

    def createRoom(self,roomName:str,capacity:int) ->ErrorType:
        room=Room(roomName,capacity,self)
        return room
            
            
            
        
    
        
        

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


mapWebsocketToPlayer={}
async def MyHandler(websocket):
    while True:
        try:
            message = await websocket.recv()
            event = json.loads(message)
            
        except websockets.exceptions.ConnectionClosedOK as e:
            if websocket in mapWebsocketToPlayer:
                player:Player = mapWebsocketToPlayer[websocket]
                room:Room = player.room
            
        
    


async def main():
    async with websockets.serve(MyHandler, "192.168.1.139", 9998):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    print("run server")
    asyncio.run(main())
    print("end server")
    
    #python -m http.server 80
