import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import randomString from '../../../lib/string/random'

const FAILED_DELETED_SYSTEM_IDS : number[] = []
const getHandle = () => `sdk_unit_test_system_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}`

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Systems delete', () => {
  test('SDK can delete a system', async () => {
    const payload = {
      handle: getHandle()
    }

    const { data: createdData } = await simpleOmneoRequest('POST', '/systems', payload)
    await omneo.systems.delete(createdData.id).catch(() => {
      FAILED_DELETED_SYSTEM_IDS.push(createdData.id)
    })
    const deleteResponse = await simpleOmneoRequest('GET', `/systems/${createdData.id}`)
    if (deleteResponse?.body?.id && !FAILED_DELETED_SYSTEM_IDS.find((t) => t === createdData.id)) {
      FAILED_DELETED_SYSTEM_IDS.push(createdData.id)
    }
    expect(deleteResponse.status).toEqual(404)
  })
})

afterAll(async () => {
  if (FAILED_DELETED_SYSTEM_IDS.length > 0) {
    for (const systemId of FAILED_DELETED_SYSTEM_IDS) {
      console.log('Cleaning up SDK System with ID', systemId)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/systems/${systemId}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK System ID ${systemId} deleted`)
      } else {
        console.log(`Failed to delete System ID ${systemId}`, deleteResponse)
      }
    }
  }
})
