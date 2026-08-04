import simpleOmneoRequest from './simple-omneo-request'
import { getRandomString } from './string/util'

const WEEK_DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

// The live API requires normal_hours when creating an appointment definition
export const DEFINITION_ALL_WEEK_HOURS = WEEK_DAYS.map((day) => {
  return { day_of_week: day, available_from: '09:00', available_until: '17:00' }
})

// Availability is the intersection of definition hours and location hours, so
// appointment tests seed their own location with full-week opening hours
// rather than relying on the tenant's (sparsely configured) locations.
export const seedAppointmentTestLocation = async () => {
  const response = await simpleOmneoRequest('POST', '/locations', {
    name: getRandomString('sdk_unit_test_appointment_location'),
    handle: getRandomString('sdk_unit_test_appointment_location_handle'),
    timezone: 'Australia/Melbourne',
    phone: '+61390000000',
    normal_hours: WEEK_DAYS.map((day) => {
      return { day_of_week: day, open_at: '08:00', close_at: '18:00' }
    })
  })
  return response.data
}

export const futureDate = (daysAhead: number): string => {
  const date = new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000)
  return date.toISOString().split('T')[0]
}

// Concurrent appointment-definition creates intermittently return 500 from
// the live API, so seeding retries before failing the suite
export const seedAppointmentDefinition = async (payload: { [key: string]: any }) => {
  let response
  for (let attempt = 1; attempt <= 3; attempt++) {
    response = await simpleOmneoRequest('POST', '/appointment-definitions', payload)
    if (response?.data?.id) return response
    console.log(`Appointment definition seed attempt ${attempt} failed`, response)
  }
  throw Error('Failed to seed appointment definition')
}
