import { describe, expect, test, beforeAll, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { ProfileSpecialHour } from '@types'
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
    last_name: 'Special Hours Test',
    email: `${getRandomString('sdk_unit_test_profile_special_hours')}@omneodemo.com`
  }).then(({ data }) => data)
  profileID = profile.id
  CREATED_PROFILE_IDS.push(profile.id)
})

describe('Manage Profile Special Hours', () => {
  let specialHour: ProfileSpecialHour

  test('SDK Create Profile Special Hour', async () => {
    const payload = {
      name: getRandomString('sdk_unit_test_profile_special_hour_name'),
      start_at: '2026-12-24',
      end_at: '2026-12-26',
      is_repeating: false
    }

    specialHour = await omneoClient.profiles.specialHours.create(profileID, payload).catch((err) => {
      console.error('SDK Create Profile Special Hour failed:', err)
      throw new Error('SDK Create Profile Special Hour failed')
    })

    expect(specialHour).toBeDefined()
    expect(specialHour.name).toBe(payload.name)
    expect(specialHour.is_repeating).toBe(payload.is_repeating)
    expect(specialHour.profile_id).toBe(profileID)
  })

  test('SDK List Profile Special Hours', async () => {
    const specialHours = await omneoClient.profiles.specialHours.list(profileID).catch((err) => {
      console.error('SDK List Profile Special Hours failed:', err)
      throw new Error('SDK List Profile Special Hours failed')
    })

    expect(Array.isArray(specialHours)).toBe(true)
    expect(specialHours.find((hour) => hour.id === specialHour.id)).toBeDefined()
  })

  test('SDK Get Profile Special Hour', async () => {
    const found = await omneoClient.profiles.specialHours.get(profileID, specialHour.id).catch((err) => {
      console.error('SDK Get Profile Special Hour failed:', err)
      throw new Error('SDK Get Profile Special Hour failed')
    })

    expect(found).toBeDefined()
    expect(found.id).toBe(specialHour.id)
    expect(found.name).toBe(specialHour.name)
  })

  test('SDK Update Profile Special Hour', async () => {
    const updated = await omneoClient.profiles.specialHours.update(profileID, specialHour.id, {
      end_at: '2026-12-27'
    }).catch((err) => {
      console.error('SDK Update Profile Special Hour failed:', err)
      throw new Error('SDK Update Profile Special Hour failed')
    })

    expect(updated).toBeDefined()
    expect(updated.id).toBe(specialHour.id)
    expect(updated.end_at).toContain('2026-12-27')
  })

  test('SDK Delete Profile Special Hour', async () => {
    await omneoClient.profiles.specialHours.delete(profileID, specialHour.id).catch((err) => {
      console.error('SDK Delete Profile Special Hour failed:', err)
      throw new Error('SDK Delete Profile Special Hour failed')
    })

    const specialHours = await omneoClient.profiles.specialHours.list(profileID)
    expect(specialHours.find((hour) => hour.id === specialHour.id)).toBeUndefined()
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
