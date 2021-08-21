import pygame
import random
import math
from randomGeneration import randGeneration

numBoids, visualRange, initialColor, backgroundColor, linesBetween, colorChange = randGeneration(270)

width = 600
height = 600
#numBoids = 10
speedLimit = 10

#visualRange = 65
colorRange = visualRange - (visualRange / 6)
boids = []
colors = []
edges = []
vertices = []

class Boid:
    def __init__(self, number):
        self.number = number
        self.x = random.randint(-width-100, width+100)
        self.y = random.randint(-height-100, height+100)
        self.dx = (random.random() * 10) - 5
        self.dy = (random.random() * 10) - 5
        self.history = []
        self.historyColor = []
        self.distanceFrom = 0
        self.color = randomColor()
        self.selfColor = self.color

    def coords(self):
        return (self.x, self.y)

def initPositions ():
    for i in range(numBoids):
        boids.append(Boid(i))
    for boid in boids:
        vertices.append((boid.x, boid.y))

def distance (boidA, boidB):
    return math.sqrt(((boidA.x - boidB.x)**2) + ((boidA.y - boidB.y)**2))

def nClosest (currBoid, n):
    for boid in boids:
        boid.distanceFrom = distance(currBoid, boid)
    closest = sorted(boids, key=lambda allBoid: allBoid.distanceFrom)
    return closest[1:n+1]

def keepWithinBounds (currBoid):
    marginWidth = width-25
    marginHeight = height - 25
    turnFactor = 2

    if currBoid.x < marginWidth:
        currBoid.dx += turnFactor

    if currBoid.x > width-marginWidth:
        currBoid.dx -= turnFactor

    if currBoid.y < marginHeight:
      currBoid.dy += turnFactor

    if currBoid.y > height - marginHeight:
      currBoid.dy -= turnFactor


def flyToCenter (currBoid):
    centeringFactor = speedLimit/2000 # Adjust velo here
    centerX = 0
    centerY = 0
    numNeighbors = 0

    for boid in boids:
        if boid != currBoid:
            if distance(currBoid, boid) < visualRange:
                centerX += boid.x
                centerY += boid.y
                numNeighbors += 1

    if numNeighbors != 0:
        centerX = centerX / numNeighbors
        centerY = centerY / numNeighbors

        currBoid.dx += (centerX - currBoid.x) * centeringFactor
        currBoid.dy += (centerY - currBoid.y) * centeringFactor

def avoidOthers (currBoid):
    minDistance = 20
    avoidFactor = 0.05 # Adjust velo here
    moveX = 0
    moveY = 0

    for boid in boids:
        if boid != currBoid:
            if distance(currBoid, boid) < minDistance:
                moveX += currBoid.x - boid.x
                moveY += currBoid.y - boid.y

    currBoid.dx += moveX * avoidFactor
    currBoid.dy += moveY * avoidFactor

def matchVelocity (currBoid):
    matchingFactor = speedLimit/200 # adjust by % of avg velo

    avgDX = 0
    avgDY = 0
    numNeighbors = 0

    for boid in boids:
        if distance(currBoid, boid) < visualRange:
            avgDX += boid.dx
            avgDY += boid.dy
            numNeighbors += 1

    if numNeighbors != 0:
        avgDX = avgDX / numNeighbors
        avgDY = avgDY / numNeighbors

        currBoid.dx += (avgDX - currBoid.dx) * matchingFactor
        currBoid.dy += (avgDY - currBoid.dy) * matchingFactor

def limitSpeed (currBoid):
    speed = math.sqrt((currBoid.dx)**2 + (currBoid.dy)**2)

    if speed > speedLimit:
        (currBoid.dx) = (currBoid.dx / speed) * speedLimit
        (currBoid.dy) = (currBoid.dy / speed) * speedLimit

def buildGraph (currBoid, screen):
    for boid in boids:
        if boid != currBoid:
            if distance(currBoid, boid) < visualRange:
                color = (((currBoid.color[0] + boid.color[0]) / 2), ((currBoid.color[1] + boid.color[1]) / 2), ((currBoid.color[2] + boid.color[2]) / 2))
                pygame.draw.line(screen, color, (currBoid.x, currBoid.y), (boid.x, boid.y))

def randomColor():
    return (random.randint(0,255), random.randint(0,255), random.randint(0,255))

def colorChange(currBoid):
    adjustNum = 15
    avgColor1 = 0
    avgColor2 = 0
    avgColor3 = 0
    numNeighbors = 0

    for boid in boids:
        if boid != currBoid:
            if distance(currBoid, boid) < colorRange:
                avgColor1 += boid.color[0]
                avgColor2 += boid.color[1]
                avgColor3 += boid.color[2]
                numNeighbors += 1

    if numNeighbors != 0:
        avgColor1 = avgColor1 / numNeighbors
        avgColor2 = avgColor2 / numNeighbors
        avgColor3 = avgColor3 / numNeighbors

        if avgColor1 > currBoid.selfColor[0] and avgColor1 > 0 + adjustNum:
            avgColor1 = avgColor1 - adjustNum
        elif avgColor1 < currBoid.selfColor[0] and avgColor1 < 255 - adjustNum:
            avgColor1 = avgColor1 + adjustNum

        if avgColor2 > currBoid.selfColor[1] and avgColor2 > 0 + adjustNum:
            avgColor2 = avgColor2 - adjustNum
        elif avgColor2 < currBoid.selfColor[0] and avgColor2 < 255 - adjustNum:
            avgColor2 = avgColor2 + adjustNum

        if avgColor3 > currBoid.selfColor[2] and avgColor3 > 0 + adjustNum:
            avgColor3 = avgColor3 - adjustNum
        elif avgColor3 < currBoid.selfColor[0] and avgColor3 < 255 - adjustNum:
            avgColor3 = avgColor3 + adjustNum


        currBoid.color = (avgColor1, avgColor2, avgColor3)

def main ():
    pygame.init()
    screen = pygame.display.set_mode([width, height])

    initPositions()
    """
    waiting = False
    while waiting == False:
        for event in pygame.event.get():
            if event.type == pygame.MOUSEBUTTONDOWN:
                waiting = True
    """

    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        screen.fill((0, 0, 0))



        for boid in boids:
            flyToCenter(boid)
            avoidOthers(boid)
            matchVelocity(boid)
            limitSpeed(boid)
            keepWithinBounds(boid)
            colorChange(boid)
            #buildGraph(boid, screen)

            boid.x += boid.dx
            boid.y += boid.dy
            boid.history.append([boid.x, boid.y])
            boid.history = boid.history[-50:]
            boid.historyColor.append(boid.color)
            boid.historyColor = boid.historyColor[-50:]

            pygame.draw.circle(screen, boid.color, boid.coords(), 3)

            #pygame.draw.circle(screen, (255, 255, 255), boid.coords(), 3)

            #for i in range(len(boid.history)):
            #    pygame.draw.circle(screen, boid.historyColor[i], boid.history[i], 3)

        pygame.display.update()
        pygame.display.flip()

    pygame.quit()

main ()


"""
def main ():
    global backgroundColor

    pygame.init()
    screen = pygame.display.set_mode([width, height])
    sleep(1)
    init = time()
    totalRunTime = 12
    steps = 0
    totalSteps = 400
    initPositions()
    
    running = True
    while time()-init < totalRunTime and running:
        steps += 1

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        if imgNumber == 1: 
            backgroundColor = colorFade(None, backgroundColor, (255,193,37), steps, totalSteps)

        screen.fill(backgroundColor)
        
        for boid in boids:
            flyToCenter(boid)
            avoidOthers(boid)
            matchVelocity(boid)
            limitSpeed(boid)
            keepWithinBounds(boid)
            if fadeColor[0] and changeColor == False: 
                colorFade(boid, boid.color, fadeColor[1], steps, totalSteps)

            if changeColor:
                colorChange(boid)
            
            if linesBetween:
                buildGraph(boid, screen)

            boid.x += boid.dx
            boid.y += boid.dy
            boid.history.append([boid.x, boid.y])
            boid.history = boid.history[-50:]
            boid.historyColor.append(boid.color)
            boid.historyColor = boid.historyColor[-50:]

            pygame.draw.circle(screen, boid.color, boid.coords(), 3)

        pygame.display.update()
        pygame.display.flip()

    print(time() - init)
    pygame.quit()"""
