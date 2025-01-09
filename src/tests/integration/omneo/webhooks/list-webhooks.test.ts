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
  url: `https://example.com/webhook/list-${Date.now()}`,
  is_active: true,
  queue: 'low',
  retry_daily: false,
  retry_hourly: true,
  namespace: `sdk-test-webhook-list-${Date.now()}`,
  condition: null
}

const CREATED_WEBHOOKS = [] as number[]

describe('SDK Webhooks List', async () => {
  const { data: webhookActive } = await simpleOmneoRequest('POST', '/webhooks', webhookPayload)
  const { data: webhookInactive } = await simpleOmneoRequest('POST', '/webhooks', { ...webhookPayload, trigger: 'profile.updated' })
  if (!webhookActive.id || !webhookInactive.id) throw new Error('Failed to create webhooks')
  CREATED_WEBHOOKS.push(webhookActive.id, webhookInactive.id)

  test('SDK can list webhooks', async () => {
    const webhookList = await omneo.webhooks.list()

    expect(webhookList.data.length).toBeGreaterThan(0)
    const isDataValid = webhookList.data.every((webhook) => {
      return typeof webhook.id === 'number' &&
      typeof webhook.trigger === 'string' &&
      typeof webhook.url === 'string' &&
      typeof webhook.is_active === 'boolean' &&
      typeof webhook.namespace === 'string'
    })
    expect(isDataValid).toBe(true)
  })

  test('SDK can list active webhooks', async () => {
    const webhookList = await omneo.webhooks.list({ 'filter[is_active]': 1 })

    expect(webhookList.data.length).toBeGreaterThan(0)
    const isDataValid = webhookList.data.every((webhook) => webhook.is_active === true)
    expect(isDataValid).toBe(true)
  })
  test('SDK can list inactive webhooks', async () => {
    const webhookList = await omneo.webhooks.list({ 'filter[is_active]': 0 })

    expect(webhookList.data.length).toBeGreaterThan(0)
    const isDataValid = webhookList.data.every((webhook) => webhook.is_active === false)
    expect(isDataValid).toBe(true)
  })

  test('SDK can list webhooks by trigger', async () => {
    const webhookList = await omneo.webhooks.list({ 'filter[trigger]': 'profiles.create' })

    expect(webhookList.data.length).toBeGreaterThan(0)
    const isDataValid = webhookList.data.every((webhook) => webhook.trigger === 'profiles.create')
    expect(isDataValid).toBe(true)
  })

  test('SDK can list webhooks by namespace', async () => {
    const webhookList = await omneo.webhooks.list({ 'filter[namespace]': webhookPayload.namespace })

    expect(webhookList.data.length).toBeGreaterThan(0)
    const isDataValid = webhookList.data.every((webhook) => webhook.namespace === webhookPayload.namespace)
    expect(isDataValid).toBe(true)
  })
})

test('SDK can get webhooks with pagination', async () => {
  const { links, meta } = await omneo.webhooks.list()
  expect(links.first).toBeTypeOf('string')
  expect(links.last).toBeTypeOf('string')
  expect(links).toHaveProperty('prev')
  expect(links).toHaveProperty('next')

  // meta
  expect(meta.current_page).toBeTypeOf('number')
  expect(meta.from).toBeTypeOf('number')
  expect(meta.last_page).toBeTypeOf('number')
  expect(meta).toHaveProperty('links')
  expect(meta.path).toBeTypeOf('string')
  expect(meta.per_page).toBeTypeOf('number')
  expect(meta.to).toBeTypeOf('number')
  expect(meta.total).toBeTypeOf('number')
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
