const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const dotenv = require('dotenv'); 
dotenv.config({ path: '/Users/hamevans/Documents/Blockchain/boidnfts/.env' })

var pinVideoToIPFS = (fileName) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    fullFileName = fileName + '.mp4'

    let data = new FormData();
    data.append('file', fs.createReadStream('../../video/' + fullFileName));

    const metadata = JSON.stringify({
        name: fullFileName,
    });
    data.append('pinataMetadata', metadata);

    return axios
        .post(url, data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
                pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET
            }
        })
        .then(function (response) {
            console.log(response.data.IpfsHash);
            pinMetadataToIPFS (fileName, response.data.IpfsHash)
        })
        .catch(function (error) {
            console.log(error);
        });
    };

var pinMetadataToIPFS = (fileName, videoCID) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    addedFileName = fileName + '.json';
    const filePath = '../../metadata/ropsten/' + addedFileName

    addCIDtoMetadata (fileName, videoCID)

    let data = new FormData();
    data.append('file', fs.createReadStream(filePath));

    const metadata = JSON.stringify({
        name: addedFileName,
    });
    data.append('pinataMetadata', metadata);
    console.log(axios)

    return axios
        .post(url, data, {
            maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
                pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET
            }
        })
        .then(function (response) {
            console.log(response.data.IpfsHash) ;
        })
        .catch(function (error) {
            console.log(error);
        }); 
};

var addCIDtoMetadata = (fileName, videoCID) => { 
    const filePath = '../../metadata/ropsten/' + fileName + '.json';
    var data = JSON.parse(fs.readFileSync(filePath).toString());
    data["image"] = "https://ipfs.io/ipfs/{}?filename={}".format(videoCID, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data));
}

var addMetatdataURItoFile = (uri) => {
    fs.readFile('metadataUris.json', function (err, data) { 
        var json = JSON.parse(data)
        json.push(uri)
        fs.writeFile('metadataUris.json', JSON.stringify(json))
    })

}