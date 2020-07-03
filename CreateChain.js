const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index,timastamp,data,prevhash=''){
        this.index = index;
        this.timastamp = timastamp;
        this.data = data;
        this.prevhash = prevhash;
        this.hash = this.calculateHash();
    }
    calculateHash(){

        return SHA256(this.index + this.timestamp + JSON.stringify(this.data)).toString(); 
    }
    
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
}

var test = new Blockchain();
test.addBlock(new Block(1, 03 / 03 / 2020,"def data"));
test.addBlock(new Block(2, 04 / 05 / 2020, { amount: 33 }));
console.log(JSON.stringify(test,null,4));
