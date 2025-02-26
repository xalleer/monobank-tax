const axios = require('axios');
const { accessToken } = require('../config/config'); // Імпортуємо токен з конфіга

/**
 * Отримання виписки за рахунком Monobank
 * @param {string} accountId - ID рахунку
 * @param {number} from - Часова позначка (Unix timestamp)
 * @returns {Promise<number>} - Загальна сума надходжень
 */
async function getTotalIncome(token, accountId, from) {
    try {
        const response = await axios.get(`https://api.monobank.ua/personal/statement/${accountId}/${from}`, {
            headers: {
                'X-Token': token
            }
        });

        const transactions = response.data;

        const totalIncome = transactions
            .filter(tx => tx.amount > 0)
            .reduce((sum, tx) => sum + tx.amount, 0) / 100;

        return totalIncome;

    } catch (error) {
        console.error('Monobank API Error:', error.response?.data || error.message);
        throw error.response?.data || { error: 'Error fetching data' };
    }
}

async function getClientInfo(token) {
    console.log(token)
    try{
        const response = await axios.get('https://api.monobank.ua/personal/client-info', {
            headers: {
                'X-Token': token
            }
        });

        return response.data;
    } catch (error) {
        console.error('Monobank API Error:', error.response?.data || error.message);
        throw error.response?.data || { error: 'Error fetching data' };

    }
}

module.exports = { getTotalIncome, getClientInfo };