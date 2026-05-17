import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { AchievementDefinitionInput, CreateProfileAchievementInput } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
const CREATED_ACHIEVEMENT_DEFINITION_IDS: number[] = []

const buildAchievementDefinitionPayload = (): AchievementDefinitionInput => ({
  name: getRandomString('sdk_unit_test_profile_achievement_create_name'),
  handle: getRandomString('sdk_unit_test_profile_achievement_create_handle'),
  description: 'Tracks spend for SDK profile achievement tests',
  is_published: true,
  display_level: true,
  display_option: 'visible',
  short_description: 'SDK Achievement Progress',
  levels: [
    {
      name: 'Spend 100',
      display_number: 1,
      trigger: 100,
      repeats: false,
      allow_multiple_earn: true
    }
  ]
})

describe('Create Profile Achievement', () => {
  test('SDK Create Profile Achievement', async () => {
    const definitionPayload = buildAchievementDefinitionPayload()
    const definitionResponse = await simpleOmneoRequest('POST', '/achievements/definitions', definitionPayload)
    CREATED_ACHIEVEMENT_DEFINITION_IDS.push(definitionResponse.data.id)

    const payload: CreateProfileAchievementInput = {
      definition_id: definitionResponse.data.id,
      count: 200,
      meta: {
        manual: true,
        user: 'admin@omneo.io'
      }
    }

    const createdPoint = await omneoClient.profiles.achievements.create(testProfileID, payload)
    expect(createdPoint.id).toBeDefined()
    expect(createdPoint.profile_id).toBe(testProfileID)
    expect(createdPoint.count).toBe(payload.count)
    expect(createdPoint.meta?.manual).toBe(payload.meta?.manual)
    expect(createdPoint.meta?.user).toBe(payload.meta?.user)
  })
})

afterAll(async () => {
  if (CREATED_ACHIEVEMENT_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_ACHIEVEMENT_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/achievements/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Profile Achievement create, Achievement Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Achievement Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
