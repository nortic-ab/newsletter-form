import { execSync } from 'node:child_process'
import path from 'node:path'
import consola from 'consola'
import { copyFileSync } from 'fs'
import { norticNewsletterSubscriptionJSRoot, repoRoot } from './paths'

execSync('pnpm run clean', { stdio: 'inherit', cwd: repoRoot })
execSync('pnpm -r --filter=./packages/* build', { stdio: 'inherit', cwd: repoRoot })

// copy README.md file to dist dir for npm publish
copyFileSync(
  path.join(repoRoot, 'README.md'),
  path.join(norticNewsletterSubscriptionJSRoot, 'dist', 'README.md'),
)

consola.success('Build complete!') 