import { describe, expect, afterAll } from 'vitest'
import { AchievementDefinitionInput, CreateProfileAchievementInput } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'
import { ID } from '@id'
import { testWithIDData } from '../../test-with-id-data'

const CREATED_ACHIEVEMENT_DEFINITION_IDS: number[] = []

const buildAchievementDefinitionPayload = (): AchievementDefinitionInput => ({
  name: getRandomString('sdk_unit_test_id_profile_achievement_list_name'),
  handle: getRandomString('sdk_unit_test_id_profile_achievement_list_handle'),
  description: 'Tracks spend for SDK ID profile achievement list tests',
  is_published: true,
  display_level: true,
  display_option: 'visible',
  short_description: 'SDK ID Achievement List',
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

describe('ID List Profile Achievements', () => {
  testWithIDData('ID SDK List Profile Achievements', async ({ IDData }) => {
    const { profile, tokenData } = IDData
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
    await simpleOmneoRequest('POST', `/profiles/${profile.id}/achievements`, createPayload)

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const achievements = await IDClient.profile.achievements.list({})
    const target = Array.isArray(achievements) ? achievements.find((achievement) => achievement.id === definitionResponse.data.id) : Object.values(achievements).find((achievement) => achievement.id === definitionResponse.data.id)
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
        console.log(`ID SDK List Profile Achievements, Achievement Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Achievement Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
