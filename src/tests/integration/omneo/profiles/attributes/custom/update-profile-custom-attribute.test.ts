import { describe, test, expect, afterAll } from 'vitest'
import { Omneo } from '../../../../../../omneo'
import simpleOmneoRequest from '../../../../../lib/simple-omneo-request'
import { getRandomString } from '../../../../../lib/string/util'
import { CustomAttribute } from '../../../../../../types'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
let namespace = ''
let handle = ''
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Profile Update Custom Attribute', () => {
  test('SDK Update custom attribute', async () => {
    namespace = getRandomString('sdk_unit_test_namespace_test1')
    handle = getRandomString('sdk_unit_test_handle_test1')
    const payload: CustomAttribute = {
      namespace,
      handle,
      type: 'string',
      value: 'Omneo Sdk Profile custom attribute for Update'
    }

    const testUpdatedValue = getRandomString('sdk_unit_test_value')
    await simpleOmneoRequest('PUT', `/profiles/${testProfileID}/attributes/custom/${payload.namespace}:${payload.handle}`, {
      type: payload.type,
      value: payload.value
    })

    const targetAttribute: CustomAttribute = await omneo.profiles.attributes.custom.update(testProfileID, payload.namespace, payload.handle, {
      type: payload.type,
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
      console.log(`SDK Profile Attributes Namespace:Handle ${namespace}:${handle} deleted`)
    } else {
      console.log(`Failed to delete Profile Attributes Namespace:Handle ${namespace}:${handle}`, deleteResponse)
    }
    namespace = ''
    handle = ''
  }
})
