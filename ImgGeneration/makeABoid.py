import pygame
from random import randint, random
import math
from randomGeneration import randGeneration
from time import sleep, time

imgNumber = 795
numBoids, speedLimit, initialColor, backgroundColor, linesBetween, changeColor, fadeColor, historyTrace = randGeneration(imgNumber)

width = 600
height = 600
visualRange = 75
colorRange = visualRange - (visualRange / 6)

boids = []
colors = []
edges = []
vertices = []

class Boid:
    def __init__(self, number, initialColor):
        self.number = number
        self.x = randint(0, width)
        self.y = randint(0, height)
        self.dx = (random() * 10) - 5
        self.dy = (random() * 10) - 5
        self.slowDx = 0
        self.slowDy = 0
        self.history = []
        self.historyColor = []
        self.totalHistory = []
        self.distanceFrom = 0
        if initialColor == "random": 
            self.color = (randint(0,255), randint(0,255), randint(0,255))
        else:
            self.color = initialColor
        self.randomFade = (randint(0,255), randint(0,255), randint(0,255))
        self.selfColor = self.color

    def coords(self):
        return (self.x, self.y)

def initPositions ():
    for i in range(numBoids):
        boids.append(Boid(i, initialColor))
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

def colorFade (currBoid, currBoidColor, new, steps, totalSteps): 
    if new == "random": 
        new = currBoid.randomFade
    updated0 = currBoidColor[0] + ((((new[0] - currBoidColor[0]) / totalSteps) * steps) / 60)
    updated1 = currBoidColor[1] + ((((new[1] - currBoidColor[1]) / totalSteps) * steps) / 60)
    updated2 = currBoidColor[2] + ((((new[2] - currBoidColor[2]) / totalSteps) * steps) / 60)

    if currBoid == None: 
        return (updated0, updated1, updated2)
    
    else: 
        currBoid.color = (updated0, updated1, updated2)

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

def makeMoves (forwardSteps, slowdownSteps): 
    totalSteps = slowdownSteps + forwardSteps

    for steps in range(totalSteps):
        for boid in boids:
            if steps < forwardSteps:
                flyToCenter(boid)
                avoidOthers(boid)
                matchVelocity(boid)
                limitSpeed(boid)
                keepWithinBounds(boid)
                
                boid.x += boid.dx
                boid.y += boid.dy
                boid.totalHistory.append([boid.x, boid.y])
                boid.slowDx = boid.dx
                boid.slowDy = boid.dy

            elif steps < totalSteps:
                avoidOthers(boid)
                matchVelocity(boid)
                limitSpeed(boid)
                keepWithinBounds(boid)

                if boid.dx <= 0: 
                    boid.dx= boid.dx + (abs(boid.slowDx) / 60)
                else: 
                    boid.dx = boid.dx - (abs(boid.slowDx) / 60)
                
                if boid.dy <= 0: 
                    boid.dy = boid.dy + (abs(boid.slowDy) / 60)
                else: 
                    boid.dy = boid.dy - (abs(boid.slowDy) / 60)
                
                boid.x += boid.dx
                boid.y += boid.dy

                boid.totalHistory.append([boid.x, boid.y])

def main ():
    global backgroundColor

    initPositions()

    forwardSteps = 600
    slowdownSteps = 60
    totalSteps = forwardSteps + slowdownSteps
    makeMoves (forwardSteps, slowdownSteps)

    pygame.init()
    screen = pygame.display.set_mode([width, height])

    steps = 0
    
    counter2 = 0 # will be deleted

    running = True
    while running:
        steps += 1
        
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        if imgNumber == 1: 
            backgroundColor = colorFade(None, backgroundColor, (255,193,37), steps, totalSteps)

        screen.fill(backgroundColor)

        boidLocations = []
        
        for boid in boids:
            sleep(.0001)

            #Start of printing 
            if steps < len(boid.totalHistory):
                if fadeColor[0] and changeColor == False: 
                    colorFade(boid, boid.color, fadeColor[1], steps, totalSteps)
    
                if changeColor:
                    colorChange(boid)

                boid.x = boid.totalHistory[steps - 1][0]
                boid.y = boid.totalHistory[steps - 1][1]

            elif (steps < (totalSteps * 2)):
                if fadeColor[0] and changeColor == False: 
                    colorFade(boid, boid.color, boid.selfColor, steps - totalSteps, totalSteps)

                if changeColor: 
                    boid.color = boid.historyColor[-1 * (steps-(totalSteps) + 1)]

                boid.x = boid.totalHistory[-1 * (steps-(totalSteps) + 1)][0]
                boid.y = boid.totalHistory[-1 * (steps-(totalSteps) + 1)][1]

                boid.slowDx = boid.dx
                boid.slowDy = boid.dy
            
            elif counter2 < (len(boid.totalHistory)) - 1 : # WILL BE DELETED
                if boid == boids[0]: 
                    counter2 += 1
                
                boid.x = boid.totalHistory[counter2][0]
                boid.y = boid.totalHistory[counter2][1]

            else:
                return

            boidLocations.append(boid.coords())

            boid.historyColor.append(boid.color)

            if historyTrace == True: 
                boid.history.append([boid.x, boid.y])
                boid.history = boid.history[-50:]

                for i in range(0, len(boid.history) - 1):
                    pygame.draw.circle(screen, boid.historyColor[-1 * (len(boid.history) - i)], boid.history[i], 3)

            if linesBetween:
                buildGraph(boid, screen)

        for location in boidLocations:
            pygame.draw.circle(screen, boid.color, location, 3)

        pygame.display.update()
        pygame.display.flip()

    pygame.quit()

main ()