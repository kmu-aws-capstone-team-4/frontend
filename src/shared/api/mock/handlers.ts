import { http, HttpResponse } from 'msw'

export const handlers = [
  // Example handler
  http.get('/api/hello', () => {
    return HttpResponse.json({
      message: 'Hello World',
    })
  }),
]
