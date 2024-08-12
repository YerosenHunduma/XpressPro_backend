import { geocoder } from '../config/geoCoderConfig';
import User from '../models/users.model';
import Booking from '../models/booking.model';

export const booking = async (req, res, next) => {
    const { driverId, vehicleId, departureDate, departureTime, status, additionalServices, payment, origin, destination, tripType, customTrip, sightseeingStops } = req.body;

    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return next(new errorHandler('User not found', 404));
        }

        const geocodedOrigin = await geocoder.geocode(origin);
        const geocodedDestination = await geocoder.geocode(destination);
        const geocodedsightseeingStops = await geocoder.geocode(sightseeingStops);

        const newBooking = new Booking({
            driverId,
            userId: req.userId,
            vehicleId,
            departureDate,
            departureTime,
            tripType,
            customTrip,
            status,
            additionalServices: {
                childSeats: {
                    Infant_carrier: Infant_carrier || 0,
                    Convertible_seat: Convertible_seat || 0,
                    Booster_seat: Booster_seat || 0
                },
                extraTime: additionalServices.extraTime || 0
            },
            payment: {
                method: payment.method,
                amount: payment.amount,
                currency: payment.currency,
                status: payment.status
            },
            origin: {
                address: geocodedOrigin[0].formattedAddress,
                type: 'Point',
                coordinates: [geocodedOrigin[0]?.longitude, geocodedOrigin[0]?.latitude],
                googleMaps: geocodedOrigin
            },
            destination: {
                address: geocodedDestination[0].formattedAddress,
                type: 'Point',
                coordinates: [geocodedDestination[0]?.longitude, geocodedDestination[0]?.latitude],
                googleMap: geocodedDestination
            },
            sightseeingStops: geocodedsightseeingStops.map((stop) => ({
                address: stop.formattedAddress,
                type: 'Point',
                coordinates: [stop[0]?.longitude, stop[0]?.latitude],
                googleMap: stop
            }))
        });

        if (tripType === 'return') {
            newBooking.returnDate = returnDate;
            newBooking.returnTime = returnTime;
        }

        await newBooking.save();

        res.status(200).json({ success: true, Booking });
    } catch (error) {
        next(error);
    }
};
