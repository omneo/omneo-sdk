import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { AchievementDefinitionInput, CreateProfileAchievementInput, ProfileAchievementPoint } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
const CREATED_ACHIEVEMENT_DEFINITION_IDS: number[] = []

const buildAchievementDefinitionPayload = (): AchievementDefinitionInput => ({
  name: getRandomString('sdk_unit_test_profile_achievement_points_name'),
  handle: getRandomString('sdk_unit_test_profile_achievement_points_handle'),
  description: 'Tracks spend for SDK profile achievement points tests',
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

describe('Get Profile Achievement Points', () => {
  test('SDK Get Profile Achievement Points', async () => {
    const definitionPayload = buildAchievementDefinitionPayload()
    const definitionResponse = await simpleOmneoRequest('POST', '/achievements/definitions', definitionPayload)
    CREATED_ACHIEVEMENT_DEFINITION_IDS.push(definitionResponse.data.id)

    const createPayload: CreateProfileAchievementInput = {
      definition_id: definitionResponse.data.id,
      count: 200,
      meta: {
        manual: true,
        user: 'admin@omneo.io'
      }
    }
    await simpleOmneoRequest('POST', `/profiles/${testProfileID}/achievements`, createPayload)

    const response = await omneoClient.profiles.achievements.getPoints(testProfileID, definitionResponse.data.id)
    const points = (response.data ?? []) as ProfileAchievementPoint[]

    expect(points.length).toBeGreaterThan(0)
    const point = points.find((item) => item.count === createPayload.count && item.profile_id === testProfileID)
    expect(point).toBeDefined()
    expect(point?.meta?.manual).toBe(createPayload.meta?.manual)
    expect(point?.meta?.user).toBe(createPayload.meta?.user)
  })
})

afterAll(async () => {
  if (CREATED_ACHIEVEMENT_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_ACHIEVEMENT_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/achievements/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Profile Achievement get points, Achievement Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Achievement Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
