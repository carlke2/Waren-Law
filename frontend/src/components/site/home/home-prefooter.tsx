import { ROUTES, type HomeResponse, type OfficeResponse, type SiteSettings } from '@waren/shared';
import Image from 'next/image';
import { SiteLink } from '@/components/ui/site-link';
import { dictionary } from '@/lib/utils/dictionary';
import { whatsAppLink } from '@/lib/utils/links';
import styles from './home-prefooter.module.css';

const DESKTOP_BG = '/home/prefooter-bg.webp';
const MOBILE_BG = '/home/prefooter-bg-mobile.webp';
const text = dictionary.home;

function officeCities(offices: readonly OfficeResponse[]): string {
  const cities = offices.map(({ city }) => city.trim()).filter(Boolean);
  if (cities.length === 0) return '';
  if (cities.length === 1) return cities[0] ?? '';
  if (cities.length === 2) return `${cities[0]} & ${cities[1]}`;
  return `${cities.slice(0, -1).join(', ')} & ${cities.at(-1)}`;
}

function ScalesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v18M4 7h16M7 7l-3 7h6L7 7zm10 0l-3 7h6l-3-7z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 21h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 18.5V7.75A2.75 2.75 0 0 1 7.75 5h8.5A2.75 2.75 0 0 1 19 7.75v6A2.75 2.75 0 0 1 16.25 16.5H9.5L5 18.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 9.5h6M9 12.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8.2 4.8c.4-.9 1.5-1.2 2.3-.7l1.5.9c.7.4.9 1.3.5 2l-.7 1.2a1.5 1.5 0 0 0 .3 1.8l2.3 2.3a1.5 1.5 0 0 0 1.8.3l1.2-.7c.7-.4 1.6-.2 2 .5l.9 1.5c.5.8.2 1.9-.7 2.3l-1.3.6c-1 .4-2.2.2-3.3-.6-1.9-1.4-3.6-3.2-5-5.1-.8-1.1-1-2.3-.6-3.3l.6-1.3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomePrefooter({
  offices,
  bookingLabel,
  whatsApp,
}: {
  home: HomeResponse;
  offices: readonly OfficeResponse[];
  bookingLabel: string;
  whatsApp: SiteSettings['whatsApp'];
}) {
  const places = officeCities(offices);
  const chatHref = whatsAppLink(whatsApp.number, whatsApp.message);

  const cards = [
    ...(places
      ? [
          {
            key: 'offices',
            href: ROUTES.contact,
            external: false,
            ariaLabel: text.prefooterOfficesAria,
            icon: <ScalesIcon className={styles.icon ?? ''} />,
            title: text.prefooterOfficesTitle,
            description: text.prefooterOfficesDesc(places),
            action: text.prefooterOfficesAction,
          },
        ]
      : []),
    ...(whatsApp.number
      ? [
          {
            key: 'talk',
            href: chatHref,
            external: true,
            ariaLabel: text.prefooterTalkAria,
            icon: <ChatIcon className={styles.icon ?? ''} />,
            title: text.prefooterTalkTitle,
            description: text.prefooterTalkDesc,
            action: text.prefooterTalkAction,
          },
        ]
      : []),
    {
      key: 'contact',
      href: ROUTES.contact,
      external: false,
      ariaLabel: text.prefooterContactAria,
      icon: <PhoneIcon className={styles.icon ?? ''} />,
      title: text.prefooterContactTitle,
      description: text.prefooterContactDesc,
      action: text.prefooterContactAction,
    },
  ];

  return (
    <section className={`${styles.section} rise`} aria-labelledby="home-prefooter-heading">
      <div className={styles.media} aria-hidden="true">
        <Image
          src={DESKTOP_BG}
          alt=""
          fill
          sizes="100vw"
          className={`${styles.bgImg} ${styles.bgDesktop}`}
          priority={false}
        />
        <Image
          src={MOBILE_BG}
          alt=""
          fill
          sizes="100vw"
          className={`${styles.bgImg} ${styles.bgMobile}`}
          priority={false}
        />
      </div>
      <div className={styles.veil} aria-hidden="true" />

      <div className={`site-container ${styles.shell}`}>
        <div className={styles.copy}>
          <h2 id="home-prefooter-heading" className={styles.headline}>
            <span className={styles.headlineLead}>{text.prefooterHeadlineLead}</span>
            <span className={styles.headlineSub}>{text.prefooterHeadlineSub}</span>
          </h2>
          <span className={styles.rule} aria-hidden="true" />
          <p className={styles.body}>{text.prefooterBody}</p>
          <SiteLink href={ROUTES.consultation} className={styles.book}>
            {bookingLabel || dictionary.cta.consultation}
            <span className={styles.bookArrow} aria-hidden="true">
              {text.arrow}
            </span>
          </SiteLink>
        </div>

        <ul className={styles.cards}>
          {cards.map((card) => {
            const className = styles.card;
            const body = (
              <>
                <span className={styles.cardTop}>
                  <span className={styles.iconWrap}>{card.icon}</span>
                  <span className={styles.divider} aria-hidden="true" />
                  <span className={styles.cardCopy}>
                    <span className={styles.cardTitle}>{card.title}</span>
                    <span className={styles.cardDesc}>{card.description}</span>
                  </span>
                </span>
                <span className={styles.cardAction}>
                  {card.action}
                  <span className={styles.cardActionArrow} aria-hidden="true">
                    {text.arrow}
                  </span>
                </span>
              </>
            );

            return (
              <li key={card.key}>
                {card.external ? (
                  <a
                    href={card.href}
                    className={className}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={card.ariaLabel}
                  >
                    {body}
                  </a>
                ) : (
                  <SiteLink href={card.href} className={className} aria-label={card.ariaLabel}>
                    {body}
                  </SiteLink>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
