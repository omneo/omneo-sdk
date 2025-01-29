import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { getRandomString } from '../../../lib/string/util'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const FAILED_DELETE_BENEFIT_DEFINITION_IDS : string[] = []

describe('Benefit Definition delete', () => {
  test('SDK Benefit Definition delete', async () => {
    const payload = {
      name: getRandomString('sdk_unit_test_benefit_definition_delete'),
      handle: getRandomString('sdk_unit_test_benefit_definition_delete'),
      period: 30
    }
    const response = await simpleOmneoRequest('POST', '/benefits/definitions', payload).catch((err) => {
      console.error('SDK create benefit definition failed:', err)
      throw new Error('SDK create benefit definition failed')
    })

    await omneo.benefitDefinitions.delete(response.data.id).catch((err) => {
      console.error(`SDK Benefit definition delete failed with id:${response.data.id}`, err)
      FAILED_DELETE_BENEFIT_DEFINITION_IDS.push(response.data.id)
      throw new Error(`SDK Benefit definition delete failed with id:${response.data.id}`)
    })

    const benefitResponse = await simpleOmneoRequest('GET', `/benefits/definitions/${response.data.id}`)
    expect(benefitResponse).toEqual(expect.objectContaining({ status: 404, statusText: 'Not Found' }))
  })
})

afterAll(async () => {
  if (FAILED_DELETE_BENEFIT_DEFINITION_IDS.length > 0) {
    for (const id of FAILED_DELETE_BENEFIT_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/benefits/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Benefit Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Benefit Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
