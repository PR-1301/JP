package dao;

import model.LandRecord;
import util.DatabaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class LandDAO {

    public boolean addLandRecord(LandRecord record) {
        String sql = "INSERT INTO land_records (survey_number, owner_name, property_type, area, location, registration_number, registration_date) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, record.getSurveyNumber());
            pstmt.setString(2, record.getOwnerName());
            pstmt.setString(3, record.getPropertyType());
            pstmt.setDouble(4, record.getArea());
            pstmt.setString(5, record.getLocation());
            pstmt.setString(6, record.getRegistrationNumber());
            pstmt.setDate(7, record.getRegistrationDate());

            int rowsAffected = pstmt.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public LandRecord getLandRecordBySurveyNumber(String surveyNumber) {
        String sql = "SELECT * FROM land_records WHERE survey_number = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, surveyNumber);
            ResultSet rs = pstmt.executeQuery();

            if (rs.next()) {
                return extractLandRecordFromResultSet(rs);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<LandRecord> getAllLandRecords() {
        List<LandRecord> records = new ArrayList<>();
        String sql = "SELECT * FROM land_records";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {
            
            while (rs.next()) {
                records.add(extractLandRecordFromResultSet(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return records;
    }

    public boolean updateLandRecord(LandRecord record) {
        String sql = "UPDATE land_records SET owner_name = ?, property_type = ?, area = ?, location = ?, registration_number = ?, registration_date = ? " +
                     "WHERE survey_number = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, record.getOwnerName());
            pstmt.setString(2, record.getPropertyType());
            pstmt.setDouble(3, record.getArea());
            pstmt.setString(4, record.getLocation());
            pstmt.setString(5, record.getRegistrationNumber());
            pstmt.setDate(6, record.getRegistrationDate());
            pstmt.setString(7, record.getSurveyNumber());

            int rowsAffected = pstmt.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean deleteLandRecord(String surveyNumber) {
        String sql = "DELETE FROM land_records WHERE survey_number = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, surveyNumber);
            int rowsAffected = pstmt.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    private LandRecord extractLandRecordFromResultSet(ResultSet rs) throws SQLException {
        LandRecord record = new LandRecord();
        record.setId(rs.getInt("id"));
        record.setSurveyNumber(rs.getString("survey_number"));
        record.setOwnerName(rs.getString("owner_name"));
        record.setPropertyType(rs.getString("property_type"));
        record.setArea(rs.getDouble("area"));
        record.setLocation(rs.getString("location"));
        record.setRegistrationNumber(rs.getString("registration_number"));
        record.setRegistrationDate(rs.getDate("registration_date"));
        record.setCreatedAt(rs.getTimestamp("created_at"));
        record.setUpdatedAt(rs.getTimestamp("updated_at"));
        return record;
    }
}
