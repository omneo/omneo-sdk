import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { AchievementDefinition, AchievementDefinitionInput } from '../../../../types'
import { getRandomString } from '../../../lib/string/util'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_ACHIEVEMENT_DEFINITION_IDS : number[] = []

describe('Achievement Definition get', () => {
  test('SDK Get Achievement Definition', async () => {
    const payload: AchievementDefinitionInput = {
      name: getRandomString('sdk_unit_test_achievement_definition_update'),
      handle: getRandomString('sdk_unit_test_achievement_definition_update'),
      description: 'Tracks monthly spend for monthly rewards',
      is_published: true,
      display_level: true,
      display_option: 'visible',
      short_description: 'Your Spend Progress',
      levels: [
        {
          name: '0100-01-01 00:00:00',
          display_number: 1,
          trigger: 100,
          repeats: false,
          allow_multiple_earn: true,
          meta: {
            unlocks: [
              {
                type: 'reward_definition',
                id_type: 'handle'
              }
            ]
          }
        }
      ]
    }
    const response = await simpleOmneoRequest('POST', '/achievements/definitions', payload)
    CREATED_ACHIEVEMENT_DEFINITION_IDS.push(response.data.id)

    const updatePayload = {
      name: getRandomString('sdk_unit_test_achievement_definition_update2'),
      description: 'Tracks monthly spend for monthly rewards2',
      short_description: 'Your Spend Progress2'
    }
    const targetDefinition: AchievementDefinition = await omneo.achievementDefinitions.update(response.data.id, updatePayload)
    expect(targetDefinition.name).toBe(updatePayload.name)
    expect(targetDefinition.description).toBe(updatePayload.description)
    expect(targetDefinition.short_description).toBe(updatePayload.short_description)
  })
})

afterAll(async () => {
  if (CREATED_ACHIEVEMENT_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_ACHIEVEMENT_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/achievements/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Achievement Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Achievement Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
