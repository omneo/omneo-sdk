import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import randomString from '../../../lib/string/random'

const CREATED_STATUS_IDS : number[] = []
const getHandle = () => `sdk_unit_test_status_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}`

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Statuses create', () => {
  test('SDK can create a status', async () => {
    const payload = {
      name: 'SDK Unit Test Status Create',
      handle: getHandle(),
      sort_order: 1,
      description: 'This is a test status created by the Omneo SDK unit tests',
      short_description: 'Short description',
      long_description: 'Long description',
      terms_conditions: 'Terms and conditions',
      icon: 'https://example.com',
      image_url: 'https://example.com',
      earn_instructions: 'Earn instructions',
      colour: 'Colour',
      text_colour: 'Text colour',
      code: 'Code',
      internal_notes: 'Internal Notes'
    }

    const status = await omneo.statuses.create(payload)
    CREATED_STATUS_IDS.push(status.id)

    expect(status).toHaveProperty('name', payload.name)
    expect(status).toHaveProperty('handle', payload.handle)
    expect(status).toHaveProperty('sort_order', payload.sort_order)
    expect(status).toHaveProperty('description', payload.description)
    expect(status).toHaveProperty('short_description', payload.short_description)
    expect(status).toHaveProperty('long_description', payload.long_description)
    expect(status).toHaveProperty('terms_conditions', payload.terms_conditions)
    expect(status).toHaveProperty('icon', payload.icon)
    expect(status).toHaveProperty('image_url', payload.image_url)
    expect(status).toHaveProperty('earn_instructions', payload.earn_instructions)
    expect(status).toHaveProperty('colour', payload.colour)
    expect(status).toHaveProperty('text_colour', payload.text_colour)
    expect(status).toHaveProperty('code', payload.code)
    expect(status).toHaveProperty('internal_notes', payload.internal_notes)
  })
})

afterAll(async () => {
  if (CREATED_STATUS_IDS.length > 0) {
    for (const statusId of CREATED_STATUS_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/statuses/${statusId}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Status ID ${statusId} deleted`)
      } else {
        console.log(`Failed to delete Status ID ${statusId}`, deleteResponse)
      }
    }
  }
})
