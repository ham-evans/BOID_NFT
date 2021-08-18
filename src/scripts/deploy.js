const hre = require("hardhat");

async function main() {
    const Boid = await hre.ethers.getContractFactory("Boid");
    const boid = await Boid.deploy();

    await boid.deployed()
  
    console.log("Boid deployed to:", boid.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });