import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { CreateStaffInput } from '@types'
import { simpleOmneoRequest, getRandomString } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_STAFF_IDS: string[] = []

describe('List Staff', () => {
  test('SDK List Staff', async () => {
    const payload: CreateStaffInput = {
      first_name: 'SDK',
      last_name: 'StaffList',
      email: `${getRandomString('sdk_unit_test_list_staff')}@example.com`,
      staff_id: getRandomString('sdk_unit_test_list_staff_id'),
      joined_at: '2024-12-06 08:30:00'
    }

    const created = await omneoClient.staffs.create(payload)
    const staffId = String((created as any).id ?? '')
    if (!staffId) throw new Error('SDK List Staff setup failed: missing id in response')
    CREATED_STAFF_IDS.push(staffId)

    const response: any = await omneoClient.staffs.list(staffId).catch((err) => {
      console.error('SDK List Staff failed:', err)
      throw new Error('SDK List Staff failed')
    })

    expect(response).toBeDefined()
    expect(response.data).toBeDefined()
    if (Array.isArray(response.data)) {
      const found = response.data.find((staff: any) => String(staff.id) === staffId)
      expect(found).toBeDefined()
      expect(found?.email).toBe(payload.email)
    } else {
      expect(String(response.data.id)).toBe(staffId)
      expect(response.data.email).toBe(payload.email)
    }
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
