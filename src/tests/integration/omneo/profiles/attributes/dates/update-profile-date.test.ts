import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../../../omneo'
import { ProfileDatesAttribute, ProfileDatesAttributeInput } from '../../../../../../types'
import simpleOmneoRequest from '../../../../../lib/simple-omneo-request'
import { getRandomString } from '../../../../../lib/string/util'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

const CREATED_DATES_IDS : number[] = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Profile Date Update', () => {
  test('SDK Update Date', async () => {
    const dateHandle = getRandomString('sdk_unit_test_dates_handle')
    const dateRelationship = getRandomString('sdk_unit_test_dates_relationship')
    const payload: ProfileDatesAttributeInput = {
      name: 'Omneo SDK Original Date',
      date: new Date().toISOString().replace('T', ' ').slice(0, 10),
      type: 'test',
      handle: dateHandle,
      relationship: dateRelationship,
      is_recurring: true,
      recurring_schedule: 'Yearly',
      note: 'test notes for omneo original',
      description: 'test description for original'
    }

    const response = await simpleOmneoRequest('PUT', `/profiles/${testProfileID}`, {
      dates_attributes: [payload]
    })
    const profileDates: ProfileDatesAttribute[] = response.data.attributes.dates
    const profileFilterDates = profileDates.filter(d => d.handle === payload.handle && d.relationship === payload.relationship)
    const createdDateId = profileFilterDates[0].id as number
    CREATED_DATES_IDS.push(createdDateId)

    const updatedPayload: ProfileDatesAttributeInput = {
      name: 'Omneo SDK Update Date',
      date: new Date().toISOString().replace('T', ' ').slice(0, 10),
      type: 'test',
      handle: dateHandle,
      relationship: dateRelationship,
      is_recurring: true,
      recurring_schedule: 'Yearly',
      note: 'test notes for omneo update',
      description: 'test description for update'
    }
    const updatedDate: ProfileDatesAttribute = await omneo.profiles.attributes.dates.update(testProfileID, updatedPayload)
    expect(updatedDate.name).toBe(updatedPayload.name)
    expect(updatedDate.note).toBe(updatedPayload.note)
    // expect(updatedDate.description).toBe(updatedPayload.description)
  })
})

afterAll(async () => {
  if (CREATED_DATES_IDS.length > 0) {
    for (const id of CREATED_DATES_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `profiles/${testProfileID}/attributes/dates/${id}`)
      if (deleteResponse.status === 200) {
        console.log(`Omneo Profile Date ID ${id} deleted`)
      }
    }
  }
})
