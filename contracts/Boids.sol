// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Boids is ERC721URIStorage, Ownable {
    using SafeMath for uint256;

    string public BOID_IFPS = ""; //IFPS link for reveal 

    uint256 public constant MAX_BOIDS = 2000;
    uint256 public constant boidPrice = 25000000000000000; //0.025 eth
    uint public constant maxBoidPurchase = 20;
    uint256 public totalSupply = 0; 

    bool public saleIsActive = false;

    constructor() ERC721("Boid", "BOID") { }

    function setIFPShash(string memory IFPShash) public onlyOwner {
        // Set IFPS link on reveal
        BOID_IFPS = IFPShash;
    }

    function flipSaleState() public onlyOwner {
        saleIsActive = !saleIsActive;
    }

    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    function mintBoid (uint numberOfTokens) public payable{
        require(saleIsActive, "Sale must be active to mint a Boid");
        require(numberOfTokens > 0 && numberOfTokens <= maxBoidPurchase, "Can only mint 20 tokens at a time");
        require(totalSupply.add(numberOfTokens) <= MAX_BOIDS, "Purchase would exceed max supply of Boids");
        require(msg.value >= boidPrice.mul(numberOfTokens), "Ether value sent is not correct");
        
        for(uint i = 0; i < numberOfTokens; i++) {
            totalSupply = totalSupply.add(1);
            if (totalSupply < MAX_BOIDS) {
                _safeMint(msg.sender, totalSupply);
            }
        }
    }

    function setTokenUri (uint256 tokenId, string memory _tokenURI) public { 
        require(_isApprovedOrOwner(msg.sender, tokenId), "ERC721 transfer caller is not owner or approved.");
        _setTokenURI(tokenId, _tokenURI);
    }
}