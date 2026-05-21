      auth: sdk 路由列表
         └─ DELETE /auth/api-tokens/:tokensId, True
         └─ GET /auth/verify, True
         └─ GET /auth/access-tokens, True
         └─ POST /auth/api-tokens, True
      profiles: sdk 路由列表
         └─ DELETE /profiles/:profilesId, True
         └─ DELETE /profiles/:profilesId/purge, True
         └─ DELETE /profiles/:profilesId/lists/:listsId, True
         └─ DELETE /profiles/:profilesId/regions/:regionsId, True
         └─ DELETE /profiles/:profilesId/identities/id/:idId, True
         └─ DELETE /profiles/:profilesId/benefits/:benefitsId, True
         └─ DELETE /profiles/:profilesId/addresses/:addressesId, True
         └─ DELETE /profiles/:profilesId/identities/:identitiesId, True
         └─ DELETE /profiles/:profilesId/attributes/dates/:datesId, True
         └─ DELETE /profiles/:profilesId/interactions/:interactionsId, True
         └─ DELETE /profiles/:profilesId/transactions/claims/:claimsId, True
         └─ DELETE /profiles/:profilesId/lists/:listsId/items/:itemsId, True
         └─ DELETE /profiles/:profilesId/lists/:listsId/shares/:sharesId, True
         └─ GET /profiles, True
         └─ GET /profiles/:profilesId, True
         └─ GET /profiles/:profilesId/lists, True
         └─ GET /profiles/:profilesId/tiers, True
         └─ GET /profiles/attributes/custom, True
         └─ GET /profiles/:profilesId/resync, True
         └─ GET /profiles/:profilesId/points, True
         └─ GET /profiles/:profilesId/orders, True
         └─ GET /profiles/:profilesId/ledgers, True
         └─ GET /profiles/:profilesId/regions, True
         └─ GET /profiles/:profilesId/credits, True
         └─ GET /profiles/:profilesId/rewards, True
         └─ GET /profiles/:profilesId/balances, True
         └─ GET /profiles/:profilesId/benefits, True
         └─ GET /profiles/:profilesId/addresses, True
         └─ GET /profiles/:profilesId/identities, True
         └─ GET /profiles/:profilesId/redemptions, True
         └─ GET /profiles/:profilesId/connections, True
         └─ GET /profiles/:profilesId/aggregations, True
         └─ GET /profiles/:profilesId/achievements, True
         └─ GET /profiles/:profilesId/transactions, True
         └─ GET /profiles/:profilesId/interactions, True
         └─ GET /profiles/:profilesId/reservations, True
         └─ GET /profiles/:profilesId/group_orders, True
         └─ GET /profiles/:profilesId/tiers/points, True
         └─ GET /profiles/:profilesId/lists/:listsId, True
         └─ GET /profiles/:profilesId/tiers/calculate, True
         └─ GET /profiles/:profilesId/points/:pointsId, True
         └─ GET /profiles/:profilesId/attributes/comms, True
         └─ GET /profiles/:profilesId/attributes/dates, True
         └─ GET /profiles/:profilesId/orders/:ordersId, True
         └─ GET /profiles/:profilesId/find-transactions, True
         └─ GET /profiles/:profilesId/benefits/viewable, True
         └─ GET /profiles/:profilesId/attributes/custom, True
         └─ GET /profiles/:profilesId/group_transactions, True
         └─ GET /profiles/:profilesId/benefits/claimable, True
         └─ GET /profiles/:profilesId/ledgers/:ledgersId, True
         └─ GET /profiles/:profilesId/rewards/:rewardsId, True
         └─ GET /profiles/:profilesId/transactions/claims, True
         └─ GET /profiles/:profilesId/redeemable_benefits, True
         └─ GET /profiles/:profilesId/identities/id/:idId, True
         └─ GET /profiles/:profilesId/transaction-products, True
         └─ GET /profiles/:profilesId/benefits/:benefitsId, True
         └─ GET /profiles/:profilesId/lists/:listsId/items, True
         └─ GET /profiles/:profilesId/attributes/appearance, True
         └─ GET /profiles/:profilesId/addresses/:addressesId, True
         └─ GET /profiles/:profilesId/aggregations/calculate, True
         └─ GET /profiles/:profilesId/identities/:identitiesId, True
         └─ GET /profiles/:profilesId/redemptions/:redemptionsId, True
         └─ GET /profiles/:profilesId/transactions/:transactionsId, True
         └─ GET /profiles/:profilesId/lists/:listsId/custom-fields, True
         └─ GET /profiles/:profilesId/transactions/claims/:claimsId, True
         └─ GET /profiles/:profilesId/lists/:listsId/items/:itemsId, True
         └─ GET /profiles/:profilesId/transactions/:transactionsId/unattach, True
         └─ GET /profiles/:profilesId/connections/:connectionsId/profileInfo, True
         └─ GET /profiles/:profilesId/achievements/:achievementsId/achievement-points, True
         └─ POST /profiles, True
         └─ POST /profiles/sync, True
         └─ POST /profiles/merge, True
         └─ POST /profiles/batch, True
         └─ POST /profiles/search-id, True
         └─ POST /profiles/availability, True
         └─ POST /profiles/:profilesId/lists, True
         └─ POST /profiles/:profilesId/redeem, True
         └─ POST /profiles/:profilesId/regions, True
         └─ POST /profiles/:profilesId/addresses, True
         └─ POST /profiles/:profilesId/identities, True
         └─ POST /profiles/:profilesId/achievements, True
         └─ POST /profiles/:profilesId/tiers/assign, True
         └─ POST /profiles/:profilesId/benefits/claim, True
         └─ POST /profiles/:profilesId/transactions/claims, True
         └─ POST /profiles/:profilesId/lists/:listsId/items, True
         └─ POST /profiles/:profilesId/benefits/claim-redeem, True
         └─ POST /profiles/:profilesId/lists/:listsId/custom, True
         └─ POST /profiles/:profilesId/lists/:listsId/shares, True
         └─ POST /profiles/:profilesId/credits/:creditsId/redeem, True
         └─ POST /profiles/:profilesId/benefits/:benefitsId/redeem, True
         └─ POST /profiles/:profilesId/lists/:listsId/custom-fields, True
         └─ POST /profiles/:profilesId/transactions/items/:itemsId/list-item, True
         └─ PUT /profiles/:profilesId, True
         └─ PUT /profiles/:profilesId/update-type, True
         └─ PUT /profiles/:profilesId/lists/:listsId, True
         └─ PUT /profiles/:profilesId/attributes/comms, True
         └─ PUT /profiles/:profilesId/attributes/dates, True
         └─ PUT /profiles/:profilesId/regions/:regionsId, True
         └─ PUT /profiles/:profilesId/identities/id/:idId, True
         └─ PUT /profiles/:profilesId/benefits/:benefitsId, True
         └─ PUT /profiles/:profilesId/attributes/appearance, True
         └─ PUT /profiles/:profilesId/addresses/:addressesId, True
         └─ PUT /profiles/:profilesId/identities/:identitiesId, True
         └─ PUT /profiles/:profilesId/connections/:connectionsId, True
         └─ PUT /profiles/:profilesId/lists/:listsId/items/:itemsId, True
      lists: sdk 路由列表
         └─ DELETE /lists/definitions/:definitionsId, True
         └─ GET /lists/definitions, True
         └─ GET /lists/definitions/:definitionsId, True
         └─ POST /lists/definitions, True
         └─ PUT /lists/definitions/:definitionsId, True
      achievements: sdk 路由列表
         └─ DELETE /achievements/definitions/:definitionsId, True
         └─ GET /achievements/definitions, True
         └─ GET /achievements/definitions/:definitionsId, True
         └─ POST /achievements/definitions, True
         └─ PUT /achievements/definitions/:definitionsId, True
      audits: sdk 路由列表
         └─ GET /audits, True
         └─ GET /audits/:auditsId, True
      benefits: sdk 路由列表
         └─ DELETE /benefits/:benefitsId, True
         └─ DELETE /benefits/definitions/:definitionsId, True
         └─ GET /benefits, True
         └─ GET /benefits/definitions, True
         └─ GET /benefits/:benefitsId, True
         └─ GET /benefits/definitions/:definitionsId, True
         └─ GET /benefits/definitions/handle/:handleId, True
         └─ POST /benefits, True
         └─ POST /benefits/extend, True
         └─ POST /benefits/definitions, True
         └─ POST /benefits/definitions/:definitionsId/clone, True
         └─ PUT /benefits/:benefitsId, True
         └─ PUT /benefits/definitions/:definitionsId, True
      benefits.count: sdk 路由列表
         └─ GET /benefits.count, True
      credits: sdk 路由列表
         └─ DELETE /credits/:creditsId, True
         └─ DELETE /credits/definitions/:definitionsId, True
         └─ GET /credits, True
         └─ GET /credits/:creditsId, True
         └─ GET /credits/definitions, True
         └─ GET /credits/definitions/:definitionsId, True
         └─ POST /credits, True
         └─ POST /credits/extend, True
         └─ POST /credits/definitions, True
         └─ PUT /credits/:creditsId, True
         └─ PUT /credits/definitions/:definitionsId, True
      transactions: sdk 路由列表
         └─ DELETE /transactions/:transactionsId, True
         └─ GET /transactions, True
         └─ GET /transactions/:transactionsId, True
         └─ GET /transactions/external/:externalId, True
         └─ POST /transactions, True
         └─ POST /transactions/queue, True
         └─ POST /transactions/update-create, True
         └─ PUT /transactions/:transactionsId, True
      locations: sdk 路由列表
         └─ DELETE /locations/:locationsId, True
         └─ GET /locations, True
         └─ GET /locations/:locationsId, True
         └─ POST /locations, True
         └─ PUT /locations/:locationsId, True
      tenants: sdk 路由列表
         └─ GET /tenants/custom-fields, True
         └─ POST /tenants/custom-fields, True
      currencies: sdk 路由列表
         └─ GET /currencies, True
      interactions: sdk 路由列表
         └─ DELETE /interactions/:interactionsId, True
         └─ GET /interactions, True
         └─ GET /interactions/:interactionsId, True
         └─ POST /interactions, True
         └─ PUT /interactions/:interactionsId, True
      permissions: sdk 路由列表
         └─ GET /permissions, True
         └─ GET /permissions/:permissionsId, True
      points: sdk 路由列表
         └─ DELETE /points/definitions/:definitionsId, True
         └─ GET /points, True
         └─ GET /points/:pointsId, True
         └─ GET /points/definitions, True
         └─ GET /points/definitions/:definitionsId, True
         └─ POST /points, True
         └─ POST /points/definitions, True
         └─ PUT /points/definitions/:definitionsId, True
      products: sdk 路由列表
         └─ DELETE /products/:productsId, True
         └─ DELETE /products/:productsId/variants/:variantsId, True
         └─ GET /products, True
         └─ GET /products/variants, True
         └─ GET /products/:productsId, True
         └─ GET /products/:productsId/variants, True
         └─ GET /products/:productsId/variants/:variantsId, True
         └─ POST /products, True
         └─ POST /products/queue, True
         └─ PUT /products/:productsId, True
         └─ PUT /products/:productsId/variants/:variantsId, True
      brands: sdk 路由列表
         └─ DELETE /brands/:brandsId, True
         └─ GET /brands, True
         └─ GET /brands/:brandsId, True
         └─ POST /brands, True
         └─ PUT /brands/:brandsId, True
      rewards: sdk 路由列表
         └─ DELETE /rewards/:rewardsId, True
         └─ DELETE /rewards/definitions/:definitionsId, True
         └─ GET /rewards, True
         └─ GET /rewards/:rewardsId, True
         └─ GET /rewards/definitions, True
         └─ GET /rewards/definitions/:definitionsId, True
         └─ POST /rewards, True
         └─ POST /rewards/definitions, True
         └─ PUT /rewards/:rewardsId, True
         └─ PUT /rewards/definitions/:definitionsId, True
      connections: sdk 路由列表
         └─ DELETE /connections/:connectionsId, True
         └─ GET /connections, True
         └─ GET /connections/:connectionsId, True
         └─ POST /connections, True
      targets: sdk 路由列表
         └─ DELETE /targets/:targetsId, True
         └─ GET /targets, True
         └─ GET /targets/:targetsId, True
         └─ POST /targets, True
         └─ PUT /targets/:targetsId, True
      settings: sdk 路由列表
         └─ GET /settings, True
         └─ GET /settings/environment, True
         └─ GET /settings/:settingsId, True
         └─ PUT /settings/:settingsId, True
      statuses: sdk 路由列表
         └─ DELETE /statuses/:statusesId, True
         └─ GET /statuses, True
         └─ GET /statuses/:statusesId, True
         └─ POST /statuses, True
         └─ PUT /statuses/:statusesId, True
      systems: sdk 路由列表
         └─ DELETE /systems/:systemsId, True
         └─ GET /systems, True
         └─ GET /systems/:systemsId, True
         └─ POST /systems, True
      tags: sdk 路由列表
         └─ DELETE /tags/:tagsId, True
         └─ GET /tags, True
         └─ GET /tags/:tagsId, True
         └─ POST /tags, True
      orders: sdk 路由列表
         └─ DELETE /orders/:ordersId, True
         └─ GET /orders, True
         └─ GET /orders/:ordersId, True
         └─ POST /orders, True
         └─ PUT /orders/:ordersId, True
      tiers: sdk 路由列表
         └─ DELETE /tiers/definitions/:definitionsId, True
         └─ GET /tiers/points, True
         └─ GET /tiers/definitions, True
         └─ GET /tiers/points/:pointsId, True
         └─ GET /tiers/definitions/:definitionsId, True
         └─ POST /tiers/points, True
         └─ POST /tiers/definitions, True
         └─ PUT /tiers/definitions/:definitionsId, True
      identities: sdk 路由列表
         └─ GET /identities, True
         └─ GET /identities/search-profile/:profileId, True
      webhooks: sdk 路由列表
         └─ DELETE /webhooks/:webhooksId, True
         └─ GET /webhooks, True
         └─ GET /webhooks/:webhooksId, True
         └─ POST /webhooks, True
         └─ PUT /webhooks/:webhooksId, True
      roles: sdk 路由列表
         └─ GET /roles, True
         └─ GET /roles/:rolesId, True
      users: sdk 路由列表
         └─ DELETE /users/:usersId, True
         └─ GET /users, True
         └─ GET /users/me, True
         └─ GET /users/:usersId, True
         └─ POST /users, True
         └─ PUT /users/:usersId, True
      automations: sdk 路由列表
         └─ DELETE /automations/:automationsId, True
         └─ GET /automations, True
         └─ GET /automations/:automationsId, True
         └─ GET /automations/:automationsId/actions, True
         └─ POST /automations, True
         └─ POST /automations/:automationsId/trigger, True
         └─ PUT /automations/:automationsId, True
      triggers: sdk 路由列表
         └─ DELETE /triggers/:triggersId, True
         └─ GET /triggers, True
         └─ GET /triggers/:triggersId, True
         └─ GET /triggers/:triggersId/actions, True
         └─ POST /triggers, True
         └─ POST /triggers/:triggersId/actions, True
         └─ PUT /triggers/:triggersId, True
      regions: sdk 路由列表
         └─ DELETE /regions/:regionsId, True
         └─ GET /regions, True
         └─ GET /regions/:regionsId, True
         └─ POST /regions, True
         └─ PUT /regions/:regionsId, True
      countries: sdk 路由列表
         └─ DELETE /countries/:countriesId, True
         └─ GET /countries, True
         └─ GET /countries/:countriesId, True
         └─ POST /countries, True
         └─ PUT /countries/:countriesId, True

total routes: 494
total sdk routes: 281
missing routes: 213
missing routes by category:
api: 1 个缺失路由
└─ GET /api/health
auth: 15 个缺失路由
└─ DELETE /auth/tokens/:tokensId
└─ DELETE /auth/clients/:clientsId
└─ DELETE /auth/personal-access-tokens/:tokensId
└─ GET /auth/tokens
└─ GET /auth/scopes
└─ GET /auth/authorize
└─ GET /auth/api-tokens
└─ GET /auth/personal-access-tokens
└─ GET,POST,PUT,DELETE /auth/personal-access-tokens
└─ GET,POST,PUT,DELETE /auth/personal-access-tokens/:tokensId
└─ POST /auth/token
└─ POST /auth/delegate
└─ POST /auth/discovery
└─ POST /auth/token/refresh
└─ POST /auth/personal-access-tokens
{modelType}: 4 个缺失路由
└─ DELETE /{modelType}/savedfilter/:savedfilterId
└─ GET /{modelType}/savedfilter
└─ POST /{modelType}/savedfilter
└─ PUT /{modelType}/savedfilter/:savedfilterId
profiles: 28 个缺失路由
└─ DELETE /profiles/:profilesId/orders/:ordersId
└─ DELETE /profiles/:profilesId/rewards/:rewardsId
└─ DELETE /profiles/:profilesId/attributes/custom/:customId
└─ DELETE /profiles/:profilesId/lists/:listsId/custom-fields/:fieldsId
└─ GET /profiles/:profilesId/linked_points
└─ GET /profiles/:profilesId/regions/:regionsId
└─ GET /profiles/:profilesId/linked_redemptions
└─ GET /profiles/:profilesId/linked/redemptions
└─ GET /profiles/:profilesId/lists/:listsId/shares
└─ GET /profiles/:profilesId/attributes/custom/:customId
└─ GET /profiles/:profilesId/interactions/:interactionsId
└─ GET /profiles/:profilesId/transactionitems/list/:listId
└─ GET /profiles/:profilesId/lists/:listsId/shares/:sharesId
└─ GET /profiles/:profilesId/redemptions/:redemptionsId/{id}/count
└─ GET /profiles/:profilesId/lists/:listsId/custom-fields/:fieldsId
└─ POST /profiles/exists
└─ POST /profiles/batch.json
└─ POST /profiles/:profilesId/orders
└─ POST /profiles/:profilesId/rewards
└─ POST /profiles/:profilesId/custom-event
└─ POST /profiles/:profilesId/addresses/upsert
└─ POST /profiles/:profilesId/attributes/custom
└─ PUT /profiles/:profilesId/aggregations
└─ PUT /profiles/:profilesId/orders/:ordersId
└─ PUT /profiles/:profilesId/rewards/:rewardsId
└─ PUT /profiles/:profilesId/attributes/custom/:customId
└─ PUT /profiles/:profilesId/lists/:listsId/shares/:sharesId
└─ PUT /profiles/:profilesId/lists/:listsId/custom-fields/:fieldsId
list: 5 个缺失路由
└─ DELETE /list/items/:itemsId/reservations/:reservationsId
└─ GET /list/items/:itemsId/reservations
└─ GET /list/items/:itemsId/reservations/:reservationsId
└─ POST /list/items/:itemsId/reservations
└─ PUT /list/items/:itemsId/reservations/:reservationsId
lists: 3 个缺失路由
└─ GET /lists/:listsId
└─ GET /lists/shares/:sharesId
└─ GET /lists/shares/:sharesId/no_profile
allocations: 3 个缺失路由
└─ GET /allocations
└─ GET /allocations/:allocationsId/count
└─ POST /allocations/batch.json
audits: 3 个缺失路由
└─ DELETE /audits/:auditsId
└─ POST /audits
└─ PUT /audits/:auditsId
benefits: 2 个缺失路由
└─ GET /benefits/:benefitsId/trigger-target/:targetId
└─ POST /benefits/batch.json
staff: 4 个缺失路由
└─ DELETE /staff/:staffId
└─ GET /staff/:staffId
└─ POST /staff
└─ PUT /staff/:staffId
shares: 6 个缺失路由
└─ DELETE /shares/:sharesId
└─ GET /shares
└─ GET /shares/:sharesId
└─ POST /shares
└─ POST /shares/:sharesId/claim
└─ PUT /shares/:sharesId
transactions: 17 个缺失路由
└─ DELETE /transactions/:transactionsId/items/:itemsId
└─ DELETE /transactions/:transactionsId/custom-fields/:fieldsId
└─ GET /transactions/:transactionsId/items
└─ GET /transactions/:transactionsId/custom-fields
└─ GET /transactions/:transactionsId/items/:itemsId
└─ GET /transactions/:transactionsId/custom-fields/:fieldsId
└─ POST /transactions/batch.json
└─ POST /transactions/queue/create
└─ POST /transactions/incentive-estimate
└─ POST /transactions/:transactionsId/items
└─ POST /transactions/items/:itemsId/resend
└─ POST /transactions/:transactionsId/resend
└─ POST /transactions/items/:itemsId/list-item
└─ POST /transactions/:transactionsId/custom-fields
└─ POST /transactions/:transactionsId/event-trigger
└─ PUT /transactions/items/:itemsId
└─ PUT /transactions/:transactionsId/custom-fields/:fieldsId
locations: 7 个缺失路由
└─ DELETE /locations/:locationsId/custom-fields/:fieldsId
└─ GET /locations/:locationsId/{id}
└─ GET /locations/:locationsId/custom-fields
└─ GET /locations/:locationsId/custom-fields/:fieldsId
└─ POST /locations/batch.json
└─ POST /locations/:locationsId/custom-fields
└─ PUT /locations/:locationsId/custom-fields/:fieldsId
tenants: 4 个缺失路由
└─ DELETE /tenants/custom-fields/:fieldsId
└─ GET /tenants/custom-fields/:fieldsId
└─ POST /tenants/custom-event
└─ PUT /tenants/custom-fields/:fieldsId
custom-fields: 5 个缺失路由
└─ DELETE /custom-fields/:fieldsId/{id}/{customField}
└─ DELETE /custom-fields/:fieldsId/{id}/batchJsonDelete
└─ GET /custom-fields/search
└─ GET /custom-fields/:fieldsId/{id}
└─ POST /custom-fields/:fieldsId/{id}
currencies: 4 个缺失路由
└─ DELETE /currencies/:currenciesId
└─ GET /currencies/:currenciesId
└─ POST /currencies
└─ PUT /currencies/:currenciesId
organisations: 8 个缺失路由
└─ DELETE /organisations/:organisationsId
└─ DELETE /organisations/:organisationsId/profiles/:profilesId
└─ GET /organisations
└─ GET /organisations/:organisationsId
└─ GET /organisations/:organisationsId/profiles
└─ POST /organisations
└─ POST /organisations/:organisationsId/profiles
└─ PUT /organisations/:organisationsId
permissions: 3 个缺失路由
└─ DELETE /permissions/:permissionsId
└─ POST /permissions
└─ PUT /permissions/:permissionsId
products: 4 个缺失路由
└─ POST /products/batch.json
└─ POST /products/create-update
└─ POST /products/update-create
└─ POST /products/:productsId/variants
customProducts: 5 个缺失路由
└─ DELETE /customProducts/:customProductsId
└─ GET /customProducts
└─ GET /customProducts/:customProductsId
└─ POST /customProducts
└─ PUT /customProducts/:customProductsId
departments: 5 个缺失路由
└─ DELETE /departments/:departmentsId
└─ GET /departments
└─ GET /departments/:departmentsId
└─ POST /departments
└─ PUT /departments/:departmentsId
ratings: 5 个缺失路由
└─ DELETE /ratings/:ratingsId
└─ GET /ratings
└─ GET /ratings/:ratingsId
└─ POST /ratings
└─ PUT /ratings/:ratingsId
redemptions: 4 个缺失路由
└─ GET /redemptions/group/:groupId
└─ POST /redemptions/:redemptionsId/return
└─ POST /redemptions/:redemptionsId/reversal
└─ POST /redemptions/:redemptionsId/benefit/return
rewards: 3 个缺失路由
└─ GET /rewards/:rewardsId/trigger-target/:targetId
└─ POST /rewards/extend
└─ POST /rewards/batch.json
connection: 5 个缺失路由
└─ DELETE /connection/definitions/:definitionsId
└─ GET /connection/definitions
└─ GET /connection/definitions/:definitionsId
└─ POST /connection/definitions
└─ PUT /connection/definitions/:definitionsId
connections: 1 个缺失路由
└─ PUT /connections/:connectionsId
imports: 12 个缺失路由
└─ DELETE /imports/:importsId
└─ GET /imports
└─ GET /imports/:importsId
└─ GET /imports/:importsId/jobs
└─ GET /imports/:importsId/jobs/:jobsId
└─ POST /imports
└─ POST /imports/file
└─ POST /imports/manual
└─ POST /imports/condition
└─ POST /imports/:importsId/jobs
└─ POST /imports/:importsId/jobs/export
└─ POST /imports/:importsId/jobs/batch.json
settings: 2 个缺失路由
└─ DELETE /settings/:settingsId
└─ POST /settings
reminders: 5 个缺失路由
└─ DELETE /reminders/:remindersId
└─ GET /reminders
└─ GET /reminders/:remindersId
└─ POST /reminders
└─ PUT /reminders/:remindersId
orders: 9 个缺失路由
└─ DELETE /orders/:ordersId/items/:itemsId
└─ GET /orders/:ordersId/items
└─ GET /orders/:ordersId/items/:itemsId
└─ POST /orders/queue
└─ POST /orders/batch.json
└─ POST /orders/queue/create
└─ POST /orders/:ordersId/items
└─ POST /orders/:ordersId/resend
└─ PUT /orders/:ordersId/items/:itemsId
tiers: 2 个缺失路由
└─ DELETE /tiers/points/:pointsId
└─ PUT /tiers/points/:pointsId
webhooks: 1 个缺失路由
└─ POST /webhooks/batch.json
roles: 5 个缺失路由
└─ DELETE /roles/definitions/:definitionsId
└─ GET /roles/definitions
└─ GET /roles/definitions/:definitionsId
└─ POST /roles/definitions
└─ PUT /roles/definitions/:definitionsId
automations: 5 个缺失路由
└─ DELETE /automations/:automationsId/actions/:actionsId
└─ GET /automations/:automationsId/actions/:actionsId
└─ POST /automations/queries/samples
└─ POST /automations/:automationsId/actions
└─ PUT /automations/:automationsId/actions/:actionsId
triggers: 3 个缺失路由
└─ DELETE /triggers/:triggersId/actions/:actionsId
└─ GET /triggers/:triggersId/actions/:actionsId
└─ PUT /triggers/:triggersId/actions/:actionsId
action-history: 2 个缺失路由
└─ GET /action-history
└─ GET /action-history/:historyId
product-lists: 1 个缺失路由
└─ GET /product-lists/search
rates: 7 个缺失路由
└─ DELETE /rates/:ratesId
└─ GET /rates
└─ GET /rates/:ratesId
└─ GET /rates/searchAttributes/:searchAttributesId
└─ POST /rates
└─ POST /rates/calculate
└─ PUT /rates/:ratesId
profile: 5 个缺失路由
└─ DELETE /profile/tags/batch.json
└─ DELETE /profile/status/batch.json
└─ POST /profile/tags/batch.json
└─ POST /profile/status/batch.json
└─ POST /profile/aggregations/batch.json
