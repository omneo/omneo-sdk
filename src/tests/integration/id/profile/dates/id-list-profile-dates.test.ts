import { describe, expect, afterAll } from 'vitest'
import { ID } from '../../../../../id'
import { testWithIDData } from '../../test-with-id-data'
import { ProfileDatesAttribute } from '../../../../../types'
import simpleOmneoRequest from '../../../../lib/simple-omneo-request'
import randomString from '../../../../lib/string/random'

const CREATED_DATES_IDS : string[] = []
const getHandle = () => { return `sdk_unit_test_list_dates_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}` }
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('ID Dates', () => {
  testWithIDData('ID SDK Get Dates', async ({ IDData }) => {
    const { tokenData } = IDData
    const payload: ProfileDatesAttribute = {
      name: 'ID SDK Get Dates',
      date: '2024-12-02',
      handle: getHandle(),
      is_recurring: true,
      recurring_schedule: 'Yearly',
      note: 'test notes for id',
      relationship: 'Me',
      description: 'test description for id'
    }
    const response = await simpleOmneoRequest('PUT', `/profiles/${testProfileID}`, {
      dates_attributes: [payload]
    })

    const profileDates: ProfileDatesAttribute[] = response.data.attributes.dates

    const profileFilterDates = profileDates.find((d) => d.handle === payload.handle)
    if (profileFilterDates) {
      CREATED_DATES_IDS.push(profileFilterDates.id as string)
    }

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })
    const dates: ProfileDatesAttribute[] = await IDClient.profile.getDates()

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
      console.log('Cleaning up SDK Profile Dates with ID', id)
      await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/attributes/dates/${id}`)
    }
  }
})
