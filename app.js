const express = require('express');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

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
// .then(() => {
//     console.log(`Connected to MongoDB`);
// })
// .catch((error) => {
//     console.error(`Error!!`, error);
// })


// set view engine middleware as ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

// absolute path of the directory for views
// app.use('/views', express.static(path.join(__dirname, 'views')));
// set up middleware to parse incoming requests
app.use(express.urlencoded({extended: true}));

// override POST in the forms at ejs by having ?_method=DELETE
app.use(methodOverride('_method'));


app.get('/', (req, res) => {
    res.render('home')
})


/*=================================
Campgrounds Section Starts Here

=================================*/
// display all campgrounds
app.get('/campgrounds', async(req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
})

// form to create new campground
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

// create new campground in the database
app.post('/campgrounds', async(req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
})

// show details for a specific campground
app.get('/campgrounds/:id', async(req, res) => {
    // console.log(req.params)
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', {campground});
})

// edit campground
app.get('/campgrounds/:id/edit', async(req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground})
})

// put request to update campground
app.put('/campgrounds/:id', async(req, res) => {
    const {id} = req.params;
    // {...req.body.campground} --> spread operator can also be used insted of req.body.campground
    const campground = await Campground.findByIdAndUpdate(id, req.body.campground)
    res.redirect(`/campgrounds/${campground._id}`)
})

// delete campground
app.delete('/campgrounds/:id', async(req, res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    console.log(`Delete Successfully!`)
    res.redirect('/campgrounds');
})


app.listen(3000, () => {
    console.log(`On port 3000!!!`)
})