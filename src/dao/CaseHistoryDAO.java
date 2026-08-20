package dao;

import model.CaseHistory;
import util.DatabaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CaseHistoryDAO {

    public boolean addHistory(CaseHistory history) {
        String sql = "INSERT INTO case_history (case_id, hearing_date, event_description, status, updated_by) " +
                     "VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, history.getCaseId());
            pstmt.setDate(2, history.getHearingDate());
            pstmt.setString(3, history.getEventDescription());
            pstmt.setString(4, history.getStatus());
            pstmt.setString(5, history.getUpdatedBy());

            int rowsAffected = pstmt.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public List<CaseHistory> getHistoryByCaseId(String caseId) {
        List<CaseHistory> historyList = new ArrayList<>();
        String sql = "SELECT * FROM case_history WHERE case_id = ? ORDER BY hearing_date DESC, created_at DESC";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, caseId);
            ResultSet rs = pstmt.executeQuery();
            
            while (rs.next()) {
                CaseHistory history = new CaseHistory();
                history.setId(rs.getInt("id"));
                history.setCaseId(rs.getString("case_id"));
                history.setHearingDate(rs.getDate("hearing_date"));
                history.setEventDescription(rs.getString("event_description"));
                history.setStatus(rs.getString("status"));
                history.setUpdatedBy(rs.getString("updated_by"));
                history.setCreatedAt(rs.getTimestamp("created_at"));
                historyList.add(history);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return historyList;
    }
}
