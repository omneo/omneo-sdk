import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../../omneo'
import simpleOmneoRequest from '../../../../lib/simple-omneo-request'

import { ProfileDatesAttribute } from '../../../../../types'
import randomString from '../../../../lib/string/random'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_DATES_HANDLES : string[] = []
const getHandle = () => { return `sdk_unit_test_dates_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}` }
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Profile Dates Get', () => {
  test('SDK Get Dates', async () => {
    const payload: ProfileDatesAttribute = {
      name: 'Omneo SDK Get Dates',
      date: '2024-12-02',
      handle: getHandle(),
      is_recurring: true,
      recurring_schedule: 'Yearly',
      note: 'test notes for omneo',
      relationship: 'Me',
      description: 'test description for omneo'
    }
    const response = await simpleOmneoRequest('PUT', `/profiles/${testProfileID}`, {
      dates_attributes: [payload]
    })
    const profileDates: ProfileDatesAttribute[] = response.data.attributes.dates
    const profileFilterDates = profileDates.filter(d => d.handle === payload.handle)
    CREATED_DATES_HANDLES.push(profileFilterDates[0].id as string)

    const dates: ProfileDatesAttribute[] = await omneo.profiles.getProfileDates(testProfileID)
    const filterDates = dates.filter(d => d.handle === payload.handle)
    expect(filterDates.length).toBeGreaterThan(0)

    const targetDate = filterDates[0]
    expect(targetDate.handle).toBe(payload.handle)
    expect(targetDate.profile_id).toBe(testProfileID)
    expect(targetDate.date).toBeTypeOf('string')
    expect(targetDate.is_recurring).toBe(payload.is_recurring)
    expect(targetDate.recurring_schedule).toBe(payload.recurring_schedule)
    expect(targetDate.note).toBe(payload.note)
    expect(targetDate.description).toBe(payload.description)
    expect(targetDate.relationship).toBe(payload.relationship)
  })
})

afterAll(async () => {
  if (CREATED_DATES_HANDLES.length > 0) {
    for (const handle of CREATED_DATES_HANDLES) {
      console.log('Cleaning up SDK Profile Dates with ID', handle)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/attributes/dates/${handle}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Profile Dates ID ${handle} deleted`)
      } else {
        console.log(`Failed to delete Profile Dates ID ${handle}`, deleteResponse)
      }
    }
  }
})
