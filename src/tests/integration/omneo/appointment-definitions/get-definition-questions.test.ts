import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { simpleOmneoRequest, getRandomString, seedAppointmentDefinition } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_APPOINTMENT_DEFINITION_IDS: number[] = []

describe('Get Appointment Definition Questions', () => {
  test('SDK Get Appointment Definition Questions', async () => {
    const seeded = await seedAppointmentDefinition({
      handle: getRandomString('sdk_unit_test_definition_questions_handle'),
      name: getRandomString('sdk_unit_test_definition_questions_name'),
      duration_minutes: 30,
      booking_type: 'instant',
      normal_hours: [
        { day_of_week: 'MON', available_from: '09:00', available_until: '17:00' }
      ]
    }).then(({ data }) => data)
    CREATED_APPOINTMENT_DEFINITION_IDS.push(seeded.id)

    const questions = await omneoClient.appointmentDefinitions.getQuestions(seeded.id).catch((err) => {
      console.error('SDK Get Appointment Definition Questions failed:', err)
      throw new Error('SDK Get Appointment Definition Questions failed')
    })

    expect(questions).toBeDefined()
    expect(questions).toHaveProperty('questionnaire')
    expect(questions).toHaveProperty('questions')
    // Definition has no booking questionnaire, so the form is empty
    expect(questions.questionnaire).toBeNull()
    expect(Array.isArray(questions.questions)).toBe(true)
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
