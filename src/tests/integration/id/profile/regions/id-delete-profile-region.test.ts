import { describe, expect, afterAll } from 'vitest'
import { ID } from '../../../../../id'
import simpleOmneoRequest from '../../../../lib/simple-omneo-request'
import { RegionInput, ProfileRegionInput } from '../../../../../types'
import { testWithIDData } from '../../test-with-id-data'
import { getRandomString } from '../../../../lib/string/util'

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
const CREATED_REGION_IDS : number[] = []
const FAILED_PROFILE_REGION_IDS : number[] = []

describe('ID Profile Create region', () => {
  testWithIDData('ID SDK Create region', async ({ IDData }) => {
    const { tokenData } = IDData
    const payload: RegionInput = {
      name: getRandomString('sdk_unit_test_id_name_create'),
      handle: getRandomString('sdk_unit_test_id_handle_create')
    }
    const response = await simpleOmneoRequest('POST', '/regions', payload).catch((err) => {
      console.error('ID SDK create regions created region failed:', err)
      throw new Error('ID SDK create regions created region failed')
    })
    CREATED_REGION_IDS.push(response.data.id)

    const payload2: ProfileRegionInput = {
      region_id: response.data.id,
      country: 'USA',
      state: 'NY'
    }
    await simpleOmneoRequest('POST', `/profiles/${testProfileID}/regions`, payload2).catch((err) => {
      console.error('SDK list regions created profile region failed:', err)
      throw new Error('SDK list regions created profile region failed')
    })
    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })
    const response3 = await IDClient.profile.regions.delete(response.data.id).catch((err) => {
      console.error('SDK delete region created profile region failed:', err)
      FAILED_PROFILE_REGION_IDS.push(response.data.id)
    })
    expect(response3?.status).toBe(204)
  })
})

afterAll(async () => {
  if (FAILED_PROFILE_REGION_IDS.length > 0) {
    for (const id of FAILED_PROFILE_REGION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/regions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK Profile Region ID ${id} deleted`)
      } else {
        console.log(`ID SDK Failed to delete Profile Region ID ${id}`, deleteResponse)
      }
    }
  }
  if (CREATED_REGION_IDS.length > 0) {
    for (const id of CREATED_REGION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/regions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK Region ID ${id} deleted`)
      } else {
        console.log(`ID SDK Failed to delete Region ID ${id}`, deleteResponse)
      }
    }
  }
})
