import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { PointDefinitionResponse } from '@types'
import { simpleOmneoRequest, getRandomString } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_POINT_DEFINITION_IDS: number[] = []

describe('List Point Definitions', () => {
  test('SDK List Point Definitions', async () => {
    const payload = {
      name: getRandomString('sdk_unit_test_list_point_definition'),
      handle: getRandomString('sdk_unit_test_list_point_definition')
    }
    const created = await simpleOmneoRequest('POST', '/points/definitions', payload)
    CREATED_POINT_DEFINITION_IDS.push(created.data.id)

    const params = {
      handle: payload.handle
    }
    const response: PointDefinitionResponse = await omneoClient.pointDefinitions.list(params).catch((err) => {
      console.error('SDK List Point Definitions failed:', err)
      throw new Error('SDK List Point Definitions failed')
    })

    expect(response).toBeDefined()
    expect(response.data).toBeDefined()
    expect(Array.isArray(response.data)).toBe(true)
    const found = response.data.find((d) => d.id === created.data.id)
    expect(found).toBeDefined()
    expect(found?.name).toBe(payload.name)
    expect(found?.handle).toBe(payload.handle)
  })
})

afterAll(async () => {
  for (const id of CREATED_POINT_DEFINITION_IDS) {
    const response = await simpleOmneoRequest('DELETE', `/points/definitions/${id}`)
    if (response.status === 204) {
      console.log(`SDK Point Definition ID ${id} deleted`)
    } else {
      console.log(`Failed to delete Point Definition ID ${id}`, response)
    }
  }
})
