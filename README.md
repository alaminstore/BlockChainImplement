# Blockchain Implement

To run this project you must need to install node js first, that is basically javascript runtime environment. After then you have to install node modules that means create command within code directory folder. 
                                           [1]  npm install --save crypto-js
                                            In this application I am using SHA-256 cryptographic hash functions for calculating hash(hash function)
                                            but it's not available in javascript by default. That's why we had to import this library by [1] command.
After completting the setup,

###### (CreateChain.js) Run the program.
 You will get a json data. Within json data, all the value (timestamp,data, previous block's hash and block's hash) will be decorated according to index.
 
###### (ChainVarified.js) Run the program.
-Here you can verified that the chain is valid or not.It will match any blocks previous hash and previsous block's current hash is equal or not.
-Even after tempering any block's data it will return false.
-Also If you are trying to recalculate the hash value after change the data of any block it will give a false value.
That means,not possible to change the value of a block.

 
