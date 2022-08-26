// Get private keys from .env file
require('dotenv').config();
//const { ALCHEMY_KEY, METAMASK_KEY } = process.env;

//Define ABI
let minABI = [
    // transfer
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
    ];

// Ethereum javascript libraries needed
//import Web3 from 'Web3'
var Web3 = require('web3');
var Tx = require('ethereumjs-tx').Transaction;

// Rather than using a local blockchain (using GETH), we are interacting here with the public ethereum blockchain node via alchemy
const web3 = new Web3(Web3.givenProvider || `https://eth-goerli.g.alchemy.com/v2/WyKm3aljTp2epU_zvEeLtA6BEFIy7-Uh`)

// Create an async function so I can use the "await" keyword to wait for things to finish
const main = async () => {
  console.log(`web3 version: ${web3.version}`)

  // Sender and Txn Signer Address
  var myAddress = "0x5171050beb52148aB834Fb21E3E30FA429470c46";

  // Destination address
  var destAddress = "0x50cAdE6ec896E675644742188ba885d8FCC25039";

  // Transfer amount in 10^18 decimal places, in below example, amount is 2 LINK
  var transferAmount = BigInt(2*10**18);

  // Determine the nonce
  var count = await web3.eth.getTransactionCount(myAddress);
  console.log(`num transactions so far: ${count}`);

  // This is the address of the contract for the ERC20 token, example here is LINK
  var contractAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
  
  var contract = new web3.eth.Contract(minABI, contractAddress, { from: myAddress });
  
  const METAMASK_KEY = "4ef63770f02888abded959c550e6d1060859bad0f344abc78009af37db936d6d";
  var privKey = new Buffer.from(METAMASK_KEY, 'hex')
  
  //Creating a txn object, sign it with metamask pvt key and then broadcasting this signed txn
  web3.eth.getTransactionCount(myAddress, (err, txCount) => {
    data = contract.methods.transfer(destAddress, transferAmount).encodeABI();
    const txObject = {
        nonce:    web3.utils.toHex(txCount),
        to: contractAddress,
        gasLimit: web3.utils.toHex(200000), 
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        data:    data,
             }
    const tx = new Tx(txObject, { chain: 'goerli' });
    tx.sign(privKey)

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('err:', err, 'txHash:', txHash)
    })
});

}

main();
