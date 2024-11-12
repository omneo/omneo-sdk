import { Transaction, TransactionInput } from '../../../types'

export const writeTransaction: TransactionInput = {
  profile_id: '9d7796e5-f8a0-4611-aa61-e6872a6a4393',
  external_id: '9999999',
  receipt_ref: 'D172009999999',
  location_id: '49',
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
      product_id: 1981205,
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

export const readTransaction: Transaction = {
  id: 9999999,
  external_id: '9999999',
  redemption: null,
  profile_id: '9a690c37-5bec-44f4-b6b3-8cbe11e46276',
  profile: {
    email: 'subscriptions+githubactions@arkade.com.au'
  },
  location: {
    id: 49,
    type: null,
    name: null,
    description: null,
    phone: null,
    email: null,
    external_id: 'GH-ACTIONS',
    is_published: false,
    is_permanently_closed: false,
    address: null
  },
  meta: {
    web_order_number: null
  },
  total: 69,
  total_original: 69,
  total_converted: 69,
  systems: [
    'CI'
  ],
  rounding: null,
  margin: 43,
  is_void: false,
  tags: [],
  items: [{
    id: 2542,
    external_id: null,
    name: 'GH ACTION TEST ITEM',
    transaction_id: 7479194,
    product_id: 227266,
    product_variant_id: 227266,
    sku: null,
    variant_external_id: null,
    is_void: false,
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
    order_id: null,
    created_at: '2024-02-13 04:07:46',
    updated_at: '2024-02-13 04:07:46',
    pivot: [],
    product_variant: {
      id: 227266,
      product_id: 227266,
      sku: '1299388',
      external_id: 227266,
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
  claimed_at: null,
  receipt_email: null,
  staff: {
    id: '9b461544-f0db-44b6-b559-0f698c881229',
    full_name: null,
    email: 'staff-profile-sqdzljthztvdvsjn@omneo.io',
    identities: [{
      id: 1955,
      handle: 'staff',
      identifier: '73648',
      is_primary: false,
      is_active: true,
      profile_id: '9b461544-f0db-44b6-b559-0f698c881229',
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
  order_id: null,
  external_order_id: null,
  need_action: null,
  custom_fields: [],
  timezone: 'Australia/Melbourne',
  transacted_at: '2024-02-13 01:09:57',
  created_at: '2024-02-13 04:07:46',
  updated_at: '2024-02-13 04:07:46'
}

export default readTransaction
