
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
    Contacts related handlers.  The first one delivers our contact
    page with a form.  The second one handles the form submit and
    redirects to our third which is the thank-you page.  I suppose
    if there were an error on handling that post we could return 
    to the contact form.
*/
exports.contact = (_req, res) => res.render('contact');

const { Customer } = require('../models/customer.js')
exports.contactProcess = async (req, _res) => {
    console.log(req.body)

    // stuff first last and email into the database
    var result = await Customer.findOne({ email: req.body.email }).exec()

    if (result === null) {
        const customer = new Customer({ first: req.body.firstName, last: req.body.lastName, email: req.body.email })
        result = await customer.save()
    }

    _res.redirect(303, '/contact/success')
}

exports.contactSuccess = (req, res) => res.render('contact-success', req.customer);
