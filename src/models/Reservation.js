const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    userId: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true 
    },
    idAccommodation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accommodation'
    },
    monthlyRate: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value > 0; 
            },
            message: 'El precio mensual debe ser mayor que cero'
        }
    },
    daysReserved: {
        type: Number,
        required: true,
        min: 30 
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: 'La fecha de salida debe ser posterior a la fecha de entrada'
        }
    },
    totalPrice: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value >= 0; 
            },
            message: 'El precio total debe ser mayor o igual a cero'
        }
    },
    checkoutId: {
        type: String, 
        required: true
    }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
