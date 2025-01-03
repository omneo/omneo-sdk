import { describe, expect, test } from 'vitest'
import { Omneo } from '../../../../omneo'
const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Settings get', () => {
  test('SDK can get environment setting', async () => {
    const environmentSettings = await omneo.settings.getEnvironment()
    const appKey = environmentSettings.find((setting) => setting.handle === 'app.request_key')
    expect(appKey?.handle).toBe('app.request_key')
  })
})
