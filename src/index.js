const { createBlockchain, createGenesisBlock, createBlock } = require('./blockchain/blockchain');

const difficulty = 4;
const myBlockchain = createBlockchain(difficulty);

myBlockchain.chain.push(createGenesisBlock()); // Create the Genesis block.

myBlockchain.addBlock(createBlock(1, myBlockchain.getLatestBlock(myBlockchain), new Date().toISOString(), 'Block 1 Data'));
myBlockchain.addBlock(createBlock(2, myBlockchain.getLatestBlock(myBlockchain), new Date().toISOString(), 'Block 2 Data'));

const isBlockchainValid = myBlockchain.isChainValid(myBlockchain);
console.log('Is the blockchain valid? ' + isBlockchainValid);

myBlockchain.chain[1].data = 'Modified Block 1 Data';

const isTamperedBlockchainValid = myBlockchain.isChainValid(myBlockchain);
console.log('Is the tampered blockchain valid? ' + isTamperedBlockchainValid);
