import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { RewardDefinitionCreateInput, Reward } from '../../../../types'
import { getName, getHandle } from './util'
import { DateTime } from 'luxon'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_REWARDS_DEFINITION_IDS : number[] = []
const CREATED_REWARDS_IDS : number[] = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Reward created', () => {
  test('SDK created Reward', async () => {
    const payload: RewardDefinitionCreateInput = {
      name: getName(),
      handle: getHandle(),
      value: 10,
      period: 30,
      period_type: 'days',
      type: 'spend',
      is_assignable: true,
      is_published: true
    }
    const response = await simpleOmneoRequest('POST', '/rewards/definitions', payload).catch((err) => {
      console.error('SDK get reward definition created failed:', err)
      throw new Error('SDK get reward definition created failed')
    })
    CREATED_REWARDS_DEFINITION_IDS.push(response.data.id)

    const rewardPayload = {
      reward_definition_id: response.data.id,
      profile_id: testProfileID,
      value_initial: 5,
      value_remaining: 5,
      expires_at: '2024-12-06 08:30:00',
      issued_at: '2024-12-05 08:30:00',
      timezone: 'Australia/Melbourne'
    }
    const targetReward: Reward = await omneo.rewards.create(rewardPayload).catch((err) => {
      console.error('SDK Reward definition created failed:', err)
      throw new Error('SDK Reward definition created failed')
    })
    CREATED_REWARDS_IDS.push(targetReward.id)

    expect(targetReward.definition.id).toBe(rewardPayload.reward_definition_id)
    expect(targetReward.profile_id).toBe(rewardPayload.profile_id)
    expect(targetReward.value_initial).toBe(rewardPayload.value_initial)
    expect(targetReward.value_remaining).toBe(rewardPayload.value_remaining)
    expect(targetReward.issued_at).toBe(DateTime.fromFormat(rewardPayload.issued_at, 'yyyy-MM-dd HH:mm:ss', { zone: rewardPayload.timezone }).toUTC().toFormat('yyyy-MM-dd HH:mm:ss'))
    expect(targetReward.timezone).toBe(rewardPayload.timezone)
  })
})

afterAll(async () => {
  if (CREATED_REWARDS_IDS.length > 0) {
    for (const id of CREATED_REWARDS_IDS) {
      console.log('Cleaning up SDK Reward with ID', id)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/rewards/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Reward ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Reward ID ${id}`, deleteResponse)
      }
    }
  }
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
