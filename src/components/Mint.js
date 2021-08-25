import React, { useEffect, useState } from 'react';
import "./Mint.css";
import { ethers } from 'ethers';
import Boids from '../artifacts/contracts/Boids.sol/Boids.json';

const boidsAddress = '0xeAceC5181402623d9E5AaE97d7765C9b9cEa73Ad';

export default function Mint () {
    const [signedIn, setSignedIn] = useState(false);
    const [walletAddress, setWalletAddress] = useState(null);
    const [boidsContract, setBoidsContract] = useState(null);
    const [boidsWithSigner, setBoidsWithSigner] = useState(null);
    const [saleStarted, setSaleStarted] = useState(false);
    const [totalSupply, setTotalSupply] = useState(0);
    const [boidPrice, setBoidPrice] = useState(0)
    const [howManyBoids, setHowManyBoids] = useState(0)

    useEffect( () => { 
        signIn()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function isWalletAllowed (){
        try{
          const permissions = await window.ethereum.request({ method: 'wallet_getPermissions' })
          return permissions.some( p => p.parentCapability === 'eth_accounts' )
        }
        catch( err ){
          alert({ 'isWalletAllowed': JSON.stringify( err ) });
          return null;
        }
    }

    async function getWalletAccounts () {
        const isAllowed = await isWalletAllowed()
    
        //because of the "null" case above, this will still attempt the request in mobile wallets
        if( isAllowed !== false){
          try{
            await window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(async function (accounts) {
                let wallet = accounts[0]
                setWalletAddress(wallet)
                setSignedIn(true)
                callContractData()
            })
          }
          catch( err ){
            alert({ 'getWalletAccounts': JSON.stringify( err ) });
            return []
          }
        }
        else{
          return []
        }
    }

    async function signIn() {
        if (typeof window.ethereum !== 'undefined') {
            window.ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
            //console.log("Permissions: ", await window.ethereum.request({ method: 'wallet_getPermissions' }))
            await window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(async function (accounts) {
                console.log("Second go: ", accounts)
                if (accounts.length > 0) {
                    let wallet = accounts[0]
                    setWalletAddress(wallet)
                    setSignedIn(true)
                    callContractData()
                } else {
                    setSignedIn(false)
                }
            })
            .catch(function (error) {
                if (error.code === 4001) {
                    // User rejected request
                } else { 
                    console.log("Error is here")
                    console.error(error)
                }
            })
        } else {
          alert("No Ethereum interface injected into browser. Read-only access");
        }
    }

    async function signOut() {
        setSignedIn(false)
    }

    async function callContractData() {
        const boidsContract = new ethers.Contract(boidsAddress, Boids.abi, window.ethersProvider);
        setBoidsContract(boidsContract);

        const signer = window.ethersProvider.getSigner()
        const boidsWithSigner = boidsContract.connect(signer)
        setBoidsWithSigner(boidsWithSigner);

        const salebool = await boidsContract.saleIsActive();
        setSaleStarted(salebool);

        const totalSupply = String(await boidsContract.totalSupply());
        setTotalSupply(totalSupply);
    
        const boidPrice = await boidsContract.boidPrice()
        setBoidPrice(boidPrice)
    }

    async function mintBoidFunctionality () { 
        if (saleStarted && boidsWithSigner) { //Control mint powers here! can't mint until active!
            const price = String(boidPrice  * howManyBoids)
            const gasAmount = await window.ethersProvider.getGasPrice()
    
            let overrides = {
                from: walletAddress, 
                value: price,
                gasPrice: gasAmount, 
            }
    
            await boidsWithSigner.mintBoid(howManyBoids, overrides)
            console.log("Successfully minted this many boids: ", howManyBoids)
        } else {
            alert("Sale is not active yet.  Try again later!");
        }
    }


    async function mintBoid () { 
        if (typeof window.ethereum != "undefined") { 
            console.log("Sale status: ", saleStarted)
            if (signedIn) {
                await mintBoidFunctionality ()
            } else {
                //await getWalletAccounts ()

                //if (signedIn) {
                    //await mintBoidFunctionality ()

               // } else {
                alert("Wallet not connected! Connect to mint boids.");
               // }
            }
        }
    }

    async function flipSaleState () { 
        if (boidsContract && signedIn) { 
            await boidsWithSigner.flipSaleState()
            console.log("New sale state: ", await boidsContract.saleIsActive())
        }
    }

    async function test () { 
        const balance = await window.ethersProvider.getBalance(boidsAddress);
        console.log("THIS IS THE TEST: ", window.ethersProvider, totalSupply, boidPrice, saleStarted)
        console.log("The contract now has this much eth: ", balance.toString())

    }
    
    return (
        <div className="bar__wrapper" id="mint">
            <div className="bar">
                <div className="bar__container">
                    <h2>Minting is live! Mint before its too late.</h2> 
                    <h3>TOTAL BOIDS MINTED:  <span> {!signedIn ?  <>-</>  :  <>{totalSupply}</> } / 1500</span></h3>
                    
                    <h3>Input number of boids to mint:</h3>
                    <input 
                        type="number" 
                        min="1"
                        max="20"
                        value={howManyBoids}
                        onChange={ e => setHowManyBoids(e.target.value) }
                        name="" 
                    />
                    <button onClick={() => mintBoid()}>Mint {howManyBoids} boid(s)</button>
                    <button onClick={flipSaleState}>Flip It</button>
                    <button onClick={test}>TEST IT</button>
                    {!signedIn ? <button onClick={getWalletAccounts}>Connect Wallet with Metamask</button>
                        : <button onClick={signOut}>Wallet Connected: {walletAddress} Click to sign out</button>
                    }
                </div>
            </div>  
        </div>
    
    );
}
