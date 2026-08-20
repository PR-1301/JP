package ui;

import util.SessionManager;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class ClerkDashboard extends JFrame {
    
    private JTabbedPane tabbedPane;

    public ClerkDashboard() {
        setTitle("Clerk Dashboard - Welcome " + SessionManager.getCurrentUser().getUsername());
        setSize(900, 700);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        
        initComponents();
    }

    private void initComponents() {
        setLayout(new BorderLayout());

        // Header Panel
        JPanel headerPanel = new JPanel(new BorderLayout());
        headerPanel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        
        JLabel titleLabel = new JLabel("Data Entry & Record Management");
        titleLabel.setFont(new Font("Arial", Font.BOLD, 18));
        headerPanel.add(titleLabel, BorderLayout.WEST);

        JButton logoutButton = new JButton("Logout");
        logoutButton.addActionListener(e -> {
            SessionManager.logout();
            this.dispose();
            new LoginFrame().setVisible(true);
        });
        headerPanel.add(logoutButton, BorderLayout.EAST);
        
        add(headerPanel, BorderLayout.NORTH);

        // Tabbed Pane
        tabbedPane = new JTabbedPane();

        // Tab 1: Manage Land Records
        tabbedPane.addTab("Manage Land Records", createLandManagementPanel());
        
        // Tab 2: Manage Litigation Cases
        tabbedPane.addTab("Manage Litigation", createLitigationManagementPanel());
        
        // Tab 3: Hearing Updates
        tabbedPane.addTab("Add Hearing/Update Status", createHearingManagementPanel());

        add(tabbedPane, BorderLayout.CENTER);
    }

    private JPanel createLandManagementPanel() {
        JPanel panel = new JPanel(new GridBagLayout());
        panel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        // Fields
        JTextField surveyField = new JTextField(15);
        JTextField ownerField = new JTextField(15);
        JTextField typeField = new JTextField(15);
        JTextField areaField = new JTextField(15);
        JTextField locationField = new JTextField(15);
        JTextField regNoField = new JTextField(15);
        JTextField regDateField = new JTextField(15);

        int row = 0;
        gbc.gridx = 0; gbc.gridy = row; panel.add(new JLabel("Survey Number:"), gbc);
        gbc.gridx = 1; panel.add(surveyField, gbc);

        row++;
        gbc.gridx = 0; gbc.gridy = row; panel.add(new JLabel("Owner Name:"), gbc);
        gbc.gridx = 1; panel.add(ownerField, gbc);

        row++;
        gbc.gridx = 0; gbc.gridy = row; panel.add(new JLabel("Property Type:"), gbc);
        gbc.gridx = 1; panel.add(typeField, gbc);

        row++;
        gbc.gridx = 0; gbc.gridy = row; panel.add(new JLabel("Area (sq.ft):"), gbc);
        gbc.gridx = 1; panel.add(areaField, gbc);

        row++;
        gbc.gridx = 0; gbc.gridy = row; panel.add(new JLabel("Location:"), gbc);
        gbc.gridx = 1; panel.add(locationField, gbc);

        row++;
        gbc.gridx = 0; gbc.gridy = row; panel.add(new JLabel("Registration Number:"), gbc);
        gbc.gridx = 1; panel.add(regNoField, gbc);

        row++;
        gbc.gridx = 0; gbc.gridy = row; panel.add(new JLabel("Registration Date (YYYY-MM-DD):"), gbc);
        gbc.gridx = 1; panel.add(regDateField, gbc);

        // Buttons
        row++;
        JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.CENTER));
        JButton saveButton = new JButton("Save Record");
        JButton searchButton = new JButton("Search by Survey No.");
        buttonPanel.add(saveButton);
        buttonPanel.add(searchButton);
        
        gbc.gridx = 0; gbc.gridy = row; gbc.gridwidth = 2;
        panel.add(buttonPanel, gbc);

        saveButton.addActionListener(e -> {
            try {
                model.LandRecord record = new model.LandRecord();
                record.setSurveyNumber(surveyField.getText().trim());
                record.setOwnerName(ownerField.getText().trim());
                record.setPropertyType(typeField.getText().trim());
                record.setArea(Double.parseDouble(areaField.getText().trim()));
                record.setLocation(locationField.getText().trim());
                record.setRegistrationNumber(regNoField.getText().trim());
                record.setRegistrationDate(java.sql.Date.valueOf(regDateField.getText().trim()));
                
                dao.LandDAO landDAO = new dao.LandDAO();
                if (landDAO.addLandRecord(record)) {
                    // Create Blockchain Audit Transaction
                    blockchain.Blockchain bChain = new blockchain.Blockchain();
                    String txData = String.format("Type: LAND_CREATED | SurveyNum: %s | PerformedBy: %s", 
                                                  record.getSurveyNumber(), util.SessionManager.getCurrentUser().getUsername());
                    bChain.addTransaction(txData);

                    JOptionPane.showMessageDialog(this, "Land Record & Audit Block Saved Successfully!", "Success", JOptionPane.INFORMATION_MESSAGE);
                    // Clear fields
                    surveyField.setText(""); ownerField.setText(""); typeField.setText("");
                    areaField.setText(""); locationField.setText(""); regNoField.setText(""); regDateField.setText("");
                } else {
                    JOptionPane.showMessageDialog(this, "Failed to save. Survey Number might already exist.", "Error", JOptionPane.ERROR_MESSAGE);
                }
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, "Invalid input. Please check date format (YYYY-MM-DD) and area (number).", "Input Error", JOptionPane.ERROR_MESSAGE);
            }
        });

        searchButton.addActionListener(e -> {
            JOptionPane.showMessageDialog(this, "Search function will be wired in Phase 8");
        });

        // Wrapper to push everything to top
        JPanel wrapper = new JPanel(new BorderLayout());
        wrapper.add(panel, BorderLayout.NORTH);
        return wrapper;
    }

    private JPanel createLitigationManagementPanel() {
        JPanel panel = new JPanel(new GridBagLayout());
        panel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        JTextField caseIdField = new JTextField(15);
        JTextField surveyField = new JTextField(15);
        JTextField caseTypeField = new JTextField(15);
        JTextField courtField = new JTextField(15);
        JTextField filingDateField = new JTextField(15);
        JTextField statusField = new JTextField(15);
        JTextField nextHearingField = new JTextField(15);

        int row = 0;
        gbc.gridx = 0; gbc.gridy = row; panel.add(new JLabel("Case ID:"), gbc);
        gbc.gridx = 1; panel.add(caseIdField, gbc);

        row++;
        gbc.gridx = 0; gbc.gridy = row; panel.add(new JLabel("Survey Number (Linked):"), gbc);
        gbc.gridx = 1; panel.add(surveyField, gbc);

        row++;
        gbc.gridx = 0; gbc.gridy = row; panel.add(new JLabel("Case Type:"), gbc);
        gbc.gridx = 1; panel.add(caseTypeField, gbc);

        row++;
        gbc.gridx = 0; gbc.gridy = row; panel.add(new JLabel("Court Name:"), gbc);
        gbc.gridx = 1; panel.add(courtField, gbc);

        row++;
        gbc.gridx = 0; gbc.gridy = row; panel.add(new JLabel("Filing Date (YYYY-MM-DD):"), gbc);
        gbc.gridx = 1; panel.add(filingDateField, gbc);

        row++;
        gbc.gridx = 0; gbc.gridy = row; panel.add(new JLabel("Status:"), gbc);
        gbc.gridx = 1; panel.add(statusField, gbc);

        row++;
        gbc.gridx = 0; gbc.gridy = row; panel.add(new JLabel("Next Hearing Date:"), gbc);
        gbc.gridx = 1; panel.add(nextHearingField, gbc);

        row++;
        JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.CENTER));
        JButton saveButton = new JButton("Save Case");
        buttonPanel.add(saveButton);
        
        gbc.gridx = 0; gbc.gridy = row; gbc.gridwidth = 2;
        panel.add(buttonPanel, gbc);

        saveButton.addActionListener(e -> {
            try {
                model.CaseRecord caseRecord = new model.CaseRecord();
                caseRecord.setCaseId(caseIdField.getText().trim());
                caseRecord.setSurveyNumber(surveyField.getText().trim());
                caseRecord.setCaseType(caseTypeField.getText().trim());
                caseRecord.setCourtName(courtField.getText().trim());
                caseRecord.setFilingDate(java.sql.Date.valueOf(filingDateField.getText().trim()));
                caseRecord.setStatus(statusField.getText().trim());
                caseRecord.setNextHearingDate(java.sql.Date.valueOf(nextHearingField.getText().trim()));
                
                dao.CaseDAO caseDAO = new dao.CaseDAO();
                if (caseDAO.addCase(caseRecord)) {
                    // Create Blockchain Audit Transaction
                    blockchain.Blockchain bChain = new blockchain.Blockchain();
                    String txData = String.format("Type: CASE_CREATED | CaseId: %s | SurveyNum: %s | PerformedBy: %s", 
                                                  caseRecord.getCaseId(), caseRecord.getSurveyNumber(), util.SessionManager.getCurrentUser().getUsername());
                    bChain.addTransaction(txData);

                    JOptionPane.showMessageDialog(this, "Litigation Case & Audit Block Saved Successfully!", "Success", JOptionPane.INFORMATION_MESSAGE);
                    caseIdField.setText(""); surveyField.setText(""); caseTypeField.setText("");
                    courtField.setText(""); filingDateField.setText(""); statusField.setText(""); nextHearingField.setText("");
                } else {
                    JOptionPane.showMessageDialog(this, "Failed to save. Ensure Survey Number exists.", "Error", JOptionPane.ERROR_MESSAGE);
                }
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, "Invalid input. Check date format (YYYY-MM-DD).", "Input Error", JOptionPane.ERROR_MESSAGE);
            }
        });

        JPanel wrapper = new JPanel(new BorderLayout());
        wrapper.add(panel, BorderLayout.NORTH);
        return wrapper;
    }

    private JPanel createHearingManagementPanel() {
        JPanel panel = new JPanel(new GridBagLayout());
        panel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        JTextField caseIdField = new JTextField(15);
        JTextField hearingDateField = new JTextField(15);
        JTextArea eventDescArea = new JTextArea(4, 15);
        eventDescArea.setLineWrap(true);
        JTextField statusField = new JTextField(15);
        JTextField nextHearingField = new JTextField(15);

        int row = 0;
        gbc.gridx = 0; gbc.gridy = row; panel.add(new JLabel("Target Case ID:"), gbc);
        gbc.gridx = 1; panel.add(caseIdField, gbc);

        row++;
        gbc.gridx = 0; gbc.gridy = row; panel.add(new JLabel("Hearing Date (YYYY-MM-DD):"), gbc);
        gbc.gridx = 1; panel.add(hearingDateField, gbc);

        row++;
        gbc.gridx = 0; gbc.gridy = row; panel.add(new JLabel("Event Description:"), gbc);
        gbc.gridx = 1; panel.add(new JScrollPane(eventDescArea), gbc);

        row++;
        gbc.gridx = 0; gbc.gridy = row; panel.add(new JLabel("New Case Status:"), gbc);
        gbc.gridx = 1; panel.add(statusField, gbc);

        row++;
        gbc.gridx = 0; gbc.gridy = row; panel.add(new JLabel("New Next Hearing Date:"), gbc);
        gbc.gridx = 1; panel.add(nextHearingField, gbc);

        row++;
        JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.CENTER));
        JButton addHearingButton = new JButton("Add Hearing & Update Status");
        buttonPanel.add(addHearingButton);
        
        gbc.gridx = 0; gbc.gridy = row; gbc.gridwidth = 2;
        panel.add(buttonPanel, gbc);

        addHearingButton.addActionListener(e -> {
            try {
                String cId = caseIdField.getText().trim();
                java.sql.Date hDate = java.sql.Date.valueOf(hearingDateField.getText().trim());
                String desc = eventDescArea.getText().trim();
                String status = statusField.getText().trim();
                java.sql.Date nextHDate = java.sql.Date.valueOf(nextHearingField.getText().trim());

                dao.CaseHistoryDAO historyDAO = new dao.CaseHistoryDAO();
                dao.CaseDAO caseDAO = new dao.CaseDAO();

                model.CaseHistory history = new model.CaseHistory();
                history.setCaseId(cId);
                history.setHearingDate(hDate);
                history.setEventDescription(desc);
                history.setStatus(status);
                history.setUpdatedBy(SessionManager.getCurrentUser().getUsername());

                // Perform updates
                boolean historyAdded = historyDAO.addHistory(history);
                boolean caseUpdated = caseDAO.updateCaseStatusAndHearing(cId, status, nextHDate);

                if (historyAdded && caseUpdated) {
                    // Create Blockchain Audit Transaction
                    blockchain.Blockchain bChain = new blockchain.Blockchain();
                    String txData = String.format("Type: HEARING_ADDED | CaseId: %s | StatusUpdatedTo: %s | PerformedBy: %s", 
                                                  cId, status, util.SessionManager.getCurrentUser().getUsername());
                    bChain.addTransaction(txData);

                    JOptionPane.showMessageDialog(this, "Hearing Added & Audit Block Saved Successfully!", "Success", JOptionPane.INFORMATION_MESSAGE);
                    caseIdField.setText(""); hearingDateField.setText(""); eventDescArea.setText("");
                    statusField.setText(""); nextHearingField.setText("");
                } else {
                    JOptionPane.showMessageDialog(this, "Failed to update. Ensure Case ID exists.", "Error", JOptionPane.ERROR_MESSAGE);
                }
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, "Invalid input. Check date format (YYYY-MM-DD).", "Input Error", JOptionPane.ERROR_MESSAGE);
            }
        });

        JPanel wrapper = new JPanel(new BorderLayout());
        wrapper.add(panel, BorderLayout.NORTH);
        return wrapper;
    }
}
