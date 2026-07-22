import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        // Create Managers
        LandManager landManager = new LandManager();
        CaseManager caseManager = new CaseManager();
        UserManager userManager = new UserManager();

        // Inject the Case and Land managers into all loaded users
        for (User u : userManager.getUsers()) {
            u.setManagers(landManager, caseManager);
        }

        // If it's empty on the first run, add the default users
        if (userManager.isEmpty()) {
            userManager.addUser(new Admin("admin", "admin123", landManager, caseManager));
            userManager.addUser(new Citizen("citizen", "1234", landManager, caseManager));
        }

        while (true) {
            System.out.println("==============================");
            System.out.println("LAND LITIGATION SYSTEM");
            System.out.println("==============================");
            System.out.println("1. Login");
            System.out.println("2. Sign Up");
            System.out.println("3. Exit");
            System.out.print("Enter choice: ");
            
            String choice = scanner.nextLine();
            
            if (choice.equals("3")) {
                break;
            } else if (choice.equals("2")) {
                // Sign Up flow
                System.out.print("Enter new Username: ");
                String newUsername = scanner.nextLine();
                
                if (userManager.userExists(newUsername)) {
                    System.out.println("Username already exists! Please try another.\n");
                    continue;
                }
                
                System.out.print("Enter new Password: ");
                String newPassword = scanner.nextLine();
                System.out.print("Register as (A)dmin or (C)itizen? ");
                String role = scanner.nextLine();
                
                if (role.equalsIgnoreCase("A")) {
                    userManager.addUser(new Admin(newUsername, newPassword, landManager, caseManager));
                    System.out.println("Admin account created successfully!\n");
                } else if (role.equalsIgnoreCase("C")) {
                    userManager.addUser(new Citizen(newUsername, newPassword, landManager, caseManager));
                    System.out.println("Citizen account created successfully!\n");
                } else {
                    System.out.println("Invalid role. Account creation failed.\n");
                }
                
            } else if (choice.equals("1")) {
                // Login flow
                System.out.print("Username: ");
                String username = scanner.nextLine();

                System.out.print("Password: ");
                String password = scanner.nextLine();

                // Login checking
                User loggedInUser = userManager.authenticate(username, password);

                if (loggedInUser != null) {
                    System.out.println("Login successful");
                    if (loggedInUser instanceof Admin) {
                        System.out.println("Welcome Admin");
                    } else {
                        System.out.println("Welcome Citizen");
                    }
                    loggedInUser.showMenu(scanner);
                } else {
                    System.out.println("Invalid Username or Password\n");
                }
            } else {
                System.out.println("Invalid choice. Try again.\n");
            }
        }

        scanner.close();
    }
}