import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { BrandInput, BrandResponse } from '../../../../types'
import randomString from '../../../lib/string/random'
export const getName = () => { return `sdk_unit_test_brand_list_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}` }

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_BRANDS_IDS : number[] = []

describe('Brands list', () => {
  test('SDK List Brands', async () => {
    const payload: BrandInput = {
      name: getName(),
      handle: randomString(10).toLowerCase()
    }

    const response = await simpleOmneoRequest('POST', '/brands', payload)
    CREATED_BRANDS_IDS.push(response.data.id)

    const brandsRes: BrandResponse = await omneo.brands.list({
      'filter[name]': payload.name
    })
    const { data: brands } = brandsRes
    const filterBrands = brands.filter(d => d.name === payload.name)
    expect(filterBrands.length).toBe(1)

    const targetBrand = filterBrands[0]
    expect(targetBrand.id).toBe(response.data.id)
    expect(targetBrand.name).toBe(payload.name)
  })
})

afterAll(async () => {
  if (CREATED_BRANDS_IDS.length > 0) {
    for (const id of CREATED_BRANDS_IDS) {
      console.log('Cleaning up SDK Brands with ID', id)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/brands/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Brand ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Brand ID ${id}`, deleteResponse)
      }
    }
  }
})
