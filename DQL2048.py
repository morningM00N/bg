#encoding: utf-8

##
## cartpole.py
## Gaetan JUVIN 06/24/2017
##

#import gym
import random
import os
import numpy as np
from collections      import deque
from keras.models     import Sequential
from keras.layers     import Dense
from tensorflow.keras.optimizers import Adam


LEFT = 0
RIGHT = 1
UP = 2
BOTTOM = 3

frequencyOf4 = 10


def DP(boolean):
    if boolean == False:
        print("error")
        input()


priIdxGB = [
    [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15]
    ],
    [
        [3, 2, 1, 0],
        [7, 6, 5, 4],
        [11, 10, 9, 8],
        [15, 14, 13, 12]
    ],
    [
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15]
    ],
    [
        [12, 8, 4, 0],
        [13, 9, 5, 1],
        [14, 10, 6, 2],
        [15, 11, 7, 3]
    ]
]


def showTiles(tiles, maxNumber, numOfNonZero):
    print("\nmaxNumber", maxNumber, "numOfNonZero", numOfNonZero)
    tempMax = 0
    tempNonZero = 0
    for idx in range(4):
        for idx2 in range(4):
            if tiles[4 * idx + idx2] > 0:
                tempNonZero += 1

            if tiles[4 * idx + idx2] > tempMax:
                tempMax = tiles[4 * idx + idx2]

    for idx in range(4):
        print(tiles[4 * idx], tiles[4 * idx + 1],
              tiles[4 * idx + 2], tiles[4 * idx + 3])

    print("\n")
    DP(tempNonZero == numOfNonZero)
    DP(tempMax == maxNumber)


def move(tiles, move, maxNumber, numOfNonZero):
    reward = 0
    moveable = False
    priIdx = priIdxGB[move]

    for idx in range(4):
        for idx2 in range(4):
            if (tiles[priIdx[idx][idx2]] > 0):
                targetIdx = idx2
                while (targetIdx - 1 >= 0 and tiles[priIdx[idx][targetIdx - 1]] == 0):
                    targetIdx -= 1

                tiles[priIdx[idx][targetIdx]] = tiles[priIdx[idx][idx2]]
                if (targetIdx != idx2):
                    tiles[priIdx[idx][idx2]] = 0
                    moveable = True

    for idx in range(4):
        for idx2 in range(3):
            if (tiles[priIdx[idx][idx2]] > 0 and tiles[priIdx[idx][idx2]] == tiles[priIdx[idx][idx2 + 1]]):
                tiles[priIdx[idx][idx2]] *= 2
                reward += tiles[priIdx[idx][idx2]] 
                if (tiles[priIdx[idx][idx2]] > maxNumber):
                    maxNumber = tiles[priIdx[idx][idx2]]
                moveable = True
                for idx3 in range(idx2 + 1, 3):
                    tiles[priIdx[idx][idx3]] = tiles[priIdx[idx][idx3 + 1]]
                tiles[priIdx[idx][3]] = 0
                numOfNonZero -= 1
    if moveable == True:
        return (tiles, maxNumber, numOfNonZero,reward)
    else:
        return None


def genNewTile(tiles, maxNumber, numOfNonZero):
    if numOfNonZero == len(tiles):
        return
    while True:
        idx = random.randint(0, len(tiles)-1)
        if tiles[idx] == 0:
            if random.randint(0, frequencyOf4) == 0:
                tiles[idx] = 4
            else:
                tiles[idx] = 2

            if tiles[idx] > maxNumber:
                maxNumber = tiles[idx]
            break
    numOfNonZero += 1

    # showTiles(tiles, maxNumber, numOfNonZero)

    return (tiles, maxNumber, numOfNonZero)


def isTerminate(tiles, numOfNonZero):
    if numOfNonZero < len(tiles):
        return False
    for idx in range(4):
        for idx2 in range(3):
            if tiles[4*idx+idx2] == tiles[4*idx+idx2+1]:
                return False
            if tiles[idx+4*idx2] == tiles[idx+4*(idx2+1)]:
                return False
    return True


tiles = [[0]*16]
maxNumber = 0
numOfNonZero = 0

def init():
    global tiles
    global maxNumber
    global numOfNonZero
    tiles = [[0]*16]
    maxNumber = 0
    numOfNonZero = 0
    (tiles[0], maxNumber, numOfNonZero) = genNewTile(tiles[0], maxNumber, numOfNonZero)    
    

def step(a,tiles,maxNumber,numOfNonZero):
    #print(f"action:{a}")
    newTile = [[0]*len(tiles[0])]
    for i in range(len(tiles[0])):
        newTile[0][i] = tiles[0][i]
    temp = move(newTile[0],a,maxNumber,numOfNonZero)
    reward = 0
    if (temp!=None):
        (newTile[0], maxNumber, numOfNonZero,reward) = temp
        (newTile[0], maxNumber, numOfNonZero) = genNewTile(newTile[0], maxNumber, numOfNonZero)    

    done = False
    if isTerminate(newTile[0],numOfNonZero) == True:
        done = True
    return (newTile, reward, done,maxNumber,numOfNonZero)




class Agent():
    def __init__(self, state_size, action_size,filepath):
        self.weight_backup      = "cartpole_weight"
        self.state_size         = state_size
        self.action_size        = action_size
        self.memory             = deque(maxlen=2000)
        self.learning_rate      = 0.001
        self.gamma              = 0.95
        self.exploration_rate   = 1.0
        self.exploration_min    = 0.01
        self.exploration_decay  = 0.995
        self.brain              = self._build_model(filepath)

    def _build_model(self, filepath):
        # Neural Net for Deep-Q learning Model
        model = Sequential()
        model.add(Dense(24, input_dim=self.state_size, activation='relu'))
        model.add(Dense(24, activation='relu'))
        model.add(Dense(self.action_size, activation='linear'))
        model.compile(loss='mse', optimizer=Adam(lr=self.learning_rate))
        
        if filepath!=None:
            model.load_weights(filepath)
            

        #if os.path.isfile(self.weight_backup):
            
            #self.exploration_rate = 0.6
        return model

    def save_model(self):
            self.brain.save(self.weight_backup+"_"+str(round(100*self.exploration_rate)/100)+".h5")

    def act(self, state):
        if np.random.rand() <= self.exploration_rate:
            return random.randrange(self.action_size)
        act_values = self.brain.predict(state)
        return np.argmax(act_values[0])

    def remember(self, state, action, reward, next_state, done):
        self.memory.append((state, action, reward, next_state, done))

    def replay(self, sample_batch_size):
        if len(self.memory) < sample_batch_size:
            return
        sample_batch = random.sample(self.memory, sample_batch_size)
        for state, action, reward, next_state, done in sample_batch:
            target = reward
            if not done:
              target = reward + self.gamma * np.amax(self.brain.predict(next_state)[0])
            target_f = self.brain.predict(state)
            target_f[0][action] = target
            self.brain.fit(state, target_f, epochs=1, verbose=0)
        if self.exploration_rate > self.exploration_min:
            self.exploration_rate *= self.exploration_decay

class CartPole:
    def __init__(self):
        self.sample_batch_size = 32
        self.episodes          = 10000
        #self.env               = gym.make('CartPole-v1')

        self.state_size        = 16
        self.action_size       = 4
        self.agent             = Agent(self.state_size, self.action_size,"mcartpole_weight_0.08.h5")


    def run(self):
        global tiles
        global numOfNonZero
        global maxNumber
        
        try:
            for index_episode in range(self.episodes):
                #state, _ = self.env.reset()
                #state = np.reshape(state, [1, self.state_size])
                
                init()
                state = tiles
                state = np.reshape(state, [1, self.state_size])


                done = False
                index = 0
                allReward = 0
                while not done:
#                    self.env.render()

                    action = self.agent.act(state)
                    # moveDir = "up"
                    # if action == 0:
                    #     moveDir = "left"
                    # if action == 1:
                    #     moveDir = "right"
                    # if action == 3:
                    #     moveDir = "down"
                    # print(f"move {moveDir}")
                    
                    next_state, reward, done, maxNumber,numOfNonZero = step(action,state,maxNumber,numOfNonZero)
                    next_state = np.reshape(next_state, [1, self.state_size])
                    allReward+= reward

#                    next_state, reward, done, _, _ = self.env.step(action)
#                    next_state = np.reshape(next_state, [1, self.state_size])
                    self.agent.remember(state, action, reward, next_state, done)
                    state = next_state
                    index += 1
                print("Episode {}# Score: {}".format(index_episode, allReward))
                self.agent.replay(self.sample_batch_size)
                if index_episode%100 == 1:
                    self.agent.save_model()
        finally:
            self.agent.save_model()

if __name__ == "__main__":
    cartpole = CartPole()
    cartpole.run()
