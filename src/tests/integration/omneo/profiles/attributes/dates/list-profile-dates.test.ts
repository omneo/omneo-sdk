import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { ProfileDatesAttribute, ProfileDatesAttributeInput } from '@types'
import { simpleOmneoRequest, randomString } from '@lib'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_DATES_IDS : number[] = []
const getHandle = () => { return `sdk_unit_test_dates_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}` }
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Profile Dates Get', () => {
  test('SDK Get Dates', async () => {
    const payload: ProfileDatesAttributeInput = {
      name: 'Omneo SDK Get Dates',
      date: '2024-12-02',
      type: 'test',
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
    CREATED_DATES_IDS.push(profileFilterDates[0].id)

    const dates: ProfileDatesAttribute[] = await omneo.profiles.attributes.dates.list(testProfileID)
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
  if (CREATED_DATES_IDS.length > 0) {
    for (const id of CREATED_DATES_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/attributes/dates/${id}`)
      console.log('Cleaning up SDK Profile Dates with ID', id)
      const findDate = deleteResponse?.data?.find((v: any) => v.id === id)
      if (!findDate) {
        console.log(`SDK Profile Dates ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Profile Dates ID ${id}`)
      }
    }
  }
})
