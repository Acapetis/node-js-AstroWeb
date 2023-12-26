const User = require('../models/User')

module.exports = (req, res) => {
    User.create(req.body).then(() => {
        console.log("registered successfully")
        res.redirect('/')

    }).catch((error) => {
        if (error) {
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            req.flash('validationErrors', validationErrors)
            req.flash('data',req.body)
            console.log(error.errors)
            return res.redirect('/register')
        }
        
    }) 
}