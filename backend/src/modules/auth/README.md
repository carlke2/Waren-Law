Authentication for admin users: email and password, httpOnly session cookie, session expiry (`Session.expiresAt`, `lastSeenAt`), password reset by email (`PasswordResetToken`) and rate-limited sign-in.

Roles: **Admin** manages everything, including admin users, settings and redirects. **Editor** manages content, media and enquiries only. Admins will also use TOTP two-factor sign-in, built in the security phase (T083).

Rule: one backend module per feature (controller + service + DTOs + tests in this folder).
