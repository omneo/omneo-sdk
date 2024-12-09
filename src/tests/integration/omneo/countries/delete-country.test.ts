import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { CountryInput } from '../../../../types'
import { getName, getIso2, getIso3, getIsoNumeric } from './util'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const FAILED_DELETE_COUNTRIES : number[] = []

describe('Countries delete', () => {
  test('SDK Countries delete', async () => {
    const payload: CountryInput = {
      name: getName(),
      iso_2: getIso2(),
      iso_3: getIso3(),
      iso_numeric: getIsoNumeric(),
      sort_order: null
    }
    const response = await simpleOmneoRequest('POST', '/countries', payload)
    await omneo.countries.delete(response.data.id).catch((err) => {
      console.error(`SDK Country delete failed with id:${response.data.id}`, err)
      FAILED_DELETE_COUNTRIES.push(response.data.id)
      throw new Error(`SDK Country delete failed with id:${response.data.id}`)
    })

    const countriesRes = await omneo.countries.list({
      'filter[name]': payload.name
    })
    const { data: countries } = countriesRes
    expect(countries.length).toBe(0)
  })
})

afterAll(async () => {
  if (FAILED_DELETE_COUNTRIES.length > 0) {
    for (const handle of FAILED_DELETE_COUNTRIES) {
      console.log('Cleaning up SDK Country with ID', handle)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/countries/${handle}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Country ID ${handle} deleted`)
      } else {
        console.log(`Failed to delete Country ID ${handle}`, deleteResponse)
      }
    }
  }
})
