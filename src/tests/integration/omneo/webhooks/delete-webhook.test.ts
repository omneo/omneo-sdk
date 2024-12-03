/* eslint-disable camelcase */
import { afterAll, describe, expect, test } from 'vitest'
import { Omneo } from '../../../../omneo'
import { WebhookInput } from '../../../../types'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

const webhookPayload: WebhookInput = {
  trigger: 'profiles.create',
  url: `https://example.com/webhook/delete-${Date.now()}`,
  is_active: true,
  queue: 'low',
  retry_daily: false,
  retry_hourly: true,
  namespace: `sdk-test-webhook-delete-${Date.now()}`,
  condition: {
    and: [
      {
        not_in: [
          '@test@test.com',
          {
            var: 'profile.email'
          }
        ]
      }
    ]
  }
}

const CREATED_WEBHOOKS = [] as number[]

describe('SDK Webhooks Delete', () => {
  test('SDK can delete a webhook', async () => {
    const { data: webhook } = await simpleOmneoRequest('POST', '/webhooks', webhookPayload)

    if (!webhook.id) throw new Error('Failed to create webhook')
    CREATED_WEBHOOKS.push(webhook.id)

    await omneo.webhooks.delete(webhook.id)
    const fetchedWebhook = await simpleOmneoRequest('GET', `/webhooks/${webhook.id}`)
    expect(fetchedWebhook.message).toBe(`No query results for model [App\\Models\\Webhook] ${webhook.id}`)
  })
})

afterAll(async () => {
  if (CREATED_WEBHOOKS.length > 0) {
    for (const webhookID of CREATED_WEBHOOKS) {
      console.log('Cleaning up SDK Webhook with ID', webhookID)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/webhooks/${webhookID}`)
      if (deleteResponse.status < 200 || deleteResponse.status >= 300) {
        console.log('Failed to delete Webhook ID', webhookID)
      }
      if (deleteResponse.status === 204) {
        console.log(`SDK Webhook ID ${webhookID} deleted`)
      }
    }
  }
})