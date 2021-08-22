from sampleMetadata import metadata_template
from pathlib import Path

def writeMetadata (tokenId, traits): 
    collectibleMetadata = metadata_template

    metadataFilename = ("../metadata/ropsten/" + str(tokenId) + ".json")
    if Path (metadataFilename).exists(): 
        print("{} already found!".format(metadataFilename))
    else: 
        print("Creating Metadata File {}.".format(metadataFilename))
        collectibleMetadata["name"] = "Boid #{}".format(tokenId)
        collectibleMetadata["description"] = "BOIDS are algorithmically designed to model the emmergent behavior or birds in the wild."
        collectibleMetadata["attributes"] = traits

    print(collectibleMetadata)

def uploadToIFPS (filepath): 
    with Path(filepath).open("rb") as fp:
        imageBinary = fp.read()
        ifpsUrl = "https://localhost:5001"


        

  