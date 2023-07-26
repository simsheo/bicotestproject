# Task1a:
## Problem:
Write a script in javascript that does an erc20 token transfer on goerli test network.

## Solution/Approach:
Used Alchemy API for the Ethereum public network node in the scenario, the challenging part that took a bit of time for me to get this working was I kept on missing to add ‘0x’ with serialized txn for to be able to broadcast this signed txn.

## Areas of Improvement:
I tried a few times to add my private keys (alchemy and metamask keys) in the .env file and used dotenv package to call in my script but for some strange reason, it didn’t work for me. This is additional step I could add to the script if I would have more time.

## Script Details:
scripts/transferERC20TestNet.js is a standalone javascript file that does erc20 token transfer on goerli blockchain. Under test-results folder, transaction hash with details about this transfer is given in this file -- TestNetERC20Transferlogs.txt
Also, screenshot of changes in account balances on Metamask for sender and receiver accounts is also attached here - Metamask-Balances-BeforeAfter.pdf
This script can be run standalone as:  node scripts/transferERC20TestNet.js

# Task1b:
## Problem:
Write different test cases while doing an ERC20 token transfer using a hardhat. You can use a hardhat local network to run the test transactions.

## Solution/Approach:
This was straightforward task, only issue that I faced here was that hardhat installation was not clean because it had some conflicts with existing node version on my machine, I fixed it by spinning a new VM (EC2 on AWS) and did a fresh installation there and it worked fine.

## Areas of Improvement:
I added some basic sanity checks around Token details (name, symbol, decimals) and tests around Transactions (balance update, transfer emit events, transfer events with 0 amount, not enough funds, sending more than totalsupply, shouldn’t change totalsupply etc.). Other tests that could have been added if I would have more time could be around - allowances (increasing and decreasing), approvals (sender is approved or not approved). I thought of running hardhat tests via CI/CD using Github Actions but realized after a few trials it could take me a bit longer to test that out properly.

## Script Details:
test/SHEOToken-test.js has test cases in a hardhat framework that tests different negative and positive scenarios related to ERC20 token transfer. Created a basic ERC20
token here - contracts/SHEOToken.sol and deployed it on a local hardhat network and test-cases are run against it
test-results/hardhatERC20Tests-Results.JPG shows all test-cases passing along with test coverage information
This test script needs to be run witin hardhat environment as: npx hardhat test OR npx hardhat coverage

# Task2:
## Problem:
Functional Testing : Perform manual testing on https://hyphen-staging.biconomy.io/bridge and find as many bugs as possible.

## Solution/Approach:
I started with Wallet Connect functionality as that is the first step that an end-user would take to use Hyphen. I identified few areas in wallet connect functionality that could be fixed/made better, marked them as Medium priority fixes as there is workaround for them. There were issues observed around fields on Bridge page not getting updated as expected when input in source and destination chains changes., I marked them as High priority bugs. I wanted to test Add-Liquidity and Staking functions, I tried to get USDC and USDT on Goerli network to the Hyphen staging environment but balances didn’t update, so I marked this as a CRITICAL bug and created a detailed bug report with steps and screenshots for this issue. Data is missing in few screens, I marked them as Medium priority.

## Areas of Improvement:
Some of these tests could be extended to be tested as cross-browser tests. I tested them on Windows 10, Chrome version: Version 104.0.5112.102 (Official Build) (64-bit).

## Script Details:
Created this pdf document with Test Scenarios to test out different functions on the Hyphen staging website: https://github.com/simsheo/bicotestproject/blob/main/test-results/FUNCTIONAL_TESTING_-_HYPHEN.pdf
