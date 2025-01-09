import { describe } from 'vitest'
// import { ID } from '../../../../../../id'
// import simpleOmneoRequest from '../../../../../lib/simple-omneo-request'
// import { CustomAttribute } from '../../../../../../types'
import { testWithIDData } from '../../../test-with-id-data'
// import randomString from '../../../../../lib/string/random'

// const CREATED_ATTRIBUTES_HANDLES : string[] = []
// const getNamespace = () => { return 'sdk_unit_test_id_namespace_test3' }
// const getHandle = () => { return 'sdk_unit_test_id_handle_test3' }
// const getValue = () => { return `sdk_unit_test_id_value_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}` }
// const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('ID Profile Update Custom Attribute', () => {
  testWithIDData('ID SDK Update custom attribute', async ({ IDData }) => {
  //   const { tokenData } = IDData
  //   const payload: CustomAttribute = {
  //     namespace: getNamespace(),
  //     handle: getHandle(),
  //     type: 'string',
  //     value: 'Omneo Sdk Profile custom attribute test value'
  //   }
  //   const testUpdatedValue = getValue()
  //   const response = await simpleOmneoRequest('PUT', `/profiles/${testProfileID}/attributes/custom/${payload.namespace}:${payload.handle}`, {
  //     type: payload.type,
  //     value: payload.value
  //   })
  //   CREATED_ATTRIBUTES_HANDLES.push(response.data.id as string)
  //   const IDClient = new ID({
  //     tenant: process.env.OMNEO_TENANT as string,
  //     IDToken: tokenData.token,
  //     omneoAPIToken: process.env.OMNEO_TOKEN as string
  //   })

  //   const targetAttribute: CustomAttribute = await IDClient.profile.attributes.custom.update(payload.namespace, payload.handle, {
  //     type: payload.type,
  //     value: testUpdatedValue
  //   })
  //   expect(targetAttribute.profile_id).toBe(testProfileID)
  //   expect(targetAttribute.handle).toBe(payload.handle)
  //   expect(targetAttribute.namespace).toBe(payload.namespace)
  //   expect(targetAttribute.type).toBe(payload.type)
  //   expect(targetAttribute.value).toBe(testUpdatedValue)
  })
})

// afterAll(async () => {
//   if (CREATED_ATTRIBUTES_HANDLES.length > 0) {
//     for (const handle of CREATED_ATTRIBUTES_HANDLES) {
//       console.log('TODO Cleaning up SDK Profile Custom attributes with ID', testProfileID, handle)
//     }
//   }
// })
