//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract FundMe{

    uint256 public minimumUSD = 50;

    function fund() public payable{

      
        require(msg.value > minimumUSD, "Didn't send enough!");
    }
    //function withdraw (){}
}