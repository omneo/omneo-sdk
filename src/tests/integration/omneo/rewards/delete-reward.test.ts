import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { RewardDefinitionCreateInput } from '../../../../types'
import { getRandomString } from '../../../lib/string/util'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_REWARDS_DEFINITION_IDS : number[] = []
const FAILED_REWARDS_IDS : number[] = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Reward delete', () => {
  test('SDK Reward delete', async () => {
    const payload: RewardDefinitionCreateInput = {
      name: getRandomString('sdk_unit_test_reward_definition_name'),
      handle: getRandomString('sdk_unit_test_reward_definition_handle'),
      value: 10,
      period: 30,
      period_type: 'days',
      type: 'spend',
      is_assignable: true,
      is_published: true
    }
    const response = await simpleOmneoRequest('POST', '/rewards/definitions', payload).catch((err) => {
      console.error('SDK update reward definition created failed:', err)
      throw new Error('SDK update reward definition created failed')
    })
    CREATED_REWARDS_DEFINITION_IDS.push(response.data.id)

    const rewardPayload = {
      reward_definition_id: response.data.id,
      profile_id: testProfileID,
      value_initial: 5,
      value_remaining: 5,
      expires_at: '2024-12-06 08:30:00',
      issued_at: '2024-12-05 08:30:00',
      timezone: 'Australia/Melbourne',
      external_id: getRandomString('sdk_unit_test_reward_external_id')
    }
    const rewardResponse = await simpleOmneoRequest('POST', '/rewards', rewardPayload).catch((err) => {
      console.error('SDK list rewards created failed:', err)
      throw new Error('SDK list rewards created failed')
    })

    await omneo.rewards.delete(rewardResponse.data.id).catch((err) => {
      console.error(`SDK Reward delete failed with id:${rewardResponse.data.id}`, err)
      FAILED_REWARDS_IDS.push(rewardResponse.data.id)
      throw new Error(`SDK Reward delete failed with id:${rewardResponse.data.id}`)
    })

    const rewardResponse2 = await simpleOmneoRequest('GET', `/rewards/${rewardResponse.data.id}`)
    expect(rewardResponse2).toEqual(expect.objectContaining({ status: 404, statusText: 'Not Found' }))
  })
})

afterAll(async () => {
  if (FAILED_REWARDS_IDS.length > 0) {
    for (const id of FAILED_REWARDS_IDS) {
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
