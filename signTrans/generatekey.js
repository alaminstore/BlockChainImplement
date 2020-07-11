const EC = require('elliptic').ec;
const ec = new EC('secp256k1'); //secp256k1 is a algorithm that's a basis of wallet

const key = ec.genKeyPair();
const publickey = key.getPublic('hex'); //hexdecimal format
const privatekey = key.getPrivate('hex');

console.log('Public key: ' , publickey);
console.log('Private key: ' , privatekey);
