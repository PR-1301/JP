package dao;

import model.CaseRecord;
import util.DatabaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CaseDAO {

    public boolean addCase(CaseRecord caseRecord) {
        String sql = "INSERT INTO case_records (case_id, survey_number, case_type, court_name, filing_date, status, next_hearing_date) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, caseRecord.getCaseId());
            pstmt.setString(2, caseRecord.getSurveyNumber());
            pstmt.setString(3, caseRecord.getCaseType());
            pstmt.setString(4, caseRecord.getCourtName());
            pstmt.setDate(5, caseRecord.getFilingDate());
            pstmt.setString(6, caseRecord.getStatus());
            pstmt.setDate(7, caseRecord.getNextHearingDate());

            int rowsAffected = pstmt.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public CaseRecord getCaseByCaseId(String caseId) {
        String sql = "SELECT * FROM case_records WHERE case_id = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, caseId);
            ResultSet rs = pstmt.executeQuery();

            if (rs.next()) {
                return extractCaseRecordFromResultSet(rs);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<CaseRecord> getCasesBySurveyNumber(String surveyNumber) {
        List<CaseRecord> cases = new ArrayList<>();
        String sql = "SELECT * FROM case_records WHERE survey_number = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, surveyNumber);
            ResultSet rs = pstmt.executeQuery();
            
            while (rs.next()) {
                cases.add(extractCaseRecordFromResultSet(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return cases;
    }

    public List<CaseRecord> getAllCases() {
        List<CaseRecord> cases = new ArrayList<>();
        String sql = "SELECT * FROM case_records";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {
            
            while (rs.next()) {
                cases.add(extractCaseRecordFromResultSet(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return cases;
    }

    public boolean updateCaseStatusAndHearing(String caseId, String status, java.sql.Date nextHearingDate) {
        String sql = "UPDATE case_records SET status = ?, next_hearing_date = ? WHERE case_id = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, status);
            pstmt.setDate(2, nextHearingDate);
            pstmt.setString(3, caseId);

            int rowsAffected = pstmt.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
    
    public boolean deleteCase(String caseId) {
        String sql = "DELETE FROM case_records WHERE case_id = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, caseId);
            int rowsAffected = pstmt.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    private CaseRecord extractCaseRecordFromResultSet(ResultSet rs) throws SQLException {
        CaseRecord caseRecord = new CaseRecord();
        caseRecord.setId(rs.getInt("id"));
        caseRecord.setCaseId(rs.getString("case_id"));
        caseRecord.setSurveyNumber(rs.getString("survey_number"));
        caseRecord.setCaseType(rs.getString("case_type"));
        caseRecord.setCourtName(rs.getString("court_name"));
        caseRecord.setFilingDate(rs.getDate("filing_date"));
        caseRecord.setStatus(rs.getString("status"));
        caseRecord.setNextHearingDate(rs.getDate("next_hearing_date"));
        caseRecord.setCreatedAt(rs.getTimestamp("created_at"));
        caseRecord.setUpdatedAt(rs.getTimestamp("updated_at"));
        return caseRecord;
    }
}
