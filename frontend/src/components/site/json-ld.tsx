// "<" is escaped so that text from the database can't close the script tag.
const serialise = (data: object) => JSON.stringify(data).replace(/</g, '\\u003c');

export function JsonLd({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialise(data) }} />
  );
}
