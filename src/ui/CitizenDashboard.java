package ui;

import dao.CaseDAO;
import dao.CaseHistoryDAO;
import dao.LandDAO;
import model.CaseHistory;
import model.CaseRecord;
import model.LandRecord;
import util.SessionManager;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.List;

public class CitizenDashboard extends JFrame {
    private LandDAO landDAO;
    private CaseDAO caseDAO;
    private CaseHistoryDAO historyDAO;

    private JTextField searchField;
    private JTextArea landDetailsArea;
    private JTextArea caseDetailsArea;
    private JTable hearingTable;
    private DefaultTableModel tableModel;

    public CitizenDashboard() {
        landDAO = new LandDAO();
        caseDAO = new CaseDAO();
        historyDAO = new CaseHistoryDAO();

        setTitle("Citizen Dashboard - Welcome " + SessionManager.getCurrentUser().getUsername());
        setSize(800, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        
        initComponents();
    }

    private void initComponents() {
        setLayout(new BorderLayout());

        // Header Panel
        JPanel headerPanel = new JPanel(new BorderLayout());
        headerPanel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        
        JLabel titleLabel = new JLabel("Land & Litigation Lookup");
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

        // Main Content Panel
        JPanel mainPanel = new JPanel(new BorderLayout(10, 10));
        mainPanel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

        // Search Panel
        JPanel searchPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        searchPanel.add(new JLabel("Survey Number: "));
        searchField = new JTextField(20);
        searchPanel.add(searchField);
        JButton searchButton = new JButton("Search");
        searchPanel.add(searchButton);

        mainPanel.add(searchPanel, BorderLayout.NORTH);

        // Details Panel (Split into Land Details and Litigation Details)
        JPanel detailsPanel = new JPanel(new GridLayout(1, 2, 10, 10));
        
        // Land Details
        JPanel landPanel = new JPanel(new BorderLayout());
        landPanel.setBorder(BorderFactory.createTitledBorder("Land Details"));
        landDetailsArea = new JTextArea();
        landDetailsArea.setEditable(false);
        landDetailsArea.setMargin(new Insets(5, 5, 5, 5));
        landPanel.add(new JScrollPane(landDetailsArea), BorderLayout.CENTER);
        detailsPanel.add(landPanel);

        // Litigation Details
        JPanel litigationPanel = new JPanel(new BorderLayout());
        litigationPanel.setBorder(BorderFactory.createTitledBorder("Active Litigation Details"));
        caseDetailsArea = new JTextArea();
        caseDetailsArea.setEditable(false);
        caseDetailsArea.setMargin(new Insets(5, 5, 5, 5));
        litigationPanel.add(new JScrollPane(caseDetailsArea), BorderLayout.CENTER);
        detailsPanel.add(litigationPanel);

        // Center part containing the split details
        JPanel centerPanel = new JPanel(new BorderLayout());
        centerPanel.add(detailsPanel, BorderLayout.NORTH);

        // Hearing History Table
        JPanel historyPanel = new JPanel(new BorderLayout());
        historyPanel.setBorder(BorderFactory.createTitledBorder("Hearing History"));
        
        String[] columnNames = {"Hearing Date", "Event Description", "Status"};
        tableModel = new DefaultTableModel(columnNames, 0);
        hearingTable = new JTable(tableModel);
        historyPanel.add(new JScrollPane(hearingTable), BorderLayout.CENTER);
        
        centerPanel.add(historyPanel, BorderLayout.CENTER);

        mainPanel.add(centerPanel, BorderLayout.CENTER);
        add(mainPanel, BorderLayout.CENTER);

        // Action Listener for Search
        searchButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                performSearch();
            }
        });
    }

    private void performSearch() {
        String surveyNum = searchField.getText().trim();
        if (surveyNum.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Please enter a Survey Number.");
            return;
        }

        // Clear previous results
        landDetailsArea.setText("");
        caseDetailsArea.setText("");
        tableModel.setRowCount(0);

        // Fetch Land Details
        LandRecord land = landDAO.getLandRecordBySurveyNumber(surveyNum);
        if (land == null) {
            landDetailsArea.setText("No records found for survey number: " + surveyNum);
            return;
        }

        StringBuilder landInfo = new StringBuilder();
        landInfo.append("Survey Number: ").append(land.getSurveyNumber()).append("\n");
        landInfo.append("Owner Name: ").append(land.getOwnerName()).append("\n");
        landInfo.append("Property Type: ").append(land.getPropertyType()).append("\n");
        landInfo.append("Area: ").append(land.getArea()).append(" sq.ft\n");
        landInfo.append("Location: ").append(land.getLocation()).append("\n");
        landInfo.append("Registration No: ").append(land.getRegistrationNumber()).append("\n");
        landInfo.append("Registration Date: ").append(land.getRegistrationDate());
        landDetailsArea.setText(landInfo.toString());

        // Fetch Litigation Details
        List<CaseRecord> cases = caseDAO.getCasesBySurveyNumber(surveyNum);
        if (cases == null || cases.isEmpty()) {
            caseDetailsArea.setText("No active litigation cases associated with this property.");
        } else {
            // For simplicity in UI, we'll show the latest/first active case if there are multiple
            // or concatenate them. We will concatenate.
            StringBuilder caseInfo = new StringBuilder();
            for (CaseRecord cr : cases) {
                caseInfo.append("Case ID: ").append(cr.getCaseId()).append("\n");
                caseInfo.append("Type: ").append(cr.getCaseType()).append("\n");
                caseInfo.append("Court: ").append(cr.getCourtName()).append("\n");
                caseInfo.append("Filing Date: ").append(cr.getFilingDate()).append("\n");
                caseInfo.append("Status: ").append(cr.getStatus()).append("\n");
                caseInfo.append("Next Hearing: ").append(cr.getNextHearingDate()).append("\n");
                caseInfo.append("-----------------------------\n");
                
                // Fetch and populate hearing history table for the first case found
                // If there are multiple cases, we can load history for all of them
                List<CaseHistory> historyList = historyDAO.getHistoryByCaseId(cr.getCaseId());
                for (CaseHistory h : historyList) {
                    tableModel.addRow(new Object[]{
                        h.getHearingDate().toString(),
                        h.getEventDescription(),
                        h.getStatus()
                    });
                }
            }
            caseDetailsArea.setText(caseInfo.toString());
        }
    }
}
