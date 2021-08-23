from sampleMetadata import metadata_template
from pathlib import Path
import requests
import os
from time import sleep

def writeMetadata (tokenId, traits): 
    collectibleMetadata = metadata_template

    metadataFilename = ("../metadata/ropsten/" + str(tokenId) + ".json")
    if Path (metadataFilename).exists(): 
        print("{} already found!".format(metadataFilename))
    else: 
        print("Creating Metadata File {}.".format(metadataFilename))
        collectibleMetadata["name"] = "Boid #{}".format(tokenId)
        collectibleMetadata["description"] = "BOIDS are algorithmically designed collection of 2000 digital assets on the Ethereum Blockchain."
        collectibleMetadata["attributes"] = traits

        sleep(3)
        imagePath = "../../video/{}.mp4".format(tokenId)
        imageToUpload = uploadToIFPS(imagePath)

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

        

writeMetadata(50, [])