import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { ListDefinition } from '@types'
import { simpleOmneoRequest, getRandomString } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const FAILED_DELETE_LIST_DEFINITION_IDS: number[] = []

describe('Delete List Definition', () => {
  test('SDK Delete List Definition', async () => {
    const payload = {
      name: getRandomString('sdk_unit_test_delete_list_definition'),
      handle: getRandomString('sdk_unit_test_delete_list_definition'),
      type: 'gift_registry',
      is_published: true,
      short_description: getRandomString('sdk_unit_test_delete_short_desc'),
      description: getRandomString('sdk_unit_test_delete_long_desc'),
      allow_quantity: true,
      allow_reserve: true,
      allow_custom_product: true,
      is_active: true
    }
    const response = await simpleOmneoRequest('POST', '/lists/definitions', payload)
    const listDefinitionsRes: ListDefinition = await omneoClient.listDefinitions.get(response.data.id)
    expect(listDefinitionsRes).toBeDefined()
    expect(listDefinitionsRes.handle).toBe(payload.handle)

    await omneoClient.listDefinitions.delete(response.data.id).catch((err) => {
      console.error(`SDK List definition delete failed with id:${response.data.id}`, err)
      FAILED_DELETE_LIST_DEFINITION_IDS.push(response.data.id)
      throw new Error(`SDK List definition delete failed with id:${response.data.id}`)
    })

    const listDefinitionsResponse = await simpleOmneoRequest('GET', `/lists/definitions/${response.data.id}`)
    expect(listDefinitionsResponse).toEqual(expect.objectContaining({ status: 404, statusText: 'Not Found' }))
  })
})

afterAll(async () => {
  if (FAILED_DELETE_LIST_DEFINITION_IDS.length > 0) {
    for (const id of FAILED_DELETE_LIST_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/lists/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK List Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete List Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
