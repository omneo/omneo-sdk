/* eslint-disable camelcase */
import { describe, expect, test } from 'vitest'
import { Omneo } from '../../../../omneo'
const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Audits get', () => {
  test('SDK can list audits.', async () => {
    const { data } = await omneo.audits.list()
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
    const dataIsValid = data.every(({ old_values, new_values, auditable_type, auditable_id }) => {
      return typeof old_values === 'string' &&
      typeof new_values === 'string' &&
      typeof auditable_type === 'string' &&
      (typeof auditable_id === 'number' || auditable_id === null)
    })
    expect(dataIsValid).toBe(true)
  })
})
