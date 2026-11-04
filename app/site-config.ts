function externalUrl(value: string | undefined): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}

export const socialLinks = [
  { label: 'LinkedIn', href: externalUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL), icon: 'linkedin' },
  { label: 'Instagram', href: externalUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL), icon: 'instagram' },
  { label: 'Facebook', href: externalUrl(process.env.NEXT_PUBLIC_FACEBOOK_URL), icon: 'facebook' },
] as const;

const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '').replace(/\D/g, '');

export const whatsappHref = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello, I would like to discuss an engineering project.')}`
  : '#contact';

export const whatsappIsConfigured = Boolean(whatsappNumber);
