# bicotestproject
## Task1a:
scripts/transferERC20TestNet.js is a standalone javascript file that does erc20 token transfer on goerli blockchain. Under test-results folder, transaction hash with details about this transfer is given in this file -- TestNetERC20Transferlogs.txt
Also, screenshot of changes in account balances on Metamask for sender and receiver accounts is also attached here - TestNetERC20TransferMetamask.jpg

## Task1b:
test/SHEOToken-test.js has test cases in a hardhat framework that tests different negative and positive scenarios related to ERC20 token transfer. Created a basic ERC20
token here - contracts/SHEOToken.sol and deployed it on a local hardhat network and test-cases are run against it
test-results/hardhatERC20Tests-Results.JPG shows all test-cases passing along with test coverage information
