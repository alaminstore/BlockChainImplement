const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index,timastamp,data,prevhash=''){
        this.index = index;
        this.timastamp = timastamp;
        this.data = data;
        this.prevhash = prevhash;
        this.hash = this.calculateHash();
    }
    
    calculateHash = ()=> SHA256(this.index + this.timestamp + JSON.stringify(this.data)).toString();
    
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock(){
        return new Block(0,"02/02/2020","first block","0");
    }
    getLastestBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(newblock){
        newblock.prevhash = this.getLastestBlock().hash;
        newblock.hash = newblock.calculateHash();
        this.chain.push(newblock);
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
test.addBlock(new Block(1, 03/03/2020,"amount: 4"));
test.addBlock(new Block(2, 04/05/ 2020, { amount: 3 }));
console.log('is blockchain is valid?'+ test.VerifiedChain());

test.chain[1].data = {amount: 4};
test.chain[1].hash = test.chain[1].calculateHash();
console.log('Chain is valid?'+ test.VerifiedChain());
