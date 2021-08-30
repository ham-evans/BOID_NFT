from sampleMetadata import metadata_template
from pathlib import Path
import requests
import os
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
        collectibleMetadata["seller_fee_basis_points"] = 200
        collectibleMetadata["fee_recipient"] = "0x97EF605Ff1A1527b9239Bb009D7D1B004a5Ef384" # boids account address

        imagePath = "../../video/{}.mp4".format(tokenId)
        imageToUpload = None
            
       # imageToUpload = uploadToIFPS(imagePath)
        
        #collectibleMetadata["image"] = imageToUpload

        with open(metadataFilename, "w") as file:
            json.dump(collectibleMetadata, file)
        
        #uploadToIFPS(metadataFilename)
            

"""
def uploadToIFPS (filepath): 
    with Path(filepath).open("rb") as fp:
        imageBinary = fp.read()
        ipfsUrl = "http://localhost:5001"
        response = requests.post(ipfsUrl + "/api/v0/add", files={'file': imageBinary})
        ipfsHash = response.json()["Hash"]
        filename = filepath.split("/")[-1:][0]
        uri = "https://ipfs.io/ipfs/{}?filename={}".format(ipfsHash, filename)

        print(uri)
        return uri
    return None
"""