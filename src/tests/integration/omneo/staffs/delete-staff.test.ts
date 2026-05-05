import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { CreateStaffInput } from '@types'
import { simpleOmneoRequest, getRandomString } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const FAILED_DELETE_STAFF_IDS: string[] = []

describe('Delete Staff', () => {
  test('SDK Delete Staff', async () => {
    const payload: CreateStaffInput = {
      first_name: 'SDK',
      last_name: 'StaffDelete',
      email: `${getRandomString('sdk_unit_test_delete_staff')}@example.com`,
      staff_id: getRandomString('sdk_unit_test_delete_staff_id'),
      joined_at: '2024-12-06 08:30:00'
    }

    const created = await omneoClient.staffs.create(payload)
    const staffId = String((created as any).id ?? '')
    if (!staffId) throw new Error('SDK Delete Staff setup failed: missing id in response')

    await omneoClient.staffs.delete(staffId as unknown as number).catch((err) => {
      console.error(`SDK Delete Staff failed for ID ${staffId}:`, err)
      FAILED_DELETE_STAFF_IDS.push(staffId)
      throw new Error(`SDK Delete Staff failed for ID ${staffId}`)
    })

    const fetchResponse = await simpleOmneoRequest('GET', `/staff/${staffId}`)
    expect(fetchResponse).toEqual(expect.objectContaining({ status: 404, statusText: 'Not Found' }))
  })
})

afterAll(async () => {
  for (const id of FAILED_DELETE_STAFF_IDS) {
    const response = await simpleOmneoRequest('DELETE', `/staff/${id}`)
    if (response.status === 204) {
      console.log(`SDK Staff ID ${id} deleted`)
    } else {
      console.log(`Failed to delete Staff ID ${id}`, response)
    }
  }
})
