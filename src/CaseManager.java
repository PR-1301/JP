import java.util.ArrayList;

public class CaseManager {

    private ArrayList<CaseRecord> cases = new ArrayList<>();

    // Add a new case
    public void addCase(CaseRecord record) {
        cases.add(record);
    }

    // Display all cases
    public void displayAllCases() {
        if (cases.isEmpty()) {
            System.out.println("No cases found.");
            return;
        }

        for (CaseRecord c : cases) {
            System.out.println(c);
        }
    }

    // Search case by Survey Number
    public CaseRecord searchCase(String surveyNo) {
        for (CaseRecord c : cases) {
            if (c.getSurveyNo().equalsIgnoreCase(surveyNo)) {
                return c;
            }
        }
        return null;
    }

    // Search case by Case ID
    public CaseRecord searchCaseById(String caseId) {
        for (CaseRecord c : cases) {
            if (c.getCaseId().equalsIgnoreCase(caseId)) {
                return c;
            }
        }
        return null;
    }

    // Update case status
    public void updateCaseStatus(String caseId, String newStatus) {
        CaseRecord record = searchCaseById(caseId);

        if (record != null) {
            record.setStatus(newStatus);
            System.out.println("Case updated successfully.");
        } else {
            System.out.println("Case not found.");
        }
    }

    // Delete a case
    public void deleteCase(String caseId) {
        CaseRecord record = searchCaseById(caseId);

        if (record != null) {
            cases.remove(record);
            System.out.println("Case deleted successfully.");
        } else {
            System.out.println("Case not found.");
        }
    }

    // Total number of cases
    public int getTotalCases() {
        return cases.size();
    }
}