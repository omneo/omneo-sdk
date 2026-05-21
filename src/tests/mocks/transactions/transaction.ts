import { Transaction } from '@types'

const testProfileId = process.env.OMNEO_TEST_PROFILE_ID as string
const testLocationId = process.env.OMNEO_TEST_LOCATION_ID as string
const testProductId = process.env.OMNEO_TEST_PRODUCT_ID as string
const testProductVariantId = process.env.OMNEO_TEST_PRODUCT_VARIANT_ID as string

export const writeTransactionWithVariant = {
  profile_id: testProfileId,
  external_id: '9999999',
  receipt_ref: 'D172009999999',
  location_id: testLocationId,
  total: 100,
  total_original: 100,
  systems: [
    'CI'
  ],
  tags: [
    'ci',
    'test'
  ],
  items: [{
    name: 'GH ACTION TEST ITEM',
    quantity: 1,
    price_current: 100,
    price_sell: 100,
    price_tax: 10,
    price_original: 100,
    product_variant: {
      product_id: parseInt(testProductId),
      sku: 'gh-test-action-item-1',
      barcode: 'GHT-0001',
      title: 'GH ACTION TEST ITEM 1',
      brand: 'Omneo',
      category: 'Testing',
      price: 100
    },
    discounts: []
  }],
  payments: [],
  timezone: 'Australia/Melbourne',
  transacted_at: '2024-11-11 12:00:00',
  meta: {
    test: 'test'
  }
}

export const writeTransactionWithVariantID = {
  profile_id: testProfileId,
  external_id: '9999999',
  receipt_ref: 'D1729859045',
  location_id: testLocationId,
  total: 100,
  total_original: 100,
  systems: [
    'CI'
  ],
  tags: [
    'ci',
    'test'
  ],
  items: [{
    name: 'GH ACTION TEST ITEM',
    quantity: 1,
    price_current: 100,
    price_sell: 100,
    price_tax: 10,
    price_original: 100,
    product_variant_id: parseInt(testProductVariantId),
    discounts: []
  }],
  payments: [],
  timezone: 'Australia/Melbourne',
  transacted_at: '2024-11-11 12:00:00',
  meta: {
    test: 'test'
  }
}

export const readTransaction: Transaction = {
  id: 9999999,
  external_id: '9999999',
  redemption: null,
  reversed_redemptions: [],
  profile_id: testProfileId,
  profile: {
    email: 'subscriptions+githubactions@arkade.com.au'
  },
  location: {
    id: 1,
    type: null,
    name: null,
    description: null,
    phone: null,
    email: 'GH-ACTIONS@example.com',
    external_id: 'GH-ACTIONS',
    is_published: false,
    is_permanently_closed: false,
    address: null
  } as any,
  meta: {
    web_order_number: null
  },
  total: 100,
  total_original: 100,
  total_converted: 100,
  systems: [
    'CI'
  ],
  rounding: null,
  margin: 50,
  is_void: false,
  tags: [],
  items: [{
    id: 1,
    external_id: null as any,
    name: 'GH ACTION TEST ITEM',
    transaction_id: 111111111,
    product_id: 1,
    product_variant_id: 1,
    sku: null,
    variant_external_id: null as any,
    is_void: false,
    is_return: false,
    quantity: 1,
    price_current: 100,
    price_sell: 100,
    price_original: 100,
    price_margin: 10,
    price_tax: 10,
    discounts: null,
    department: null,
    meta: null,
    product_images: [],
    order_id: null as any,
    created_at: '2024-02-13 04:07:46',
    updated_at: '2024-02-13 04:07:46',
    pivot: [],
    product_variant: {
      id: 1,
      product_id: 1,
      sku: '1299388',
      external_id: '1111',
      barcode: '',
      web_url: null,
      handle: null,
      title: 'GH ACTION TEST ITEM',
      description: null,
      position: 1,
      price: 100,
      price_discounted: null,
      price_comparison: null,
      price_cost: null,
      available_quantity: null,
      images: [],
      meta: null,
      tags: [],
      options: [],
      created_at: '2024-02-06 20:57:48',
      updated_at: '2024-02-06 20:57:48'
    },
    product: {
      title: 'GH ACTION TEST ITEM',
      department: null,
      brand: 'Omneo'
    },
    transaction: {
      transacted_at: '2024-02-13 01:09:57',
      receipt_ref: 'D17200109877',
      external_id: '36865285'
    }
  }],
  payments: [{
    id: '110943824',
    web_order_number: null,
    payment_code: 'CASH',
    paymenttype_id: '506',
    payment_number: null,
    eftpos_cardtype: null,
    tender_value: 69,
    eftpos_stan: null,
    eftpos_authcode: null,
    eftpos_settlement: null,
    eftpos_reference: null,
    payment_ref1: null,
    payment_ref2: null,
    payment_ref3: null,
    payment_gateway: null
  }],
  receipt_is_email: false,
  receipt_ref: 'D17200109877',
  linked_receipt_ref: null,
  claimed_at: null,
  receipt_email: null,
  staff: {
    id: '9b461544-f0db-44b6-b559-0f698c881229' as any,
    full_name: 'GH ACTION TEST STAFF',
    email: 'staff-profile-sqdzljthztvdvsjn@omneo.io',
    identities: [{
      id: 1,
      handle: 'staff',
      identifier: '73648',
      is_primary: false,
      is_active: true,
      profile_id: '9b461544-f0db-44b6-b559-0f698c881555',
      merged_from: null,
      created_at: '2024-02-06 20:57:48',
      updated_at: '2024-02-06 20:57:48'
    }]
  },
  currency_id: 2,
  currency_rate: 1,
  currency: 'AUD',
  currency_values: [],
  type: null,
  status: null,
  order_number: null,
  order_id: null as any,
  external_order_id: null,
  need_action: null as any,
  custom_fields: [],
  organisation: null,
  fees: null,
  timezone: 'Australia/Melbourne',
  transacted_at: '2024-02-13 01:09:57',
  created_at: '2024-02-13 04:07:46',
  updated_at: '2024-02-13 04:07:46'
}

export default readTransaction as any
