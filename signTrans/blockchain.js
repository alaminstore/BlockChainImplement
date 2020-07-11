const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

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

    hasValidTransaction(){
        for(const tx of this.transactions){
            if(!tx.isValid){
             return false;   
            }
        }

        return true;
    }
    
}

class Transaction{
    constructor(fromAddress,toAddress,amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    calculateHash(){
        return SHA256(this.fromAddress+this.toAddress+this.amount).toString();
    }

    signTransaction(signingkey){  //sigingkey will be the object that we have got from our elliptic library
        if(signingkey.getPublic('hex') != this.fromAddress){
            throw new Error('You are not eligible to sign for others wallet');
        }

        const hashtx = this.calculateHash();
        const sign = signingkey.sign(hashtx,'base64');
        this.signature = sign.toDER('hex');
    }

    isValid(){
        if(this.fromAddress == null) return true; // cause mining reward address have no from address.
        if(!this.signature || this.signature.length == 0){
            throw new Error('There is no signature in this transaction');
        }

        const publicKey = ec.keyFromPublic(this.fromAddress,'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;  //you can reduce difficulty for quick mining
        this.pendingTransactions = [];
        this.miningReward = 100;
    }
    createGenesisBlock(){
        return new Block("02/02/2020","first block","N/A");
    }
    getLastestBlock(){
        return this.chain[this.chain.length-1];
    }


    minePendingTransaction(miningRewardAddress) {
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);

        const block = new Block(Date.now(), this.pendingTransactions, this.getLastestBlock().hash);
        block.blockmining(this.difficulty);

        this.chain.push(block);

        this.pendingTransactions = [];
    }


    // minePendingTransaction(mineRewardAddress){
    //     let block = new Block(Date.now(),this.pendingTransactions,this.getLastestBlock().hash);
    //     block.blockmining(this.difficulty);

    //     console.log('Block mined successfully.');
    //     this.chain.push(block);
    //     this.pendingTransactions = [new Transaction(null,mineRewardAddress,this.miningReward)];     
    // }

    addTransaction(transaction){
        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error('Transaction must include from and to address');
        }
        if(!transaction.isValid){
            throw new Error('Invalid transaction can not add into chain');
        }

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
            if(!currentblock.hasValidTransaction()) return false;
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

module.exports.Blockchain = Blockchain;
module.exports.Transaction = Transaction;
