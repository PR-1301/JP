package util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    // Note: Update these credentials if your local MySQL setup is different.
    private static final String URL = "jdbc:mysql://localhost:3306/land_litigation_db";
    private static final String USER = "root";
    private static final String PASSWORD = "root"; 

    private static Connection connection = null;

    public static Connection getConnection() {
        try {
            if (connection == null || connection.isClosed()) {
                // Ensure the MySQL driver is loaded. (Requires MySQL Connector/J in classpath)
                Class.forName("com.mysql.cj.jdbc.Driver");
                connection = DriverManager.getConnection(URL, USER, PASSWORD);
            }
        } catch (ClassNotFoundException | SQLException e) {
            System.err.println("Database Connection failed!");
            e.printStackTrace();
        }
        return connection;
    }

    public static void closeConnection() {
        try {
            if (connection != null && !connection.isClosed()) {
                connection.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
