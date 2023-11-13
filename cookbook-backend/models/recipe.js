const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const mongoURL = process.env.MONGODB_URI;

console.log(`connecting to ${mongoURL}`);

mongoose
    .connect(mongoURL)
    .then((_res) => {
        console.log('connected to MongoDB');
    })
    .catch((err) => {
        console.log('error connecting to MongoDB: ', err.message);
    });

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 5,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    method: {
        type: String,
        required: true
    },
    cookingTime: {
        type: String,
        required: true
    }
});

recipeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model('Recipe', recipeSchema);
