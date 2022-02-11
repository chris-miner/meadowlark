const express = require('express')
const mongoose = require('mongoose');
const handlers = require("./lib/handlers")
const bodyParser = require('body-parser')
const expressHandlebars = require('express-handlebars').create({ defaultLayout: 'main' })

const app = express()
app.disable('x-powered-by')
app.engine('handlebars', expressHandlebars.engine)
app.set('view engine', 'handlebars')
app.set('port', process.env.PORT || 3030)

// set up form post decoding
app.use(bodyParser.urlencoded({ extended: true }))

// set up routes
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


// mongodb://user:pass@localhost:port/database
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

