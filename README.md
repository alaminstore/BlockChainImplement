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

###### (proof_of_work.js) Run the program.
Proof of work basically uses to set the difficulty in mining because we don't want people to create many transactions quickly or  within per second and span our blockchain. And basically difficulty level is often changing according to change the increase or decrease the power of a computer and the value of difficulty is being changed using some particular theory to do this.
The formula of difficulty looks like,  
new_difficulty = old_difficulty * (targeted block's implement time/actual time waste of equal blocks implement)
if difficulty change after 2 weeks then equivalent munites is 20160. And if the expected mining time interval is 10 minutes then 2016 blocks create for 2 weeks. But if the machine becomes powerful and creates a new block within 9 minutes then the approximate number of created blocks = 18144.
let the old difficulty = 4, then new difficulty formula is,
new_difficulty = old_difficulty * 20160/18144 
                       = 4*1.11111
                       = 4.44  (increase 1.11111)
if expected blocks number == actual blocks number then difficulty change is equal to zero.

 
