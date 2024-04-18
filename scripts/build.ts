import { execSync } from 'node:child_process'
import path from 'node:path'
import { copyFileSync } from 'node:fs'
import consola from 'consola'
import { norticNewsletterSubscriptionJSRoot, repoRoot } from './paths'

execSync('pnpm run clean', { stdio: 'inherit', cwd: repoRoot })
execSync('pnpm -r --filter=./packages/newsletter-subscription build', { stdio: 'inherit', cwd: repoRoot })
execSync('pnpm -r --filter=!./packages/newsletter-subscription --filter=./packages/* build', { stdio: 'inherit', cwd: repoRoot })

// copy README.md file to dist dir for npm publish
copyFileSync(
  path.join(repoRoot, 'README.md'),
  path.join(norticNewsletterSubscriptionJSRoot, 'dist', 'README.md'),
)

consola.success('Build complete!')
