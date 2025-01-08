import { describe, expect, afterAll } from 'vitest'
import { ID } from '../../../../../../id'
import { testWithIDData } from '../../../test-with-id-data'
import { ProfileDatesAttribute, ProfileDatesAttributeInput } from '../../../../../../types'
import simpleOmneoRequest from '../../../../../lib/simple-omneo-request'
import randomString from '../../../../../lib/string/random'

const FAILED_DELETE_DATES : number[] = []
const getHandle = () => { return `sdk_unit_test_delete_dates_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}` }
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('ID Delete Date', () => {
  testWithIDData('ID SDK Delete Date', async ({ IDData }) => {
    const { tokenData } = IDData
    const payload: ProfileDatesAttributeInput = {
      name: 'ID SDK Delete Date',
      date: '2024-12-02',
      type: 'test',
      handle: getHandle(),
      is_recurring: true,
      recurring_schedule: 'Yearly',
      note: 'test notes for id delete',
      relationship: 'Me',
      description: 'test description for id delete'
    }

    const response = await simpleOmneoRequest('PUT', `/profiles/${testProfileID}`, {
      dates_attributes: [payload]
    })

    const profileDates: ProfileDatesAttribute[] = response.data.attributes.dates
    const profileFilterDates = profileDates.filter(d => d.handle === payload.handle)
    const deleteDateId = profileFilterDates[0].id as number

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })
    const dates: ProfileDatesAttribute[] = await IDClient.profile.attributes.dates.list()
    const filterDates = dates.filter(d => d.handle === payload.handle)
    expect(filterDates.length).toBeGreaterThan(0)

    const deleteDates: ProfileDatesAttribute[] = await IDClient.profile.attributes.dates.delete(deleteDateId).catch(() => {
      FAILED_DELETE_DATES.push(deleteDateId)
      throw new Error('ID Failed to delete Profile Date')
    })
    const filterDeleteDates = deleteDates.filter(d => d.handle === payload.handle)
    expect(filterDeleteDates.length).toBe(0)
  })
})

afterAll(async () => {
  if (FAILED_DELETE_DATES.length > 0) {
    for (const handle of FAILED_DELETE_DATES) {
      console.log('ID Cleaning up Profile Date with ID', handle)
      const deleteResponse = await simpleOmneoRequest('DELETE', `profiles/${testProfileID}/attributes/dates/${handle}`)
      if (deleteResponse.status === 204) {
        console.log(`ID Profile Date ID ${handle} deleted`)
      }
    }
  }
})
