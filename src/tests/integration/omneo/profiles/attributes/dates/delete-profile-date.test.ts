import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../../../omneo'
import { ProfileDatesAttribute, ProfileDatesAttributeInput } from '../../../../../../types'
import simpleOmneoRequest from '../../../../../lib/simple-omneo-request'
import randomString from '../../../../../lib/string/random'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

const FAILED_DELETE_DATES : number[] = []
const getHandle = () => { return `sdk_unit_test_dates_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}` }
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Profile Date Delete', () => {
  test('SDK Delete Date', async () => {
    const payload: ProfileDatesAttributeInput = {
      name: 'Omneo SDK Delete Date',
      date: '2024-12-02',
      type: 'test',
      handle: getHandle(),
      is_recurring: true,
      recurring_schedule: 'Yearly',
      note: 'test notes for omneo delete',
      relationship: 'Me',
      description: 'test description for delete'
    }

    const response = await simpleOmneoRequest('PUT', `/profiles/${testProfileID}`, {
      dates_attributes: [payload]
    })
    const profileDates: ProfileDatesAttribute[] = response.data.attributes.dates
    const profileFilterDates = profileDates.filter(d => d.handle === payload.handle)
    const deleteDateId = profileFilterDates[0].id as number

    const dates: ProfileDatesAttribute[] = await omneo.profiles.attributes.dates.list(testProfileID)
    const filterDates = dates.filter(d => d.handle === payload.handle)
    expect(filterDates.length).toBeGreaterThan(0)

    const deleteDates: ProfileDatesAttribute[] = await omneo.profiles.attributes.dates.delete(testProfileID, deleteDateId).catch(() => {
      FAILED_DELETE_DATES.push(deleteDateId)
      throw new Error('Omneo Failed to delete Profile Date')
    })
    const filterDeleteDates = deleteDates.filter(d => d.handle === payload.handle)
    expect(filterDeleteDates.length).toBe(0)
  })
})

afterAll(async () => {
  if (FAILED_DELETE_DATES.length > 0) {
    for (const handle of FAILED_DELETE_DATES) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `profiles/${testProfileID}/attributes/dates/${handle}`)
      if (deleteResponse.status === 204) {
        console.log(`Omneo Profile Date ID ${handle} deleted`)
      }
    }
  }
})
