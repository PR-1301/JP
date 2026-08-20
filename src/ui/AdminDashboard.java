package ui;

import util.SessionManager;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;

public class AdminDashboard extends JFrame {
    
    private JTabbedPane tabbedPane;

    public AdminDashboard() {
        setTitle("Administrator Dashboard - Welcome " + SessionManager.getCurrentUser().getUsername());
        setSize(1000, 750);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        
        initComponents();
    }

    private void initComponents() {
        setLayout(new BorderLayout());

        // Header Panel
        JPanel headerPanel = new JPanel(new BorderLayout());
        headerPanel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        
        JLabel titleLabel = new JLabel("System Administration & Audit");
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

        // Tabs
        tabbedPane.addTab("System Overview", createOverviewPanel());
        tabbedPane.addTab("Manage Land Records", createCrudPanel("Land Records"));
        tabbedPane.addTab("Manage Litigation", createCrudPanel("Litigation Cases"));
        tabbedPane.addTab("Manage Users", createUserManagementPanel());
        tabbedPane.addTab("Blockchain Audit Trail", createBlockchainAuditPanel());

        add(tabbedPane, BorderLayout.CENTER);
    }

    private JPanel createOverviewPanel() {
        JPanel panel = new JPanel(new GridLayout(2, 3, 20, 20));
        panel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        panel.add(createStatCard("Total Land Records", "0"));
        panel.add(createStatCard("Total Active Cases", "0"));
        panel.add(createStatCard("Total Closed Cases", "0"));
        panel.add(createStatCard("Total Users", "0"));
        panel.add(createStatCard("Blockchain Transactions", "0"));
        
        // Wrapper to keep cards nicely sized at the top
        JPanel wrapper = new JPanel(new BorderLayout());
        wrapper.add(panel, BorderLayout.NORTH);
        return wrapper;
    }

    private JPanel createStatCard(String title, String value) {
        JPanel card = new JPanel(new BorderLayout());
        card.setBorder(BorderFactory.createTitledBorder(title));
        card.setBackground(Color.WHITE);
        
        JLabel valLabel = new JLabel(value, SwingConstants.CENTER);
        valLabel.setFont(new Font("Arial", Font.BOLD, 36));
        valLabel.setForeground(new Color(41, 128, 185)); // Nice blue color
        card.add(valLabel, BorderLayout.CENTER);
        
        return card;
    }

    private JPanel createCrudPanel(String entityName) {
        JPanel panel = new JPanel(new BorderLayout(10, 10));
        panel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

        // Toolbar
        JPanel toolbar = new JPanel(new FlowLayout(FlowLayout.LEFT));
        toolbar.add(new JButton("Add New"));
        toolbar.add(new JButton("Edit Selected"));
        toolbar.add(new JButton("Delete Selected"));
        toolbar.add(new JButton("Refresh"));
        panel.add(toolbar, BorderLayout.NORTH);

        // Table
        String[] columns = {"ID", "Identifier", "Details", "Created At"};
        DefaultTableModel model = new DefaultTableModel(columns, 0);
        JTable table = new JTable(model);
        panel.add(new JScrollPane(table), BorderLayout.CENTER);

        return panel;
    }

    private JPanel createUserManagementPanel() {
        JPanel panel = new JPanel(new BorderLayout(10, 10));
        panel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

        // Toolbar
        JPanel toolbar = new JPanel(new FlowLayout(FlowLayout.LEFT));
        toolbar.add(new JButton("Add User"));
        toolbar.add(new JButton("Change Role"));
        toolbar.add(new JButton("Enable/Disable Account"));
        toolbar.add(new JButton("Refresh"));
        panel.add(toolbar, BorderLayout.NORTH);

        // Table
        String[] columns = {"ID", "Username", "Role", "Status", "Created At"};
        DefaultTableModel model = new DefaultTableModel(columns, 0);
        JTable table = new JTable(model);
        panel.add(new JScrollPane(table), BorderLayout.CENTER);

        return panel;
    }

    private JPanel createBlockchainAuditPanel() {
        JPanel panel = new JPanel(new BorderLayout(10, 10));
        panel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

        // Toolbar
        JPanel toolbar = new JPanel(new FlowLayout(FlowLayout.LEFT));
        JButton verifyButton = new JButton("VERIFY BLOCKCHAIN");
        verifyButton.setBackground(new Color(46, 204, 113));
        verifyButton.setForeground(Color.WHITE);
        verifyButton.setFont(new Font("Arial", Font.BOLD, 14));
        
        toolbar.add(verifyButton);
        toolbar.add(new JButton("Refresh Ledger"));
        panel.add(toolbar, BorderLayout.NORTH);

        // Table
        String[] columns = {"Block Index", "Timestamp", "Transaction Data", "Previous Hash", "Current Hash"};
        DefaultTableModel model = new DefaultTableModel(columns, 0);
        JTable table = new JTable(model);
        
        // Adjust column widths for hashes
        table.getColumnModel().getColumn(3).setPreferredWidth(150);
        table.getColumnModel().getColumn(4).setPreferredWidth(150);
        
        panel.add(new JScrollPane(table), BorderLayout.CENTER);

        JButton refreshButton = new JButton("Refresh Ledger");
        JButton exportButton = new JButton("Export to CSV");
        toolbar.add(refreshButton);
        toolbar.add(exportButton);
        
        verifyButton.addActionListener(e -> {
            blockchain.Blockchain bChain = new blockchain.Blockchain();
            if (bChain.isChainValid()) {
                JOptionPane.showMessageDialog(this, "✓ BLOCKCHAIN INTEGRITY VERIFIED\n\nThe cryptographic ledger is intact and untampered.", "Success", JOptionPane.INFORMATION_MESSAGE);
            } else {
                JOptionPane.showMessageDialog(this, "✗ BLOCKCHAIN TAMPERING DETECTED\n\nThe cryptographic hashes do not match!", "CRITICAL ALERT", JOptionPane.ERROR_MESSAGE);
            }
        });

        refreshButton.addActionListener(e -> {
            model.setRowCount(0);
            dao.BlockchainDAO bDao = new dao.BlockchainDAO();
            java.util.List<model.Block> blocks = bDao.getAllBlocks();
            for (model.Block b : blocks) {
                model.addRow(new Object[]{b.getIndex(), b.getTimestamp(), b.getTransactionData(), b.getPreviousHash(), b.getHash()});
            }
        });

        exportButton.addActionListener(e -> {
            JFileChooser fileChooser = new JFileChooser();
            fileChooser.setDialogTitle("Save Audit Report as CSV");
            int userSelection = fileChooser.showSaveDialog(this);
            if (userSelection == JFileChooser.APPROVE_OPTION) {
                java.io.File fileToSave = fileChooser.getSelectedFile();
                String path = fileToSave.getAbsolutePath();
                if (!path.endsWith(".csv")) path += ".csv";
                
                service.ReportService reportService = new service.ReportService();
                if (reportService.exportAuditReport(path)) {
                    JOptionPane.showMessageDialog(this, "Audit Report Exported Successfully!", "Success", JOptionPane.INFORMATION_MESSAGE);
                } else {
                    JOptionPane.showMessageDialog(this, "Failed to export report.", "Error", JOptionPane.ERROR_MESSAGE);
                }
            }
        });

        return panel;
    }
}
