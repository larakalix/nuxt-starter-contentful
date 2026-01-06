import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { envConfig } from 'src/config/env.config';
import * as schema from './schema/schema';

const pool = new Pool({
  connectionString: envConfig.databaseUrl,
  ssl: true,
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
    status: 'on_trial',
    email: 'ukikalix@gmail.com',
    slug: 'default-tenant',
  };

  const default_user: typeof schema.users.$inferInsert = {
    tenantId: '',
    email: 'ukikalix@gmail.com',
    name: 'Ivan Lara',
    passwordHash: 'hashed_password',
    role: 'admin',
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

    await tx.insert(schema.users).values({
      ...default_user,
      tenantId: tenant.id,
    });
  });
}

main()
  .then()
  .catch((err) => {
    console.error(err);
    process.exit(0);
  });
