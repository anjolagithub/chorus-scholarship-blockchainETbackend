const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Scholarship Contract", function () {
    let Scholarship;
    let scholarship;
    let owner;

    beforeEach(async function () {
        Scholarship = await ethers.getContractFactory("Scholarship");
        scholarship = await Scholarship.deploy();
        [owner] = await ethers.getSigners();
    });

    it("Should allow students to apply for scholarships", async function () {
        await scholarship.applyForScholarship("Alice", "Computer Science", 1000);
        const studentDetails = await scholarship.getStudentDetails(owner.address);
        
        expect(studentDetails[0]).to.equal("Alice");
        expect(studentDetails[1]).to.equal("Computer Science");
        expect(studentDetails[2]).to.equal(1000);
    });

    it("Should allow donors to donate to scholarships", async function () {
        await scholarship.applyForScholarship("Alice", "Computer Science", 1000);
        
        // Ensure the donation is made with the correct value
        await scholarship.connect(owner).donateToScholarship(owner.address, { value: ethers.parseEther("1") });
        
        const donorDetails = await scholarship.donors(owner.address);
        
        expect(donorDetails.totalDonated).to.equal(ethers.parseEther("1"));
    });
});