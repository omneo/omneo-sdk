import { describe, expect, afterAll } from 'vitest'
import { ID } from '@id'
import { ProfileCustomAttribute } from '@types'
import { testWithIDData } from '@id-tests/test-with-id-data'
import { simpleOmneoRequest, getRandomString } from '@lib'

let namespace = ''
let handle = ''
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('ID Profile Update Custom Attribute', () => {
  testWithIDData('ID SDK Update custom attribute', async ({ IDData }) => {
    const { tokenData } = IDData
    namespace = getRandomString('sdk_unit_test_update_id_custom_attribute_namespace')
    handle = getRandomString('sdk_unit_test_update_id_custom_attribute_handle')
    const payload = {
      namespace,
      handle,
      type: 'string',
      value: 'Omneo Sdk ID Profile custom attribute for Update'
    }
    const testUpdatedValue = getRandomString('sdk_unit_id_value')
    await simpleOmneoRequest('PUT', `/profiles/${testProfileID}/attributes/custom/${payload.namespace}:${payload.handle}`, {
      type: payload.type as any,
      value: payload.value
    })
    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const targetAttribute: ProfileCustomAttribute = await IDClient.profile.attributes.custom.update(payload.namespace, payload.handle, {
      type: payload.type as any,
      value: testUpdatedValue
    })
    expect(targetAttribute.profile_id).toBe(testProfileID)
    expect(targetAttribute.handle).toBe(payload.handle)
    expect(targetAttribute.namespace).toBe(payload.namespace)
    expect(targetAttribute.type).toBe(payload.type)
    expect(targetAttribute.value).toBe(testUpdatedValue)
  })
})

afterAll(async () => {
  if (namespace && handle) {
    const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/attributes/custom/${namespace}:${handle}`)
    if (deleteResponse.status === 204) {
      console.log(`SDK ID Profile Attributes Namespace:Handle ${namespace}:${handle} deleted`)
    } else {
      console.log(`Failed to delete Profile Attributes Namespace:Handle ${namespace}:${handle}`, deleteResponse)
    }
    namespace = ''
    handle = ''
  }
})
