import { Schema, model } from 'mongoose';

const vehicleSchema = new Schema({
    driverId: { type: Schema.Types.ObjectId, ref: 'Driver' },
    type: { type: String, required: true },
    capacity: { seat: { type: Number }, lugggage: { type: Number } },
    amenities: [{ type: String }],
    licensePlate: { type: String }
});

export default model('Vehicle', vehicleSchema);
