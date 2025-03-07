import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { AchievementDefinition } from '../../../../types'
import { getRandomString } from '../../../lib/string/util'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_ACHIEVEMENT_DEFINITION_IDS : number[] = []

describe('Achievement Definition get', () => {
  test('SDK Get Achievement Definition', async () => {
    const payload = {
      name: getRandomString('sdk_unit_test_achievement_definition_get'),
      handle: getRandomString('sdk_unit_test_achievement_definition_get'),
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

    const targetDefinition: AchievementDefinition = await omneo.achievementDefinitions.get(response.data.id)
    expect(targetDefinition.name).toBe(payload.name)
    expect(targetDefinition.handle).toBe(payload.handle)
    expect(targetDefinition.display_option).toBe(payload.display_option)
    expect(targetDefinition.description).toBe(payload.description)
    expect(targetDefinition.short_description).toBe(payload.short_description)
    expect(targetDefinition.levels.length).toBe(1)
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
