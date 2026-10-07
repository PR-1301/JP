"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// --- ROUTES ---
// 1. Get Land Records
app.get('/api/records', async (req, res) => {
    try {
        const [rows] = await db_1.default.query('SELECT * FROM land_records');
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch land records' });
    }
});
// 2. Get Single Land Record with Cases (For Citizen Dashboard)
app.get('/api/records/:surveyNumber', async (req, res) => {
    try {
        const { surveyNumber } = req.params;
        // Fetch record
        const [records] = await db_1.default.query('SELECT * FROM land_records WHERE survey_number = ?', [surveyNumber]);
        if (records.length === 0) {
            return res.status(404).json({ error: 'Record not found' });
        }
        const record = records[0];
        // Fetch associated cases
        const [cases] = await db_1.default.query('SELECT * FROM case_records WHERE survey_number = ?', [surveyNumber]);
        // Fetch hearings for those cases
        for (let c of cases) {
            const [history] = await db_1.default.query('SELECT * FROM case_history WHERE case_id = ? ORDER BY hearing_date DESC', [c.case_id]);
            c.hearings = history;
        }
        res.json({ record, cases });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch record details' });
    }
});
// 3. Get all cases (For Clerk Kanban Board)
app.get('/api/cases', async (req, res) => {
    try {
        const [cases] = await db_1.default.query('SELECT * FROM case_records');
        for (let c of cases) {
            const [history] = await db_1.default.query('SELECT * FROM case_history WHERE case_id = ? ORDER BY hearing_date DESC', [c.case_id]);
            c.hearings = history;
        }
        res.json(cases);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch cases' });
    }
});
// 4. Get Blockchain Audit Trail
app.get('/api/blockchain', async (req, res) => {
    try {
        const [blocks] = await db_1.default.query('SELECT * FROM blockchain_blocks ORDER BY block_index ASC');
        res.json(blocks);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch blockchain data' });
    }
});
// 5. Auth Mock Endpoint (Because actual hashing requires checking DB)
app.post('/api/auth/login', async (req, res) => {
    const { role } = req.body;
    // For the demo, we just return success if they pass a role.
    // In a real app, we would verify username/password against the users table.
    if (['citizen', 'clerk', 'admin'].includes(role)) {
        res.json({ success: true, role, name: role.charAt(0).toUpperCase() + role.slice(1) + ' User' });
    }
    else {
        res.status(401).json({ error: 'Invalid role' });
    }
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
