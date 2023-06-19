# YelpCamp: Campgrounds CRUD

- Create the Basic Express App. set the view engine, the directory in which the middleware will view the .ejs files. 
    - To set the view engine and the path to view, use the code below:
    ```javascript
        app.set('view engine', 'ejs')
        app.set('views', path.join(__dirname, 'views'));
    ```

## Setting up the Campground Model 
- After creating the Express basics, next is create the Campground Model Basics. To create campground model, follow the following steps:
    1. Create another directory named models; add campground.js.
    2. Require mongoose; 
    `const mongoose = require('mongoose');`.
    3. Define the Schema for the Campground model, 
    ```javascript
    const Schema = mongoose.Schema;
    const CampgroundSchema = new Schema({
        title: String,
        price: String,
        description: String,
        location: String
    })
    ```
    4. Compile the CampgroundSchema into a model. 
    `const Campground = mongoose.model('Campground', CampgroundSchema);` The declared name of the model which is `Campground` should be exactly the same with the  `Campground` property/name. 
    A model is a class with which we construct documents. Each document we create will be a Campground with properties and behaviors like our declared schema.
    5. Export the Campground model by using the code 
    `module.exports = Campground;`.

## Seeding Campgrounds
