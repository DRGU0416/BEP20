// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract Token is ERC20 {
    constructor(uint totalSupply) ERC20("Token Name", "Token Symbol") {
        _mint(msg.sender, totalSupply);
        console.log("The owner address is:", msg.sender);
        console.log("Total supply is:", totalSupply);
    }
}