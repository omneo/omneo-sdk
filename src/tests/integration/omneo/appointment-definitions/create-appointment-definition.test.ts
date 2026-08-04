import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { AppointmentDefinition, CreateAppointmentDefinitionInput } from '@types'
import { simpleOmneoRequest, getRandomString } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_APPOINTMENT_DEFINITION_IDS: number[] = []

// Concurrent definition creates intermittently return a bare 500 from the
// live API, so retry those; validation errors still fail immediately
const createDefinitionWithRetry = async (payload: CreateAppointmentDefinitionInput): Promise<AppointmentDefinition> => {
  let lastError: any
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await omneoClient.appointmentDefinitions.create(payload)
    } catch (err: any) {
      if (err?.errors) throw err
      console.log(`Create Appointment Definition attempt ${attempt} hit a server error, retrying`)
      lastError = err
    }
  }
  throw lastError
}

describe('Create Appointment Definition', () => {
  test('SDK Create Appointment Definition', async () => {
    const payload: CreateAppointmentDefinitionInput = {
      handle: getRandomString('sdk_unit_test_create_appointment_definition_handle'),
      name: getRandomString('sdk_unit_test_create_appointment_definition_name'),
      duration_minutes: 30,
      booking_type: 'instant',
      normal_hours: [
        { day_of_week: 'MON', available_from: '09:00', available_until: '17:00' }
      ],
      short_description: 'SDK unit test appointment definition',
      buffer_before_minutes: 5,
      buffer_after_minutes: 5,
      min_lead_minutes: 0,
      max_advance_days: 30,
      slot_interval_minutes: 15,
      allow_customer_booking: true,
      requires_staff: false,
      allow_waitlist: true,
      allow_queue: false,
      is_published: false
    }

    const definition: AppointmentDefinition = await createDefinitionWithRetry(payload).catch((err) => {
      console.error('SDK Create Appointment Definition failed:', err)
      throw new Error('SDK Create Appointment Definition failed')
    })
    CREATED_APPOINTMENT_DEFINITION_IDS.push(definition.id)

    expect(definition).toBeDefined()
    expect(definition.handle).toBe(payload.handle)
    expect(definition.name).toBe(payload.name)
    expect(definition.duration_minutes).toBe(payload.duration_minutes)
    expect(definition.booking_type).toBe(payload.booking_type)
    expect(definition.short_description).toBe(payload.short_description)
    expect(definition.buffer_before_minutes).toBe(payload.buffer_before_minutes)
    expect(definition.buffer_after_minutes).toBe(payload.buffer_after_minutes)
    expect(definition.min_lead_minutes).toBe(payload.min_lead_minutes)
    expect(definition.max_advance_days).toBe(payload.max_advance_days)
    expect(definition.slot_interval_minutes).toBe(payload.slot_interval_minutes)
    expect(definition.allow_customer_booking).toBe(payload.allow_customer_booking)
    expect(definition.requires_staff).toBe(payload.requires_staff)
    expect(definition.allow_waitlist).toBe(payload.allow_waitlist)
    expect(definition.allow_queue).toBe(payload.allow_queue)
    expect(definition.is_published).toBe(payload.is_published)
  })

  test('SDK Create Appointment Definition with inline normal hours', async () => {
    const payload: CreateAppointmentDefinitionInput = {
      handle: getRandomString('sdk_unit_test_create_appointment_definition_hours_handle'),
      name: getRandomString('sdk_unit_test_create_appointment_definition_hours_name'),
      duration_minutes: 45,
      booking_type: 'approval_required',
      normal_hours: [
        { day_of_week: 'MON', available_from: '09:00', available_until: '17:00' },
        { day_of_week: 'TUE', available_from: '09:00', available_until: '17:00' }
      ]
    }

    const definition: AppointmentDefinition = await createDefinitionWithRetry(payload).catch((err) => {
      console.error('SDK Create Appointment Definition with inline normal hours failed:', err)
      throw new Error('SDK Create Appointment Definition with inline normal hours failed')
    })
    CREATED_APPOINTMENT_DEFINITION_IDS.push(definition.id)

    expect(definition).toBeDefined()
    expect(definition.booking_type).toBe(payload.booking_type)
    expect(definition.normal_hours).toBeDefined()
    expect(definition.normal_hours?.length).toBe(2)
    expect(definition.normal_hours?.[0]).toHaveProperty('day_of_week')
    expect(definition.normal_hours?.[0]).toHaveProperty('available_from')
  })
})

afterAll(async () => {
  for (const id of CREATED_APPOINTMENT_DEFINITION_IDS) {
    const response = await simpleOmneoRequest('DELETE', `/appointment-definitions/${id}`)
    if (response.status === 204) {
      console.log(`SDK Appointment Definition ID ${id} deleted`)
    } else {
      console.log(`Failed to delete Appointment Definition ID ${id}`, response)
    }
  }
})
