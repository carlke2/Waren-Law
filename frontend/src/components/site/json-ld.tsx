const UNSAFE_IN_SCRIPT = /</g;

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(UNSAFE_IN_SCRIPT, '\\u003c'),
      }}
    />
  );
}
