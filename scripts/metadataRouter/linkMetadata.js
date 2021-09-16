const express = require('express');
const Web3 = require( 'web3' );
const axios = require('axios');

const ABI = require('../../src/artifacts/contracts/Boids.sol/Boids.json');
const abi = ABI.abi;

const contractAddress = '0xD2B55F32EB2d6D2a3972F8D2541e25BA121EE01d';

const ethNetwork = 'https://rinkeby.infura.io/v3/ae53d9d72c71435baa7af541d3f9c7fd';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));
const contract = new web3.eth.Contract( abi , contractAddress );

const app = express()
const port = 3000

app.get('/metadata', async (req, res) => {
    try {
        const tokenId = req.query.tokenId;
        await contract.methods.ownerOf( tokenId ).call();
        
        const meta = await axios.get( `https://gateway.pinata.cloud/ipfs/QmdYaBzD9z9DGLkT1Y8cTeQ1QoKt8yYy6u5Xmacup3W31t/${tokenId}` )
        const data = meta.data
        
        data.image = `https://admiring-johnson-415a9a.netlify.app/image?tokenId=${tokenId}`
        res.send( data ).end()
    } catch( err ){
        res.status( 404 ).end()
    }
})

app.get( '/image', async ( req, res ) => {
    try{
        const tokenId = req.query.tokenId;
        await contract.methods.ownerOf( tokenId )
        const meta = await axios.get( `https://gateway.pinata.cloud/ipfs/QmdYaBzD9z9DGLkT1Y8cTeQ1QoKt8yYy6u5Xmacup3W31t/${tokenId}` )
        const data = meta.data

        res.send( data ).end()
    }
    catch( err ){
      res.status( 404 ).end()
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})