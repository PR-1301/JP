package service;

import dao.UserDAO;
import model.User;
import util.PasswordUtil;
import util.SessionManager;

public class AuthenticationService {
    private UserDAO userDAO;

    public AuthenticationService() {
        this.userDAO = new UserDAO();
    }

    /**
     * Authenticates a user based on username, password, and expected role.
     * @return true if successful, false otherwise.
     */
    public boolean login(String username, String password, String role) {
        User user = userDAO.getUserByUsername(username);

        if (user != null && "ACTIVE".equals(user.getStatus())) {
            // Check password and role
            if (PasswordUtil.checkPassword(password, user.getPasswordHash()) && user.getRole().equals(role)) {
                SessionManager.login(user);
                return true;
            }
        }
        return false;
    }

    public void logout() {
        SessionManager.logout();
    }
}
