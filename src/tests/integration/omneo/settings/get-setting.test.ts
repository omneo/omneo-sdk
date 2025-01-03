import { describe, expect, test } from 'vitest'
import { Omneo } from '../../../../omneo'
const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Settings get', () => {
  test('SDK can get a setting by handle', async () => {
    const setting = await omneo.settings.get('currency') // Omneo always has currency setting
    expect(setting.handle).toBe('currency')
  })
})
