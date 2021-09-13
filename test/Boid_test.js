const { expect } = require("chai");

describe("Boid contract", function () {
  let Boid;
  let contract;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    Boid = await ethers.getContractFactory("Boids");
    [owner, addr1, addr2] = await ethers.getSigners();

    contract = await Boid.deploy("");
  });

  describe("Deployment", function () {
    it("deploys successfully", async () => {
      const address = await contract.address;
      expect(address).not.equal("");
      expect(address).not.equal(0x0);
      expect(address).not.equal(null);
      expect(address).not.equal(undefined);
    })

    it("Should set the right owner", async function () {
      expect(await contract.owner()).to.equal(owner.address);
    });

    it("Should set max boids and current boids", async function () { 
      expect(await contract.MAX_BOIDS()).to.equal(2000);
      expect(await contract.totalSupply()).to.equal(0);
    })

    it("Sale inactive, IFPS is blank", async function () { 
      expect(await contract.saleIsActive()).to.equal(false);
    })

    it("Should set flip sale state", async function () { 
      await contract.flipSaleState();
      expect(await contract.saleIsActive()).to.equal(true);
    })
  });

  describe("Testing Mint Owner", async () => { 
    it("Should set base uri", async function () { 
      const numToMint = 5; 
      await contract.flipSaleState();
      const test = await contract.mintOwner(numToMint);
      console.log(test)
      console.log(await contract.balanceOf(owner.address))
      expect(await contract.balanceOf(owner.address)).to.equal(numToMint);
    })
  });
});
/*
  describe("Minting", async () => { 
    
    it("Should mint a token", async function () { 
      const numToMint = 5; 
      await contract.flipSaleState();
      await contract.connect(addr1).mintBoid(numToMint);
      expect(await contract.totalSupply()).to.equal(numToMint);
      expect(await contract.ownerOf(1)).to.equal(addr1.address);
      expect((await contract.balanceOf(addr1.address)).toNumber()).to.equal(numToMint);
      
      await contract.connect(addr2).mintBoid(numToMint);
      expect(await contract.totalSupply()).to.equal(10);
      expect(await contract.ownerOf(6)).to.equal(addr2.address);
      expect((await contract.balanceOf(addr2.address)).toNumber()).to.equal(numToMint);
    })
  });

  describe("Transferring", async () => { 
    it("Should transfer token 1 from addr1 to addr2", async function () { 
      const numToMint = 5; 
      await contract.flipSaleState();
      await contract.connect(addr1).mintBoid(numToMint);

      await contract.connect(addr1)['safeTransferFrom(address,address,uint256)'](addr1.address, addr2.address, 1); 
      expect(await contract.totalSupply()).to.equal(numToMint);
      expect(await contract.ownerOf(1)).to.equal(addr2.address);
      expect(await contract.ownerOf(2)).to.equal(addr1.address);
      expect((await contract.balanceOf(addr1.address)).toNumber()).to.equal(4);
      expect((await contract.balanceOf(addr2.address)).toNumber()).to.equal(1);
    })
  });
*/