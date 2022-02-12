
exports.notFound = (_req, res) => res.status(404).render('404')
exports.serverError = (err, _req, res, _next) => res.status(500).render('500', { error: err })

exports.headers = (req, res) => {
    const headers = Object.entries(req.headers).map(([key, value]) => `${key}: ${value}`)
    res.type('text/plain')
    res.send(headers.join('\n'))
}

exports.home = (_req, res) => res.render('home')
exports.about = (_req, res) => res.render('about');


/*
    Contact form related
*/
exports.contact = (req, res) => {
    let context = { success: req.query.success }
    if (req.session.Customer != null) {
        context.Customer = req.session.Customer
    }
    res.render('contact', context);
}

const { Customer } = require('../models/customer.js')
exports.contactProcess = async (req, res) => {
    // stuff first last and email into the database
    var result = await Customer.findOne({ email: req.body.email }).exec()

    if (result === null) {
        const customer = new Customer({ first: req.body.firstName, last: req.body.lastName, email: req.body.email })
        result = await customer.save()
    }
    req.session.Customer = { first: req.body.firstName, last: req.body.lastName, email: req.body.email }
    res.redirect(303, '/contact?success=true')
}
