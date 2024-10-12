// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IBasenameResolver {
    function resolve(string calldata name) external view returns (address);
}

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

    IBasenameResolver public basenameResolver;

    mapping(address => Student) public students;
    mapping(address => Donor) public donors;

    event ScholarshipApplied(address indexed student, string name, uint256 fundingNeeded);
    event DonationReceived(address indexed donor, address indexed student, uint256 amount);

    // Constructor to set the address of the BasenameResolver contract
    constructor(address _basenameResolver) {
        basenameResolver = IBasenameResolver(_basenameResolver);
    }

    // Apply for a scholarship
    function applyForScholarship(string memory name, string memory educationDetails, uint256 fundingNeeded) public {
        require(students[msg.sender].studentAddress == address(0), "Student already applied");
        students[msg.sender] = Student(msg.sender, name, educationDetails, fundingNeeded, false);
        emit ScholarshipApplied(msg.sender, name, fundingNeeded);
    }

    // Donate to a scholarship using student's address
    function donateToScholarship(address studentAddress) public payable {
        require(msg.value > 0, "Donation must be greater than 0");
        require(students[studentAddress].studentAddress != address(0), "Student does not exist");

        donors[msg.sender].donorAddress = msg.sender;
        donors[msg.sender].totalDonated += msg.value;

        emit DonationReceived(msg.sender, studentAddress, msg.value);
    }

    // Donate to a scholarship using the student's Basename
    function donateToScholarshipByBasename(string calldata studentBasename) public payable {
        require(msg.value > 0, "Donation must be greater than 0");

        // Resolve the student's Basename to an address
        address studentAddress = basenameResolver.resolve(studentBasename);
        require(studentAddress != address(0), "Student with this Basename does not exist");
        require(students[studentAddress].studentAddress != address(0), "Student does not exist");

        // Process the donation
        donors[msg.sender].donorAddress = msg.sender;
        donors[msg.sender].totalDonated += msg.value;

        emit DonationReceived(msg.sender, studentAddress, msg.value);
    }

    // Get student details using the student's address
    function getStudentDetails(address studentAddress) public view returns (string memory name, string memory educationDetails, uint256 fundingNeeded) {
        Student memory student = students[studentAddress];
        return (student.name, student.educationDetails, student.fundingNeeded);
    }

    // Get student details using the student's Basename
    function getStudentDetailsByBasename(string calldata studentBasename) public view returns (string memory name, string memory educationDetails, uint256 fundingNeeded) {
        // Resolve the Basename to an address
        address studentAddress = basenameResolver.resolve(studentBasename);
        require(studentAddress != address(0), "Student with this Basename does not exist");

        Student memory student = students[studentAddress];
        return (student.name, student.educationDetails, student.fundingNeeded);
    }
}
