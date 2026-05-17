import { describe, expect, beforeAll, afterAll } from 'vitest'
import { ListDefinition, List } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'
import { ID } from '@id'
import { testWithIDData } from '@id-tests/test-with-id-data'

const CREATED_LIST_DEFINITION_IDS: number[] = []
const CREATED_LIST_IDS: number[] = []
const CREATED_LIST_CUSTOM_FIELDS: any[] = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

beforeAll(() => {
  process.env.TZ = 'Australia/Melbourne'
})
describe('ID Create Profile List Custom Fields', () => {
  testWithIDData('ID SDK Create Profile List Custom Fields', async ({ IDData }) => {
    const { tokenData } = IDData
    // Create List Definition
    const payload = {
      name: getRandomString('id_sdk_unit_test_list_definition'),
      handle: getRandomString('id_sdk_unit_test_list_definition'),
      type: 'gift_registry',
      is_published: true
    }
    const response: { data: ListDefinition } = await simpleOmneoRequest('POST', '/lists/definitions', payload)
    const listDefinitionId = response.data.id
    CREATED_LIST_DEFINITION_IDS.push(listDefinitionId)

    // Create List
    const payload2 = {
      list_definition_id: listDefinitionId,
      name: getRandomString('sdk_unit_test_list_name')
    }
    const response2: {data: List } = await simpleOmneoRequest('POST', `/profiles/${testProfileID}/lists`, payload2)
    const listId = response2.data.id
    CREATED_LIST_IDS.push(listId)

    // Create List Custom Field
    const payload3 = {
      namespace: getRandomString('sdk_unit_test_custom_field_namespace'),
      name: getRandomString('sdk_unit_test_custom_field_name'),
      value: getRandomString('sdk_unit_test_custom_field_value'),
      handle: getRandomString('sdk_unit_test_custom_field_handle'),
      type: 'string'
    }
    CREATED_LIST_CUSTOM_FIELDS.push({
      listId,
      namespace: payload3.namespace,
      handle: payload3.handle
    })
    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })
    const listCustomField = await IDClient.profile.lists.customFields.create(listId, payload3).catch((err: any) => {
      console.error('ID SDK Create profile list custom fields failed:', err)
      throw new Error('ID SDK Create profile list custom fields failed')
    })
    expect(listCustomField).toBeDefined()
    const targetCustomField = listCustomField
    expect(targetCustomField).toBeDefined()
    expect(targetCustomField!.name).toBe(payload3.name)
    expect(targetCustomField!.namespace).toBe(payload3.namespace)
    expect(targetCustomField!.handle).toBe(payload3.handle)
    expect(targetCustomField!.value).toBe(payload3.value)
    expect(targetCustomField!.type).toBe(payload3.type)
  })
})

afterAll(async () => {
  if (CREATED_LIST_CUSTOM_FIELDS.length > 0) {
    for (const { namespace, handle, listId } of CREATED_LIST_CUSTOM_FIELDS) {
      console.log('Cleaning up ID SDK List Custom Field with namespace, handle', namespace, handle, listId)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/lists/${listId}/custom-fields/${namespace}:${handle}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK List Custom Field with namespace ${namespace} and handle ${handle} deleted`)
      } else {
        console.log(`Failed to delete List Custom Field with namespace ${namespace} and handle ${handle}`, deleteResponse)
      }
    }
  }
  if (CREATED_LIST_IDS.length > 0) {
    for (const id of CREATED_LIST_IDS) {
      console.log('Cleaning up ID SDK List with ID', id)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/lists/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK List ID ${id} deleted`)
      } else {
        console.log(`Failed to delete List ID ${id}`, deleteResponse)
      }
    }
  }
  if (CREATED_LIST_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_LIST_DEFINITION_IDS) {
      console.log('Cleaning up ID SDK List Definition with ID', id)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/lists/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK List Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete List Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
