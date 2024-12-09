import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { Country, CountryInput } from '../../../../types'
import { getName, getIso2, getIso3, getIsoNumeric } from './util'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_COUNTRIES_HANDLES : number[] = []

describe('Countries update', () => {
  test('SDK Countries update', async () => {
    const updatedName = getName()
    const payload: CountryInput = {
      name: getName(),
      iso_2: getIso2(),
      iso_3: getIso3(),
      iso_numeric: getIsoNumeric(),
      sort_order: null
    }
    const response = await simpleOmneoRequest('POST', '/countries', payload)
    CREATED_COUNTRIES_HANDLES.push(response.data.id)

    const updateOrder = Math.floor(Math.random() * 100)
    const targetCountry: Country = await omneo.countries.update(response.data.id, {
      ...payload,
      name: updatedName,
      sort_order: updateOrder
    }).catch((err) => {
      console.error(`SDK Country updated failed with id:${response.data.id}`, err)
      throw new Error(`SDK Country updated failed with id:${response.data.id}`)
    })
    expect(targetCountry.name).toBe(updatedName)
    expect(targetCountry.iso_2).toBe(payload.iso_2)
    expect(targetCountry.iso_3).toBe(payload.iso_3)
    expect(targetCountry.iso_numeric).toBe(payload.iso_numeric)
    expect(targetCountry.sort_order).toBe(updateOrder)
  })
})

afterAll(async () => {
  if (CREATED_COUNTRIES_HANDLES.length > 0) {
    for (const id of CREATED_COUNTRIES_HANDLES) {
      console.log('Cleaning up SDK Country with ID', id)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/countries/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Country ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Country ID ${id}`, deleteResponse)
      }
    }
  }
})
