# Personal Finance Glossary

Proof-of-concept Astro site evaluating the stack before scaling to ~2,000 terms.

## What's here

- **20 sample terms** (MDX) in `src/content/terms/`
- **5 categories** (Markdown) in `src/content/categories/`
- **Pages**: `index`, `a-z`, `about`, `term/[slug]`, `category/[slug]`
- **Layout**: `src/layouts/BaseLayout.astro`
- **Styles**: `src/styles/global.css` (plain CSS, ~200 lines)
- **Integrations**: `@astrojs/mdx`, `@astrojs/sitemap`

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build → dist/
npm run preview  # serve built dist/
```

## Adding a new term (manual workflow)

Create `src/content/terms/<slug>.mdx` with this frontmatter shape:

```yaml
---
name: Display Name
slug: url-slug
categories:
  - retirement-planning    # must match an id in src/content/categories/
lastUpdated: 2026-04-22
plainEnglish: >-
  Short definition, 1-3 sentences.
detailedExplanation: >-
  Longer explanation.
# All of the following are optional:
workedExample: >-
  Numerical example with dollar amounts.
usedInSentence: "Example sentence in quotes."
whenItApplies: >-
  Who this applies to.
commonMistakes: >-
  Mistakes to avoid.
howToRemember: >-
  Mnemonic.
whenToConsult: >-
  When to talk to a professional.
faqs:
  - question: Question text.
    answer: Answer text.
relatedTerms:
  - slug-of-another-term
---
```

The filename (minus `.mdx`) must equal the `slug` you want — that's the id used for `relatedTerms` references in other files. Then `npm run build` to verify.

## Asking Claude to add a term

> "Please add a new term called _X_. It belongs in categories A and B. Write accurate content for all the fields (plainEnglish through whenToConsult), include 2-3 FAQs, and tag `relatedTerms` to the existing slugs that make sense. Flag any figures you're not sure about with `[verify current limit]`. Follow the same voice as the existing term files."

## Git + GitHub + Vercel (one-time setup)

From the project directory in your terminal:

```bash
cd "~/Desktop/AI Agent Working Files/Personal Finance Terms Site/personal-finance-glossary"
# Optional: move it out of the workspace to your home dir
# mv "../personal-finance-glossary" ~/personal-finance-glossary && cd ~/personal-finance-glossary

# Clean up a partial .git directory left by the sandbox (safe to delete):
rm -rf .git

git init
git add .
git commit -m "Initial commit: Astro glossary scaffold + 20 sample terms"

# Create repo on GitHub (requires `gh` CLI, or use the GitHub website):
gh repo create personal-finance-glossary-test --public --source=. --push

# OR with the website: create an empty repo at
# https://github.com/new (name: personal-finance-glossary-test, Public, no README)
# Then:
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/personal-finance-glossary-test.git
git push -u origin main
```

Then at https://vercel.com/new:

1. Click **Import Git Repository** and select `personal-finance-glossary-test`.
2. Leave the framework preset as **Astro** (Vercel auto-detects).
3. Click **Deploy**. No environment variables needed.
4. Copy the `*.vercel.app` URL when the build finishes (~60 seconds).
5. Come back and update `site:` in `astro.config.mjs` to that URL, commit, push — Vercel redeploys automatically.

## Content-accuracy flags

Search the `src/content/terms/` directory for `[verify` to find every place I flagged a figure or rule that may be stale. As of this scaffold:

- Contribution limits (IRA, 401(k)) — `roth-ira.mdx`, `traditional-ira.mdx`, `401k.mdx`, `backdoor-roth-ira.mdx`
- RMD age / SECURE 2.0 penalty — `required-minimum-distribution.mdx`, `traditional-ira.mdx`
- Capital-gains rate thresholds — `capital-gains-tax.mdx`
- Home-sale exclusion figures — `capital-gains-tax.mdx`
- Form 1040 line numbers — `adjusted-gross-income.mdx`
- Typical expense-ratio ranges — `index-fund.mdx`, `expense-ratio.mdx`
- Wash-sale rule applicability to crypto — `tax-loss-harvesting.mdx`

Verify against irs.gov or primary sources before publishing.
