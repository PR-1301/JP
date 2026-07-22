import java.util.Scanner;

public class Citizen extends User {

    public Citizen(String username, String password, LandManager landManager, CaseManager caseManager){
        super(username, password, landManager, caseManager);
    }

    @Override
    public void showMenu(Scanner scanner){
        while(true) {
            System.out.println("\n--- Citizen Menu ---");
            System.out.println("1. Search Case by Survey No");
            System.out.println("2. Search Case by Case ID");
            System.out.println("3. Display All Cases");
            System.out.println("4. Display All Land Records");
            System.out.println("5. Logout");
            System.out.print("Enter choice: ");
            
            String choice = scanner.nextLine();
            switch(choice) {
                case "1":
                    System.out.print("Enter Survey No: ");
                    String surveyNo = scanner.nextLine();
                    CaseRecord cr = caseManager.searchCase(surveyNo);
                    if(cr != null) System.out.println(cr);
                    else System.out.println("Case not found.");
                    break;
                case "2":
                    System.out.print("Enter Case ID: ");
                    String caseId = scanner.nextLine();
                    CaseRecord crId = caseManager.searchCaseById(caseId);
                    if(crId != null) System.out.println(crId);
                    else System.out.println("Case not found.");
                    break;
                case "3":
                    caseManager.displayAllCases();
                    break;
                case "4":
                    landManager.displayAllLands();
                    break;
                case "5":
                    System.out.println("Logging out...");
                    return;
                default:
                    System.out.println("Invalid choice. Try again.");
            }
        }
    }
}