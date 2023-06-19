const mongoose = require('mongoose');
const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers');
const Campground = require('../models/campground');
const axios = require('axios');

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

// pick a random number in array (function array)
const sample = array => array[Math.floor(Math.random() * array.length)];

// call unsplash and return small image
async function seedImg() {
try {
    const res = await axios.get('https://api.unsplash.com/photos/random', {
    params: {
        client_id: 'ZU_yh-2nGYtMtHsVxocfKo4DW_NkXcZHFy5aQpFEWqo'
        // collections: 483251,
        // id: `${res.data.id}`
    },
    })
    // console.log(res.data.id)
    return res.data.urls.small
} catch (err) {
    console.error(err)
}
}



const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i=0; i< 2; i++) {
        // pick random number
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: await seedImg(),
            description: `Lorem ipsum dolor sit amet.`,
            price
        });
        await camp.save();
    }
}

// close database connection in the Node.js
seedDB().then(() => {
    mongoose.connection.close();
})