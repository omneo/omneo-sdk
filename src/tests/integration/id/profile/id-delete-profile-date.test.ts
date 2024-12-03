import { describe, expect } from 'vitest'
import { ID } from '../../../../id'
import { testWithIDData } from '../test-with-id-data'
import { ProfileDatesAttribute } from '../../../../types'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import randomString from '../../../lib/string/random'

const getHandle = () => { return `sdk_unit_test_dates_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}` }
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('ID Delete Date', () => {
  testWithIDData('ID SDK delete date', async ({ IDData }) => {
    const { tokenData } = IDData
    const payload: ProfileDatesAttribute = {
      name: 'Wedding',
      date: '2024-12-02',
      handle: getHandle(),
      is_recurring: true,
      recurring_schedule: 'Yearly',
      note: 'test notes for delete',
      relationship: 'Me',
      description: 'test description for delete'
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
    const deleteDates: Array<ProfileDatesAttribute> = await IDClient.profile.deleteDate(targetDate.id as string)
    const filterDeleteDates = deleteDates.filter(d => d.handle === payload.handle)
    expect(filterDeleteDates.length).toBe(0)
  })
})
