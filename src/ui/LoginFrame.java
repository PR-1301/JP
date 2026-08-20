package ui;

import service.AuthenticationService;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class LoginFrame extends JFrame {
    private JTextField usernameField;
    private JPasswordField passwordField;
    private JComboBox<String> roleComboBox;
    private JButton loginButton;
    private JButton clearButton;
    private JButton exitButton;

    private AuthenticationService authService;

    public LoginFrame() {
        authService = new AuthenticationService();
        
        setTitle("Land Litigation Tracking System - Login");
        setSize(400, 300);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null); // Center on screen
        
        // Setup UI components
        initComponents();
    }

    private void initComponents() {
        JPanel mainPanel = new JPanel(new GridBagLayout());
        mainPanel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(10, 10, 10, 10);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        // Title
        JLabel titleLabel = new JLabel("System Login", SwingConstants.CENTER);
        titleLabel.setFont(new Font("Arial", Font.BOLD, 20));
        gbc.gridx = 0; gbc.gridy = 0; gbc.gridwidth = 2;
        mainPanel.add(titleLabel, gbc);

        // Username
        gbc.gridwidth = 1;
        gbc.gridy = 1; gbc.gridx = 0;
        mainPanel.add(new JLabel("Username:"), gbc);
        usernameField = new JTextField(15);
        gbc.gridx = 1;
        mainPanel.add(usernameField, gbc);

        // Password
        gbc.gridy = 2; gbc.gridx = 0;
        mainPanel.add(new JLabel("Password:"), gbc);
        passwordField = new JPasswordField(15);
        gbc.gridx = 1;
        mainPanel.add(passwordField, gbc);

        // Role
        gbc.gridy = 3; gbc.gridx = 0;
        mainPanel.add(new JLabel("Role:"), gbc);
        String[] roles = {"CITIZEN", "CLERK", "ADMIN"};
        roleComboBox = new JComboBox<>(roles);
        gbc.gridx = 1;
        mainPanel.add(roleComboBox, gbc);

        // Buttons Panel
        JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.CENTER, 10, 0));
        loginButton = new JButton("Login");
        clearButton = new JButton("Clear");
        exitButton = new JButton("Exit");
        
        buttonPanel.add(loginButton);
        buttonPanel.add(clearButton);
        buttonPanel.add(exitButton);

        gbc.gridy = 4; gbc.gridx = 0; gbc.gridwidth = 2;
        mainPanel.add(buttonPanel, gbc);

        add(mainPanel);

        // Action Listeners
        loginButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                handleLogin();
            }
        });

        clearButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                usernameField.setText("");
                passwordField.setText("");
                roleComboBox.setSelectedIndex(0);
            }
        });

        exitButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.exit(0);
            }
        });
    }

    private void handleLogin() {
        String username = usernameField.getText().trim();
        String password = new String(passwordField.getPassword());
        String role = (String) roleComboBox.getSelectedItem();

        if (username.isEmpty() || password.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Please enter username and password.", "Error", JOptionPane.ERROR_MESSAGE);
            return;
        }

        boolean success = authService.login(username, password, role);

        if (success) {
            JOptionPane.showMessageDialog(this, "Login successful as " + role + "!", "Success", JOptionPane.INFORMATION_MESSAGE);
            
            // Redirect based on role (To be implemented in later phases)
            this.dispose(); // Close login window
            
            if ("CITIZEN".equals(role)) {
                new CitizenDashboard().setVisible(true);
            } else if ("CLERK".equals(role)) {
                new ClerkDashboard().setVisible(true);
            } else if ("ADMIN".equals(role)) {
                new AdminDashboard().setVisible(true);
            }
            // For now, exit application if no dashboard exists
            // System.exit(0);
        } else {
            JOptionPane.showMessageDialog(this, "Invalid credentials or role.", "Login Failed", JOptionPane.ERROR_MESSAGE);
        }
    }
}
