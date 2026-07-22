import java.util.ArrayList;
import java.io.*;

public class CaseManager {

    private ArrayList<CaseRecord> cases = new ArrayList<>();
    private final String FILE_NAME = "cases.dat";

    public CaseManager() {
        loadData();
        if (cases.isEmpty()) {
            generateDummyData();
        }
    }

    private void generateDummyData() {
        String[] statuses = {"Pending", "Resolved", "In Court", "Appealed", "Closed"};
        
        for (int i = 1; i <= 50; i++) {
            String caseId = "CASE-" + (5000 + i);
            String surveyNo = "SVY-" + (1000 + (i * 2)); // Matches every second dummy land
            String status = statuses[i % statuses.length];
            
            cases.add(new CaseRecord(caseId, surveyNo, status));
        }
        saveData();
        System.out.println("Auto-generated 50 dummy case records.");
    }

    @SuppressWarnings("unchecked")
    private void loadData() {
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(FILE_NAME))) {
            cases = (ArrayList<CaseRecord>) ois.readObject();
        } catch (FileNotFoundException e) {
            // File not found on first run, ignore
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("Error loading cases: " + e.getMessage());
        }
    }

    private void saveData() {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(FILE_NAME))) {
            oos.writeObject(cases);
        } catch (IOException e) {
            System.out.println("Error saving cases: " + e.getMessage());
        }
    }

    // Add a new case
    public void addCase(CaseRecord record) {
        if (record == null) {
            throw new IllegalArgumentException("Case record cannot be null.");
        }
        cases.add(record);
        saveData();
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
        if (surveyNo == null) {
            return null;
        }
        for (CaseRecord c : cases) {
            if (surveyNo.equalsIgnoreCase(c.getSurveyNo())) {
                return c;
            }
        }
        return null;
    }

    // Search case by Case ID
    public CaseRecord searchCaseById(String caseId) {
        if (caseId == null) {
            return null;
        }
        for (CaseRecord c : cases) {
            if (caseId.equalsIgnoreCase(c.getCaseId())) {
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
            saveData();
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
            saveData();
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
