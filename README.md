# Ventures Engineering — Services Website

The website is built with the Next.js App Router, React, and TypeScript.

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Use `pnpm build` to create a production build and `pnpm start` to serve it.

## Contact form and social links

Copy `.env.example` to `.env.local` and set the real LinkedIn, Instagram, Facebook, and WhatsApp details. The map points to the Pune city center until an exact office address is provided. The contact API validates enquiries and forwards them to `CONTACT_WEBHOOK_URL`; set the webhook and optional bearer secret to enable delivery.

## Website content

The service descriptions, discipline navigation, and page layout live in `app/page.tsx`. Global page styling lives in `app/globals.css`.
