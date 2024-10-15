// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BasenameResolver {
    // Declare the mapping to hold the names and their owners
    mapping(string => address) private _names;

    event NameRegistered(string name, address owner);

    function register(string memory name, address owner) public {
        require(bytes(name).length > 0, "Basename cannot be empty");
        require(owner != address(0), "Invalid address");
        require(_names[name] == address(0), "Name already registered");

        _names[name] = owner;
        emit NameRegistered(name, owner);
    }

    function resolve(string memory name) public view returns (address) {
        return _names[name];
    }
}
