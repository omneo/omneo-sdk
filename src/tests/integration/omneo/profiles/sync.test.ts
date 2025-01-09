import { describe, expect, test } from 'vitest'
import { Omneo } from '../../../..'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Sync Profiles', async () => {
  test('SDK can sync profiles.', async () => {
    const syncResponse = await omneo.profiles.sync(new Date().toISOString())
    expect(syncResponse.message).toBe('Profiles queued for sync.')
  })

  test('SDK can sync profiles checks for invalid date', async () => {
    await expect(omneo.profiles.sync('Invalid Date')).rejects.toThrow('Invalid date')
  })

  test('SDK can sync profiles only allows dates before tomorrow', async () => {
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 5)
    await expect(omneo.profiles.sync(futureDate.toISOString())).rejects.toThrow('Date must be before tomorrow')
  })
})
