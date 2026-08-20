package service;

import dao.BlockchainDAO;
import dao.CaseDAO;
import dao.CaseHistoryDAO;
import dao.LandDAO;
import model.Block;
import model.CaseHistory;
import model.CaseRecord;
import model.LandRecord;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

public class ReportService {

    public boolean exportLandReport(String filePath) {
        LandDAO landDAO = new LandDAO();
        List<LandRecord> records = landDAO.getAllLandRecords();
        
        try (FileWriter writer = new FileWriter(new File(filePath))) {
            writer.append("ID,Survey Number,Owner Name,Property Type,Area,Location,Reg Number,Reg Date\n");
            for (LandRecord r : records) {
                writer.append(String.format("%d,%s,%s,%s,%.2f,%s,%s,%s\n",
                        r.getId(), r.getSurveyNumber(), r.getOwnerName(), r.getPropertyType(),
                        r.getArea(), r.getLocation(), r.getRegistrationNumber(), r.getRegistrationDate().toString()));
            }
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean exportLitigationReport(String filePath) {
        CaseDAO caseDAO = new CaseDAO();
        CaseHistoryDAO historyDAO = new CaseHistoryDAO();
        List<CaseRecord> cases = caseDAO.getAllCases();
        
        try (FileWriter writer = new FileWriter(new File(filePath))) {
            writer.append("Case ID,Survey Number,Case Type,Court,Filing Date,Status,Next Hearing,History Count\n");
            for (CaseRecord c : cases) {
                List<CaseHistory> history = historyDAO.getHistoryByCaseId(c.getCaseId());
                writer.append(String.format("%s,%s,%s,%s,%s,%s,%s,%d\n",
                        c.getCaseId(), c.getSurveyNumber(), c.getCaseType(), c.getCourtName(),
                        c.getFilingDate().toString(), c.getStatus(), c.getNextHearingDate().toString(), history.size()));
            }
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean exportAuditReport(String filePath) {
        BlockchainDAO bDao = new BlockchainDAO();
        List<Block> blocks = bDao.getAllBlocks();
        
        try (FileWriter writer = new FileWriter(new File(filePath))) {
            writer.append("Index,Timestamp,Transaction Data,Previous Hash,Current Hash\n");
            for (Block b : blocks) {
                writer.append(String.format("%d,%s,\"%s\",%s,%s\n",
                        b.getIndex(), b.getTimestamp(), b.getTransactionData(), b.getPreviousHash(), b.getHash()));
            }
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }
}
