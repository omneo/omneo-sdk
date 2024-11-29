/* eslint-disable camelcase */
import { describe, expect, test } from 'vitest'
import { Omneo } from '../../../../omneo'
const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Points list', () => {
  test('SDK can list points.', async () => {
    const { data } = await omneo.points.list()
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
    const dataIsValid = data.every(({ profile_id, value_initial }) => {
      return typeof value_initial === 'number' && typeof profile_id === 'string'
    })
    expect(dataIsValid).toBe(true)
  })
})
