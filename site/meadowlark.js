const express = require('express')
const app = express()

const handlebars = require('express-handlebars')
handlebars.create({ defaultLayout: 'main' })

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.set('port', process.env.PORT || 3030)

app.get('/', (req, res) => {
    res.type('text/plain')
    res.send('Meadowlark Travel')
})

app.get('/about/contact', (req, res) => {
    res.type('text/plain')
    res.send('Contact Meadowlark Travel')
})

app.get('/about/directions', (req, res) => {
    res.type('text/plain')
    res.send('Directions to Meadowlark Travel')
})

app.get('/about*', (req, res) => {
    res.type('text/plain')
    res.send('About Meadowlark Travel')
})

app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 — Not Found')
})
app.use((err, req, res, next) => {
    console.log(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 — Server Error')
})

app.listen(app.get('port'), () => console.log(
    `Express started on http://localhost:${app.get('port')}; ` +
    `pres Ctrl-C to terminate.`
))
