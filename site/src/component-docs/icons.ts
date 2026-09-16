// Inline icon markup used by the documentation examples.
//
// The examples show icons because real buttons have icons, and a docs page
// that only ever shows bare text labels quietly hides half the component's
// behaviour. These are plain stroked SVGs — no icon dependency — so an
// example's source stays copy-pasteable on its own.

const buildIcon = (paths: string): string => {
	return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">${paths}</svg>`
}

export const Icons = {
	search: buildIcon('<circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />'),
	compose: buildIcon('<path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />'),
	phone: buildIcon('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.5 2.1L8.1 9.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.7a2 2 0 0 1 1.7 2z" />'),
	video: buildIcon('<path d="m22 8-6 4 6 4V8Z" /><rect x="2" y="6" width="14" height="12" rx="2" />'),
	info: buildIcon('<circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" />'),
	paperclip: buildIcon('<path d="m21 11.5-8.5 8.5a5.5 5.5 0 0 1-7.8-7.8l9-9a3.5 3.5 0 0 1 5 5l-9 9a1.5 1.5 0 0 1-2.1-2.1l8-8" />'),
	smile: buildIcon('<circle cx="12" cy="12" r="9" /><path d="M8.5 14a4 4 0 0 0 7 0M9 9h.01M15 9h.01" />'),
	plus: buildIcon('<path d="M12 5v14M5 12h14" />'),
	check: buildIcon('<polyline points="20 6 9 17 4 12" />'),
	trash: buildIcon('<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />'),
	download: buildIcon('<path d="M12 3v12M7 11l5 5 5-5M4 21h16" />'),
	arrowRight: buildIcon('<path d="M5 12h14M13 6l6 6-6 6" />'),
	external: buildIcon('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />'),
	bold: buildIcon('<path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z" />'),
	italic: buildIcon('<path d="M15 5h-5M14 19H9M14 5l-4 14" />'),
	underline: buildIcon('<path d="M7 4v6a5 5 0 0 0 10 0V4M5 20h14" />'),
	alignLeft: buildIcon('<path d="M4 6h16M4 12h10M4 18h13" />'),
	alignCenter: buildIcon('<path d="M4 6h16M7 12h10M6 18h12" />'),
	alignRight: buildIcon('<path d="M4 6h16M10 12h10M7 18h13" />'),
	link: buildIcon('<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />'),
	undo: buildIcon('<path d="M9 14L4 9l5-5M4 9h11a5 5 0 0 1 0 10h-4" />'),
	redo: buildIcon('<path d="M15 14l5-5-5-5M20 9H9a5 5 0 0 0 0 10h4" />'),
	finder: buildIcon('<rect x="3" y="4" width="18" height="16" rx="2" /><path d="M8 10h.01M16 10h.01M8 15c1.5 1 6.5 1 8 0" />'),
	mail: buildIcon('<rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />'),
	calendar: buildIcon('<rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 11h18" />'),
	music: buildIcon('<path d="M9 18V6l10-2v12" /><circle cx="6" cy="18" r="3" /><circle cx="16" cy="16" r="3" />'),
	settings: buildIcon('<circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />'),
	terminal: buildIcon('<rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 9 3 3-3 3M13 15h4" />')
} as const
