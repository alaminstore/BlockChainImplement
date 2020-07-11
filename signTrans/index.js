const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const mykey = ec.keyFromPrivate('0bab37891d4bb8afb27ecf2d0b2bdb42a724f0d8874076d3a9d51bea77dff16a');
const mywalletAddress = mykey.getPublic('hex');

let test = new Blockchain();

const tx1 = new Transaction(mywalletAddress,'OtherpersonPublickey',25);
tx1.signTransaction(mykey);
test.addTransaction(tx1);
test.minePendingTransaction(mywalletAddress); 

// const tx2 = new Transaction(mywalletAddress,'address2',20);
// tx2.signTransaction(mykey);
// test.addTransaction(tx2);


// test.createTransaction(
// new Transaction('address1','address2',200)
// );
// test.createTransaction(
// new Transaction('address2','address1',50)
// );

console.log(test.pendingTransactions); //You can see the Transactions Info
//console.log(JSON.stringify(test.pendingTransactions,null,5));
console.log('\nMining Start...');
// test.minePendingTransaction(mywalletAddress); 
console.log('Miner balance is: ',test.getBalanceOfAddress(mywalletAddress));
//test.chain[1].transactions[0].amount = 2;
console.log("Chain is valid or not?  ",test.VerifiedChain());



