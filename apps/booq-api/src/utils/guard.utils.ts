import { randomBytes, createHash } from 'crypto';

export function generateApiKey(prefix = 'cf_public') {
  const raw = randomBytes(32).toString('hex');

  return `${prefix}_${raw}`;
}

export function hashApiKey(key: string) {
  return createHash('sha256').update(key).digest('hex');
}
