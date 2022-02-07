const express = require('express')
const fortune = require('./lib/fortune')
const expressHandlebars = require('express-handlebars')
    .create({ defaultLayout: 'main' })

const app = express()
app.engine('handlebars', expressHandlebars.engine)
app.set('view engine', 'handlebars')
app.set('port', process.env.PORT || 3030)

// set up routes
app.get('/', (req, res) => res.render('home'))
app.get('/about', (req, res) => res.render('about', { fortune: fortune.randomFortune() }))

app.use(express.static(__dirname + '/public'))

app.use((req, res) => {
    res.status(404)
    res.render('404')
})
app.use((err, req, res, next) => {
    console.log(err.message)
    res.status(500)
    res.render('500')
})

// start server
app.listen(app.get('port'), () => console.log(
    `Express started on http://localhost:${app.get('port')} ` +
    `press Ctrl-C to terminate.`
))
