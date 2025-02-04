import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { RewardDefinitionCreateInput } from '../../../../types'
import { getRandomString } from '../../../lib/string/util'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const FAILED_DELETE_REWARDS_DEFINITION_IDS : number[] = []

describe('Reward Definition delete', () => {
  test('SDK Reward Definition delete', async () => {
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
    await omneo.rewardDefinitions.delete(response.data.id).catch((err) => {
      console.error(`SDK Reward definition delete failed with id:${response.data.id}`, err)
      FAILED_DELETE_REWARDS_DEFINITION_IDS.push(response.data.id)
      throw new Error(`SDK Reward definition delete failed with id:${response.data.id}`)
    })

    const rewardResponse = await simpleOmneoRequest('GET', `/rewards/definitions/${response.data.id}`)
    expect(rewardResponse).toEqual(expect.objectContaining({ status: 404, statusText: 'Not Found' }))
  })
})

afterAll(async () => {
  if (FAILED_DELETE_REWARDS_DEFINITION_IDS.length > 0) {
    for (const id of FAILED_DELETE_REWARDS_DEFINITION_IDS) {
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
