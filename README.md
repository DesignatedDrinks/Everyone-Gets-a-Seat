# Everyone Gets a Seat

Official one-page website for *Everyone Gets a Seat* by Mike Norris and Kristen Norris.

## Publishing

The site deploys automatically to GitHub Pages from the `main` branch using `.github/workflows/pages.yml`.

Temporary GitHub Pages address:

`https://designateddrinks.github.io/Everyone-Gets-a-Seat/`

## Custom domain

Do not add a `CNAME` file until the domain is purchased and DNS records are ready. The exact domain `EveryoneGetsaSeat.com` is currently listed by GoDaddy as a premium domain, so the repository intentionally does not claim it yet.

For a GoDaddy apex domain, add these DNS records:

- `A` record, host `@` → `185.199.108.153`
- `A` record, host `@` → `185.199.109.153`
- `A` record, host `@` → `185.199.110.153`
- `A` record, host `@` → `185.199.111.153`
- `CNAME` record, host `www` → `designateddrinks.github.io`

Then add a root-level `CNAME` file containing the purchased domain and set the same custom domain in the repository's **Settings → Pages** screen.
