import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { ListDefinition, List } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_LIST_DEFINITION_IDS: number[] = []
const CREATED_LIST_IDS: number[] = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Get List', () => {
  test('SDK Get List', async () => {
    // Create List Definition
    const payload = {
      name: getRandomString('sdk_list_definition_for_get_list'),
      handle: getRandomString('sdk_list_definition_for_get_list'),
      type: 'gift_registry',
      is_published: true,
      allow_quantity: true,
      allow_custom_product: true
    }
    const response: { data: ListDefinition } = await simpleOmneoRequest('POST', '/lists/definitions', payload)
    const listDefinitionId = response.data.id
    CREATED_LIST_DEFINITION_IDS.push(listDefinitionId)

    // Create List
    const payload2 = {
      list_definition_id: listDefinitionId,
      name: getRandomString('sdk_list_name_for_get_list')
    }
    const response2: { data: List } = await simpleOmneoRequest('POST', `/profiles/${testProfileID}/lists`, payload2)
    const listId = response2.data.id
    CREATED_LIST_IDS.push(listId)

    const list = await omneoClient.lists.get(listId).catch((err: any) => {
      console.error('SDK Get List failed:', err)
      throw new Error('SDK Get List failed')
    })

    expect(list).toBeDefined()
    expect(list.id).toBe(listId)
    expect(list.name).toBe(payload2.name)
    expect(list.definition?.id).toBe(listDefinitionId)
  })
})

afterAll(async () => {
  for (const listId of CREATED_LIST_IDS) {
    const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/lists/${listId}`)
    if (deleteResponse?.status === 204) {
      console.log(`SDK List ID ${listId} deleted`)
    } else {
      console.log(`Failed to delete List ID ${listId}`, deleteResponse)
    }
  }
  for (const id of CREATED_LIST_DEFINITION_IDS) {
    const deleteResponse = await simpleOmneoRequest('DELETE', `/lists/definitions/${id}`)
    if (deleteResponse?.status === 204) {
      console.log(`SDK List Definition ID ${id} deleted`)
    } else {
      console.log(`Failed to delete List Definition ID ${id}`, deleteResponse)
    }
  }
})
