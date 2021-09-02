from sampleMetadata import metadata_template
from pathlib import Path
from time import sleep
import json

def writeMetadata (tokenId, traits): 
    collectibleMetadata = metadata_template

    metadataFilename = ("../../metadata/rinkeby/" + str(tokenId) + ".json")
    if Path (metadataFilename).exists(): 
        print("{} already found!".format(metadataFilename))
    else: 
        print("Creating Metadata File {}.".format(metadataFilename))
        collectibleMetadata["name"] = "Boid #{}".format(tokenId)
        collectibleMetadata["description"] = "With 2000 algorithmically designed digital videos on the Ethereum Blockchain, BOIDS are the NFT homage to emergence. Official website at BOIDS.co."
        collectibleMetadata["attributes"] = traits

        with open(metadataFilename, "w") as file:
            json.dump(collectibleMetadata, file)

def writeHoldingMetadata (tokenId,): 
    collectibleMetadata = {
                            "name": "",
                            "description": "",
                            "image": "",
                        }   

    metadataFilename = ("../../metadata/holdingData/" + str(tokenId) + ".json")
    if Path (metadataFilename).exists(): 
        print("{} already found!".format(metadataFilename))
    else: 
        print("Creating Metadata File {}.".format(metadataFilename))
        collectibleMetadata["name"] = "Boid #{}".format(tokenId)
        collectibleMetadata["description"] = "With 2000 algorithmically designed digital videos on the Ethereum Blockchain, BOIDS are the NFT homage to emergence. Official website at BOIDS.co."
        collectibleMetadata["image"] = "https://ipfs.io/ipfs/QmTcDBuJcfwKJGUHi9Mm1pUzQyEvZm5LFJKzYtv4PTLLaj?filename=Placeholder.png"

        with open(metadataFilename, "w") as file:
            json.dump(collectibleMetadata, file)
        