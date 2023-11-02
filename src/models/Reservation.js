const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    idAccommodation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accommodation'
    },
    totalPrice: Number,
    daysReserved: {
        type: Number,
        required: true,
        min: 30 // Mínimo 30 días de reserva
    },
    entryDate: {
        type: Date,
        required: true
    },
    departureDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.entryDate; // Asegura que la fecha de salida sea posterior a la fecha de entrada
            },
            message: 'La fecha de salida debe ser posterior a la fecha de entrada'
        }
    }
});

// Calcula el precio total antes de guardar la reserva
reservationSchema.pre('save', function (next) {
    // Lógica para calcular el precio total basado en los días reservados y el costo por día del alojamiento
    // Puedes añadir la lógica de cálculo de precio aquí
    // this.totalPrice = ...;

    next();
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
