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
            }
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
            }
        },
        departureDate: Date,
        departureTime: Date,
        status: {
            type: String,
            enum: ['booked', 'in-progress', 'cancelled', 'completed'],
            default: 'in-progress'
        },
        sightseeingStops: {
            address: String,
            type: {
                type: String,
                enum: ['Point'], // GeoJSON type
                default: 'Point'
            },
            coordinates: {
                type: [Number], // [longitude, latitude]
                index: '2dsphere'
            }
        },
        additionalServices: {
            childSeats: { type: Number },
            extraTime: { type: Number }
        },
        payment: {
            method: { type: String },
            amount: { type: Number },
            currency: { type: String },
            status: { type: String, enum: ['pending', 'paid'] }
        }
    },
    {
        timestamps: true
    }
);

bookingSchema.index({ origin: '2dsphere', destination: '2dsphere' });

export default model('Booking', bookingSchema);
