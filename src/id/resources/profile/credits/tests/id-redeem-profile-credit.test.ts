import { describe, expect, afterAll } from 'vitest'
import { Redemption } from '@types'
import { simpleOmneoRequest, getRandomString } from '@lib'
import { getRandomDigitString } from '@/tests/lib/string/util'
import { ID } from '@id'
import { testWithIDData } from '@id-tests/test-with-id-data'

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
const CREATED_CREDIT_DEFINITION_IDS: number[] = []
const CREATED_CREDIT_IDS: number[] = []

describe('Redeem Profile Credit', () => {
  testWithIDData('ID SDK Redeem Profile Credit', async ({ IDData }) => {
    const { tokenData } = IDData
    const payload = {
      name: getRandomString('sdk_name_for_id_profile_redeem_credit'),
      handle: getRandomString('sdk_handle_for_id_profile_redeem_credit'),
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
      name: getRandomString('sdk_name_for_id_profile_redeem_credit'),
      timezone: 'Australia/Melbourne',
      issued_at: '2028-01-14 07:39:51',
      expires_at: '2028-01-14 15:56:02',
      released_at: '2028-01-14 13:00:00',
      recipient_first_name: 'example',
      recipient_email: 'example@arkade.com.au',
      message: getRandomString('sdk_message_for_id_profile_redeem_credit'),
      value_initial: 100,
      credit_number: getRandomDigitString(10),
      security_code: '1113'
    }
    const response2 = await simpleOmneoRequest('POST', '/credits', payload2)
    CREATED_CREDIT_IDS.push(response2.data.id)

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const creditId = response2.data.id.toString()
    const payload3 = {
      amount: payload2.value_initial,
      security_code: payload2.security_code
    }
    const redemption: Redemption = await IDClient.profile.credits.redeem(creditId, payload3).catch((error) => {
      console.error('Error redeeming profile credit via ID SDK:', error)
      throw error
    })
    expect(redemption).toBeDefined()
    expect(redemption.type).toBe('redeem')
    expect(redemption.total).toBe(payload3.amount)
    expect(redemption.items.length).toBeGreaterThan(0)
    expect(redemption.items[0].type).toBe('credit')
    expect(redemption.items[0].type_attributes!.id).toBe(response2.data.id)
    expect((redemption.items[0].type_attributes as any)!.credit_definition_id).toBe(response.data.id)
    expect(redemption.items[0].type_attributes!.profile_id).toBe(testProfileID)
  })
})

afterAll(async () => {
  if (CREATED_CREDIT_IDS.length > 0) {
    for (const id of CREATED_CREDIT_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/credits/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK Redeem Profile Credit, Credit ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Credit ID ${id}`, deleteResponse)
      }
    }
  }
  if (CREATED_CREDIT_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_CREDIT_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/credits/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK Redeem Profile Credit, Credit Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Credit Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
