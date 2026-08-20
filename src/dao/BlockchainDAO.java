package dao;

import model.Block;
import util.DatabaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class BlockchainDAO {

    public boolean addBlock(Block block) {
        String sql = "INSERT INTO blockchain_blocks (block_index, timestamp, transaction_data, previous_hash, hash) " +
                     "VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setInt(1, block.getIndex());
            pstmt.setString(2, block.getTimestamp());
            pstmt.setString(3, block.getTransactionData());
            pstmt.setString(4, block.getPreviousHash());
            pstmt.setString(5, block.getHash());

            int rowsAffected = pstmt.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public List<Block> getAllBlocks() {
        List<Block> chain = new ArrayList<>();
        String sql = "SELECT * FROM blockchain_blocks ORDER BY block_index ASC";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {
            
            while (rs.next()) {
                Block block = new Block();
                block.setId(rs.getInt("id"));
                block.setIndex(rs.getInt("block_index"));
                block.setTimestamp(rs.getString("timestamp"));
                block.setTransactionData(rs.getString("transaction_data"));
                block.setPreviousHash(rs.getString("previous_hash"));
                block.setHash(rs.getString("hash"));
                chain.add(block);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return chain;
    }
    
    public Block getLatestBlock() {
        String sql = "SELECT * FROM blockchain_blocks ORDER BY block_index DESC LIMIT 1";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {
            
            if (rs.next()) {
                Block block = new Block();
                block.setId(rs.getInt("id"));
                block.setIndex(rs.getInt("block_index"));
                block.setTimestamp(rs.getString("timestamp"));
                block.setTransactionData(rs.getString("transaction_data"));
                block.setPreviousHash(rs.getString("previous_hash"));
                block.setHash(rs.getString("hash"));
                return block;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
