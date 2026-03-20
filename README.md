# Wood Buffalo Paving Temp

Static Cloudflare Pages copy of the Wood Buffalo Paving site with Resend-backed form handlers.

## What’s included

- A single-page static site that mirrors the public Wood Buffalo Paving homepage structure.
- Responsive image treatment using assets pulled from the live site.
- Cloudflare Pages Functions for contact and subscribe forms.

## Required environment variables

Set these in Cloudflare Pages before enabling the forms:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_TO_EMAIL`

If `RESEND_FROM_EMAIL` and `RESEND_TO_EMAIL` are not set, the functions fall back to:

- From: `Wood Buffalo Paving <onboarding@resend.dev>`
- To: `info@wbpaving.ca`

## Deploying to Cloudflare Pages

1. Connect this repository to Cloudflare Pages.
2. Use the repository root as the build output directory.
3. Leave the build command empty unless you add a framework later.
4. Add the Resend environment variables in the Pages settings.

## Form endpoints

- `/api/contact`
- `/api/subscribe`
