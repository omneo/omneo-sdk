import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { RegionInput, Region } from '../../../../types'
import { getName, getHandle } from './util'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_REGIONS_HANDLES : number[] = []

describe('Regions created', () => {
  test('SDK created Region', async () => {
    const payload: RegionInput = {
      name: getName(),
      handle: getHandle()
    }
    const targetRegion: Region = await omneo.regions.create(payload).catch((err) => {
      console.error('SDK Country created failed:', err)
      throw new Error('SDK Country created failed')
    })
    CREATED_REGIONS_HANDLES.push(targetRegion.id)

    expect(targetRegion.name).toBe(payload.name)
    expect(targetRegion.handle).toBe(payload.handle)
    expect(targetRegion.is_default).toBeNull()
  })
})

afterAll(async () => {
  if (CREATED_REGIONS_HANDLES.length > 0) {
    for (const handle of CREATED_REGIONS_HANDLES) {
      console.log('Cleaning up SDK Regions with ID', handle)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/regions/${handle}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Region ID ${handle} deleted`)
      } else {
        console.log(`Failed to delete Region ID ${handle}`, deleteResponse)
      }
    }
  }
})
