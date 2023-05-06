import random
import matplotlib.pyplot as plt
import gym
import numpy as np
import tensorflow.compat.v1 as tf
tf.disable_v2_behavior()

#random.seed(0)


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

    #showTiles(tiles, maxNumber, numOfNonZero)

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



    


#def one_hot(x):
#    return np.identity(16)[x:x+1]

#env = gym.make('FrozenLake-v1')

input_size = 16  # env.observation_space.n
output_size = 4  # env.action_space.n
learning_rate = 0.1

h_size = 128

Worigin = None
W1origin = None
W2origin = None
weightGiven = True
try:
    f = open('weights.txt','r')
    line = f.readline().split(' ')
    row = int(line[0])
    col = int(line[1])
    Worigin = np.zeros((row,col))
    for i in range(row):
        line = f.readline().split(' ')
        for j in range(col):
            Worigin[i][j] = float(line[j])
            

    line = f.readline().split(' ')
    row = int(line[0])
    col = int(line[1])
    W1origin = np.zeros((row,col))
    for i in range(row):
        line = f.readline().split(' ')
        for j in range(col):
            W1origin[i][j] = float(line[j])

    line = f.readline().split(' ')
    row = int(line[0])
    col = int(line[1])
    W2origin = np.zeros((row,col))
    for i in range(row):
        line = f.readline().split(' ')
        for j in range(col):
            W2origin[i][j] = float(line[j])

except:
    weightGiven= False
    Worigin = None
    W1origin = None
    W2origin = None


X = tf.placeholder(shape=[1, input_size], dtype=tf.float32)
W = tf.Variable(tf.random_uniform([input_size, h_size], 0, 0.01))
W1 = tf.Variable(tf.random_uniform([h_size, h_size], 0, 0.01))
W2 = tf.Variable(tf.random_uniform([h_size, output_size], 0, 0.01))

if weightGiven == True:
    W = tf.Variable(Worigin,dtype=tf.float32)
    W1 = tf.Variable(W1origin,dtype=tf.float32)
    W2 = tf.Variable(W2origin,dtype=tf.float32)
    

Qpred = tf.matmul(tf.nn.relu(tf.matmul(tf.nn.relu(tf.matmul(X, W)),W1)),W2)
Y = tf.placeholder(shape=[1, output_size], dtype=tf.float32)

loss = tf.reduce_sum(tf.square(Y-Qpred))

train = tf.train.GradientDescentOptimizer(
    learning_rate=learning_rate).minimize(loss)

dis = .99
num_episodes = 1000000

rList = []

itCount = 0
fileCount = 0
with tf.Session() as sess:
    sess.run(tf.global_variables_initializer())
    for i in range(num_episodes):
        #print(W.eval())
        init()
        s = tiles
        #s, _ = env.reset()
        e = 1./((i/50)+10)
        rAll = 0
        done = False
        local_loss = []

        while not done:
            itCount+=1
            Qs = sess.run(Qpred, feed_dict={X: s})
            if np.random.rand(1) < e:
                a = random.randint(0,3)
                #a = env.action_space.sample()
            else:
                a = np.argmax(Qs)

            s1, reward, done, maxNumber,numOfNonZero = step(a,s,maxNumber,numOfNonZero)
            
            if done:
                Qs[0, a] = reward
            else:
                Qs1 = sess.run(Qpred, feed_dict={X: s1})
                Qs[0, a] = reward + dis * np.max(Qs1)

            sess.run(train, feed_dict={X: s, Y: Qs})

            rAll += reward
            s = s1
        rList.append(rAll)
        rewardTotal = 0
        reward10 = 0
        numOf10s = 0
        for i2 in range(0,len(rList)):
            rewardTotal += rList[-1-i2]
            if i2<10:
                reward10+=rList[-1-i2]
                numOf10s +=1
        
        if i % 10 ==0:
            print(f"this it reward:{rAll}\ttotal reward:{round(rewardTotal/len(rList))}\t10 reward:{reward10/numOf10s}")
        if i%1000 == 0:
            fileCount+=1
            
        if i%100 == 1:
            f=open("weights"+str(fileCount)+".txt",'w')
            curW = W.eval()
            f.writelines(f"{len(curW)} {len(curW[0])}\n")
            for i in range(len(curW)):
                for j in range(len(curW[0])):
                    f.writelines(f"{curW[i][j]} ")
                f.writelines("\n")

            curW = W1.eval()
            f.writelines(f"{len(curW)} {len(curW[0])}\n")
            for i in range(len(curW)):
                for j in range(len(curW[0])):
                    f.writelines(f"{curW[i][j]} ")
                f.writelines("\n")

            curW = W2.eval()
            f.writelines(f"{len(curW)} {len(curW[0])}\n")
            for i in range(len(curW)):
                for j in range(len(curW[0])):
                    f.writelines(f"{curW[i][j]} ")
                f.writelines("\n")

            
            f.close()
            
            

print(rList)

plt.bar(range(len(rList)), rList, color='blue')
plt.show()

input()
