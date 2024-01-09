
from enum import Enum

true = True
false = False

class Roles(Enum):
    ASSASSIN  = 0
    PUBLIC =1
    CROWN = 2
    CLERIC = 3
    REVOLUTIONARY = 4
    DICTATOR =5
    NOBLE = 6

class Player:
    def __init__(self) -> None:
        self.numOfVotes = 0
        self.roles={}
        for key in Roles:
            self.roles[key]=True
        pass
    
    def discardRole(self,role:Roles) -> bool:
        if self.roles[role] == False:
            return False
        self.roles[role] = False
        return True
    
    def modifyVote(self,n:int) -> None:
        self.numOfVotes += n
        

class Dictator:
    def __init__(self) -> None:
        self.curRound = 0
        self.players={}
        pass
    
    def addPlayer(self,id) -> bool:
        if len(self.players)>=12:
            return False
        if id in self.players:
            return False
        self.players[id] = Player()
        return True
    
    
