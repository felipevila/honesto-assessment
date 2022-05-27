import { rest } from 'msw'

export const handlers = [
  rest.get('/questions', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(require('./questions')))
  }),

  rest.get('/people', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(require('./people')))
  }),
]
