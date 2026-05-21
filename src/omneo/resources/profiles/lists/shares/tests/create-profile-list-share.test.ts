import { describe, expect, test, beforeAll, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { ListDefinition, ProductList } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_LIST_DEFINITION_IDS: number[] = []
const CREATED_LIST_IDS: number[] = []
const CREATED_LIST_SHARE_IDS: any[] = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

beforeAll(() => {
  process.env.TZ = 'Australia/Melbourne'
})
describe('Create Profile List Share', () => {
  test('SDK Create Profile List Share', async () => {
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
    const response2: { data: ProductList } = await simpleOmneoRequest('POST', `/profiles/${testProfileID}/lists`, payload2)
    CREATED_LIST_IDS.push(response2.data.id)
    const listId = response2.data.id

    const listShare = await omneoClient.profiles.lists.shares.create(testProfileID, listId).catch((err: any) => {
      console.error('SDK Create profile list share failed:', err)
      throw new Error('SDK Create profile list share failed')
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
      console.log('Cleaning up SDK List Share with ID', listShareId)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/lists/${listId}/shares/${listShareId}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK List Share ID ${listShareId} deleted`)
      } else {
        console.log(`Failed to delete List Share ID ${listShareId}`, deleteResponse)
      }
    }
  }
  if (CREATED_LIST_IDS.length > 0) {
    for (const id of CREATED_LIST_IDS) {
      console.log('Cleaning up SDK List with ID', id)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/lists/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK List ID ${id} deleted`)
      } else {
        console.log(`Failed to delete List ID ${id}`, deleteResponse)
      }
    }
  }
  if (CREATED_LIST_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_LIST_DEFINITION_IDS) {
      console.log('Cleaning up SDK List Definition with ID', id)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/lists/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK List Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete List Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
