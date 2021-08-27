const hre = require("hardhat");

async function main () { 
    const Boids = await hre.ethers.getContractFactory("Boids");
    const boids = await Boids.deploy("ipfs://QmWDAVBDmGRJ6CtZvz1ZpK6Ztr1Y1DuLc9FkDDUaaSEjf5")

    await boids.deployed();
    console.log("Boids deployed to ", boids.address);
}

main ()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });