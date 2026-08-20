package model;

public class Block {
    private int id; // database id
    private int index;
    private String timestamp;
    private String transactionData;
    private String previousHash;
    private String hash;

    public Block() {}

    public Block(int index, String timestamp, String transactionData, String previousHash, String hash) {
        this.index = index;
        this.timestamp = timestamp;
        this.transactionData = transactionData;
        this.previousHash = previousHash;
        this.hash = hash;
    }

    public Block(int id, int index, String timestamp, String transactionData, String previousHash, String hash) {
        this.id = id;
        this.index = index;
        this.timestamp = timestamp;
        this.transactionData = transactionData;
        this.previousHash = previousHash;
        this.hash = hash;
    }

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public int getIndex() { return index; }
    public void setIndex(int index) { this.index = index; }
    
    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
    
    public String getTransactionData() { return transactionData; }
    public void setTransactionData(String transactionData) { this.transactionData = transactionData; }
    
    public String getPreviousHash() { return previousHash; }
    public void setPreviousHash(String previousHash) { this.previousHash = previousHash; }
    
    public String getHash() { return hash; }
    public void setHash(String hash) { this.hash = hash; }
}
