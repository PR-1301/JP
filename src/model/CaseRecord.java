package model;

import java.sql.Date;
import java.sql.Timestamp;

public class CaseRecord {
    private int id;
    private String caseId;
    private String surveyNumber;
    private String caseType;
    private String courtName;
    private Date filingDate;
    private String status;
    private Date nextHearingDate;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    public CaseRecord() {}

    public CaseRecord(int id, String caseId, String surveyNumber, String caseType, 
                      String courtName, Date filingDate, String status, Date nextHearingDate, 
                      Timestamp createdAt, Timestamp updatedAt) {
        this.id = id;
        this.caseId = caseId;
        this.surveyNumber = surveyNumber;
        this.caseType = caseType;
        this.courtName = courtName;
        this.filingDate = filingDate;
        this.status = status;
        this.nextHearingDate = nextHearingDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public String getCaseId() { return caseId; }
    public void setCaseId(String caseId) { this.caseId = caseId; }
    
    public String getSurveyNumber() { return surveyNumber; }
    public void setSurveyNumber(String surveyNumber) { this.surveyNumber = surveyNumber; }
    
    public String getCaseType() { return caseType; }
    public void setCaseType(String caseType) { this.caseType = caseType; }
    
    public String getCourtName() { return courtName; }
    public void setCourtName(String courtName) { this.courtName = courtName; }
    
    public Date getFilingDate() { return filingDate; }
    public void setFilingDate(Date filingDate) { this.filingDate = filingDate; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public Date getNextHearingDate() { return nextHearingDate; }
    public void setNextHearingDate(Date nextHearingDate) { this.nextHearingDate = nextHearingDate; }
    
    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }
    
    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }
}
