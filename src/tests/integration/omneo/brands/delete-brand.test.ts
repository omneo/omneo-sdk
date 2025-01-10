import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { BrandInput } from '../../../../types'
import randomString from '../../../lib/string/random'
export const getName = () => { return `sdk_unit_test_brand_delete_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}` }

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const FAILED_DELETE_BRANDS : number[] = []

describe('Brands delete', () => {
  test('SDK Brands delete', async () => {
    const payload: BrandInput = {
      name: getName(),
      handle: randomString(10).toLowerCase()
    }
    const createdBrand = await simpleOmneoRequest('POST', '/brands', payload)
    await omneo.brands.delete(createdBrand.data.id).catch((err) => {
      console.error(`SDK Brand delete failed with id:${createdBrand.data.id}`, err)
      FAILED_DELETE_BRANDS.push(createdBrand.data.id)
      throw new Error(`SDK Brand delete failed with id:${createdBrand.data.id}`)
    })

    const deleteResponse = await simpleOmneoRequest('GET', `/brands/${createdBrand.data.id}`)
    if (deleteResponse?.body?.id && !FAILED_DELETE_BRANDS.find((t) => t === createdBrand.data.id)) {
      FAILED_DELETE_BRANDS.push(createdBrand.data.id)
    }
    expect(deleteResponse.status).toEqual(404)
  })
})

afterAll(async () => {
  if (FAILED_DELETE_BRANDS.length > 0) {
    for (const id of FAILED_DELETE_BRANDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/brands/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Brand ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Brand ID ${id}`, deleteResponse)
      }
    }
  }
})
