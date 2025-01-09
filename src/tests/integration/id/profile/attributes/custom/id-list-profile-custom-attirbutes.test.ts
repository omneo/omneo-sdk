import { describe } from 'vitest'
// import { ID } from '../../../../../../id'
// import simpleOmneoRequest from '../../../../../lib/simple-omneo-request'
// import { CustomAttribute } from '../../../../../../types'
import { testWithIDData } from '../../../test-with-id-data'

// const CREATED_ATTRIBUTES_HANDLES : string[] = []
// const getNamespace = () => { return 'sdk_unit_test_id_namespace_test2' }
// const getHandle = () => { return 'sdk_unit_test_id_handle_test2' }
// const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('ID Profile Get Custom Attributes', () => {
  testWithIDData('ID SDK Get custom attributes', async ({ IDData }) => {
    // const { tokenData } = IDData
    // const payload: CustomAttribute = {
    //   namespace: getNamespace(),
    //   handle: getHandle(),
    //   type: 'string',
    //   value: 'ID SDK Profile custom attribute test value'
    // }

    // const response = await simpleOmneoRequest('PUT', `/profiles/${testProfileID}/attributes/custom/${payload.namespace}:${payload.handle}`, {
    //   type: payload.type,
    //   value: payload.value
    // })
    // CREATED_ATTRIBUTES_HANDLES.push(response.data.id as string)

    // const IDClient = new ID({
    //   tenant: process.env.OMNEO_TENANT as string,
    //   IDToken: tokenData.token,
    //   omneoAPIToken: process.env.OMNEO_TOKEN as string
    // })

    // const customAttributes: CustomAttribute[] = await IDClient.profile.attributes.custom.list()
    // const filterAttributes = customAttributes.filter(d => d.handle === payload.handle)
    // expect(filterAttributes.length).toBeGreaterThan(0)
    // const targetAttribute = filterAttributes[0]

    // expect(targetAttribute.profile_id).toBe(testProfileID)
    // expect(targetAttribute.handle).toBe(payload.handle)
    // expect(targetAttribute.namespace).toBe(payload.namespace)
    // expect(targetAttribute.type).toBe(payload.type)
    // expect(targetAttribute.value).toBe(payload.value)
  })
})

// afterAll(async () => {
//   if (CREATED_ATTRIBUTES_HANDLES.length > 0) {
//     for (const handle of CREATED_ATTRIBUTES_HANDLES) {
//       console.log('TODO Cleaning up SDK Profile Custom attributes with ID', testProfileID, handle)
//     }
//   }
// })
