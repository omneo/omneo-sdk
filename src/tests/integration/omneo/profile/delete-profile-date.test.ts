import { describe, expect, test } from 'vitest'
import { Omneo } from '../../../../omneo'
import { ProfileDatesAttribute } from '../../../../types'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import randomString from '../../../lib/string/random'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

const getHandle = () => { return `sdk_unit_test_dates_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}` }
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Profile Date Delete', () => {
  test('SDK delete profile date', async () => {
    const payload: ProfileDatesAttribute = {
      name: 'Wedding',
      date: '2024-12-02',
      handle: getHandle(),
      is_recurring: true,
      recurring_schedule: 'Yearly',
      note: 'test notes for omneo delete',
      relationship: 'Me',
      description: 'test description for delete'
    }

    await simpleOmneoRequest('PUT', `/profiles/${testProfileID}`, {
      dates_attributes: [payload]
    })

    const dates: Array<ProfileDatesAttribute> = await omneo.profiles.getProfileDates(testProfileID)
    const filterDates = dates.filter(d => d.handle === payload.handle)
    expect(filterDates.length).toBeGreaterThan(0)

    const targetDate = filterDates[0]
    const deleteDates: Array<ProfileDatesAttribute> = await omneo.profiles.deleteProfileDate(testProfileID, targetDate.id as string)
    const filterDeleteDates = deleteDates.filter(d => d.handle === payload.handle)
    expect(filterDeleteDates.length).toBe(0)
  })
})
