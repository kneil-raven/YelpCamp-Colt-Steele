const express = require('express');
const methodOverride = require('method-override');
const app = express();
const ejsMate = require('ejs-mate');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const catchAsync = require('./utils/catchAsync');

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

// use ejsMate to ejs engine
app.engine('ejs', ejsMate);
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
app.get('/campgrounds', catchAsync(async(req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
}));

// form to create new campground
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

// create new campground in the database
app.post('/campgrounds', catchAsync(async(req, res, next) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}));

// show details for a specific campground
app.get('/campgrounds/:id', catchAsync(async(req, res, next) => {
    // console.log(req.params)
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', {campground});
}));

// edit campground
app.get('/campgrounds/:id/edit', catchAsync(async(req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground})
}));

// put request to update campground
app.put('/campgrounds/:id', catchAsync(async(req, res, next) => {
    const {id} = req.params;
    // {...req.body.campground} --> spread operator can also be used insted of req.body.campground
    const campground = await Campground.findByIdAndUpdate(id, req.body.campground)
    res.redirect(`/campgrounds/${campground._id}`)
}));

// delete campground
app.delete('/campgrounds/:id', catchAsync(async(req, res, next) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    console.log(`Delete Successfully!`)
    res.redirect('/campgrounds');
}));

// create custom error handler
app.use((err, req, res, next) => {
    // console.log(err)
    console.log(`Owshiii!!!!`)
    // display error message on console
    console.log(err.message)
    res.send(`Boy! Something went wrong! :<`)
})

app.listen(3000, () => {
    console.log(`On port 3000!!!`)
})