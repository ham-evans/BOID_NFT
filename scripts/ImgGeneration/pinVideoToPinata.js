//import { createRequire } from "module";
//const require = createRequire(import.meta.url);

const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const recursive = require('recursive-fs');
const basePathConverter = require('base-path-converter');
const dotenv = require('dotenv'); 
dotenv.config({ path: '/Users/hamevans/Documents/Blockchain/boidnfts/.env' })

var pinVideoToIPFS = (fileName) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    let data = new FormData();
    data.append('file', fs.createReadStream('../../video/' + fileName));

    const metadata = JSON.stringify({
        name: fileName,
    });
    data.append('pinataMetadata', metadata);

    return axios.post(url, data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
                pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET
            }
        })
        .then(function (response) {
            console.log(fileName, response.data.IpfsHash)
            addCIDtoMetadata(fileName, response.data.IpfsHash)
            console.log("Video CID added to Metadata")
        })
        .catch(function (error) {
            console.log(error);
        });
    };

var pinMetadataToIPFS = (fileName, videoCID) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    addedFileName = fileName + '.json';
    const filePath = '../../metadata/rinkeby/' + addedFileName

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
    file = fileName.slice(0, -4)
    const filePath = '../../metadata/rinkeby/' + file + '.json';
    var data = JSON.parse(fs.readFileSync(filePath).toString());
    data["image"] = "https://ipfs.io/ipfs/" + videoCID + "?filename=" + fileName;
    fs.writeFileSync(filePath, JSON.stringify(data));
}

var addMetatdataURItoFile = (uri) => {
    fs.readFile('metadataUris.json', function (err, data) { 
        var json = JSON.parse(data)
        json.push(uri)
        fs.writeFile('metadataUris.json', JSON.stringify(json))
    })

}

const pinDirectoryToIPFS = () => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const src = '../../metadata/rinkeby';

    recursive.readdirr(src, function (err, dirs, files) {
        let data = new FormData();
        files.forEach((file) => {
            data.append(`file`, fs.createReadStream(file), {
                filepath: basePathConverter(src, file.slice(0,-5))
            });
        });

        const metadata = JSON.stringify({
            name: 'BOIDS',
        });
        data.append('pinataMetadata', metadata);

        return axios.post(url, data, {
                maxBodyLength: 'Infinity', 
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                    pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
                    pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET
                }
            })
            .then(function (response) {
                console.log('Metadata uploaded to IPFS at: ')
                console.log(response.data.IpfsHash) ;
                console.log()

            })
            .catch(function (error) {
                console.log(error);
            });
    });
};


var uploadMetadataFolderToIPFS = () =>  { 
    fs.readdir('../../video', (err, files) => {
        files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
        files = files.sort()
        files.forEach(file => {
          pinVideoToIPFS(file)
        });
    });
}

pinDirectoryToIPFS ();

//uploadMetadataFolderToIPFS()
//pinVideoToIPFS(1)