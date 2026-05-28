import { describe, expect, afterAll } from 'vitest'
import { RequestCreateAchievementDefinition, RequestCreateProfileAchievement, ProfileAchievementPointResponse } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'
import { ID } from '@id'
import { testWithIDData } from '@id-tests/test-with-id-data'

const CREATED_ACHIEVEMENT_DEFINITION_IDS: number[] = []

const buildAchievementDefinitionPayload = (): RequestCreateAchievementDefinition => ({
  name: getRandomString('sdk_unit_test_id_profile_achievement_points_name'),
  handle: getRandomString('sdk_unit_test_id_profile_achievement_points_handle'),
  description: 'Tracks spend for SDK ID profile achievement points tests',
  is_published: true,
  display_level: true,
  display_option: 'visible',
  short_description: 'SDK ID Achievement Points',
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

describe('ID Get Profile Achievement Points', () => {
  testWithIDData('ID SDK Get Profile Achievement Points', async ({ IDData }) => {
    const { profile, tokenData } = IDData
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
    await simpleOmneoRequest('POST', `/profiles/${profile.id}/achievements`, createPayload)

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const response: ProfileAchievementPointResponse = await IDClient.profile.achievements.getPoints(definitionResponse.data.id)
    const points = response.data ?? []

    expect(points.length).toBeGreaterThan(0)
    const point = points.find((item) => item.count === createPayload.count && item.profile_id === profile.id)
    expect(point).toBeDefined()
    expect((point?.meta as any)?.manual).toBe((createPayload.meta as any)?.manual)
    expect((point?.meta as any)?.user).toBe((createPayload.meta as any)?.user)
  })
})

afterAll(async () => {
  if (CREATED_ACHIEVEMENT_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_ACHIEVEMENT_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/achievements/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK Get Profile Achievement Points, Achievement Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Achievement Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
