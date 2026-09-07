# Security notes

This is a static marketing site designed to minimize its attack surface:

- It ships no third-party scripts, trackers, font requests, or form-processing service.
- The quotation form does **not** submit or store visitor data on the site. It validates required fields, URL-encodes the message and opens WhatsApp only after the visitor chooses to continue.
- `_headers` contains a restrictive Content Security Policy and other HTTP headers for Netlify-style static hosting.
- Keep HTTPS enabled and redirect all HTTP traffic to HTTPS at the hosting/CDN layer.
- If analytics, a CRM form handler, embedded maps, or a cookie banner are added, update the Content Security Policy narrowly and add a published privacy notice before deploying.
- Server-side rate limiting, CAPTCHA, validation, spam filtering, logging, backups and dependency patching are required if a server-side contact form is introduced. Client-side checks alone are not security controls.

Before production launch, confirm business details, test phone and WhatsApp links, replace the placeholder contact flow if a CRM is required, and ask the host to apply the headers in `_headers` (or their equivalent).
