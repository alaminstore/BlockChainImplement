# Blockchain Implement<br/>

To run this project you must need to install node js first, that is basically javascript runtime environment. After then you have to install node modules that means create command within code directory folder. <br/>
                                        [1]  npm install --save crypto-js<br/>
                                        In this application I am using SHA-256 cryptographic hash functions for calculating hash(hash function)<br/>
                                        but it's not available in javascript by default. That's why we had to import this library by [1] command.<br/>
After completting the setup,<br/>

###### (CreateChain.js) Run the program.
 You will get a json data. Within json data, all the value (timestamp,data, previous block's hash and block's hash) will be decorated according to index.<br/>
 
###### (ChainVarified.js) Run the program.
-Here you can verified that the chain is valid or not.It will match any blocks previous hash and previsous block's current hash is equal or not.<br/>
-Even after tempering any block's data it will return false.<br/>
-Also If you are trying to recalculate the hash value after change the data of any block it will give a false value.<br/>
That means,not possible to change the value of a block.<br/>

###### (proof_of_work.js) Run the program.
Proof of work basically uses to set the difficulty in mining because we don't want people to create many transactions quickly or  within per second and span our blockchain. And basically difficulty level is often changing according to change the increase or decrease the power of a computer and the value of difficulty is being changed using some particular theory to do this.<br/>
The formula of difficulty looks like,  <br/>
new-difficulty  =  old-difficulty  *  (targeted  block’s  implement  time/actual  timewaste of equal blocks implement)<br/>
If difficulty changes after 2 weeks then equivalent minutes is 20160. And if theexpected mining time interval is 10 minutes then 2016 blocks create in 2 weeks.But if the machine becomes powerful and creates a new block within 9 minutesthen the approximate times for creating 2016 blocks = 18144 m.<br/>
let the old difficulty = 5, then new difficulty formula is, <br/>
new-difficulty = old-difficulty * 20160/18144 <br/>
= 5*1.11111 <br/>
= 5.55 (increase 0.55) <br/> 
Hence,  if  expected  blocks  number  ==  actual  blocks  number  then  difficultychange is equal to zero. <br/>
The value of Difficulty is changed to control the trans-action of each block on exact time when the machine power is high or low. <br/>

###### (RewardForMiner.js) Run the program.


###### Sample of crypto wallet 
<img src="https://github.com/alaminstore/BlockChainImplement/blob/master/public_privateKey.png">

 
