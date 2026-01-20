import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { Credit } from '@types'
import { simpleOmneoRequest, getRandomString } from '@lib'
import { getRandomDigitString } from '@/tests/lib/string/util'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
const CREATED_CREDIT_DEFINITION_IDS: number[] = []
const CREATED_CREDIT_IDS: number[] = []

describe('Get Credit', () => {
  test('SDK Get Credit', async () => {
    const payload = {
      name: getRandomString('sdk_name_for_get_credit'),
      handle: getRandomString('sdk_handle_for_get_credit'),
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
      name: getRandomString('sdk_name_for_get_credit'),
      timezone: 'Australia/Melbourne',
      issued_at: '2028-01-14 07:39:51',
      expires_at: '2028-01-14 15:56:02',
      released_at: '2028-01-14 13:00:00',
      recipient_first_name: 'example',
      recipient_email: 'example@arkade.com.au',
      message: getRandomString('sdk_message_for_get_credit'),
      value_initial: 100,
      credit_number: getRandomDigitString(10),
      security_code: '1113'
    }
    const response2 = await simpleOmneoRequest('POST', '/credits', payload2)
    CREATED_CREDIT_IDS.push(response2.data.id)

    const creditRes: Credit = await omneoClient.credits.get(response2.data.id)
    expect(creditRes).toBeDefined()
    expect(creditRes.credit_definition_id).toBe(payload2.credit_definition_id)
    expect(creditRes.profile_id).toBe(payload2.profile_id)
    expect(creditRes.creator_profile_id).toBe(payload2.creator_profile_id)
    expect(creditRes.staff_id).toBe(payload2.staff_id)
    expect(creditRes.name).toBe(payload2.name)
    expect(creditRes.timezone).toBe(payload2.timezone)
    expect(creditRes.recipient_first_name).toBe(payload2.recipient_first_name)
    expect(creditRes.recipient_email).toBe(payload2.recipient_email)
    expect(creditRes.message).toBe(payload2.message)
    expect(creditRes.value_initial).toBe(payload2.value_initial)
    expect(creditRes.credit_number).toBe(payload2.credit_number)
    expect(creditRes.security_code).toBe(payload2.security_code)
  })
})

afterAll(async () => {
  if (CREATED_CREDIT_IDS.length > 0) {
    for (const id of CREATED_CREDIT_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/credits/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Get Credit ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Credit ID ${id}`, deleteResponse)
      }
    }
  }
  if (CREATED_CREDIT_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_CREDIT_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/credits/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Get Credit Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Credit Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
