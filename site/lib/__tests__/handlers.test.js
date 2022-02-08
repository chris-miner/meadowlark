/*global test, jest, expect */
const handlers = require('../handlers')

test('home page renders', () => {
    const req = {}
    const res = { render: jest.fn() }

    handlers.home(req, res)

    expect(res.render.mock.calls[0][0]).toBe('home')
})

test('404 handler renders', () => {
    const req = {}
    const res = { render: jest.fn() }

    handlers.notFound(req, res)

    expect(res.render.mock.calls[0][0]).toBe('404')
    expect(res.render.mock.calls.length).toBe(1)
})

test('500 handler renders', () => {
    const req = {}
    const res = { render: jest.fn() }
    const err = new Error('some error')
    const next = jest.fn()

    handlers.serverError(err, req, res, next)

    expect(res.render.mock.calls[0][0]).toBe('500')
    expect(res.render.mock.calls.length).toBe(1)
})
