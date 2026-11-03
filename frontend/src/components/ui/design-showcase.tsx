'use client';

import { Accordion } from './accordion';
import { Breadcrumbs } from './breadcrumbs';
import { Button, ButtonLink } from './button';
import { Badge, Card } from './card';
import { FilterChips } from './filter-chips';
import { Checkbox, Input, Select, Textarea } from './form';
import * as Icons from './icons';
import { Section, VisuallyHidden } from './layout';
import { Pagination } from './pagination';
import { Eyebrow, Heading, Lead, Prose } from './typography';

const SAMPLE = 'Sample text';
const pageLabels = {
  navigation: 'Pagination',
  previous: 'Previous',
  next: 'Next',
  page: (page: number) => `Page ${page}`,
};

export function DesignShowcase() {
  return (
    <main>
      <Section>
        <Eyebrow>{SAMPLE}</Eyebrow>
        <Heading level={1} size="display">
          Display heading
        </Heading>
        <Heading level={2}>Heading two</Heading>
        <Heading level={3}>Heading three</Heading>
        <Heading level={4}>Heading four</Heading>
        <Lead>Lead paragraph with a comfortable line length.</Lead>
        <Prose className="mt-6">
          <p>
            Body text with <a href="#sample">a link</a> and <strong>strong text</strong>.
          </p>
          <ul>
            <li>List item</li>
          </ul>
          <blockquote>A quotation</blockquote>
        </Prose>
      </Section>
      <Section tone="white">
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="link">Link</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
          <ButtonLink href="#sample">As link</ButtonLink>
        </div>
      </Section>
      <Section tone="navy">
        <Heading level={2}>Dark section</Heading>
        <Lead>Text on navy.</Lead>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button variant="accent">Accent</Button>
          <Button variant="outline-dark">Outline</Button>
          <Badge>Badge</Badge>
        </div>
      </Section>
      <Section tone="sand">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <Badge>Badge</Badge>
            <Heading level={3}>Card</Heading>
            <p>{SAMPLE}</p>
          </Card>
          <form className="grid gap-4">
            <Input label="Input" required requiredMark="(required)" hint="A hint" />
            <Input label="Input with error" error="This field has an error" />
            <Textarea label="Textarea" rows={3} />
            <Select label="Select">
              <option>One</option>
            </Select>
            <Checkbox label="Checkbox" />
          </form>
        </div>
      </Section>
      <Section tone="white">
        <div className="grid gap-8">
          <Accordion
            items={[
              { id: 'one', title: 'Accordion item one', content: SAMPLE },
              { id: 'two', title: 'Accordion item two', content: SAMPLE },
            ]}
          />
          <FilterChips
            label="Filter"
            chips={[
              { key: 'all', label: 'All', href: '#all', active: true },
              { key: 'one', label: 'Option', href: '#one', active: false },
            ]}
          />
          <Breadcrumbs
            label="Breadcrumb"
            crumbs={[{ label: 'Home', href: '#home' }, { label: 'Current' }]}
          />
          <Pagination
            current={4}
            total={9}
            hrefFor={(page) => `#page-${page}`}
            labels={pageLabels}
          />
          <div className="flex flex-wrap gap-3 text-navy-900">
            {Object.entries(Icons).map(([name, Icon]) => (
              <span key={name} title={name}>
                <Icon className="size-6" />
                <VisuallyHidden>{name}</VisuallyHidden>
              </span>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
