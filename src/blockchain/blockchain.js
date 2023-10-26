const { calculateHash, mineBlock } = require('./block');

function createBlockchain(difficulty) {
  const chain = [createGenesisBlock()];
  return {
    chain,
    difficulty,
    createGenesisBlock,
    getLatestBlock,
    addBlock,
    isChainValid,
  };
}

function createGenesisBlock() {
  return createBlock(0, '0', new Date().toISOString(), 'Genesis Block', 4); // Here, we assume a fixed difficulty of 4.
}

function getLatestBlock(blockchain) {
  return blockchain.chain[blockchain.chain.length - 1];
}

function addBlock(blockchain, newBlock) {
  newBlock.previousHash = getLatestBlock(blockchain).hash;
  mineBlock(newBlock, blockchain.difficulty);
  blockchain.chain.push(newBlock);
}

function isChainValid(blockchain) {
  const chain = blockchain.chain;
  for (let i = 1; i < chain.length; i++) {
    const currentBlock = chain[i];
    const previousBlock = chain[i - 1];
    if (currentBlock.hash !== calculateHash(currentBlock) || currentBlock.previousHash !== previousBlock.hash) {
      return false;
    }
  }
  return true;
}

module.exports = createBlockchain;
