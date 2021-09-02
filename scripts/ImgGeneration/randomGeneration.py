from random import randint, uniform

def randGeneration (imgNumber): 
    colors = [(255,255,255), (238,0,0), (255,128,0), (255,255,0), (0,0,255), (154,255,154), (124,252,0), (0,255,255), (255,174,185), "random"]
    feed = randint(1, 11)
    speedLimit = round(uniform(1.0001, 6), 6)
    linesBetween = False
    numBoids = randint(20, 119)
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
        backgroundColor = (255,203,25)
        initialColor = (0,0,0)
        numBoids = 60
        linesBetween = True
        colorChange = False
        fadeColor = (False, (0,0,0))
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

    elif imgNumber > 41 and imgNumber < 92:
        #/50 forest green background 
        backgroundColor = (11,102,35)

    elif imgNumber > 91 and imgNumber < 241: 
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

    if randint(1, 95) == 77:
        blink = True 
    else: 
        blink = False


    traits = giveTraits (numBoids, speedLimit, initialColor, backgroundColor, linesBetween, colorChange, fadeColor, historyTrace, blink)
    
    return numBoids, speedLimit, initialColor, backgroundColor, linesBetween, colorChange, fadeColor, historyTrace, blink, traits


def giveTraits (numBoids, speedLimit, initialColor, backgroundColor, linesBetween, colorChange, fadeColor, historyTrace, blink): 
    colorsToWords = {(11,102,35): "Forest Green", (192,192,192): "Gray", (250,128,114): "Red", (0,0,0): "Black", (255,203,25): "Gold", (255,255,255): "White", (238,0,0): "Red", (255,128,0): "Orange", (255,255,0): "Yellow", (0,0,255): "Blue", (154,255,154): "Green", (124,252,0): "Lime", (135,206,250): "Light Blue", (0,255,255): "Aqua", (255,174,185): "Pink", "random": "Random"}

    if fadeColor[0] == False: 
        if fadeColor[1] == (0,0,0): 
            newColor = "No Color Change"
    else: 
        newColor = colorsToWords[fadeColor[1]]

    speedLimitTrait = round((speedLimit - 1) / 5, 2) * 100
    
    if linesBetween == True: 
        linesBetweenTrait = "Connected"
    else: 
        linesBetweenTrait = "Not Connected"
    
    if historyTrace == True: 
        trail = "Glowing Trail"
    else: 
        trail = "No Trail" 

    if blink == True: 
        blinkTrait = "Blinking"
    else: 
        blinkTrait = "Not Blinking"

    traits = [
        {
            "trait_type": "Number of Boids", 
            "value": int(numBoids)
        }, 
        {
            "trait_type": "Speed Limit", 
            "value": int(speedLimitTrait)
        }, 
        {
            "trait_type": "Background Color", 
            "value": colorsToWords[backgroundColor]
        }, 
        { 
            "trait_type": "Initial Color", 
            "value": colorsToWords[initialColor]
        },
        {
            "trait_type": "Color Change To", 
            "value": newColor
        }, 
        {
            "trait_type": "Connectivity", 
            "value": linesBetweenTrait
        },
        {
            "trait_type": "Trail", 
            "value": trail
        },
        {
            "trait_type": "Blink", 
            "value": blinkTrait
        }
    ]

    return traits