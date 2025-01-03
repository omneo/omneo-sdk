/* eslint-disable camelcase */
import { describe, expect, test } from 'vitest'
import { Omneo } from '../../../../omneo'
const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Settings List', () => {
  test('SDK can list settings.', async () => {
    const settings = await omneo.settings.list()
    expect(settings.length).toBeGreaterThan(0)
  })
  test('SDK can list settings with filters', async () => {
    const settings = await omneo.settings.list({ 'filter[handle]': 'currency' })
    expect(settings.length).toBeGreaterThan(0)
    expect(settings[0].handle).toBe('currency')
  })
})
