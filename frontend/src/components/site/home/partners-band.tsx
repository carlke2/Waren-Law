import { ROUTES, type TeamSummary } from '@waren/shared';
import Image from 'next/image';
import { SiteLink } from '@/components/ui/site-link';
import { GREY_PHOTO, memberPhoto } from '@/lib/utils/content/photo-files';
import { dictionary } from '@/lib/utils/dictionary';
import styles from './partners-band.module.css';

const PORTRAIT_SIZES = '(min-width: 64rem) 22vw, (min-width: 48rem) 40vw, 50vw';
const text = dictionary.home;

export function PartnersBand({ members }: { members: readonly TeamSummary[] }) {
  return (
    <section className={`${styles.section} rise`} aria-labelledby="home-team-heading">
      <div className={`site-container ${styles.shell}`}>
        <header className={styles.header}>
          <h2 id="home-team-heading" className={styles.headline}>
            {text.teamHeading}
          </h2>
          <span className={styles.rule} aria-hidden="true" />
        </header>

        <ul className={styles.list}>
          {members.map((member) => {
            const name = member.displayName ?? member.fullName;
            const photo = memberPhoto(member, GREY_PHOTO) ?? member.portrait;
            const href = member.hasProfile ? ROUTES.profile(member.slug) : null;
            const body = (
              <>
                <span className={styles.media}>
                  {photo ? (
                    <Image
                      src={photo.url}
                      alt={photo.alt || name}
                      fill
                      sizes={PORTRAIT_SIZES}
                      className={styles.photo}
                    />
                  ) : (
                    <span className="sr-only">{text.photoMissing}</span>
                  )}
                </span>
                <span className={href ? styles.name : styles.staticName}>{name}</span>
                <span className={href ? styles.title : styles.staticTitle}>{member.roleTitle}</span>
              </>
            );

            return (
              <li key={member.slug} className={styles.item}>
                {href ? (
                  <SiteLink href={href} className={styles.card}>
                    {body}
                  </SiteLink>
                ) : (
                  <div className={styles.card}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
