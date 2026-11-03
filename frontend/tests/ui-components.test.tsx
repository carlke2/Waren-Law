import { render, screen, within } from '@testing-library/react';
import { Accordion } from '@/components/ui/accordion';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button, ButtonLink } from '@/components/ui/button';
import { FilterChips } from '@/components/ui/filter-chips';
import { Input } from '@/components/ui/form';
import { Pagination } from '@/components/ui/pagination';
import { Heading } from '@/components/ui/typography';
import { pageItems } from '@/lib/utils/pagination';

const labels = {
  navigation: 'Pagination',
  previous: 'Previous',
  next: 'Next',
  page: (page: number) => `Page ${page}`,
};

describe('pageItems', () => {
  it('lists every page when there are few', () => {
    expect(pageItems(2, 4)).toEqual([1, 2, 3, 4]);
  });

  it('adds gaps around the current page', () => {
    expect(pageItems(5, 9)).toEqual([1, 'gap', 4, 5, 6, 'gap', 9]);
  });

  it('handles the first and last pages', () => {
    expect(pageItems(1, 9)).toEqual([1, 2, 'gap', 9]);
    expect(pageItems(9, 9)).toEqual([1, 'gap', 8, 9]);
  });
});

describe('Pagination', () => {
  it('renders nothing for one page', () => {
    const { container } = render(
      <Pagination current={1} total={1} hrefFor={String} labels={labels} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('marks the current page and links neighbours', () => {
    render(<Pagination current={2} total={3} hrefFor={(p) => `/p/${p}/`} labels={labels} />);
    expect(screen.getByRole('link', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Previous' })).toHaveAttribute('href', '/p/1/');
    expect(screen.getByRole('link', { name: 'Next' })).toHaveAttribute('href', '/p/3/');
  });
});

describe('Button', () => {
  it('defaults to type button so it never submits by accident', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('type', 'button');
  });

  it('opens external links safely in a new tab', () => {
    render(<ButtonLink href="https://example.test">Out</ButtonLink>);
    const link = screen.getByRole('link', { name: 'Out' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('never gives gold buttons white text', () => {
    render(<Button variant="accent">Gold</Button>);
    const classes = screen.getByRole('button', { name: 'Gold' }).className;
    expect(classes).toContain('text-navy-900');
    expect(classes).not.toContain('text-on-dark');
  });
});

describe('Form controls', () => {
  it('links the label and error to the control', () => {
    render(<Input label="Email" error="Enter a valid email" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Enter a valid email');
  });
});

describe('Accordion', () => {
  it('uses native details so it works by keyboard without script', () => {
    const { container } = render(
      <Accordion items={[{ id: 'a', title: 'Question', content: 'Answer' }]} />,
    );
    expect(container.querySelector('details summary')).toHaveTextContent('Question');
  });
});

describe('FilterChips', () => {
  it('marks the active chip and uses real links', () => {
    render(
      <FilterChips
        label="Filter"
        chips={[
          { key: 'a', label: 'All', href: '/t/', active: true },
          { key: 'b', label: 'Debt', href: '/t/?x=debt', active: false },
        ]}
      />,
    );
    const nav = screen.getByRole('navigation', { name: 'Filter' });
    expect(within(nav).getByRole('link', { name: 'All' })).toHaveAttribute('aria-current', 'page');
    expect(within(nav).getByRole('link', { name: 'Debt' })).toHaveAttribute('href', '/t/?x=debt');
  });
});

describe('Breadcrumbs', () => {
  it('marks the last crumb as current', () => {
    render(
      <Breadcrumbs label="Crumb" crumbs={[{ label: 'Home', href: '/' }, { label: 'Here' }]} />,
    );
    expect(screen.getByText('Here')).toHaveAttribute('aria-current', 'page');
  });
});

describe('Heading', () => {
  it('can look like a larger size while keeping its level', () => {
    render(
      <Heading level={2} size="display">
        Title
      </Heading>,
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveClass('text-display');
  });
});
