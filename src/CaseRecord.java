public class CaseRecord {

    private String caseId;
    private String surveyNo;
    private String status;

    public CaseRecord(String caseId, String surveyNo, String status) {
        this.caseId = caseId;
        this.surveyNo = surveyNo;
        this.status = status;
    }

    // Getters
    public String getCaseId() {
        return caseId;
    }

    public String getSurveyNo() {
        return surveyNo;
    }

    public String getStatus() {
        return status;
    }

    // Setter
    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return caseId + " " + surveyNo + " " + status;
    }
}