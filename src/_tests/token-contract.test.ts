import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/*
 * The colour and depth vocabulary is a contract, enforced on source:
 *
 *  - components read roles, never the numbered palette;
 *  - retired names stay retired;
 *  - every var() with no fallback resolves to a token someone declares;
 *  - the flat system has no resting shadows and no material hooks.
 */

const srcRoot = join(__dirname, '..')
const siteRoot = join(srcRoot, '..', 'site', 'src')
const sourceExtension = /\.(ts|tsx|css|html)$/

const collect = (directory: string, found: string[] = []): string[] => {
	for (const name of readdirSync(directory)) {
		if (name === '_tests' || name === 'node_modules') continue
		const path = join(directory, name)
		if (statSync(path).isDirectory()) collect(path, found)
		else if (sourceExtension.test(name)) found.push(path)
	}
	return found
}

const libraryFiles = collect(srcRoot).filter((file) => !file.endsWith('tokens.css'))
const siteFiles = collect(siteRoot)
const allFiles = [...libraryFiles, ...siteFiles]
const text = new Map(allFiles.map((file) => [file, readFileSync(file, 'utf8')]))
const tokensCss = readFileSync(join(srcRoot, 'tokens.css'), 'utf8')

const filesMatching = (files: string[], pattern: RegExp): string[] => {
	return files.filter((file) => pattern.test(text.get(file) ?? '')).map((file) => file.replace(srcRoot, 'src'))
}

describe('token contract', () => {
	it('library components never read the numbered neutral palette', () => {
		expect(filesMatching(libraryFiles, /var\(--color-neutral-/)).toEqual([])
	})

	it('retired colour and material names are gone everywhere', () => {
		const retired = [
			'bg',
			'paper',
			'paper-soft',
			'line',
			'background',
			'background-light',
			'foreground',
			'muted',
			'muted-foreground',
			'primary',
			'primary-foreground',
			'accent',
			'accent-foreground',
			'card',
			'card-foreground',
			'popover',
			'popover-foreground',
			'border',
			'input',
			'ring',
			'focus-ring',
			'purple',
			'pink',
			'neon-purple',
			'neon-pink',
			'success',
			'warning',
			'destructive',
			'inverse',
			'inverse-foreground',
			'selection-background',
			'selection-foreground',
			'tone-color',
			'skeleton',
			'material-page',
			'material-surface',
			'material-raised',
			'material-tone',
			'material-press-duration',
			'elevation-flush',
			'elevation-raised',
			'elevation-pressed',
			'elevation-overlay',
			'elevation-carved',
			'emissive-tone',
			'emissive-color',
			'emissive-focus',
			'base-pink-color',
			'base-purple-color',
			'space-xs',
			'space-sm',
			'space-md',
			'space-base',
			'space-lg',
			'space-xl',
			'space-2xl',
			'space-3xl',
			'font-size-caption',
			'font-size-small',
			'font-size-body',
			'font-size-display',
			'font-size-h1',
			'font-size-h2',
			'font-size-h3',
			'font-size-h4',
			'font-size-0',
			'font-size-1',
			'font-size-2',
			'font-size-3',
			'control-font-size-sm',
			'control-font-size-md',
			'control-font-size-lg',
			'line-height-body',
			'line-height-h4',
			'small-button-radius',
			'medium-button-radius',
			'large-button-radius'
		]
		const pattern = new RegExp(`--(${retired.join('|')})(?![A-Za-z0-9_-])`)
		expect(filesMatching(allFiles, pattern)).toEqual([])
	})

	it('every var() without a fallback resolves to a declared token', () => {
		const declared = new Set<string>()
		const sources = [...text.values(), tokensCss]
		for (const source of sources) {
			for (const match of source.matchAll(/(--[A-Za-z0-9_-]+)\s*:/g)) declared.add(match[1])
			for (const match of source.matchAll(/['"`](--[A-Za-z0-9_-]+)['"`]/g)) declared.add(match[1])
		}

		const unresolved = new Set<string>()
		for (const file of libraryFiles) {
			for (const match of (text.get(file) ?? '').matchAll(/var\((--[A-Za-z0-9_-]+)\s*\)/g)) {
				const name = match[1]
				// Names built from a prefix at runtime (--space-${n}) end in a dash.
				if (name.endsWith('-')) continue
				// --z-* are per-component hooks set by the host page or by props.
				if (name.startsWith('--z-')) continue
				if (!declared.has(name)) unresolved.add(`${name} in ${file.replace(srcRoot, 'src')}`)
			}
		}
		expect([...unresolved]).toEqual([])
	})

	it('resting components take no shadow; only overlay and modal tokens appear', () => {
		const shadow = /box-shadow:\s*([^;]+);/g
		const offenders: string[] = []
		for (const file of libraryFiles) {
			for (const match of (text.get(file) ?? '').matchAll(shadow)) {
				const value = match[1].trim()
				const isToken = /^var\(--shadow-(overlay|modal)\)$/.test(value)
				const isRing = /^(inset )?0 0 0 \d+px/.test(value)
				const isReset = value === 'none'
				if (!isToken && !isRing && !isReset) offenders.push(`${file.replace(srcRoot, 'src')}: ${value}`)
			}
		}
		expect(offenders).toEqual([])
	})

	it('has one spacing scale and no spacing- prefix', () => {
		expect(filesMatching(allFiles, /--spacing-/)).toEqual([])
	})

	it('components set text from the type scale, not raw rem or px', () => {
		const offenders = filesMatching(libraryFiles, /(^|[s;{])(font-size|--[a-z-]*font-size):s*[0-9.]+(rem|px)/m)
		expect(offenders).toEqual([])
	})

	it('defines the documented roles', () => {
		const roles = [
			'surface-page',
			'surface-default',
			'surface-subtle',
			'surface-strong',
			'surface-overlay',
			'surface-inverse',
			'surface-selection',
			'surface-scrim',
			'text-primary',
			'text-secondary',
			'text-tertiary',
			'text-strong',
			'text-inverse',
			'text-selection',
			'border-default',
			'border-strong',
			'border-focus',
			'accent-primary',
			'accent-secondary',
			'accent-tertiary',
			'on-accent',
			'status-success',
			'status-warning',
			'status-danger',
			'shadow-overlay',
			'shadow-modal',
			'tone',
			'space-4',
			'font-size-md',
			'line-height-normal'
		]
		const missing = roles.filter((role) => !new RegExp(`--${role}\\s*:`).test(tokensCss))
		expect(missing).toEqual([])
	})
})
