const hre = require("hardhat");

async function main () { 
    const Boids = await hre.ethers.getContractFactory("Boids");
    const boids = await Boids.deploy("https://ipfs.io/ipfs/QmZmSamAHmMSAZYKpS3KuZS9m1ZyVbwwieUzYYdjUBMhxJ/")
    await boids.deployed();
    console.log("Boids deployed to ", boids.address);
}

main ()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });