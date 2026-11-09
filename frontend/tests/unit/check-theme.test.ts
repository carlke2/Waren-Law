import { findThemeViolations } from '../../../scripts/check-theme';

describe('findThemeViolations', () => {
  it.each([
    ['a hex colour', '<div style={{ color: "#0B1A4A" }} />'],
    ['a colour function', 'const shade = "rgba(7, 15, 42, 0.5)";'],
    ['a pixel value', '<div className="gap" style={{ width: "24px" }} />'],
    ['a font name', 'const heading = "Newsreader";'],
    ['an arbitrary Tailwind value', '<div className="w-[37rem]" />'],
    ['a default Tailwind colour', '<div className="bg-blue-500" />'],
  ])('flags %s', (_name, source) => {
    expect(findThemeViolations(source)).toHaveLength(1);
  });

  it('accepts semantic tokens, anchors and state variants', () => {
    const source = '<a href="#main" className="bg-brand text-on-brand data-[open=true]:hidden" />';
    expect(findThemeViolations(source)).toEqual([]);
  });

  it('names the line it found', () => {
    expect(findThemeViolations('ok\nconst c = "#fff";')[0]).toContain('line 2: hex colour');
  });
});
