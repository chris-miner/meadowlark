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

exports.contactProcess = (req, res) => {
    console.log(req.body)
    res.redirect(303, '/contact/success');
}
exports.contactSuccess = (_req, res) => res.render('contact-success');
