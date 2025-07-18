import { getRandomString } from '../../../../lib/string/util'
import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../../omneo'
import simpleOmneoRequest from '../../../../lib/simple-omneo-request'
import { ProfileRegionInput, Region, RegionInput } from '../../../../../types'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_REGION_IDS : number[] = []
const CREATED_PROFILE_REGION_IDS : number[] = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Profile Regions list', () => {
  test('SDK Profile Regions list', async () => {
    const payload: RegionInput = {
      name: getRandomString('sdk_unit_test_name_list'),
      handle: getRandomString('sdk_unit_test_handle_list')
    }
    const response = await simpleOmneoRequest('POST', '/regions', payload).catch((err) => {
      console.error('SDK list regions created region failed:', err)
      throw new Error('SDK list regions created region failed')
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

    const regions: Region[] = await omneoClient.profiles.regions.list(testProfileID)
    expect(regions.length).toBeGreaterThan(0)
    const region = regions.find((region) => region.id === response.data.id)
    region?.id && CREATED_PROFILE_REGION_IDS.push(region.id)
    expect(region?.country).toBe(payload2.country)
    expect(region?.state).toBe(payload2.state)
  })
})

afterAll(async () => {
  if (CREATED_PROFILE_REGION_IDS.length > 0) {
    for (const id of CREATED_PROFILE_REGION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/regions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Profile Region ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Profile Region ID ${id}`, deleteResponse)
      }
    }
  }
  if (CREATED_REGION_IDS.length > 0) {
    for (const id of CREATED_REGION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/regions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Region ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Region ID ${id}`, deleteResponse)
      }
    }
  }
})
