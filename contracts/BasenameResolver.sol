// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IBasenameResolver {
    function resolve(string calldata name) external view returns (address);
    function register(string calldata name) external;
}

contract BasenameResolver is IBasenameResolver {
    mapping(string => address) private _names;

    event NameRegistered(string indexed name, address indexed owner);

    // Register a Basename to an address
    function register(string calldata name) external {
        require(_names[name] == address(0), "Name already registered");
        _names[name] = msg.sender; // The caller is the owner of the Basename
        emit NameRegistered(name, msg.sender);
    }

    // Resolve a Basename to an address
    function resolve(string calldata name) external view override returns (address) {
        return _names[name];
    }
}
