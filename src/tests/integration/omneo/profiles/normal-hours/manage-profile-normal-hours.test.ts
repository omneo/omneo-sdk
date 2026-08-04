import { describe, expect, test, beforeAll, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { ProfileNormalHour } from '@types'
import { simpleOmneoRequest, getRandomString } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_PROFILE_IDS: string[] = []
let profileID: string

beforeAll(async () => {
  const profile = await simpleOmneoRequest('POST', '/profiles', {
    first_name: 'SDK',
    last_name: 'Normal Hours Test',
    email: `${getRandomString('sdk_unit_test_profile_normal_hours')}@omneodemo.com`
  }).then(({ data }) => data)
  profileID = profile.id
  CREATED_PROFILE_IDS.push(profile.id)
})

describe('Manage Profile Normal Hours', () => {
  let normalHour: ProfileNormalHour

  test('SDK Create Profile Normal Hour', async () => {
    const payload = {
      day_of_week: 'MON' as const,
      available_from: '09:00',
      available_until: '17:00'
    }

    normalHour = await omneoClient.profiles.normalHours.create(profileID, payload).catch((err) => {
      console.error('SDK Create Profile Normal Hour failed:', err)
      throw new Error('SDK Create Profile Normal Hour failed')
    })

    expect(normalHour).toBeDefined()
    expect(normalHour.day_of_week).toBe(payload.day_of_week)
    expect(normalHour.profile_id).toBe(profileID)
  })

  test('SDK List Profile Normal Hours', async () => {
    const normalHours = await omneoClient.profiles.normalHours.list(profileID).catch((err) => {
      console.error('SDK List Profile Normal Hours failed:', err)
      throw new Error('SDK List Profile Normal Hours failed')
    })

    expect(Array.isArray(normalHours)).toBe(true)
    expect(normalHours.find((hour) => hour.id === normalHour.id)).toBeDefined()
  })

  test('SDK Get Profile Normal Hour', async () => {
    const found = await omneoClient.profiles.normalHours.get(profileID, normalHour.id).catch((err) => {
      console.error('SDK Get Profile Normal Hour failed:', err)
      throw new Error('SDK Get Profile Normal Hour failed')
    })

    expect(found).toBeDefined()
    expect(found.id).toBe(normalHour.id)
    expect(found.day_of_week).toBe(normalHour.day_of_week)
  })

  test('SDK Update Profile Normal Hour', async () => {
    const updated = await omneoClient.profiles.normalHours.update(profileID, normalHour.id, {
      available_until: '18:00'
    }).catch((err) => {
      console.error('SDK Update Profile Normal Hour failed:', err)
      throw new Error('SDK Update Profile Normal Hour failed')
    })

    expect(updated).toBeDefined()
    expect(updated.id).toBe(normalHour.id)
    expect(updated.available_until).toContain('18:00')
  })

  test('SDK Delete Profile Normal Hour', async () => {
    await omneoClient.profiles.normalHours.delete(profileID, normalHour.id).catch((err) => {
      console.error('SDK Delete Profile Normal Hour failed:', err)
      throw new Error('SDK Delete Profile Normal Hour failed')
    })

    const normalHours = await omneoClient.profiles.normalHours.list(profileID)
    expect(normalHours.find((hour) => hour.id === normalHour.id)).toBeUndefined()
  })
})

afterAll(async () => {
  for (const id of CREATED_PROFILE_IDS) {
    const response = await simpleOmneoRequest('DELETE', `/profiles/${id}`)
    if (response.status === 204 || response.data) {
      console.log(`SDK Profile ID ${id} deleted`)
    } else {
      console.log(`Failed to delete Profile ID ${id}`, response)
    }
  }
})
