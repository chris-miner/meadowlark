
/*
    Submit the sign-up request via fetch.
*/
document.getElementById('contactForm')
    .addEventListener('submit', event => {
        event.preventDefault()

        const form = event.target
        const body = JSON.stringify({
            _csrf: form.elements._csrf.value,
            firstName: form.elements.firstName.value,
            lastName: form.elements.lastName.value,
            email: form.elements.email.value,
        })

        const headers = { 'Content-type': 'application/json' }
        const container = document.getElementById('alertContainer')
        fetch('/api/contact-signup', { method: 'post', body, headers })
            .then(resp => {
                if (resp.status < 200 || resp.status >= 300)
                    throw new Error(`Request failed with status ${resp.status}`)
                return resp.json()
            }).then(json => {
                const flash = json.flash[0]
                const type = flash.type
                const intro = flash.intro
                const message = flash.message
                container.append(createAlert(type, intro, message))
                form.reset()
            }).catch(err => {
                container.innerHTML = `We're sorry, we had a problem signing you up.  Please try again.`
            })
    })

/*
    createAlert generates something like this boostrap HTML alert code

    <div class="alert alert-{{this.type}} alert-dismissible fade show" role="alert">
        <strong>{{this.intro}}</strong>
        {{this.message}}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
*/
function createAlert(type, intro, message) {
    const alert = document.createElement("div")
    alert.classList.add('alert', `alert-${type}`, 'alert-dismissible', 'fade', 'show')
    alert.setAttribute('role', 'alert')

    const button = document.createElement("button")
    button.classList.add('btn-close')
    button.type = 'button'
    button.setAttribute('data-bs-dismiss', 'alert')
    button.setAttribute('aria-label', 'Close')

    const strong = document.createElement("strong")
    strong.innerText = intro

    alert.append(strong)
    alert.append(document.createTextNode(`\n${message}\n`))
    alert.append(button)
    return alert
}
