import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { RewardDefinition, RewardDefinitionCreateInput, RewardDefinitionUpdateInput } from '../../../../types'
import { getRandomString } from '../../../lib/string/util'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_REWARDS_DEFINITION_IDS : number[] = []

describe('Reward Definition update', () => {
  test('SDK Reward Definition update', async () => {
    const payload: RewardDefinitionCreateInput = {
      name: getRandomString('sdk_unit_test_reward_definition_name'),
      handle: getRandomString('sdk_unit_test_reward_definition_handle'),
      value: 10,
      period: 30,
      period_type: 'days',
      type: 'spend'
    }
    const response = await simpleOmneoRequest('POST', '/rewards/definitions', payload).catch((err) => {
      console.error('SDK update reward definition created failed:', err)
      throw new Error('SDK update reward definition created failed')
    })
    CREATED_REWARDS_DEFINITION_IDS.push(response.data.id)
    const updatedPayload: RewardDefinitionUpdateInput = {
      name: getRandomString('sdk_unit_test_reward_definition_name'),
      handle: payload.handle,
      value: 100,
      period: 300,
      period_type: 'weeks',
      type: 'spend'
    }
    const targetRewardDefinition: RewardDefinition = await omneo.rewardDefinitions.update(response.data.id, updatedPayload).catch((err) => {
      console.error('SDK Reward definition created failed:', err)
      throw new Error('SDK Reward definition created failed')
    })

    expect(targetRewardDefinition.name).toBe(updatedPayload.name)
    expect(targetRewardDefinition.handle).toBe(updatedPayload.handle)
    expect(targetRewardDefinition.value).toBe(updatedPayload.value)
    expect(targetRewardDefinition.period).toBe(updatedPayload.period)
    expect(targetRewardDefinition.period_type).toBe(updatedPayload.period_type)
    expect(targetRewardDefinition.type).toBe(updatedPayload.type)
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
