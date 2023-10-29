const axios = require('axios');

const cityApiIntegration = async (req, res) => {

    const { city } = req.query;
    const apiKey = '+9U7RafToFyxUYr9fTU+wQ==2Sanx4ywFNOSbwXj';

    try {

        axios.get(`https://api.api-ninjas.com/v1/city?name=${city}`, {
            headers: {
                'X-Api-Key': apiKey,
            }
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error: ', error.response.data);
            });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
    }

}

module.exports = cityApiIntegration;