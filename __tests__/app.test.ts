import request from 'supertest'

import app from '../src/app'

describe('app', () => {
  it('should return Hello, world!', async () => {
    const response = await request(app).get('/')
    expect(response.text).toBe('Hello, world!')
  })
})
