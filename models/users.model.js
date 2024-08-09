import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
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
        bookings: String,
        verficationStatus: {
            emailVerfication: {
                type: Boolean,
                default: false
            },
            phoneVerification: {
                type: Boolean,
                default: false
            }
        },
        favorite: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Vehicle'
            }
        ]
    },
    {
        timestamps: true
    }
);

export default model('User', userSchema);
