
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
    Contact display contact form
*/
exports.contact = (req, res) => res.render('contact', { flash: req.flash('messages') })


/*
 handle contact form submit
 */
const { Customer } = require('../models/customer.js')
exports.contactProcess = async (req, res) => {
    // Check if they already signed up
    var customer = await Customer.findOne({ email: req.body.email }).exec()

    if (customer === null) {
        customer = new Customer({ first: req.body.firstName, last: req.body.lastName, email: req.body.email })
        customer = await customer.save()
    }

    req.flash('messages', {
        type: 'success',
        intro: `Thank you ${customer.first}!`,
        message: 'You have now been signed up for the newsletter.'
    })
    res.redirect(303, '/contact')
}
