import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { RequestCreateAchievementDefinition, RequestCreateProfileAchievement } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
const CREATED_ACHIEVEMENT_DEFINITION_IDS: number[] = []

const buildAchievementDefinitionPayload = (): RequestCreateAchievementDefinition => ({
  name: getRandomString('sdk_unit_test_profile_achievement_list_name'),
  handle: getRandomString('sdk_unit_test_profile_achievement_list_handle'),
  description: 'Tracks spend for SDK profile achievement list tests',
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

describe('List Profile Achievements', () => {
  test('SDK List Profile Achievements', async () => {
    const definitionPayload = buildAchievementDefinitionPayload()
    const definitionResponse = await simpleOmneoRequest('POST', '/achievements/definitions', definitionPayload)
    CREATED_ACHIEVEMENT_DEFINITION_IDS.push(definitionResponse.data.id)

    const createPayload: RequestCreateProfileAchievement = {
      definition_id: definitionResponse.data.id,
      count: 200,
      meta: {
        manual: true,
        user: 'admin@omneo.io'
      }
    }
    await simpleOmneoRequest('POST', `/profiles/${testProfileID}/achievements`, createPayload)

    const achievements = await omneoClient.profiles.achievements.list(testProfileID, {})
    const target: any = Array.isArray(achievements) ? achievements.find((achievement) => achievement.id === definitionResponse.data.id) : Object.values(achievements as any).find((achievement: any) => achievement.id === definitionResponse.data.id)
    expect(target).toBeDefined()
    expect(target?.id).toBe(definitionResponse.data.id)
    expect(target?.handle).toBe(definitionPayload.handle)
    expect(target?.name).toBe(definitionPayload.name)
  })
})

afterAll(async () => {
  if (CREATED_ACHIEVEMENT_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_ACHIEVEMENT_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/achievements/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Profile Achievement list, Achievement Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Achievement Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
