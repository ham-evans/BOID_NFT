import React, { useEffect, useState } from 'react';
import "./MintHome.css";
import { ethers } from 'ethers';
import Boids from '../artifacts/contracts/Boids.sol/Boids.json';
import bgVideo from '../images/mainBackgroundVideo.mp4';
import { Slider, RangeSlider } from 'rsuite';

const boidsAddress = '0xeAceC5181402623d9E5AaE97d7765C9b9cEa73Ad';

export default function MintHome () {
    const [signedIn, setSignedIn] = useState(false);
    const [walletAddress, setWalletAddress] = useState(null);
    const [boidsContract, setBoidsContract] = useState(null);
    const [boidsWithSigner, setBoidsWithSigner] = useState(null);
    const [saleStarted, setSaleStarted] = useState(false);
    const [totalSupply, setTotalSupply] = useState(0);
    const [boidPrice, setBoidPrice] = useState(0)
    const [howManyBoids, setHowManyBoids] = useState(1)

    useEffect( () => { 
        signIn()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function signIn() {
        if (typeof window.ethereum !== 'undefined') {
            window.ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
            const network = await window.ethersProvider.getNetwork();
            if (network.chainId == 3){
                await window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(async function (accounts) {
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
                        alert("Sign in to Mint BOIDS");
                    } else { 
                        console.log("Error is here")
                        console.error(error)
                    }
                })
            } else { 
                setSignedIn(false)
                alert("Switch network to Ropsten Test Network before continuing.")
            }
            
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

    async function mintBoid () { 
        if (typeof window.ethereum != "undefined") { 
            console.log("Sale status: ", saleStarted)
            if (signedIn) {
                if (saleStarted && boidsWithSigner) { //Control mint powers here! can't mint until active!
                    const price = String(boidPrice  * howManyBoids)
                    const gasAmount = await window.ethersProvider.getGasPrice()
            
                    let overrides = {
                        from: walletAddress, 
                        value: price,
                        gasPrice: gasAmount, 
                    }
            
                    await boidsWithSigner.mintBoid(howManyBoids, overrides)
                } else {
                    alert("Sale is not active yet.  Try again later!");
                }
            } else {
                alert("Wallet not connected! Connect to mint boids.");
            }
        }
    }

    async function flipSaleState () { 
        if (boidsContract && signedIn) { 
            await boidsWithSigner.flipSaleState()
            console.log("New sale state: ", await boidsContract.saleIsActive())
        }
    }

    function checkHowMany (newNumber) { 
        if (newNumber > 20) {
            setHowManyBoids(20)
        } else if (newNumber < 1) { 
            setHowManyBoids("")
        } else { 
            setHowManyBoids(newNumber)
        }
    }

    return (
        <div className="minthome" id="#home">
            <div dangerouslySetInnerHTML={{ __html: `
                <video
                loop
                muted
                autoplay
                playsinline
                src="${bgVideo}"
                class="videoTag"
                />,
            `}}></div>
            
            <div className="minthome__textcontainer">
                <h1>BOIDS</h1>
                <div className="bar__container">
                    <h2>Minting is live! Mint before its too late.</h2> 
                    {!signedIn ? <button onClick={signIn}>Connect Wallet with Metamask</button>
                        : <button onClick={signOut}>Wallet Connected<br/>Click to sign out</button>
                    }

                    <h3>TOTAL BOIDS MINTED:  <span> {!signedIn ?  <>-</>  :  <>{totalSupply}</> } / 1500</span></h3>
                    
                    <p>Input number of boids to mint:</p>

                    <input 
                        type="number" 
                        min="1"
                        max="20"
                        value={howManyBoids}
                        onChange={ e => checkHowMany(e.target.value) }
                        name="" 
                    />
                    
                    {howManyBoids > 0 ? <button onClick={() => mintBoid()}>MINT {howManyBoids} BOID(S)</button>
                        : <button onClick={() => alert("Must mint atleast 1 BOID")}>MINT {howManyBoids} BOID(S)</button>
                    }
                    
                </div>
            </div>
        </div>
    );
}