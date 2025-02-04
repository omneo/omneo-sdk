import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { Region, RegionInput, Country, CountryInput } from '../../../../types'
import { getRandomString, getIsoNumeric } from '../../../lib/string/util'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_COUNTRIES_IDS : number[] = []
const CREATED_REGIONS_IDS : number[] = []

describe('Region update', () => {
  test('SDK Region update', async () => {
    const updatedName = getRandomString('sdk_unit_test_region_name')
    const payload: RegionInput = {
      name: getRandomString('sdk_unit_test_region_name'),
      handle: getRandomString('sdk_unit_test_region_handle')
    }
    const response = await simpleOmneoRequest('POST', '/regions', payload).catch((err) => {
      console.error('SDK get Region created failed:', err)
      throw new Error('SDK get Region created failed')
    })
    CREATED_REGIONS_IDS.push(response.data.id)

    const targetRegion: Region = await omneo.regions.update(response.data.id, {
      name: updatedName
    }).catch((err) => {
      console.error(`SDK Region updated failed with id:${response.data.id}`, err)
      throw new Error(`SDK Region updated failed with id:${response.data.id}`)
    })
    expect(targetRegion.name).toBe(updatedName)
    expect(targetRegion.handle).toBe(payload.handle)
  })

  test('SDK Regions update country', async () => {
    const updatedName = getRandomString('sdk_unit_test_region_name')
    const payload: RegionInput = {
      name: getRandomString('sdk_unit_test_region_name'),
      handle: getRandomString('sdk_unit_test_region_handle')
    }
    const response = await simpleOmneoRequest('POST', '/regions', payload).catch((err) => {
      console.error('SDK get Region created failed:', err)
      throw new Error('SDK get Region created failed')
    })
    CREATED_REGIONS_IDS.push(response.data.id)

    const payload2: CountryInput = {
      name: getRandomString('sdk_unit_test_region_name'),
      iso_2: getRandomString('sdk_unit_test_iso2'),
      iso_3: getRandomString('sdk_unit_test_iso3'),
      iso_numeric: getIsoNumeric(),
      sort_order: null
    }
    const response2 = await simpleOmneoRequest('POST', '/countries', payload2).catch((err) => {
      console.error('SDK Country created failed:', err)
      throw new Error('SDK Country created failed')
    })
    CREATED_COUNTRIES_IDS.push(response2.data.id)

    const targetRegion: Region = await omneo.regions.update(response.data.id, {
      name: updatedName,
      countries: [
        {
          iso_2: payload2.iso_2
        }
      ]
    }).catch((err) => {
      console.error(`SDK Region updated failed with id:${response.data.id}`, err)
      throw new Error(`SDK Region updated failed with id:${response.data.id}`)
    })
    expect(targetRegion.name).toBe(updatedName)
    expect(targetRegion.handle).toBe(payload.handle)

    const filterCountries: Country[] = targetRegion.countries.filter((country) => country.iso_2 === payload2.iso_2)
    const targetCountry = filterCountries[0]
    expect(targetCountry.iso_2).toBe(payload2.iso_2)
    expect(targetCountry.id).toBe(response2.data.id)
  })
})

afterAll(async () => {
  if (CREATED_REGIONS_IDS.length > 0) {
    for (const id of CREATED_REGIONS_IDS) {
      console.log('Cleaning up SDK Region with ID', id)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/regions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Region ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Region ID ${id}`, deleteResponse)
      }
    }
  }
})
