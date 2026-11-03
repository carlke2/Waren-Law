import type { ComponentProps, ReactNode } from 'react';

type IconProps = ComponentProps<'svg'>;

function Stroke({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

function Solid({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export const ChevronIcon = (props: IconProps) => (
  <Stroke {...props}>
    <path d="m6 9 6 6 6-6" />
  </Stroke>
);
export const MenuIcon = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Stroke>
);
export const CloseIcon = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Stroke>
);
export const SearchIcon = (props: IconProps) => (
  <Stroke {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Stroke>
);
export const ArrowIcon = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Stroke>
);
export const PhoneIcon = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v3a3 3 0 0 1-3 3A15 15 0 0 1 3 6a3 3 0 0 1 3-3z" />
  </Stroke>
);
export const MailIcon = (props: IconProps) => (
  <Stroke {...props}>
    <rect x="3" y="5" width="18" height="14" rx="1" />
    <path d="m3 7 9 6 9-6" />
  </Stroke>
);
export const CalendarIcon = (props: IconProps) => (
  <Stroke {...props}>
    <rect x="4" y="5" width="16" height="16" rx="1" />
    <path d="M4 10h16M8 3v4M16 3v4" />
  </Stroke>
);
export const PinIcon = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </Stroke>
);
export const PlayIcon = (props: IconProps) => (
  <Solid {...props}>
    <path d="M8 5v14l11-7z" />
  </Solid>
);
export const WhatsAppIcon = (props: IconProps) => (
  <Solid {...props}>
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.1.1-.1 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3 1 2.5c.1.2 1.6 2.5 3.9 3.5 1.4.6 2 .7 2.7.6.4-.1 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1 0-.1-.2-.2-.5-.3z" />
  </Solid>
);
export const LinkedInIcon = (props: IconProps) => (
  <Solid {...props}>
    <path d="M5 3.5A1.75 1.75 0 1 1 5 7a1.75 1.75 0 0 1 0-3.5zM3.5 8.5h3V20h-3V8.5zm5.5 0h2.9V10h.1a3.2 3.2 0 0 1 2.9-1.7c3 0 3.6 2 3.6 4.6V20h-3v-6.2c0-1.5 0-3.3-2-3.3s-2.3 1.6-2.3 3.2V20H9V8.5z" />
  </Solid>
);
export const FacebookIcon = (props: IconProps) => (
  <Solid {...props}>
    <path d="M14 8.5V6.8c0-.8.5-1 .9-1H17V2.3h-3C10.7 2.300 10 4.800 10 6.500v2H7.500V12H10v10h4V12h2.700l.4-3.500H14z" />
  </Solid>
);
export const InstagramIcon = (props: IconProps) => (
  <Stroke {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.2 6.800h.01" />
  </Stroke>
);
export const YouTubeIcon = (props: IconProps) => (
  <Solid {...props}>
    <path d="M22 8.200a3 3 0 0 0-2.100-2.100C18.100 5.5 12 5.5 12 5.500s-6.100 0-7.900.6A3 3 0 0 0 2 8.2 31 31 0 0 0 1.5 12c0 1.300.2 2.600.5 3.800a3 3 0 0 0 2.100 2.100c1.800.6 7.900.6 7.900.6s6.100 0 7.900-.6a3 3 0 0 0 2.100-2.100c.3-1.2.5-2.5.5-3.800s-.2-2.600-.5-3.800zM10 15V9l5.2 3-5.2 3z" />
  </Solid>
);
