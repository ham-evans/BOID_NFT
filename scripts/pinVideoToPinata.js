const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const dotenv = require('dotenv'); 
dotenv.config({ path: '/Users/hamevans/Documents/Blockchain/boidnfts/.env' })

var pinVideoToIPFS = (fileName) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    fileName = filename + '.mp4'

    let data = new FormData();
    data.append('file', fs.createReadStream('../video/' + fileName));

    //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
    //metadata is optional
    const metadata = JSON.stringify({
        name: fileName,
    });
    data.append('pinataMetadata', metadata);

    return axios
};

var pinMetadataToIPFS = (fileName, videoCID) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    fileName = fileName + '.json';
    const filePath = '../metadata/ropsten/' + fileName

    addCIDtoMetadata (filePath, videoCID)

    let data = new FormData();
    data.append('file', fs.createReadStream(filePath));

    const metadata = JSON.stringify({
        name: fileName,
    });
    data.append('pinataMetadata', metadata);
    console.log(axios)

    return axios
        
};

var addCIDtoMetadata = (fileName, videoCID) => { 
    var data = JSON.parse(fs.readFileSync(fileName).toString());
    data["image"] = videoCID;
    fs.writeFileSync(fileName, JSON.stringify(data));
}

pinMetadataToIPFS(12)
/*
.post(url, data, {
    maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
    headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
        pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET
    }
})
.then(function (response) {
    console.log(response);
})
.catch(function (error) {
    console.log(error);
});
*/