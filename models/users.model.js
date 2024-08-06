import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        firstName: String,
        lastName: String,
        phoneNumber: String,
        profileImage: String,
        socialMedia: {
            facebookId: {
                type: String
            },
            googleId: {
                type: String
            }
        }
    },
    preferredPaymentMethod: String,
    verficationStatus: {
        emailVerfication: {
            type: Boolean,
            default: false
        },
        phoneVerification: {
            type: Boolean,
            default: false
        }
    }
});

export default model('User', userSchema);
