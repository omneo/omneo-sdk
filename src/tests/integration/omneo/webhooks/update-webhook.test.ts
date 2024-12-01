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
  url: `https://example.com/webhook/update-${Date.now()}`,
  is_active: true,
  queue: 'low',
  retry_daily: false,
  retry_hourly: true,
  namespace: `sdk-test-webhook-update-${Date.now()}`,
  condition: null
}

const CREATED_WEBHOOKS = [] as number[]

describe('SDK Webhooks Update', () => {
  test('SDK can update a webhook', async () => {
    const { data: webhook } = await simpleOmneoRequest('POST', '/webhooks', webhookPayload)
    CREATED_WEBHOOKS.push(webhook.id)

    const updatePayload = {
      url: `https://www.updated-${Date.now()}-test.com`,
      trigger: 'products.created',
      is_active: false,
      queue: 'default',
      condition: { test: 123 },
      retry_daily: true
    }

    const sdkUpdatedWebhook = await omneo.webhooks.update(webhook.id, updatePayload)

    expect(sdkUpdatedWebhook.trigger).toEqual(updatePayload.trigger)
    expect(sdkUpdatedWebhook.url).toEqual(updatePayload.url)
    expect(sdkUpdatedWebhook.is_active).toEqual(updatePayload.is_active)
    expect(sdkUpdatedWebhook.queue).toEqual(updatePayload.queue)
    expect(sdkUpdatedWebhook.retry_daily).toEqual(updatePayload.retry_daily)
    expect(sdkUpdatedWebhook.condition).toEqual(updatePayload.condition)
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
