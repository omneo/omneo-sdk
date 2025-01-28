import { describe, test, expect, afterAll } from 'vitest'
import { Omneo } from '../../../../../../omneo'
import simpleOmneoRequest from '../../../../../lib/simple-omneo-request'
import { CustomAttribute } from '../../../../../../types'
import { getRandomString } from '../../../../../lib/string/util'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
let namespace = ''
let handle = ''
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Profile Custom Attributes list', () => {
  test('SDK Get custom attributes', async () => {
    namespace = getRandomString('sdk_unit_test_namespace_test1')
    handle = getRandomString('sdk_unit_test_handle_test1')
    const payload: CustomAttribute = {
      namespace,
      handle,
      type: 'string',
      value: 'Omneo Sdk Profile custom attribute for List'
    }

    await simpleOmneoRequest('PUT', `/profiles/${testProfileID}/attributes/custom/${payload.namespace}:${payload.handle}`, {
      type: payload.type,
      value: payload.value
    })

    const customAttributes: CustomAttribute[] = await omneo.profiles.attributes.custom.list(testProfileID)
    const filterAttributes = customAttributes.filter(d => d.handle === payload.handle)
    expect(filterAttributes.length).toBeGreaterThan(0)

    const targetAttribute = filterAttributes[0]
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
      console.log(`SDK Profile Attributes Namespace:Handle ${namespace}:${handle} deleted`)
    } else {
      console.log(`Failed to delete Profile Attributes Namespace:Handle ${namespace}:${handle}`, deleteResponse)
    }
    namespace = ''
    handle = ''
  }
})
