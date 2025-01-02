/* eslint-disable camelcase */
import { describe, expect, test } from 'vitest'
import { Omneo } from '../../../../omneo'
const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Health', () => {
  test('SDK can get health.', async () => {
    const health = await omneo.health()
    expect(health.status).toBe(200)
    expect(health.statusText).toBe('OK')
  })
})
