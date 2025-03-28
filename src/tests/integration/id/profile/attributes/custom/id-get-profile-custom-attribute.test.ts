import { describe, expect, afterAll } from 'vitest'
import { ID } from '../../../../../../id'
import simpleOmneoRequest from '../../../../../lib/simple-omneo-request'
import { CustomAttribute } from '../../../../../../types'
import { testWithIDData } from '../../../test-with-id-data'
import { getRandomString } from '../../../../../lib/string/util'

let namespace = ''
let handle = ''
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('ID Profile Get Custom Attribute', () => {
  testWithIDData('ID SDK Get custom attribute', async ({ IDData }) => {
    const { tokenData } = IDData
    namespace = getRandomString('sdk_unit_test_get_id_custom_attribute_namespace')
    handle = getRandomString('sdk_unit_test_get_id_custom_attribute_handle')
    const payload: CustomAttribute = {
      namespace,
      handle,
      type: 'string',
      value: 'Omneo Sdk ID Profile custom attribute for Get'
    }

    await simpleOmneoRequest('PUT', `/profiles/${testProfileID}/attributes/custom/${payload.namespace}:${payload.handle}`, {
      type: payload.type,
      value: payload.value
    })

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const targetAttribute: CustomAttribute = await IDClient.profile.attributes.custom.get(payload.namespace, payload.handle)
    expect(targetAttribute.profile_id).toBe(testProfileID)
    expect(targetAttribute.handle).toBe(payload.handle)
    expect(targetAttribute.namespace).toBe(payload.namespace)
    expect(targetAttribute.type).toBe(payload.type)
    expect(targetAttribute.value).toBe(payload.value)
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
