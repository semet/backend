import request from 'supertest'

import app from '../src/app'

describe('app', () => {
  it('should return Hello, world!', async () => {
    const response = await request(app).get('/')
    expect(response.text).toBe('Hello, world!')
  })

  it('prevent request from un-whitelisted origins', async () => {
    const response = await request(app)
      .get('/')
      .set('Origin', 'http://localhost:1111')
    expect(response.status).toBe(500)
  })

  it('validate request body', async () => {})
})
