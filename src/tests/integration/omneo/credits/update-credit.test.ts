import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { simpleOmneoRequest, getRandomString } from '@lib'
import { getRandomDigitString } from '@/tests/lib/string/util'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
const CREATED_CREDIT_DEFINITION_IDS: number[] = []
const CREATED_CREDIT_IDS: number[] = []

describe('Update Credit', () => {
  test('SDK Update Credit', async () => {
    const payload = {
      name: getRandomString('sdk_name_for_update_credit'),
      handle: getRandomString('sdk_handle_for_update_credit'),
      is_published: true,
      is_extendable: true,
      is_assignable: true,
      is_releasable: true,
      type: 'gift_card',
      value: 100
    }
    const response = await simpleOmneoRequest('POST', '/credits/definitions', payload)
    CREATED_CREDIT_DEFINITION_IDS.push(response.data.id)

    const payload2 = {
      credit_definition_id: response.data.id,
      credit_definition_handle: payload.handle,
      profile_id: testProfileID,
      creator_profile_id: testProfileID,
      staff_id: testProfileID,
      name: getRandomString('sdk_name_for_update_credit'),
      timezone: 'Australia/Melbourne',
      issued_at: '2028-01-14 07:39:51',
      expires_at: '2028-01-14 15:56:02',
      released_at: '2028-01-14 13:00:00',
      recipient_first_name: 'example',
      recipient_email: 'example@arkade.com.au',
      message: getRandomString('sdk_message_for_update_credit'),
      value_initial: 100,
      credit_number: getRandomDigitString(10),
      security_code: '1113'
    }
    const response2 = await simpleOmneoRequest('POST', '/credits', payload2)
    CREATED_CREDIT_IDS.push(response2.data.id)

    const payload3 = {
      issued_at: '2028-01-15 07:39:51',
      expires_at: '2028-01-15 15:56:02',
      released_at: '2028-01-15 13:00:00',
      recipient_first_name: 'example2',
      recipient_email: 'example2@arkade.com.au',
      message: getRandomString('sdk_message_for_update_credit_updated'),
      value_initial: 150,
      credit_number: getRandomDigitString(10),
      security_code: '1114'
    }
    const updatedCredit = await omneoClient.credits.update(response2.data.id, payload3)
    expect(updatedCredit).toBeDefined()
    expect(updatedCredit!.credit_definition_id).toBe(payload2.credit_definition_id)
    expect(updatedCredit!.profile_id).toBe(payload2.profile_id)
    expect(updatedCredit!.creator_profile_id).toBe(payload2.creator_profile_id)
    expect(updatedCredit!.staff_id).toBe(payload2.staff_id)
    expect(updatedCredit!.timezone).toBe(payload2.timezone)
    expect(updatedCredit!.name).toBe(payload2.name)

    expect(updatedCredit!.recipient_first_name).toBe(payload3.recipient_first_name)
    expect(updatedCredit!.recipient_email).toBe(payload3.recipient_email)
    expect(updatedCredit!.message).toBe(payload3.message)
    expect(updatedCredit!.value_initial).toBe(payload3.value_initial)
    expect(updatedCredit!.credit_number).toBe(payload3.credit_number)
    expect(updatedCredit!.security_code).toBe(payload3.security_code)
  })
})

afterAll(async () => {
  if (CREATED_CREDIT_IDS.length > 0) {
    for (const id of CREATED_CREDIT_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/credits/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Update Credit ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Credit ID ${id}`, deleteResponse)
      }
    }
  }
  if (CREATED_CREDIT_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_CREDIT_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/credits/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Update Credit Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Credit Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
