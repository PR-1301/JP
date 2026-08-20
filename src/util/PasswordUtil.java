package util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Utility for hashing passwords.
 * Separated here so it can easily be upgraded to BCrypt in the future if required.
 * Currently uses SHA-256 for educational simplicity without external dependencies.
 */
public class PasswordUtil {

    public static String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashedBytes = md.digest(password.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte b : hashedBytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }

    public static boolean checkPassword(String plainPassword, String hashedPassword) {
        return hashPassword(plainPassword).equals(hashedPassword);
    }
}
