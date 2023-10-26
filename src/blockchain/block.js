const crypto = require('crypto');

function calculateHash(block) {
  return crypto
    .createHash('sha256')
    .update(
      block.index +
      block.previousHash +
      block.timestamp +
      JSON.stringify(block.data) +
      block.nonce
    )
    .digest('hex');
}

function mineBlock(block, difficulty) {
  while (block.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
    block.nonce++;
    block.hash = calculateHash(block);
  }
}

module.exports = {
  calculateHash,
  mineBlock,
};
