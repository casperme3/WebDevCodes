const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be empty']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank.']
    }
})

userSchema.statics.findAndValidate = async function (username, password) {
    const userFound = await this.findOne({ username });
    if (!userFound) {
        return false;
    }
    const isValid = await bcrypt.compare(password, userFound.password)
    return isValid ? userFound : false;
}

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})

module.exports = mongoose.model('User', userSchema);