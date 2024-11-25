import { describe, test, beforeEach, expect } from 'vitest'
import simpleOmneoRequest from '../../lib/simple-omneo-request'
import { ID } from '../../../id'
import jwt from 'jsonwebtoken'

const IDClient = new ID({
  tenant: process.env.OMNEO_TENANT as string,
  config: {},
  omneoAPIToken: process.env.OMNEO_TOKEN as string
})

describe('ID Auth Request', () => {
  test('ID SDK can request an auth token with profile id', async () => {
    const exampleProfile = await simpleOmneoRequest('GET', '/profiles').then(({ data }) => data[0])
    const { token, exp } = await IDClient.auth.requestAuthToken({ id: exampleProfile.id })
    const { pid: decodedProfileID, exp: decodedExpiry } = jwt.decode(token)
    expect(typeof token).toBe('string')
    expect(typeof exp).toBe('number')
    expect(exp).toBeGreaterThan(Math.floor(Date.now() / 1000))

    expect(decodedProfileID).toBe(exampleProfile.id)
    expect(decodedExpiry).toBe(exp)
  })

  test('ID SDK can request an anonymous auth token', async () => {
    const { token, exp } = await IDClient.auth.requestAuthToken({ id: '' })
    const { pid: decodedProfileID, exp: decodedExpiry } = jwt.decode(token)
    expect(typeof token).toBe('string')
    expect(typeof exp).toBe('number')
    expect(exp).toBeGreaterThan(Math.floor(Date.now() / 1000))
    expect(decodedExpiry).toBe(exp)
    expect(decodedProfileID).toBe('null') // API returns the string null
  })

  test('ID SDK cannot get me with anon token', async () => {
    await IDClient.auth.requestAuthToken({ id: '' })
    await expect(IDClient.profile.get()).rejects.toThrow(expect.objectContaining({ status: 404, ok: false }))
  })
})

beforeEach(async () => {
  IDClient.reset()
})
