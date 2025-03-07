
import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { AchievementDefinitionInput } from '../../../../types'
import { getRandomString } from '../../../lib/string/util'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const FAILED_DELETE_ACHIEVEMENT_DEFINITION_IDS : number[] = []

describe('Achievement Definition delete', () => {
  test('SDK Delete Achievement Definition', async () => {
    const payload: AchievementDefinitionInput = {
      name: getRandomString('sdk_unit_test_achievement_definition_delete'),
      handle: getRandomString('sdk_unit_test_achievement_definition_delete'),
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
    console.log(`SDK Achievement Definition Delete ID ${response.data.id}`)
    await omneo.achievementDefinitions.delete(response.data.id).catch((err) => {
      console.error(`SDK Achievement definition delete failed with id:${response.data.id}`, err)
      FAILED_DELETE_ACHIEVEMENT_DEFINITION_IDS.push(response.data.id)
      throw new Error(`SDK Achievement definition delete failed with id:${response.data.id}`)
    })

    const achievementResponse = await simpleOmneoRequest('GET', `/achievements/definitions/${response.data.id}`)
    expect(achievementResponse).toEqual(expect.objectContaining({ status: 404, statusText: 'Not Found' }))
  })
})

afterAll(async () => {
  if (FAILED_DELETE_ACHIEVEMENT_DEFINITION_IDS.length > 0) {
    for (const id of FAILED_DELETE_ACHIEVEMENT_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/achievements/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Achievement Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Achievement Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
