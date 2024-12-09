import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { RegionInput } from '../../../../types'
import { getName, getHandle } from './util'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const FAILED_DELETE_REGIONS : number[] = []

describe('Regions delete', () => {
  test('SDK Regions delete', async () => {
    const payload: RegionInput = {
      name: getName(),
      handle: getHandle()
    }
    const response = await simpleOmneoRequest('POST', '/regions', payload)
    await omneo.regions.delete(response.data.id).catch((err) => {
      console.error(`SDK Region delete failed with id:${response.data.id}`, err)
      FAILED_DELETE_REGIONS.push(response.data.id)
      throw new Error(`SDK Region delete failed with id:${response.data.id}`)
    })

    const regionsRes = await omneo.regions.list({
      'filter[handle]': payload.handle
    })
    const { data: regions } = regionsRes
    expect(regions.length).toBe(0)
  })
})

afterAll(async () => {
  if (FAILED_DELETE_REGIONS.length > 0) {
    for (const id of FAILED_DELETE_REGIONS) {
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
