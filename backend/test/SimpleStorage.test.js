const {
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("SimpleStorage", function () {
  
  async function deploySimpleStorageFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorage.deploy();

    return { simpleStorage, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should get the favorite number", async function () {
      const { simpleStorage } = await loadFixture(deploySimpleStorageFixture);
      let favoriteNumber = await simpleStorage.getNumber()
      assert.equal(favoriteNumber.toString(), '0')
    });

    it("Should set the favorite number", async function() {
      const { simpleStorage } = await loadFixture(deploySimpleStorageFixture);
      let transaction = await simpleStorage.setNumber(7)
      await transaction.wait(1)
      let favoriteNumber = await simpleStorage.getNumber()
      assert.equal(favoriteNumber.toString(), '7')
    })
  });
});
