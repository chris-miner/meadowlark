const config = require('config');

// set up handlbars
const { create } = require('express-handlebars')
const { sectionHelper } = require('./lib/helpers')
const handlebars = create({
    helpers: {
        section: sectionHelper
    }
})

// configure express app, 
const express = require('express')
const app = express()
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

// set up middleware
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: config.get('session.cookieSecret')
}))

const flash = require('connect-flash');
app.use(flash());

// set up routes
const handlers = require("./lib/handlers")
app.get('/', handlers.home)
app.get('/about', handlers.about)
app.get('/contact', handlers.contact)
app.post('/contact', handlers.contactProcess)
app.post('/api/contact-signup', handlers.api.contactProcess)
app.get('/headers', handlers.headers)

// set up static resource delivery
app.use(express.static(__dirname + '/public'))

// error handlers
app.use(handlers.notFound)
app.use(handlers.serverError)

// connect to database
// mongodb://user:pass@localhost:port/database
const mongoose = require('mongoose');
const dbhost = config.get('mongodb.host')
const database = config.get('mongodb.database')
mongoose.connect(`mongodb://${dbhost}/${database}`)

// start server
if (require.main === module) {
    const port = config.get('express.port')

    app.listen(port, () => console.log(
        `Express started on http://localhost:${port} ` +
        `press Ctrl-C to terminate.`
    ))
} else {
    module.exports = app
}

