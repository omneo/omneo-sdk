import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { CountryInput, CountryResponse } from '../../../../types'
import { getRandomString, getIsoNumeric } from '../../../lib/string/util'
const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_COUNTRIES_IDS : number[] = []

describe('Countries list', () => {
  test('SDK Get Countries', async () => {
    const payload: CountryInput = {
      name: getRandomString('sdk_unit_test_country'),
      iso_2: getRandomString('sdk_unit_test_iso2'),
      iso_3: getRandomString('sdk_unit_test_iso3'),
      iso_numeric: getIsoNumeric(),
      sort_order: null
    }
    const response = await simpleOmneoRequest('POST', '/countries', payload)
    CREATED_COUNTRIES_IDS.push(response.data.id)

    const countriesRes: CountryResponse = await omneo.countries.list({
      'filter[name]': payload.name
    })
    const { data: countries } = countriesRes
    const filterCountries = countries.filter(d => d.name === payload.name)
    expect(filterCountries.length).toBe(1)

    const targetCountry = filterCountries[0]
    expect(targetCountry.id).toBe(response.data.id)
    expect(targetCountry.name).toBe(payload.name)
    expect(targetCountry.iso_2).toBe(payload.iso_2)
    expect(targetCountry.iso_3).toBe(payload.iso_3)
    expect(targetCountry.iso_numeric).toBe(payload.iso_numeric)
  })
})

afterAll(async () => {
  if (CREATED_COUNTRIES_IDS.length > 0) {
    for (const id of CREATED_COUNTRIES_IDS) {
      console.log('Cleaning up SDK Countries with ID', id)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/countries/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Country ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Country ID ${id}`, deleteResponse)
      }
    }
  }
})
