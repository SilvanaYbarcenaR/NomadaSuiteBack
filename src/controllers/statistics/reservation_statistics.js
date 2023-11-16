const BillingInfo = require('../../models/BillingInfo');

const getMonthlyBookingStats = async (req, res) => {
    try {
        const allBillingInfo = await BillingInfo.find();

        const monthlyStats = {};

        allBillingInfo.forEach(billing => {
            const createdDate = new Date(billing.created);
            const year = createdDate.getFullYear();
            
            const month = createdDate.toLocaleString('es-ES', { month: 'long' });

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

        data.sort((a, b) => {
            const dateA = new Date(a.yearMonth);
            const dateB = new Date(b.yearMonth);
            return dateA - dateB;
        });

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las estadísticas mensuales' });
    }
};

module.exports = getMonthlyBookingStats;
