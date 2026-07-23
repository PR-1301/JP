import java.util.Scanner;

public class Admin extends User {

    public Admin(String username, String password, LandManager landManager, CaseManager caseManager) {
        super(username, password, landManager, caseManager);
    }

    @Override
    public void showMenu(Scanner scanner) {
        while (true) {
            System.out.println("\n--- Admin Menu ---");
            System.out.println("1. Add Land Record");
            System.out.println("2. Display All Land Records");
            System.out.println("3. Add Case");
            System.out.println("4. Update Case Status");
            System.out.println("5. Delete Case");
            System.out.println("6. Display All Cases");
            System.out.println("7. Logout");
            System.out.print("Enter choice: ");

            String choice = scanner.nextLine();
            switch (choice) {
                case "1":
                    System.out.print("Enter Survey No: ");
                    String surveyNo = scanner.nextLine();
                    System.out.print("Enter Owner Name: ");
                    String owner = scanner.nextLine();
                    System.out.print("Enter Village: ");
                    String village = scanner.nextLine();
                    System.out.print("Enter Area No: ");
                    try {
                        double area = Double.parseDouble(scanner.nextLine());
                        landManager.addLand(new LandRecord(surveyNo, owner, village, area));
                        System.out.println("Land Record added.");
                    } catch (NumberFormatException e) {
                        System.out.println("Invalid area. Please enter a number.");
                    }
                    break;
                case "2":
                    landManager.displayAllLands();
                    break;
                case "3":
                    System.out.print("Enter Case ID: ");
                    String caseId = scanner.nextLine();
                    System.out.print("Enter Survey No: ");
                    String cSurveyNo = scanner.nextLine();
                    System.out.print("Enter Status: ");
                    String status = scanner.nextLine();
                    caseManager.addCase(new CaseRecord(caseId, cSurveyNo, status));
                    System.out.println("Case added.");
                    break;
                case "4":
                    System.out.print("Enter Case ID: ");
                    String uCaseId = scanner.nextLine();
                    System.out.print("Enter New Status: ");
                    String uStatus = scanner.nextLine();
                    caseManager.updateCaseStatus(uCaseId, uStatus);
                    break;
                case "5":
                    System.out.print("Enter Case ID: ");
                    String dCaseId = scanner.nextLine();
                    caseManager.deleteCase(dCaseId);
                    break;
                case "6":
                    caseManager.displayAllCases();
                    break;
                case "7":
                    System.out.println("Logging out...");
                    return;
                default:
                    System.out.println("Invalid choice. Try again.");
            }
        }
    }
}