const crypto = require('crypto');

function createBlockchain(difficulty) {
  const chain = [createGenesisBlock()];
  return {
    chain,
    difficulty,
    createBlock,
    getLatestBlock,
    addBlock,
    isChainValid,
  };
}

function createGenesisBlock() {
  return createBlock(0, '0', new Date().toISOString(), 'Genesis Block', 4);
}

function createBlock(index, previousHash, timestamp, data, difficulty) {
  const block = {
    index,
    previousHash,
    timestamp,
    data,
    difficulty,
    nonce: 0,
    hash: '',
  };
  block.hash = calculateHash(block);
  return block;
}

function getLatestBlock(blockchain) {
  const val=blockchain.chain?.length;
  console.log("val",val)
  console.log("valtttt",typeof(val))
  return blockchain.chain[val - 1];
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

function calculateHash(block) {
  const data = block.index + block.previousHash + block.timestamp + JSON.stringify(block.data) + block.difficulty + block.nonce;
  return crypto.createHash('SHA256').update(data).digest('hex');
}

function mineBlock(block, difficulty) {
  while (block.hash.substring(0, difficulty) !== '0'.repeat(difficulty)) {
    block.nonce++;
    block.hash = calculateHash(block);
  }
}

module.exports = {
  createBlockchain,
  createBlock,
  createGenesisBlock, // Export the createGenesisBlock function.
};
