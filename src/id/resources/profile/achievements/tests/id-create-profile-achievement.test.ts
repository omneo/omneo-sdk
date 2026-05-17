import { describe, expect, afterAll } from 'vitest'
import { AchievementDefinitionInput, CreateProfileAchievementInput, ProfileAchievementPoint } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'
import { ID } from '@id'
import { testWithIDData } from '@id-tests/test-with-id-data'

const CREATED_ACHIEVEMENT_DEFINITION_IDS: number[] = []

const buildAchievementDefinitionPayload = (): AchievementDefinitionInput => ({
  name: getRandomString('sdk_unit_test_id_profile_achievement_create_name'),
  handle: getRandomString('sdk_unit_test_id_profile_achievement_create_handle'),
  description: 'Tracks spend for SDK ID profile achievement create tests',
  is_published: true,
  display_level: true,
  display_option: 'visible',
  short_description: 'SDK ID Achievement Create',
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

describe('ID Create Profile Achievement', () => {
  testWithIDData('ID SDK Create Profile Achievement', async ({ IDData }) => {
    const { profile, tokenData } = IDData
    const definitionPayload = buildAchievementDefinitionPayload()
    const definitionResponse = await simpleOmneoRequest('POST', '/achievements/definitions', definitionPayload)
    CREATED_ACHIEVEMENT_DEFINITION_IDS.push(definitionResponse.data.id)

    const payload: CreateProfileAchievementInput = {
      definition_id: definitionResponse.data.id,
      count: 150,
      meta: {
        manual: true,
        user: 'admin@omneo.io'
      }
    }

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const createdPoint = await IDClient.profile.achievements.create(payload) as ProfileAchievementPoint

    expect(createdPoint.id).toBeDefined()
    expect(createdPoint.profile_id).toBe(profile.id)
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
        console.log(`ID SDK Create Profile Achievement, Achievement Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Achievement Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
