import json
from pathlib import Path

videoCID = "https://ipfs.io/ipfs/QmWuJee9oBykshRQovwatBMTmoFA7Y22gk2F3oMpnwSVZv/"

for tokenId in range (1, 2001): 
    metadataFilename = ("/Users/hamevans/Desktop/BoidsMetadata3/" + str(tokenId) + ".json")
    if Path (metadataFilename).exists(): 
        with open(metadataFilename, "r") as file:
            metadata = json.load(file)
        
        metadata['image'] = videoCID + str(tokenId) + ".mp4"

        for element in metadata['attributes']:
            if element['trait_type'] == 'Background Color' and element['value'] == 'Red': 
                metadata['description'] = "This is 1 of just 5 Boids with the rare Red background! With 2000 algorithmically designed digital videos on the Ethereum Blockchain, BOIDS are the NFT homage to emergence. Official website at BOIDS.co."

            elif element['trait_type'] == 'Background Color' and element['value'] == 'Gold': 
                metadata['description'] = "This Boid is 1/1, the only Boid with the rare Gold background! With 2000 algorithmically designed digital videos on the Ethereum Blockchain, BOIDS are the NFT homage to emergence. Official website at BOIDS.co."

            elif element['trait_type'] == 'Background Color' and element['value'] == 'White': 
                metadata['description'] = "This is 1 of just 10 Boids with the rare White background! With 2000 algorithmically designed digital videos on the Ethereum Blockchain, BOIDS are the NFT homage to emergence. Official website at BOIDS.co."

            elif element['trait_type'] == 'Background Color' and element['value'] == 'Light Blue': 
                metadata['description'] = "This is 1 of only 25 Boids with the Light Blue background! With 2000 algorithmically designed digital videos on the Ethereum Blockchain, BOIDS are the NFT homage to emergence. Official website at BOIDS.co."

            elif element['trait_type'] == 'Background Color' and element['value'] == 'Forest Green': 
                metadata['description'] = "This is 1 of only 50 Boids with the Forest Green background! With 2000 algorithmically designed digital videos on the Ethereum Blockchain, BOIDS are the NFT homage to emergence. Official website at BOIDS.co."
            
            elif element['trait_type'] == 'Background Color' and element['value'] == 'Gray': 
                metadata['description'] = "This is 1 of 125 Boids with the Gray background! With 2000 algorithmically designed digital videos on the Ethereum Blockchain, BOIDS are the NFT homage to emergence. Official website at BOIDS.co."
        
        with open(metadataFilename, "w") as file:
            json.dump(metadata, file)