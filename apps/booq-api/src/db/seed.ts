import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { envConfig } from './../config/env.config';
import * as schema from './schema/schema';

const pool = new Pool({
  connectionString: envConfig.databaseUrl,
  ssl: process.env.NODE_ENV === 'production' ? true : false,
});
const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;

async function main() {
  const default_languages: (typeof schema.languages.$inferInsert)[] = [
    { name: 'English', nativeName: 'English', code: 'en', isDefault: 'true' },
    { name: 'Spanish', nativeName: 'Español', code: 'es', isDefault: 'false' },
  ];

  const default_tenant: typeof schema.tenants.$inferInsert = {
    name: 'Default Tenant',
    currency: 'USD',
    country: 'US',
    timeZone: 'UTC',
    status: 'active',
    email: 'ukikalix@gmail.com',
    slug: 'default-tenant',
  };

  const default_user: typeof schema.users.$inferInsert = {
    tenantId: '',
    email: 'ukikalix@gmail.com',
    name: 'Ivan Lara',
    passwordHash:
      '$2y$10$5xF0nSCg9OKm.2xlIR3Feu89sc6v1AB1bfCemk5Njhbkfo6lDu.n.',
    role: 'admin',
  };

  const default_resources: (typeof schema.resources.$inferInsert)[] = [
    {
      tenantId: '',
      name: 'BMW 3 Series',
      description: 'A comfortable and stylish sedan perfect for city driving.',
      type: 'service',
      bookingMode: 'exclusive',
      status: 'available',
      price: 10000,
      createdBy: '',
    },
    {
      tenantId: '',
      name: 'Audi A4',
      description: 'A luxury sedan with advanced features and a smooth ride.',
      type: 'service',
      bookingMode: 'exclusive',
      status: 'available',
      price: 12000,
      createdBy: '',
    },
    {
      tenantId: '',
      name: 'Mercedes-Benz C-Class',
      description:
        'A premium sedan offering a blend of performance and elegance.',
      type: 'service',
      bookingMode: 'exclusive',
      status: 'available',
      price: 15000,
      createdBy: '',
    },
    {
      tenantId: '',
      name: 'Tesla Model 3',
      description:
        'An electric sedan with cutting-edge technology and impressive range.',
      type: 'service',
      bookingMode: 'exclusive',
      status: 'available',
      price: 20000,
      createdBy: '',
    },
  ];

  const default_api_keys: typeof schema.apiKeys.$inferInsert = {
    tenantId: '',
    name: 'Default API Key',
    // bq_public_ec40c28225e9545eca8c6290556869f866dd2de64993df0996256602a0513094
    keyHash: '7665911338f50eb3456f9d9b2cf914592c8869f49faeb8825b797cc1187811bb',
    createdBy: '',
  };

  await db.transaction(async (tx) => {
    await tx.insert(schema.languages).values(default_languages);
    const [tenant] = await tx
      .insert(schema.tenants)
      .values(default_tenant)
      .returning();

    if (!tenant.id) {
      throw new Error('Tenant creation failed');
    }

    const [user] = await tx
      .insert(schema.users)
      .values({
        ...default_user,
        tenantId: tenant.id,
      })
      .returning();

    await tx.insert(schema.resources).values(
      default_resources.map((resource) => ({
        ...resource,
        tenantId: tenant.id,
        createdBy: user.id,
      })),
    );

    await tx.insert(schema.apiKeys).values({
      ...default_api_keys,
      tenantId: tenant.id,
      createdBy: user.id,
    });
  });
}

main()
  .then()
  .catch((err) => {
    console.error(err);
    process.exit(0);
  });
