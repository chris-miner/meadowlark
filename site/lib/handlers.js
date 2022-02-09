exports.home = (_req, res) => res.render('home')
exports.about = (_req, res) => res.render('about');
exports.contact = (_req, res) => res.render('contact');
exports.notFound = (_req, res) => res.status(404).render('404')
exports.serverError = (err, _req, res, _next) => res.status(500).render('500', { error: err })

exports.headers = (req, res) => {
    const headers = Object.entries(req.headers).map(([key, value]) => `${key}: ${value}`)
    res.type('text/plain')
    res.send(headers.join('\n'))
}