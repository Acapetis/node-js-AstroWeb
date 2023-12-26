const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')

//mongoDB connect
mongoose.connect('mongodb+srv://admin:1234@cluster0.v2ntp09.mongodb.net/?retryWrites=true&w=majority')

//controllers
const indexController = require('./controllers/indexController')
const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerController', {
    useNewUrlParser: true
})
const storeController = require('./controllers/storeUserController')
const storeUserController = require('./controllers/storeUserController')
const loginUserController = require('./controllers/loginUserController')
const logoutController = require('./controllers/logoutController')
const homeController = require('./controllers/homeController')

//loginToken
global.loggedIn = null;


//middleware
const redirectIfAuth = require('./middleware/redirectIfAuth')
const authMiddleware = require('./middleware/authMiddleware')


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())
app.use(expressSession({
    secret: "node secret"
}))
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})
app.set('view engine', 'ejs') 




app.listen(4000, () => {
    console.log("app listening on port 4000")
})


//home page from indexController

app.get('/', indexController)
app.get('/login', redirectIfAuth, loginController)
app.get('/register', redirectIfAuth, registerController)
app.post('/user/register', redirectIfAuth, storeUserController)
app.post('/user/login', redirectIfAuth, loginUserController)
app.get('/logout', logoutController)
app.get('/home',authMiddleware ,homeController)