const mongoose = require("mongoose");
const validator = require('validator');
const ObjectId = mongoose.Schema.ObjectId;
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true
    },
    last_name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email.',
            isAsync: false
        }
    },
    password: {
        type: String,
        minlength: [5, 'Password must be atleast 5 character long'],
    },
    phone: {
        type: String,
        trim: true,
        validate: {
            validator: validator.isMobilePhone,
            message: '{VALUE} is not a valid mobile number.',
            isAsync: false
        }
    },
    is_deleted: {
        type: Number,
        default: 0,
        min: 0,
        max: 1
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

userSchema.index({ email: 1, is_deleted: 1, deletedAt: 1 }, { unique: true });
userSchema.set("JSON", { getters: true });
module.exports = mongoose.model("User", userSchema);