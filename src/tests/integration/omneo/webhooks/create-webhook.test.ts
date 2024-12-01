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
  url: `https://example.com/webhook/create-${Date.now()}`,
  is_active: true,
  queue: 'low',
  retry_daily: false,
  retry_hourly: true,
  namespace: `sdk-test-webhook-create-${Date.now()}`,
  condition: null
}

const CREATED_WEBHOOKS = [] as number[]

describe('SDK Webhooks Create', () => {
  test('SDK can create a webhook', async () => {
    const sdkWebhook = await omneo.webhooks.create(webhookPayload)

    expect(sdkWebhook).toHaveProperty('id')
    CREATED_WEBHOOKS.push(sdkWebhook.id)

    expect(sdkWebhook.trigger).toEqual(webhookPayload.trigger)
    expect(sdkWebhook.url).toEqual(webhookPayload.url)
    expect(sdkWebhook.is_active).toEqual(webhookPayload.is_active)
    expect(sdkWebhook.queue).toEqual(webhookPayload.queue)
    expect(sdkWebhook.retry_daily).toEqual(webhookPayload.retry_daily)
    expect(sdkWebhook.retry_hourly).toEqual(webhookPayload.retry_hourly)
    expect(sdkWebhook.condition).toEqual(webhookPayload.condition)
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
