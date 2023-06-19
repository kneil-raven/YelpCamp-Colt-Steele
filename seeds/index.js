const mongoose = require('mongoose');
const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers');
const Campground = require('../models/campground');

// connect Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
})

// check if the server is connected to MongoDB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error!!!!'))
db.once('open', () => {
    console.log(`Database Connected!!!`)
})

// pick a random number in array
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i=0; i< 50; i++) {
        // pick random number
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        });
        await camp.save();
    }
}

// close database connection in the Node.js
seedDB().then(() => {
    mongoose.connection.close();
})