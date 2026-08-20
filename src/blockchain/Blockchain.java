package blockchain;

import dao.BlockchainDAO;
import model.Block;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class Blockchain {
    private BlockchainDAO blockchainDAO;
    private List<Block> chain;

    public Blockchain() {
        this.blockchainDAO = new BlockchainDAO();
        loadChain();
    }

    private void loadChain() {
        chain = blockchainDAO.getAllBlocks();
        // If chain is empty, create Genesis Block
        if (chain.isEmpty()) {
            createGenesisBlock();
        }
    }

    private void createGenesisBlock() {
        String timestamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
        String transactionData = "GENESIS_BLOCK";
        String previousHash = "0000000000000000000000000000000000000000000000000000000000000000";
        
        String hash = HashUtil.applySha256(0 + timestamp + transactionData + previousHash);
        
        Block genesis = new Block(0, timestamp, transactionData, previousHash, hash);
        
        if (blockchainDAO.addBlock(genesis)) {
            chain.add(genesis);
        } else {
            System.err.println("Failed to save genesis block to database.");
        }
    }

    public Block getLatestBlock() {
        if (chain.isEmpty()) {
            loadChain();
        }
        return chain.get(chain.size() - 1);
    }

    public synchronized boolean addTransaction(String transactionData) {
        Block latest = getLatestBlock();
        int nextIndex = latest.getIndex() + 1;
        String timestamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
        String previousHash = latest.getHash();
        
        String hash = HashUtil.applySha256(nextIndex + timestamp + transactionData + previousHash);
        
        Block newBlock = new Block(nextIndex, timestamp, transactionData, previousHash, hash);
        
        if (blockchainDAO.addBlock(newBlock)) {
            chain.add(newBlock);
            return true;
        }
        return false;
    }

    /**
     * Iterates over all blocks in the ledger and cryptographically verifies:
     * 1. The calculated hash of the current block is valid.
     * 2. The previousHash of the current block matches the hash of the previous block.
     * @return true if the entire chain is valid and untampered
     */
    public boolean isChainValid() {
        if (chain == null || chain.isEmpty()) {
            loadChain();
        }

        for (int i = 1; i < chain.size(); i++) {
            Block currentBlock = chain.get(i);
            Block previousBlock = chain.get(i - 1);

            // Check 1: Calculate the hash and compare it
            String calculatedHash = HashUtil.applySha256(
                    currentBlock.getIndex() + 
                    currentBlock.getTimestamp() + 
                    currentBlock.getTransactionData() + 
                    currentBlock.getPreviousHash()
            );
            
            if (!currentBlock.getHash().equals(calculatedHash)) {
                System.out.println("Current Hashes not equal at block " + i);
                return false;
            }

            // Check 2: Compare previous hash to actual previous hash
            if (!previousBlock.getHash().equals(currentBlock.getPreviousHash())) {
                System.out.println("Previous Hashes not equal at block " + i);
                return false;
            }
        }
        return true;
    }
}
