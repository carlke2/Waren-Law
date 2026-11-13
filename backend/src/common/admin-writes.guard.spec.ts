import { ForbiddenException, type ExecutionContext } from '@nestjs/common';
import type { Env } from '../config/config.module.js';
import { AdminWritesGuard, isAdminWrite } from './admin-writes.guard.js';

function contextFor(method: string, path: string): ExecutionContext {
  return {
    switchToHttp: () => ({ getRequest: () => ({ method, path }) }),
  } as unknown as ExecutionContext;
}

function guard(allowed: boolean) {
  return new AdminWritesGuard({ ADMIN_WRITES_ALLOWED: allowed } as Env);
}

describe('isAdminWrite', () => {
  it('matches changes under the admin API only', () => {
    expect(isAdminWrite('POST', '/api/v1/admin/team')).toBe(true);
    expect(isAdminWrite('delete', '/api/v1/admin')).toBe(true);
    expect(isAdminWrite('GET', '/api/v1/admin/team')).toBe(false);
    expect(isAdminWrite('POST', '/api/v1/contact')).toBe(false);
    expect(isAdminWrite('POST', '/api/v1/administrator')).toBe(false);
  });
});

describe('AdminWritesGuard', () => {
  it('refuses admin changes when writes are off', () => {
    expect(() => guard(false).canActivate(contextFor('PATCH', '/api/v1/admin/team/1'))).toThrow(
      ForbiddenException,
    );
  });

  it('allows admin reads and public forms when writes are off', () => {
    expect(guard(false).canActivate(contextFor('GET', '/api/v1/admin/team'))).toBe(true);
    expect(guard(false).canActivate(contextFor('POST', '/api/v1/contact'))).toBe(true);
  });

  it('allows admin changes when writes are on', () => {
    expect(guard(true).canActivate(contextFor('PATCH', '/api/v1/admin/team/1'))).toBe(true);
  });
});
