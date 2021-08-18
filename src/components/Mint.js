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

    useEffect( () => { 
        signIn()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function signIn() {
        if (typeof window.ethereum !== 'undefined') {
            window.ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
            await window.ethereum.request({ method: 'eth_accounts' })
            .then(async function (accounts) {
                let wallet = accounts[0]
                setWalletAddress(wallet)
                setSignedIn(true)
                callContractData()
            })
            .catch(function (error) {
                console.error(error)
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

    async function mintBoid (howManyBoids) { 
        if (typeof window.ethereum != "undefined") { 
            console.log("Sale status: ", saleStarted)
            if (await boidsContract.saleIsActive()) { //Control mint powers here! can't mint until active!
                if (boidsWithSigner && signedIn) {
                    const price = String(boidPrice  * 1)
                    const gasAmount = await window.ethersProvider.getGasPrice()

                    let overrides = {
                        from: walletAddress, 
                        value: price,
                        gasPrice: gasAmount, 
                    }

                    await boidsWithSigner.mintBoid(howManyBoids, overrides)
                    console.log("Successfully minted this many boids: ", howManyBoids)

                    const balance = await window.ethersProvider.getBalance(boidsAddress);
                    console.log("The contract now has this much eth: ", balance.toString())
                    
                } else {
                    alert("Wallet not connected.");
                }
            } else {
                alert("Sale is not active yet.  Try again later!");
            }
        }
    }

    async function flipSaleState () { 
        if (boidsContract && signedIn) { 
            await boidsWithSigner.flipSaleState()
            console.log("New sale state: ", await boidsContract.saleIsActive())
        }
    }
    
    return (
        <div className="bar__wrapper" id="mint">
            <div className="bar">
                <div className="bar__container">
                    <h2>Minting is live! Mint before its too late.</h2> 
                    <h3>TOTAL BOIDS MINTED:  <span> {!signedIn ?  <>-</>  :  <>{totalSupply}</> } / 1500</span></h3>
                    <button onClick={flipSaleState}>Flip It</button>
                    <button onClick={() => mintBoid(1)}>Mint a boid</button>

                    {!signedIn ? <button onClick={signIn}>Connect Wallet with Metamask</button>
                        : <button onClick={signOut}>Wallet Connected: {walletAddress} Click to sign out</button>
                    }
                </div>
            </div>  
        </div>
    
    );
}
