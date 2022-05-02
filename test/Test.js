const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat")

describe("A standard BEP20 contract", function () {
    
    let HardhatToken;
    let hardhatToken;
    let ownerBalance;
    let owner;
    let addr1;
    let addr2;
    let tl = '1000000000000000000000000' // initial total supply
    
    beforeEach(async function() {
        // Deploy the contract, and pass in the inital amount of 1000000 tokens.
        HardhatToken = await ethers.getContractFactory("BEP20Token");
        
        // Getting a list of the accounts in the node we're connected to.
        [owner, addr1, addr2] = await ethers.getSigners();
        
        hardhatToken = await HardhatToken.deploy(); 
    })

    describe("Migration", function () {
        it("Should track the name, symbol and decimal of the BEP20 token", async function() {
          const tokenName = "Token Name";
          const tokenSymbol = "TKN";
          expect(await hardhatToken.name()).to.equal(tokenName);
          expect(await hardhatToken.symbol()).to.equal(tokenSymbol);
          expect(await hardhatToken.decimals()).to.equal(18);  // default for BEP20
        })

        it("Should check the total supply and owner's balance", async function() {
            // Check the total supply.
            expect(await hardhatToken.totalSupply()).to.equal(tl); 
            // Check whether the supplied tokens are assigned the the owner.
            // Using hardhat-waffle's asserting functions. 
            ownerBalance = await hardhatToken.balanceOf(owner.address);            
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        })
    })
    
    // Test token-transfer between different accounts (transactions).
    describe("Transaction", function() {
        it("Should transfer tokens between accounts", async function() {
            // Transfer 500 tokens from the owner to addr1.
            await hardhatToken.transfer(addr1.address, 500);
            expect(await hardhatToken.balanceOf(addr1.address)).to.equal(500);
            
            // Transfer 200 tokens from addr1 to addr2.
            await hardhatToken.connect(addr1).transfer(addr2.address, 200);
            expect(await hardhatToken.balanceOf(addr2.address)).to.equal(200);
        })
    })
})
