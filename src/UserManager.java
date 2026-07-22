import java.util.ArrayList;
import java.io.*;

public class UserManager {

    private ArrayList<User> users = new ArrayList<>();
    private final String FILE_NAME = "users.dat";

    public UserManager() {
        loadData();
    }

    @SuppressWarnings("unchecked")
    private void loadData() {
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(FILE_NAME))) {
            users = (ArrayList<User>) ois.readObject();
        } catch (FileNotFoundException e) {
            // File not found on first run, ignore
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("Error loading users: " + e.getMessage());
        }
    }

    public void saveData() {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(FILE_NAME))) {
            oos.writeObject(users);
        } catch (IOException e) {
            System.out.println("Error saving users: " + e.getMessage());
        }
    }

    public void addUser(User user) {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null.");
        }
        users.add(user);
        saveData();
    }

    public User authenticate(String username, String password) {
        for (User u : users) {
            if (u.login(username, password)) {
                return u;
            }
        }
        return null;
    }

    public boolean userExists(String username) {
        for (User u : users) {
            if (u.getUsername().equalsIgnoreCase(username)) {
                return true;
            }
        }
        return false;
    }

    public void displayAllUsers() {
        if (users.isEmpty()) {
            System.out.println("No users found.");
            return;
        }
        for (User u : users) {
            System.out.println(u.getUsername() + " (" + u.getClass().getSimpleName() + ")");
        }
    }

    public boolean isEmpty() {
        return users.isEmpty();
    }
    
    public ArrayList<User> getUsers() {
        return users;
    }
}
