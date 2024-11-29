/* eslint-disable camelcase */
import { describe, expect, test } from 'vitest'
import { Omneo } from '../../../../omneo'
const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Currencies get', () => {
  test('SDK can list currencies.', async () => {
    const { data } = await omneo.currencies.list()
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
    const dataIsValid = data.every(({ id, from, to, rate, is_system, created_at, updated_at }) => {
      return typeof id === 'number' &&
      typeof from === 'string' &&
      typeof to === 'string' &&
      typeof rate === 'number' &&
      typeof is_system === 'boolean' &&
      typeof created_at === 'string' &&
      typeof updated_at === 'string'
    })
    expect(dataIsValid).toBe(true)
  })
})
