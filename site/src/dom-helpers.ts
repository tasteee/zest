// Tiny, shared DOM-building helpers used across the site's render code.

export const createElement = (tagName: string, className?: string): HTMLElement => {
	const element = document.createElement(tagName)
	if (className) element.className = className
	return element
}
