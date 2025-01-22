import { describe, test, expect, afterAll } from 'vitest'
import { Omneo } from '../../../../../../omneo'
import simpleOmneoRequest from '../../../../../lib/simple-omneo-request'
import { CustomAttribute } from '../../../../../../types'
import { getRandomString } from './util'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
let namespace = ''
let handle = ''
const FAILED_DELETE_CUSTOM_ATTRIBUTES_IDS : number[] = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Profile Delete Custom Attribute', () => {
  test('SDK Delete custom attribute', async () => {
    namespace = getRandomString('sdk_unit_test_namespace_test1')
    handle = getRandomString('sdk_unit_test_handle_test1')
    const payload: CustomAttribute = {
      namespace,
      handle,
      type: 'string',
      value: 'Omneo Sdk Profile custom attribute test value'
    }
    const response = await simpleOmneoRequest('PUT', `/profiles/${testProfileID}/attributes/custom/${payload.namespace}:${payload.handle}`, {
      type: payload.type,
      value: payload.value
    })

    await omneo.profiles.attributes.custom.delete(testProfileID, payload.namespace, payload.handle).catch((err) => {
      console.error(`SDK Profile Attirbute delete failed with Namespace:handle ${namespace}:${handle}`, err)
      FAILED_DELETE_CUSTOM_ATTRIBUTES_IDS.push(response.data.id)
      throw new Error(`SDK Profile Attirbute delete failed with Namespace:handle:${namespace}:${handle}`)
    })

    const getResponse = await simpleOmneoRequest('GET', `/profiles/${testProfileID}/attributes/custom/${payload.namespace}:${payload.handle}`)
    expect(getResponse).toEqual(expect.objectContaining({ status: 404, statusText: 'Not Found' }))
  })
})

afterAll(async () => {
  if (namespace && handle && FAILED_DELETE_CUSTOM_ATTRIBUTES_IDS.length > 0) {
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
