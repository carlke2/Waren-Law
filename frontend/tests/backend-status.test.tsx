import { render, screen } from '@testing-library/react';
import { BackendStatus } from '@/components/site/backend-status';

describe('BackendStatus', () => {
  it('shows the backend and database state', () => {
    render(<BackendStatus health={{ status: 'ok', database: 'up' }} />);
    expect(screen.getByRole('status')).toHaveTextContent('Backend: ok · Database: up');
  });

  it('says so when the backend is unreachable', () => {
    render(<BackendStatus health={null} />);
    expect(screen.getByRole('status')).toHaveTextContent('Backend: unreachable');
  });
});
