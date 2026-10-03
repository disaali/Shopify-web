import { api, API_BASE_URL } from '../src/lib/api'

describe('API Client', () => {
  it('has correct base URL configured', () => {
    expect(api.defaults.baseURL).toBe(API_BASE_URL)
  })
})
