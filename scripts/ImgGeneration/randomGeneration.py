from random import randint
from createMetadata import writeMetadata

def randGeneration (imgNumber): 
    colors = [(255,255,255), (238,0,0), (255,128,0), (255,255,0), (0,0,255), (154,255,154), (124,252,0), (0,255,255), (255,174,185), "random"]
    feed = randint(1, 11)
    speedLimit = randint(2, 6)
    linesBetween = False
    numBoids = randint(50, 120)
    fadeColor = (False, (0,0,0))
    historyTrace = False

    if feed < 2: 
        initialColor = "random"
        colorChange = True
        
    else: 
        if randint(1, 2) == 1: 
            fadeColor = (True, colors[randint(0, 9)])
        initialColor = colors[feed-2]
        colorChange = False
        if initialColor == "random":
            colorChange = True
            fadeColor=(False, (0,0,0))
        
    feed2 = randint(1, 5)
    if feed2 == 2: 
        linesBetween = True

    if randint(1,25) == 14: 
        historyTrace = True
        linesBetween = False
    
    if imgNumber < 100:
        if initialColor != "random": 
            initialColor = (255,255,255)
            colorChange = False

    if imgNumber < 2: 
        # 1/1 fade gold background
        backgroundColor = (255,220,116)
        initialColor = (255,220,116)
        numBoids = 60
        linesBetween = True
        colorChange = False
        fadeColor = (True, (0,0,0))
        speedLimit=3
        historyTrace = False

    elif imgNumber > 1 and imgNumber < 7:
        # /5, salmon red background
        if randint(1, 2) == 1 and initialColor != "random": 
            fadeColor = (True, colors[9]) 
        linesBetween = True
        backgroundColor = (250,128,114)
        historyTrace = False

    elif imgNumber > 6 and imgNumber < 17: 
        #/10, white background
        if historyTrace == False:
            linesBetween = True
        backgroundColor = (255,255,255)
        if initialColor != "random":
            initialColor = (0,0,0)
            if randint(1, 5) == 1: 
                fadeColor = (True, colors[9])

    elif imgNumber > 16 and imgNumber < 42: 
        #/25, light blue background
        backgroundColor = (135,206,250)

    elif imgNumber > 41 and imgNumber < 193: 
        #150 or so? light gray background
        feed3 = randint(1, 3)
        if feed3 == 1: 
            if initialColor != "random":
                initialColor = (0,0,0)
        else: 
            initialColor = (255,255,255)
        backgroundColor = (192,192,192)
        
    else: 
        backgroundColor = (0,0,0)
    

    colorsToWords = {(192,192,192): "Gray", (250,128,114): "Red", (0,0,0): "Black", (255,220,116): "Gold", (255,255,255): "White", (238,0,0): "Red", (255,128,0): "Orange", (255,255,0): "Yellow", (0,0,255): "Blue", (154,255,154): "Green", (124,252,0): "Lime", (135,206,250): "Light Blue", (0,255,255): "Aqua", (255,174,185): "Pink", "random": "Random"}

    if fadeColor[0] == False: 
        if fadeColor[1] == (0,0,0): 
            colorChange = "None"
    else: 
        colorChange = colorsToWords[fadeColor[1]]

    
    traits = {
         'Number of Boids': numBoids, 
         'Speed Limit': speedLimit, 
         'Initial Color': colorsToWords[initialColor], 
         'Background Color': colorsToWords[backgroundColor], 
         'Connectivity': linesBetween, 
         'Color Change': colorChange, 
         'Trail': historyTrace
         }
    

    writeMetadata(imgNumber, traits)

    return numBoids, speedLimit, initialColor, backgroundColor, linesBetween, colorChange, fadeColor, historyTrace