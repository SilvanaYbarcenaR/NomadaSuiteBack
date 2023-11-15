const BillingInfo = require('../../models/BillingInfo');

const getMonthlyBookingStats = async (req, res) => {
    try {
        // Obtener todas las BillingInfo
        const allBillingInfo = await BillingInfo.find();

        // Inicializar un objeto para almacenar las estadísticas mensuales
        const monthlyStats = {};

        // Recorrer todas las BillingInfo y contar las reservas por año y mes
        allBillingInfo.forEach(billing => {
            const createdDate = new Date(billing.created);
            const year = createdDate.getFullYear();
            const month = createdDate.getMonth() + 1; // Obtener el mes (0-11)

            // Crear una clave única para año y mes
            const key = `${year}-${month}`;

            // Incrementar el contador del año y mes correspondiente
            if (monthlyStats[key]) {
                monthlyStats[key]++;
            } else {
                monthlyStats[key] = 1;
            }
        });

        // Crear un array en el formato deseado
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
