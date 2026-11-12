import { describe, expect, it, beforeEach } from 'vitest'
import {
	SCALE_OPTIONS,
	STORAGE_KEY,
	readStoredScale,
	writeStoredScale,
	applyScale,
	getStepDownScale,
	getStepUpScale
} from '../../site/src/docs/ScaleControl'

describe('ScaleControl logic and DOM management', () => {
	beforeEach(() => {
		document.documentElement.removeAttribute('style')
		document.documentElement.removeAttribute('data-scale')
		window.localStorage.clear()
	})

	it('defines the required scale options in order', () => {
		expect(SCALE_OPTIONS).toEqual(['75%', '80%', '90%', '100%', '110%', '125%', '150%'])
	})

	it('calculates the correct scaling factors for all options', () => {
		const factors = SCALE_OPTIONS.map((opt) => Number.parseInt(opt, 10) / 100)
		expect(factors).toEqual([0.75, 0.8, 0.9, 1.0, 1.1, 1.25, 1.5])
	})

	it('reads default scale 100% when localStorage is empty or has invalid value', () => {
		expect(readStoredScale()).toBe('100%')

		window.localStorage.setItem(STORAGE_KEY, 'invalid-scale')
		expect(readStoredScale()).toBe('100%')
	})

	it('reads valid stored scale from localStorage', () => {
		window.localStorage.setItem(STORAGE_KEY, '80%')
		expect(readStoredScale()).toBe('80%')

		window.localStorage.setItem(STORAGE_KEY, '125%')
		expect(readStoredScale()).toBe('125%')
	})

	it('writes scale to localStorage', () => {
		writeStoredScale('90%')
		expect(window.localStorage.getItem(STORAGE_KEY)).toBe('90%')

		writeStoredScale('150%')
		expect(window.localStorage.getItem(STORAGE_KEY)).toBe('150%')
	})

	it('steps down scale correctly and stops at minimum (75%)', () => {
		expect(getStepDownScale('150%')).toBe('125%')
		expect(getStepDownScale('125%')).toBe('110%')
		expect(getStepDownScale('110%')).toBe('100%')
		expect(getStepDownScale('100%')).toBe('90%')
		expect(getStepDownScale('90%')).toBe('80%')
		expect(getStepDownScale('80%')).toBe('75%')
		expect(getStepDownScale('75%')).toBe('75%')
	})

	it('steps up scale correctly and stops at maximum (150%)', () => {
		expect(getStepUpScale('75%')).toBe('80%')
		expect(getStepUpScale('80%')).toBe('90%')
		expect(getStepUpScale('90%')).toBe('100%')
		expect(getStepUpScale('100%')).toBe('110%')
		expect(getStepUpScale('110%')).toBe('125%')
		expect(getStepUpScale('125%')).toBe('150%')
		expect(getStepUpScale('150%')).toBe('150%')
	})

	it('applies scale attributes and CSS custom properties to document.documentElement', () => {
		applyScale('80%')
		expect(document.documentElement.getAttribute('data-scale')).toBe('80%')
		expect(document.documentElement.style.fontSize).toBe('80%')
		expect(document.documentElement.style.getPropertyValue('--scale')).toBe('80%')
		expect(document.documentElement.style.getPropertyValue('--scaling')).toBe('0.8')

		applyScale('100%')
		expect(document.documentElement.getAttribute('data-scale')).toBe('100%')
		expect(document.documentElement.style.fontSize).toBe('')
		expect(document.documentElement.style.getPropertyValue('--scale')).toBe('100%')
		expect(document.documentElement.style.getPropertyValue('--scaling')).toBe('1')

		applyScale('150%')
		expect(document.documentElement.getAttribute('data-scale')).toBe('150%')
		expect(document.documentElement.style.fontSize).toBe('150%')
		expect(document.documentElement.style.getPropertyValue('--scale')).toBe('150%')
		expect(document.documentElement.style.getPropertyValue('--scaling')).toBe('1.5')

		applyScale('75%')
		expect(document.documentElement.getAttribute('data-scale')).toBe('75%')
		expect(document.documentElement.style.fontSize).toBe('75%')
		expect(document.documentElement.style.getPropertyValue('--scale')).toBe('75%')
		expect(document.documentElement.style.getPropertyValue('--scaling')).toBe('0.75')
	})
})
