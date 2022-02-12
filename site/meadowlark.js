const config = require('config');
// configure express app, 
const express = require('express')
const app = express()

const expressHandlebars = require('express-handlebars').create({ defaultLayout: 'main' })
app.engine('handlebars', expressHandlebars.engine)
app.set('view engine', 'handlebars')

app.set('port', config.get('port'))
app.disable('x-powered-by')

// set up middleware
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

const session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: config.get('cookieSecret')
}))

// set up routes
const handlers = require("./lib/handlers")
app.get('/', handlers.home)
app.get('/about', handlers.about)
app.get('/contact', handlers.contact)
app.post('/contact', handlers.contactProcess)
app.get('/headers', handlers.headers)

// set up static resource delivery
app.use(express.static(__dirname + '/public'))

// error handlers
app.use(handlers.notFound)
app.use(handlers.serverError)

// connect to database
// mongodb://user:pass@localhost:port/database
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/meadowlark')

// start server
if (require.main === module) {
    app.listen(app.get('port'), () => console.log(
        `Express started on http://localhost:${app.get('port')} ` +
        `press Ctrl-C to terminate.`
    ))
} else {
    module.exports = app
}

