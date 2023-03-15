// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {IAccount} from "./interfaces/IAccount.sol";
import {IEntryPoint} from "./interfaces/IEntryPoint.sol";
import {UserOperation, UserOperationLib} from "./interfaces/UserOperation.sol";
import {Exec} from "./utils/Exec.sol";
import "./Helpers.sol";

contract BioAccount is IAccount {
    using UserOperationLib for UserOperation;

    IEntryPoint internal immutable entryPoint;
    bytes internal constant publicKey = "0x038eb6366f309b6bc7c76255196395e8617c72632d3690c55f";
    address internal constant secp256r1 = address(0x1773);
    uint256 private nonce;

    constructor(address _entryPointAddress) {
        entryPoint = IEntryPoint(_entryPointAddress);
    }

    function validateUserOp(UserOperation calldata userOp, bytes32 userOpHash, uint256 missingAccountFunds)
        external
        override
        returns (uint256 validationData)
    {
        bool valid = Exec.staticcall(secp256r1, abi.encode(publicKey, userOpHash, userOp.signature), gasleft());
        _payPrefund(missingAccountFunds);
        return _packValidationData(valid, 0, 0);
    }

    function _payPrefund(uint256 missingAccountFunds) internal {
        if (missingAccountFunds != 0) {
            (bool success,) = payable(msg.sender).call{value: missingAccountFunds, gas: type(uint256).max}("");
            (success);
        }
    }
}
