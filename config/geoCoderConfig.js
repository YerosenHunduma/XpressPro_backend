import nodeGeoCoder from 'node-geocoder';

const options = {
    provider: 'google',
    apiKey: process.env.GOOGLE_API_KEY,
    formatter: null
};

export const geocoder = nodeGeoCoder(options);
