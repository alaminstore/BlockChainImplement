const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(timastamp,transactions,prevhash=''){
        this.timastamp = timastamp;
        this.transactions = transactions;
        this.prevhash = prevhash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash(){
        return SHA256(this.index + this.timestamp + JSON.stringify(this.transactions)+ this.nonce).toString(); 
    }

    blockmining(difficulty){
        while(this.hash.substring(0,difficulty) != Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: "+this.hash);
        
    }
    
}

class Transaction{
    constructor(fromAddress,toAddress,amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;  //you can reduce difficulty for quick mining
        this.pendingTransactions = [];
        this.miningReward = 30;
    }
    createGenesisBlock(){
        return new Block("02/02/2020","first block","N/A");
    }
    getLastestBlock(){
        return this.chain[this.chain.length-1];
    }

    minePendingTransaction(mineRewardAddress){
        let block = new Block(Date.now(),this.pendingTransactions,this.getLastestBlock().hash);
        block.blockmining(this.difficulty);

        console.log('Block mined successfully.');
        this.chain.push(block);
        this.pendingTransactions = [new Transaction(null,mineRewardAddress,this.miningReward)];     
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;
        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance = balance - trans.amount;
                }
                if(trans.toAddress === address){
                    balance = balance + trans.amount;
                }
            }
        }

        return balance;
    }

    VerifiedChain(){
        for(let i = 1; i< this.chain.length; i++){
            const currentblock = this.chain[i];
            const prevblock = this.chain[i-1];
            if(currentblock.hash.toString() != currentblock.calculateHash()){
                return false;
            }
            if(currentblock.prevhash.toString() != prevblock.hash.toString() ){
                return false;
            }
        }
        return true;
    }
}

var test = new Blockchain();
test.createTransaction(
new Transaction('address1','address2',200)
);
test.createTransaction(
new Transaction('address2','address1',50)
);

//console.log(test.pendingTransactions); //You can see the Transactions Info

console.log('\nMining Start...');
test.minePendingTransaction('Alamin'); // just set a fake address
console.log('Miner balance is: ',test.getBalanceOfAddress('Alamin'));

console.log('\nSecond Mining Start...');
test.minePendingTransaction('Alamin');
console.log('Miner balance is: ',test.getBalanceOfAddress('Alamin'));


console.log('\nThird Mining Start...');
test.minePendingTransaction('Alamin');
console.log('Miner balance is: ',test.getBalanceOfAddress('Alamin'));   //just added new coin and increase the miner's balance


