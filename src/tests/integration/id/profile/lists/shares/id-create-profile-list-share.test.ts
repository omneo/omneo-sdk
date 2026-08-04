import { describe, expect, beforeAll, afterAll } from 'vitest'
import { ListDefinition, List } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'
import { ID } from '@id'
import { testWithIDData } from '../../../test-with-id-data'

const CREATED_LIST_DEFINITION_IDS: number[] = []
const CREATED_LIST_IDS: number[] = []
const CREATED_LIST_SHARE_IDS: any[] = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

beforeAll(() => {
  process.env.TZ = 'Australia/Melbourne'
})
describe('ID Create Profile List Share', () => {
  testWithIDData('ID SDK Create Profile List Share', async ({ IDData }) => {
    const { tokenData } = IDData
    // Create List Definition
    const payload = {
      name: getRandomString('sdk_unit_test_list_definition'),
      handle: getRandomString('sdk_unit_test_list_definition'),
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
    const response2: { data: List } = await simpleOmneoRequest('POST', `/profiles/${testProfileID}/lists`, payload2)
    CREATED_LIST_IDS.push(response2.data.id)
    const listId = response2.data.id

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })
    const listShare = await IDClient.profile.lists.shares.create(listId).catch((err: any) => {
      console.error('ID SDK Create profile list share failed:', err)
      throw new Error('ID SDK Create profile list share failed')
    })
    CREATED_LIST_SHARE_IDS.push({
      listId,
      listShareId: listShare.id
    })
    expect(listShare).toBeDefined()
    expect(listShare.product_list_id).toBe(listId)
    expect(listShare.profile_id).toBe(testProfileID)
  })
})

afterAll(async () => {
  if (CREATED_LIST_SHARE_IDS.length > 0) {
    for (const { listId, listShareId } of CREATED_LIST_SHARE_IDS) {
      console.log('Cleaning up ID SDK List Share with ID', listShareId)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/lists/${listId}/shares/${listShareId}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK List Share ID ${listShareId} deleted`)
      } else {
        console.log(`Failed to delete List Share ID ${listShareId}`, deleteResponse)
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
