/* eslint-disable camelcase */
import { describe, expect, test } from 'vitest'
import { Omneo } from '../../../../omneo'
const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Role List', () => {
  test('SDK can list roles.', async () => {
    const { data } = await omneo.roles.list()
    expect(data.length).toBeGreaterThan(0)
  })
})
