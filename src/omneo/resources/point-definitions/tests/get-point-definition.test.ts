import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { PointDefinition } from '@types'
import { simpleOmneoRequest, getRandomString } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_POINT_DEFINITION_IDS: number[] = []

describe('Get Point Definition', () => {
  test('SDK Get Point Definition', async () => {
    const payload = {
      name: getRandomString('sdk_unit_test_get_point_definition'),
      handle: getRandomString('sdk_unit_test_get_point_definition')
    }
    const created = await simpleOmneoRequest('POST', '/points/definitions', payload)
    CREATED_POINT_DEFINITION_IDS.push(created.data.id)

    const pointDefinition: PointDefinition = await omneoClient.pointDefinitions.get(created.data.id).catch((err) => {
      console.error('SDK Get Point Definition failed:', err)
      throw new Error('SDK Get Point Definition failed')
    })

    expect(pointDefinition).toBeDefined()
    expect(pointDefinition.id).toBe(created.data.id)
    expect(pointDefinition.name).toBe(payload.name)
    expect(pointDefinition.handle).toBe(payload.handle)
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
