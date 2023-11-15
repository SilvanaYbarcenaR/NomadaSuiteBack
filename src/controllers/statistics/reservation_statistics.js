const BillingInfo = require('../../models/BillingInfo');

const getMonthlyBookingStats = async (req, res) => {
    try {
        const allBillingInfo = await BillingInfo.find();

        const monthlyStats = {};

        allBillingInfo.forEach(billing => {
            const createdDate = new Date(billing.created);
            const year = createdDate.getFullYear();
            const month = createdDate.toLocaleString('en-US', { month: 'long' });

            const key = `${year}-${month}`;
        
            if (monthlyStats[key]) {
                monthlyStats[key]++;
            } else {
                monthlyStats[key] = 1;
            }
        });

        const data = Object.keys(monthlyStats).map(key => ({
            yearMonth: key,
            value: monthlyStats[key],
        }));

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las estadísticas mensuales' });
    }
};

module.exports = getMonthlyBookingStats;
