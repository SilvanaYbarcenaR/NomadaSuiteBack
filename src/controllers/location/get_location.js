const LocationAccommodation = require('../../models/LocationAccommodation')

const getLocation = async (req, res) => {
    
    const { name } = req.params;

    try {
        
        if (!name) {
        
            const allLocations = await LocationAccommodation.find();
    
            return res.json(allLocations);
        };

        const location = await LocationAccommodation.find({
            $or: [
                {
                    city: {
                        $regex: new RegExp(name, 'i')
                    }
                },
                {
                    country: {
                        $regex: new RegExp(name, 'i')
                    }
                }
            ]
        });

        res.json(location);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }

}

module.exports = getLocation;