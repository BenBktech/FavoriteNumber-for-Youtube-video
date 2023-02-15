// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

contract SimpleStorage {
    
    uint private s_number;

    function setNumber(uint _s_number) external {
        s_number = _s_number;
    }

    function getNumber() external view returns(uint) {
        return s_number;
    }

}
