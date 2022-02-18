const mongoose = require('mongoose');
const Product = require('./product');
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

// farmSchema.pre('findOneAndDelete', async function (data) {
//     console.log("PRE Middleware");
//     console.log(data);
// });

//This will be called after calling executing "Farm.findByIdAndDelete(id)"
farmSchema.post('findOneAndDelete', async function (farm) {
    if (farm.products.length) {
        const result = await Product.deleteMany({ _id: { $in: farm.products } })
        console.log(result);
    }
});

module.exports = mongoose.model('Farm', farmSchema);