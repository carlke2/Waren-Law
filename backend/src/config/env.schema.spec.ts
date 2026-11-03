import { parseEnv } from './env.schema.js';

const valid = {
  DATABASE_URL: 'postgresql://user:pass@localhost:5432/db',
  FRONTEND_URL: 'http://localhost:3000',
  SESSION_SECRET: 'x'.repeat(32),
};

describe('parseEnv', () => {
  it('applies defaults', () => {
    const env = parseEnv(valid);
    expect(env.PORT).toBe(4000);
    expect(env.NODE_ENV).toBe('development');
  });

  it('treats empty SMTP values as unset', () => {
    const env = parseEnv({ ...valid, SMTP_HOST: '', SMTP_PORT: '' });
    expect(env.SMTP_HOST).toBeUndefined();
    expect(env.SMTP_PORT).toBeUndefined();
  });

  it('names invalid variables without printing their values', () => {
    expect(() => parseEnv({ ...valid, SESSION_SECRET: 'short-secret' })).toThrow(/SESSION_SECRET/);
    expect(() => parseEnv({ ...valid, SESSION_SECRET: 'short-secret' })).not.toThrow(
      /short-secret/,
    );
  });

  it('rejects a non-PostgreSQL database URL', () => {
    expect(() => parseEnv({ ...valid, DATABASE_URL: 'mysql://localhost/db' })).toThrow(
      /DATABASE_URL/,
    );
  });
});
