import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { Brand, BrandInput } from '../../../../types'
import randomString from '../../../lib/string/random'
export const getName = () => { return `sdk_unit_test_brand_update_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}` }

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_BRANDS_IDS : number[] = []

describe('Brands update', () => {
  test('SDK Brands update', async () => {
    const updatedName = getName()
    const payload: BrandInput = {
      name: getName(),
      handle: randomString(10).toLowerCase()
    }
    const response = await simpleOmneoRequest('POST', '/brands', payload)
    CREATED_BRANDS_IDS.push(response.data.id)

    const targetBrand: Brand = await omneo.brands.update(response.data.id, {
      name: updatedName
    }).catch((err) => {
      console.error(`SDK Brand updated failed with id:${response.data.id}`, err)
      throw new Error(`SDK Brand updated failed with id:${response.data.id}`)
    })
    expect(targetBrand.name).toBe(updatedName)
  })
})

afterAll(async () => {
  if (CREATED_BRANDS_IDS.length > 0) {
    for (const id of CREATED_BRANDS_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/brands/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Brand ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Brand ID ${id}`, deleteResponse)
      }
    }
  }
})
