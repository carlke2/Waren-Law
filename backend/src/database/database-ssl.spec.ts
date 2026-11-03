import { databaseSslOptions } from './database-ssl.js';

describe('databaseSslOptions', () => {
  it('turns TLS off only when asked', () => {
    expect(databaseSslOptions({ DATABASE_SSL: 'disable', DATABASE_SSL_CA_PATH: undefined })).toBe(
      false,
    );
  });

  it('encrypts in require mode', () => {
    expect(
      databaseSslOptions({ DATABASE_SSL: 'require', DATABASE_SSL_CA_PATH: undefined }),
    ).toEqual({ rejectUnauthorized: false });
  });

  it('refuses verify mode without a CA file', () => {
    expect(() =>
      databaseSslOptions({ DATABASE_SSL: 'verify', DATABASE_SSL_CA_PATH: undefined }),
    ).toThrow(/DATABASE_SSL_CA_PATH/);
  });
});
