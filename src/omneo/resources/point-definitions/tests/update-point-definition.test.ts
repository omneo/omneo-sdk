import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { PointDefinition, RequestUpdatePointDefinition } from '@types'
import { simpleOmneoRequest, getRandomString } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_POINT_DEFINITION_IDS: number[] = []

describe('Update Point Definition', () => {
  test('SDK Update Point Definition', async () => {
    const createPayload = {
      name: getRandomString('sdk_unit_test_update_point_definition'),
      handle: getRandomString('sdk_unit_test_update_point_definition'),
      description: 'Original description',
      is_reassignable: false,
      issue_period: 30,
      issue_period_type: 'days'
    }
    const created = await simpleOmneoRequest('POST', '/points/definitions', createPayload)
    CREATED_POINT_DEFINITION_IDS.push(created.data.id)

    const updatePayload: RequestUpdatePointDefinition = {
      name: getRandomString('sdk_unit_test_update_point_definition_updated'),
      description: 'Updated description',
      issue_period: 60,
      issue_period_type: 'weeks'
    }

    const pointDefinition: PointDefinition = await omneoClient.pointDefinitions.update(created.data.id, updatePayload).catch((err) => {
      console.error('SDK Update Point Definition failed:', err)
      throw new Error('SDK Update Point Definition failed')
    })

    expect(pointDefinition).toBeDefined()
    expect(pointDefinition.id).toBe(created.data.id)
    expect(pointDefinition.handle).toBe(createPayload.handle)
    expect(pointDefinition.name).toBe(updatePayload.name)
    expect(pointDefinition.description).toBe(updatePayload.description)
    expect(pointDefinition.issue_period).toBe(updatePayload.issue_period)
    expect(pointDefinition.issue_period_type).toBe(updatePayload.issue_period_type)
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
