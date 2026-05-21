import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { RequestCreateStaff, Staff, RequestUpdateStaff } from '@types'
import { simpleOmneoRequest, getRandomString } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_STAFF_IDS: string[] = []

describe('Update Staff', () => {
  test.skip('SDK Update Staff', async () => {
    const createPayload: RequestCreateStaff = {
      first_name: 'SDK',
      last_name: 'StaffUpdate',
      email: `${getRandomString('sdk_unit_test_update_staff')}@example.com`,
      staff_id: getRandomString('sdk_unit_test_update_staff_id'),
      joined_at: '2024-12-06 08:30:00'
    }

    const created = await omneoClient.staffs.create(createPayload)
    const staffId = String((created as any).id ?? '')
    if (!staffId) throw new Error('SDK Update Staff setup failed: missing id in response')
    CREATED_STAFF_IDS.push(staffId)

    const updatePayload: RequestUpdateStaff = {
      first_name: 'SDKUpdated',
      last_name: 'StaffUpdated'
    }

    const staff: Staff = await omneoClient.staffs.update(staffId as unknown as number, updatePayload).catch((err) => {
      console.error('SDK Update Staff failed:', err)
      throw new Error('SDK Update Staff failed')
    })

    expect(staff).toBeDefined()
    expect(String((staff as any).id)).toBe(staffId)
    expect(staff.first_name!.toLowerCase()).toBe(String(updatePayload.first_name).toLowerCase())
    expect(staff.last_name!.toLowerCase()).toBe(String(updatePayload.last_name).toLowerCase())
    expect(staff.email).toBe(createPayload.email)
  })
})

afterAll(async () => {
  for (const id of CREATED_STAFF_IDS) {
    const response = await simpleOmneoRequest('DELETE', `/staff/${id}`)
    if (response.status === 204) {
      console.log(`SDK Staff ID ${id} deleted`)
    } else {
      console.log(`Failed to delete Staff ID ${id}`, response)
    }
  }
})
