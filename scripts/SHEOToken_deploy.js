const hre = require("hardhat");

async function main() {

	  const SHEOToken = await hre.ethers.getContractFactory("SHEOToken");
	  console.log('Deploying SHEOToken...');
	  const token = await SHEOToken.deploy('10000000000000000000000');

	  await token.deployed();
	  console.log("SHEOToken deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
	      console.error(error);
	      process.exit(1);
	    });
