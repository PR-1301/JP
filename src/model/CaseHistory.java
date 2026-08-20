package model;

import java.sql.Date;
import java.sql.Timestamp;

public class CaseHistory {
    private int id;
    private String caseId;
    private Date hearingDate;
    private String eventDescription;
    private String status;
    private String updatedBy;
    private Timestamp createdAt;

    public CaseHistory() {}

    public CaseHistory(int id, String caseId, Date hearingDate, String eventDescription, 
                       String status, String updatedBy, Timestamp createdAt) {
        this.id = id;
        this.caseId = caseId;
        this.hearingDate = hearingDate;
        this.eventDescription = eventDescription;
        this.status = status;
        this.updatedBy = updatedBy;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public String getCaseId() { return caseId; }
    public void setCaseId(String caseId) { this.caseId = caseId; }
    
    public Date getHearingDate() { return hearingDate; }
    public void setHearingDate(Date hearingDate) { this.hearingDate = hearingDate; }
    
    public String getEventDescription() { return eventDescription; }
    public void setEventDescription(String eventDescription) { this.eventDescription = eventDescription; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getUpdatedBy() { return updatedBy; }
    public void setUpdatedBy(String updatedBy) { this.updatedBy = updatedBy; }
    
    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }
}
