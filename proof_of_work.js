const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index,timastamp,data,prevhash=''){
        this.index = index;
        this.timastamp = timastamp;
        this.data = data;
        this.prevhash = prevhash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash(){
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data)+ this.nonce).toString(); 
    }

    blockmining(difficulty){
        while(this.hash.substring(0,difficulty) != Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: "+this.hash);
        
    }
    
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
    }
    createGenesisBlock(){
        return new Block(0,"02/02/2020","first block","0");
    }
    getLastestBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(newblock){
        newblock.prevhash = this.getLastestBlock().hash;
        newblock.blockmining(this.difficulty);
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
console.log("Mining Block one: ...");

test.addBlock(new Block(1, 03/03/2020,"amount: 4"));
console.log("Mining Block two: ...");
test.addBlock(new Block(2, 04/05/ 2020, { amount: 3 }));
console.log("Mining Block three: ...");
test.addBlock(new Block(3, 06/05/ 2020, { amount: 6 }));

console.log("\n");
//console.log("BlockChain" + JSON.stringify(test,null,4) ); // you can see the nonce value 

