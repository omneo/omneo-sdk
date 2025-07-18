import { describe, test, expect, afterAll } from 'vitest'
import { Omneo } from '../../../../../../omneo'
import simpleOmneoRequest from '../../../../../lib/simple-omneo-request'
import { CustomAttribute, ProfileResponse, Profile } from '../../../../../../types'
import { getRandomString } from '../../../../../lib/string/util'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
let namespace = ''
let handle = ''
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Profile Find Profiles By Custom Attribute', () => {
  test('SDK Find Profiles by custom attribute', async () => {
    namespace = getRandomString('sdk_unit_test_find_custom_attribute_namespace')
    handle = getRandomString('sdk_unit_test_find_custom_attribute_handle')
    const attributeValue = getRandomString('sdk_unit_test_find_custom_attribute_value')
    const payload: CustomAttribute = {
      namespace,
      handle,
      type: 'string',
      value: attributeValue
    }

    await simpleOmneoRequest('PUT', `/profiles/${testProfileID}/attributes/custom/${payload.namespace}:${payload.handle}`, {
      type: payload.type,
      value: payload.value
    })

    const params = {
      'attributes[0][namespace]': payload.namespace,
      'attributes[0][handle]': payload.handle,
      'attributes[0][value][in]': attributeValue,
      'page[size]': 10,
      sort: '-created_at'
    }
    const { data, meta }: ProfileResponse = await omneoClient.profiles.attributes.custom.find(params)
    expect(data.length).toBe(1)
    expect(meta.total).toBe(1)
    const profile: Profile = data[0]
    const customAttributes = profile.custom_attributes
    expect(customAttributes[payload.namespace][payload.handle]).toBe(attributeValue)
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
