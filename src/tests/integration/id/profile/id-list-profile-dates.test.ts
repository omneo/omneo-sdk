import { describe, expect, afterAll } from 'vitest'
import { ID } from '../../../../id'
import { testWithIDData } from '../test-with-id-data'
import { ProfileDatesAttribute } from '../../../../types'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import randomString from '../../../lib/string/random'

const CREATED_DATES_HANDLES : string[] = []
const getHandle = () => { return `sdk_unit_test_dates_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}` }
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('ID Dates', () => {
  testWithIDData('ID SDK can get dates', async ({ IDData }) => {
    const { tokenData } = IDData
    const payload: ProfileDatesAttribute = {
      name: 'Wedding',
      date: '2024-12-02',
      handle: getHandle(),
      is_recurring: true,
      recurring_schedule: 'Yearly',
      note: 'test notes for id',
      relationship: 'Me',
      description: 'test description for id'
    }
    await simpleOmneoRequest('PUT', `/profiles/${testProfileID}`, {
      dates_attributes: [payload]
    })

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })
    const dates: Array<ProfileDatesAttribute> = await IDClient.profile.getDates()

    const filterDates = dates.filter(d => d.handle === payload.handle)
    expect(filterDates.length).toBeGreaterThan(0)

    const targetDate = filterDates[0]
    CREATED_DATES_HANDLES.push(targetDate.id as string)

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
