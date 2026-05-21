import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { RequestCreateStaff, Staff } from '@types'
import { simpleOmneoRequest, getRandomString } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_STAFF_IDS: string[] = []

describe('Create Staff', () => {
  test('SDK Create Staff', async () => {
    const payload: RequestCreateStaff = {
      first_name: 'SDK',
      last_name: 'StaffCreate',
      email: `${getRandomString('sdk_unit_test_create_staff')}@example.com`,
      staff_id: getRandomString('sdk_unit_test_create_staff_id'),
      joined_at: '2024-12-06 08:30:00'
    }

    const staff: Staff = await omneoClient.staffs.create(payload).catch((err) => {
      console.error('SDK Create Staff failed:', err)
      throw new Error('SDK Create Staff failed')
    })

    const id = String((staff as any).id ?? '')
    if (!id) throw new Error('SDK Create Staff failed: missing id in response')
    CREATED_STAFF_IDS.push(id)

    expect(staff).toBeDefined()
    expect(staff.first_name!.toLowerCase()).toBe(payload.first_name.toLowerCase())
    expect(staff.last_name!.toLowerCase()).toBe(payload.last_name.toLowerCase())
    expect(staff.email).toBe(payload.email)
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
