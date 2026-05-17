import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { PointDefinition, CreatePointDefinitionInput } from '@types'
import { simpleOmneoRequest, getRandomString } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_POINT_DEFINITION_IDS: number[] = []

describe('Create Point Definition', () => {
  test('SDK Create Point Definition', async () => {
    const payload: CreatePointDefinitionInput = {
      name: getRandomString('sdk_unit_test_create_point_definition'),
      handle: getRandomString('sdk_unit_test_create_point_definition'),
      description: 'SDK unit test point definition',
      notes: 'Created by SDK integration test',
      is_reassignable: false,
      issue_period: 30,
      issue_period_type: 'days',
      tags: []
    }

    const pointDefinition: PointDefinition = await omneoClient.pointDefinitions.create(payload).catch((err) => {
      console.error('SDK Create Point Definition failed:', err)
      throw new Error('SDK Create Point Definition failed')
    })
    CREATED_POINT_DEFINITION_IDS.push(pointDefinition.id)

    expect(pointDefinition).toBeDefined()
    expect(pointDefinition.name).toBe(payload.name)
    expect(pointDefinition.handle).toBe(payload.handle)
    expect(pointDefinition.description).toBe(payload.description)
    expect(pointDefinition.notes).toBe(payload.notes)
    expect(pointDefinition.is_reassignable).toBe(payload.is_reassignable)
    expect(pointDefinition.issue_period).toBe(payload.issue_period)
    expect(pointDefinition.issue_period_type).toBe(payload.issue_period_type)
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
