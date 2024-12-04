import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../../omneo'
import simpleOmneoRequest from '../../../../lib/simple-omneo-request'
import { CustomAttribute } from '../../../../../types'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_ATTRIBUTES_HANDLES : string[] = []
const getNamespace = () => { return 'sdk_unit_test_namespace_test1' }
const getHandle = () => { return 'sdk_unit_test_handle_test1' }
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Profile Get Custom Attribute', () => {
  test('SDK Get custom attribute', async () => {
    const payload: CustomAttribute = {
      namespace: getNamespace(),
      handle: getHandle(),
      type: 'string',
      value: 'Omneo Sdk Profile custom attribute test value'
    }

    const response = await simpleOmneoRequest('PUT', `/profiles/${testProfileID}/attributes/custom/${payload.namespace}:${payload.handle}`, {
      type: payload.type,
      value: payload.value
    })
    CREATED_ATTRIBUTES_HANDLES.push(response.data.id as string)

    const targetAttribute: CustomAttribute = await omneo.profiles.getCustomAttribute(testProfileID, payload.namespace, payload.handle)
    expect(targetAttribute.profile_id).toBe(testProfileID)
    expect(targetAttribute.handle).toBe(payload.handle)
    expect(targetAttribute.namespace).toBe(payload.namespace)
    expect(targetAttribute.type).toBe(payload.type)
    expect(targetAttribute.value).toBe(payload.value)
  })
})

afterAll(async () => {
  if (CREATED_ATTRIBUTES_HANDLES.length > 0) {
    for (const handle of CREATED_ATTRIBUTES_HANDLES) {
      console.log('TODO Cleaning up SDK Profile Custom attributes with ID', testProfileID, handle)
    }
  }
})
