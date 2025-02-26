const express = require('express');
const { getTotalIncome, getClientInfo } = require('../services/monobankService');
const {post} = require("axios");

const router = express.Router();

router.get('/proxy/client-info', async (req, res) => {
    const accountId = 'J-bPJVujNV0YxXZdDqkn4Q';
    const from = 1738368000;
    const token = req.headers['x-token'];
    try {
        const totalIncome = await getTotalIncome(token, accountId, from);
        res.json({ totalIncome });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/personal/client-info', async (req, res) => {
    const token = req.headers['x-token'];


    if (!token) {
        return res.status(400).json({ error: "Missing 'X-Token' in request" });
    }

    try {
        const userInfo = await getClientInfo(token);
        res.json(userInfo);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/webhook', (req, res) => {
    const { token, status } = req.body;

    if (status === 'success') {
        console.log('Отримано токен:', token);
        // Збережи токен у БД або локальному сховищі
    } else {
        console.error('Помилка авторизації');
    }

    res.sendStatus(200);
});

router.post('/auth', async (req, res) => {
    try {
        const response = await post(
            'https://api.monobank.ua/personal/auth/registration',
            req.body
        );
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

module.exports = router;