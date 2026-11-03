const EXTERNAL_LINK = /^(https?:|mailto:|tel:)/;

export function isExternalLink(href: string): boolean {
  return EXTERNAL_LINK.test(href);
}

export function telLink(phone: string): string {
  return `tel:${phone.replace(/\s+/g, '')}`;
}

export function mailLink(email: string): string {
  return `mailto:${email}`;
}

export function whatsAppLink(number: string, message?: string | null): string {
  const query = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${number}${query}`;
}

export function formatPhone(phone: string): string {
  const match = phone.match(/^\+(\d{3})(\d{3})(\d{3})(\d{3})$/);
  return match ? `+${match[1]} ${match[2]} ${match[3]} ${match[4]}` : phone;
}
