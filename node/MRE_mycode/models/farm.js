const mongoose = require('mongoose');
const { Schema } = mongoose;

const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Farm must have name, not empty!']
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'E-mail must be provided.']
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

module.exports = mongoose.model('Farm', farmSchema);