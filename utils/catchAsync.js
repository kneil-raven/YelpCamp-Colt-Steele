module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}

/*
app.get('/', async(req, res, next) => {
    try{
        
    } catch(e) {
        next(e)
    }
})


*/