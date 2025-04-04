import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { RewardDefinitionCreateInput, RewardDefinition } from '../../../../types'
import { getRandomString } from '../../../lib/string/util'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_REWARDS_DEFINITION_IDS : number[] = []

describe('Reward Definition created', () => {
  test('SDK created Reward Definition', async () => {
    const payload: RewardDefinitionCreateInput = {
      name: getRandomString('sdk_unit_test_reward_definition_name'),
      handle: getRandomString('sdk_unit_test_reward_definition_handle'),
      value: 10,
      period: 30,
      period_type: 'days',
      type: 'spend'
    }
    const targetRewardDefinition: RewardDefinition = await omneo.rewardDefinitions.create(payload).catch((err) => {
      console.error('SDK Reward definition created failed:', err)
      throw new Error('SDK Reward definition created failed')
    })
    CREATED_REWARDS_DEFINITION_IDS.push(targetRewardDefinition.id)

    expect(targetRewardDefinition.name).toBe(payload.name)
    expect(targetRewardDefinition.handle).toBe(payload.handle)
    expect(targetRewardDefinition.value).toBe(payload.value)
    expect(targetRewardDefinition.period).toBe(payload.period)
    expect(targetRewardDefinition.period_type).toBe(payload.period_type)
    expect(targetRewardDefinition.type).toBe(payload.type)
  })
})

afterAll(async () => {
  if (CREATED_REWARDS_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_REWARDS_DEFINITION_IDS) {
      console.log('Cleaning up SDK Reward Definition with ID', id)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/rewards/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Reward Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Reward Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
