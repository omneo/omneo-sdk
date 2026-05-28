import { describe, expect, test, beforeAll, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { Reward } from '@types'
import { getRandomString, convertToUTC, simpleOmneoRequest } from '@lib'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_REWARDS_DEFINITION_IDS : number[] = []
const CREATED_REWARDS_IDS : number[] = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

beforeAll(() => {
  process.env.TZ = 'Australia/Melbourne'
})
describe('Profile Rewards List', () => {
  test('SDK Profile Rewards List', async () => {
    const rewardDefinitionHandle = getRandomString('sdk_unit_test_reward_definition_handle')
    const payload = {
      name: getRandomString('sdk_unit_test_reward_definition_name'),
      handle: rewardDefinitionHandle,
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
      reward_definition_handle: response.data.handle,
      profile_id: testProfileID,
      value_initial: 5,
      value_remaining: 5,
      expires_at: '2024-12-06 08:30:00',
      issued_at: '2024-12-05 08:30:00',
      timezone: 'Australia/Melbourne'
    }
    const targetReward: Reward = await omneo.rewards.create(rewardPayload).catch((err: any) => {
      console.error('SDK Reward definition created failed:', err)
      throw new Error('SDK Reward definition created failed')
    })
    CREATED_REWARDS_IDS.push(targetReward.id)
    const params = {
      'filter[reward_definition_id]': rewardPayload.reward_definition_id
    }
    const listRewards = await omneo.profiles.rewards.list(rewardPayload.profile_id, params).catch((err: any) => {
      console.error('SDK List profile rewards failed:', err)
      throw new Error('SDK List profile rewards failed')
    })
    expect(listRewards.data.length).toBeGreaterThan(0)
    const targetRewardFromList = listRewards.data.find((reward) => reward.definition.id === rewardPayload.reward_definition_id)
    expect(targetRewardFromList).toBeDefined()

    expect(targetRewardFromList!.definition.id).toBe(rewardPayload.reward_definition_id)
    expect(targetRewardFromList!.profile_id).toBe(rewardPayload.profile_id)
    expect(targetRewardFromList!.value_initial).toBe(rewardPayload.value_initial)
    expect(targetRewardFromList!.value_remaining).toBe(rewardPayload.value_remaining)
    expect(targetRewardFromList!.issued_at).toBe(convertToUTC(rewardPayload.issued_at))
    expect(targetRewardFromList!.timezone).toBe(rewardPayload.timezone)
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
