import { Schema, model } from 'mongoose';

const bookingSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        driverId: {
            type: Schema.Types.ObjectId,
            ref: 'Driver',
            required: true
        },
        vehicleId: {
            type: Schema.Types.ObjectId,
            ref: 'Driver',
            required: true
        },
        origin: {
            address: String,
            type: {
                type: String,
                enum: ['Point'], // GeoJSON type
                default: 'Point'
            },
            coordinates: {
                type: [Number], // [longitude, latitude]
                index: '2dsphere'
            },
            googleMap: {}
        },
        destination: {
            address: String,
            type: {
                type: String,
                enum: ['Point'], // GeoJSON type
                default: 'Point'
            },
            coordinates: {
                type: [Number], // [longitude, latitude]
                index: '2dsphere'
            },
            googleMap: {}
        },
        departureDate: Date,
        departureTime: Date,
        returnDate: Date,
        returnTime: Date,
        tripType: {
            type: String,
            enum: ['one-way', 'return'],
            default: 'one-way'
        },
        bookType: {
            type: String,
            enum: ['listed', 'custom'],
            default: 'listed'
        },
        numPassenger: Number,
        carType: String,
        status: {
            type: String,
            enum: ['booked', 'in-progress', 'cancelled', 'completed'],
            default: 'in-progress'
        },
        sightseeingStops: [
            {
                address: String,
                type: {
                    type: String,
                    enum: ['Point'], // GeoJSON type
                    default: 'Point'
                },
                coordinates: {
                    type: [Number], // [longitude, latitude]
                    index: '2dsphere'
                },
                googleMap: {}
            }
        ],
        additionalServices: {
            childSeats: {
                Infant_carrier: { type: Number, default: 0 },
                Convertible_seat: { type: Number, default: 0 },
                Booster_seat: { type: Number, default: 0 }
            },
            extraTime: { type: Number, default: 0 }
        },
        payment: {
            method: { type: String },
            amount: { type: Number },
            currency: { type: String },
            status: { type: String, enum: ['pending', 'paid'] }
        },
        customTrip: {
            type: Boolean,
            default: false
        },
        itineraryModification: {
            allowed: { type: Boolean, default: true },
            deadline: { type: Date }
        }
    },
    {
        timestamps: true
    }
);

bookingSchema.index({ origin: '2dsphere', destination: '2dsphere' });

export default model('Booking', bookingSchema);
