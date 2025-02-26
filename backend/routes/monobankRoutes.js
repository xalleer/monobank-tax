const express = require('express');
const { getTotalIncome, getClientInfo } = require('../services/monobankService');

const router = express.Router();

router.get('/proxy/client-info', async (req, res) => {
    const accountId = 'J-bPJVujNV0YxXZdDqkn4Q';
    const from = 1738368000;

    try {
        const totalIncome = await getTotalIncome(accountId, from);
        res.json({ totalIncome });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/personal/client-info', async (req, res) => {

    try {
        const userInfo = await getClientInfo();
        res.json({ userInfo });
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;