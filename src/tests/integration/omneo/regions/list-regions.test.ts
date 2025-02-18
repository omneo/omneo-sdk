import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { RegionInput, RegionResponse } from '../../../../types'
import { getRandomString } from '../../../lib/string/util'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_REGIONS_IDS : number[] = []

describe('Regions list', () => {
  test('SDK Get Regions', async () => {
    const payload: RegionInput = {
      name: getRandomString('sdk_unit_test_region_name'),
      handle: getRandomString('sdk_unit_test_region_handle')
    }
    const response = await simpleOmneoRequest('POST', '/regions', payload)
    CREATED_REGIONS_IDS.push(response.data.id)

    const regionsRes: RegionResponse = await omneo.regions.list({
      'filter[handle]': payload.handle
    })
    const { data: regions } = regionsRes
    expect(regions.length).toBe(1)

    const targetRegion = regions[0]
    expect(targetRegion.name).toBe(payload.name)
    expect(targetRegion.handle).toBe(payload.handle)
    expect(targetRegion.is_default).toBeFalsy()
  })
})

afterAll(async () => {
  if (CREATED_REGIONS_IDS.length > 0) {
    for (const id of CREATED_REGIONS_IDS) {
      console.log('Cleaning up SDK Regions with ID', id)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/regions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Region ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Region ID ${id}`, deleteResponse)
      }
    }
  }
})
