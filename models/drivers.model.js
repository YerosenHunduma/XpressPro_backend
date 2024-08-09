import { Schema, model } from 'mongoose';

const driverSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    vehicles: [{ type: Schema.Types.ObjectId, ref: 'Vehicle' }],
    availability: {
        availabile: { type: Boolean },
        location: {
            type: {
                type: String,
                enum: ['Point'], // GeoJSON type
                default: 'Point'
            },
            coordinates: {
                type: [Number], // [longitude, latitude]
                index: '2dsphere'
            }
        }
    },
    ratings: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ]
});

driverSchema.index({ location: '2dsphere' });

export default model('Driver', driverSchema);
