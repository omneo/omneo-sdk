/* eslint-disable camelcase */
import { describe, expect, test } from 'vitest'
import { Omneo } from '../../../../omneo'
const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Role Get', () => {
  test('SDK can get a role by ID.', async () => {
    const role = await omneo.roles.get(1) // Omneo always has the role 1
    expect(role.id).toBe(1)
  })
})
