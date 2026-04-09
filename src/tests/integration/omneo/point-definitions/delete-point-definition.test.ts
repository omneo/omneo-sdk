import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { simpleOmneoRequest, getRandomString } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const FAILED_DELETE_POINT_DEFINITION_IDS: number[] = []

describe('Delete Point Definition', () => {
  test('SDK Delete Point Definition', async () => {
    const payload = {
      name: getRandomString('sdk_unit_test_delete_point_definition'),
      handle: getRandomString('sdk_unit_test_delete_point_definition')
    }
    const created = await simpleOmneoRequest('POST', '/points/definitions', payload)
    const id: number = created.data.id

    await omneoClient.pointDefinitions.delete(id).catch((err) => {
      console.error(`SDK Delete Point Definition failed for ID ${id}:`, err)
      FAILED_DELETE_POINT_DEFINITION_IDS.push(id)
      throw new Error(`SDK Delete Point Definition failed for ID ${id}`)
    })

    const fetchResponse = await simpleOmneoRequest('GET', `/points/definitions/${id}`)
    expect(fetchResponse).toEqual(expect.objectContaining({ status: 404, statusText: 'Not Found' }))
  })
})

afterAll(async () => {
  for (const id of FAILED_DELETE_POINT_DEFINITION_IDS) {
    const response = await simpleOmneoRequest('DELETE', `/points/definitions/${id}`)
    if (response.status === 204) {
      console.log(`SDK Point Definition ID ${id} deleted`)
    } else {
      console.log(`Failed to delete Point Definition ID ${id}`, response)
    }
  }
})
