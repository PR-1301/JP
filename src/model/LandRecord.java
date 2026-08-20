package model;

import java.sql.Date;
import java.sql.Timestamp;

public class LandRecord {
    private int id;
    private String surveyNumber;
    private String ownerName;
    private String propertyType;
    private double area;
    private String location;
    private String registrationNumber;
    private Date registrationDate;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    public LandRecord() {}

    public LandRecord(int id, String surveyNumber, String ownerName, String propertyType, 
                      double area, String location, String registrationNumber, Date registrationDate, 
                      Timestamp createdAt, Timestamp updatedAt) {
        this.id = id;
        this.surveyNumber = surveyNumber;
        this.ownerName = ownerName;
        this.propertyType = propertyType;
        this.area = area;
        this.location = location;
        this.registrationNumber = registrationNumber;
        this.registrationDate = registrationDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public String getSurveyNumber() { return surveyNumber; }
    public void setSurveyNumber(String surveyNumber) { this.surveyNumber = surveyNumber; }
    
    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }
    
    public String getPropertyType() { return propertyType; }
    public void setPropertyType(String propertyType) { this.propertyType = propertyType; }
    
    public double getArea() { return area; }
    public void setArea(double area) { this.area = area; }
    
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    
    public String getRegistrationNumber() { return registrationNumber; }
    public void setRegistrationNumber(String registrationNumber) { this.registrationNumber = registrationNumber; }
    
    public Date getRegistrationDate() { return registrationDate; }
    public void setRegistrationDate(Date registrationDate) { this.registrationDate = registrationDate; }
    
    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }
    
    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }
}
