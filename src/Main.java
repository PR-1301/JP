import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        // Create objects
        Admin admin = new Admin("admin", "admin123");
        Citizen citizen = new Citizen("citizen", "1234");

        System.out.println("==============================");
        System.out.println("LAND LITIGATION SYSTEM");
        System.out.println("==============================");


        System.out.print("Username: ");
        String username = scanner.nextLine();

        System.out.print("Password: ");
        String password = scanner.nextLine();


        // Login checking

        if(admin.login(username, password)) {

            System.out.println("Login successful");
            System.out.println("Welcome Admin");

            admin.showMenu();

        }

        else if(citizen.login(username, password)) {

            System.out.println("Login successful");
            System.out.println("Welcome Citizen");

            citizen.showMenu();

        }

        else {

            System.out.println("Invalid Username or Password");

        }


        scanner.close();
    }
}