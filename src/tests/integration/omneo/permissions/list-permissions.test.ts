/* eslint-disable camelcase */
import { describe, expect, test } from 'vitest'
import { Omneo } from '../../../../omneo'
const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Permissions list', () => {
  test('SDK can list permissions.', async () => {
    const { data } = await omneo.permissions.list()
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
    const dataIsValid = data.every(({ handle }) => typeof handle === 'string')
    expect(dataIsValid).toBe(true)
  })
})
