// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Scholarship {
    struct Student {
        address studentAddress;
        string name;
        string educationDetails;
        uint256 fundingNeeded;
        bool isApproved;
    }

    struct Donor {
        address donorAddress;
        uint256 totalDonated;
    }

    mapping(address => Student) public students;
    mapping(address => Donor) public donors;

    event ScholarshipApplied(address indexed student, string name, uint256 fundingNeeded);
    event DonationReceived(address indexed donor, address indexed student, uint256 amount);

    function applyForScholarship(string memory name, string memory educationDetails, uint256 fundingNeeded) public {
        require(students[msg.sender].studentAddress == address(0), "Student already applied");
        students[msg.sender] = Student(msg.sender, name, educationDetails, fundingNeeded, false);
        emit ScholarshipApplied(msg.sender, name, fundingNeeded);
    }

    function donateToScholarship(address studentAddress) public payable {
        require(msg.value > 0, "Donation must be greater than 0");
        require(students[studentAddress].studentAddress != address(0), "Student does not exist");

        donors[msg.sender].donorAddress = msg.sender;
        donors[msg.sender].totalDonated += msg.value;

        emit DonationReceived(msg.sender, studentAddress, msg.value);
    }

    function getStudentDetails(address studentAddress) public view returns (string memory name, string memory educationDetails, uint256 fundingNeeded) {
        Student memory student = students[studentAddress];
        return (student.name, student.educationDetails, student.fundingNeeded);
    }
}