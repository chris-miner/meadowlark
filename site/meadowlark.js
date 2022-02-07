const express = require('express')
const handlers = require("./lib/handlers")


const expressHandlebars = require('express-handlebars')
    .create({ defaultLayout: 'main' })

const app = express()
app.engine('handlebars', expressHandlebars.engine)
app.set('view engine', 'handlebars')
app.set('port', process.env.PORT || 3030)

// set up routes
app.get('/', handlers.home)
app.get('/about', handlers.about)

app.use(express.static(__dirname + '/public'))

app.use(handlers.notFound)
app.use(handlers.serverError)

// start server
app.listen(app.get('port'), () => console.log(
    `Express started on http://localhost:${app.get('port')} ` +
    `press Ctrl-C to terminate.`
))

