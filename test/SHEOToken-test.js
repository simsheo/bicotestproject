const { expect } = require("chai");

describe("SHEOToken contract", function () {
	let totalSupply = '10000000000000000000000'; // 10000 * 1e18
	let Token;
	let contractToken;
	let owner;
	let addr1;
	let addr2;
	beforeEach(async function () {
		Token = await ethers.getContractFactory("SHEOToken");
		[owner, addr1, addr2] = await ethers.getSigners();
		contractToken = await Token.deploy(totalSupply);
	});

describe("Token Details Sanity Checks", function () {
	it('Token name should be correct', async function () {
		expect(await contractToken.name()).to.equal("SHEOKAND");
	});

	it('Token symbol should be correct', async function () {
		expect(await contractToken.symbol()).to.equal("SHEO");
	});
	
	it('Token should have 18 decimals', async function () {
		expect(await contractToken.decimals()).to.equal(18);
	});
});

describe("Deployment", function () {
	it("Should assign the total supply of tokens to the owner", async function () {
		const ownerBalance = await contractToken.balanceOf(owner.address);
		expect(await contractToken.totalSupply()).to.equal(ownerBalance);
	});
});

describe("Transactions Test Scenarios", function () {
	it("Should successfully transfer tokens between accounts and balance is correctly updated on both ends", async function () {
		const ownerBalance = await contractToken.balanceOf(owner.address);
		await contractToken.transfer(addr1.address, 1000);
		const addr1Balance = await contractToken.balanceOf(addr1.address);
		expect(addr1Balance).to.equal(1000);

		await contractToken.connect(addr1).transfer(addr2.address, 1000);
		const addr2Balance = await contractToken.balanceOf(addr2.address);
		expect(addr2Balance).to.equal(1000);
	  });

	it('Transfer event is emitted when transfer method is invoked', async () => {
		await expect(contractToken.transfer(addr1.address, 500))
		  .to.emit(contractToken, 'Transfer')
		  .withArgs(owner.address, addr1.address, 500);
	  });

	it("Test for 0 amount transfer should create a transfer event", async function () {
		const ownerBalance = await contractToken.balanceOf(owner.address);
		const addr1Balance = await contractToken.balanceOf(addr1.address);
		await expect(contractToken.transfer(addr1.address, 0))
		  .to.emit(contractToken, 'Transfer')
		  .withArgs(owner.address, addr1.address, 0);
		expect(addr1Balance).to.equal(0);
		expect(ownerBalance).to.equal(ownerBalance);
	  });

	  it("Test for 0 amount transfer should not change sender and receiever balances", async function () {
		const ownerBalance = await contractToken.balanceOf(owner.address);
		const addr1Balance = await contractToken.balanceOf(addr1.address);
		await expect(contractToken.transfer(addr1.address, 0));
		expect(addr1Balance).to.equal(0);
		expect(ownerBalance).to.equal(ownerBalance);
	  });

	it("Transaction should revert if sender doesn’t have enough tokens", async function () {
		const initialOwnerBalance = await contractToken.balanceOf(owner.address);
		const addr1Balance = await contractToken.balanceOf(addr1.address);
		await expect(
			contractToken.connect(addr1).transfer(owner.address, 1)
		).to.be.revertedWith("ERC20: transfer amount exceeds balance");
        expect(await contractToken.balanceOf(owner.address)).to.equal(
			initialOwnerBalance
		);
	});

	it('Transfers should not affect totalSupply', async function () {
		let supply1 = await contractToken.totalSupply.call();
		await contractToken.transfer(addr1.address, 500);
		let supply2 = await contractToken.totalSupply.call();
		expect(supply2).to.equal(supply1);
	})
        
});
});
