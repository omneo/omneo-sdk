import { describe, expect, afterAll } from 'vitest'
import { ID } from '../../../../../../id'
import simpleOmneoRequest from '../../../../../lib/simple-omneo-request'
import { CustomAttribute } from '../../../../../../types'
import { testWithIDData } from '../../../test-with-id-data'
import { getRandomString } from '../../../../../lib/string/util'

let namespace = ''
let handle = ''
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
const FAILED_DELETE_CUSTOM_ATTRIBUTES_IDS : number[] = []

describe('ID Profile Get Custom Attribute', () => {
  testWithIDData('ID SDK Get custom attribute', async ({ IDData }) => {
    const { tokenData } = IDData
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

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    await IDClient.profile.attributes.custom.delete(payload.namespace, payload.handle).catch((err) => {
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
      console.log(`SDK ID Profile Attributes Namespace:Handle ${namespace}:${handle} deleted`)
    } else {
      console.log(`Failed to delete Profile Attributes Namespace:Handle ${namespace}:${handle}`, deleteResponse)
    }
    namespace = ''
    handle = ''
  }
})
