import { describe, expect, it } from 'vitest'
import { canHighlight, highlight, registerLanguage } from '../shared/highlight'
import '../languages'

const SAMPLES: Record<string, string> = {
	python: 'def greet(name):\n    return f"hi {name}"\n',
	ruby: 'def greet(name)\n  puts "hi #{name}"\nend\n',
	php: '<?php\nfunction greet($name) { return "hi $name"; }\n',
	rust: 'fn main() {\n    println!("hi");\n}\n',
	go: 'func main() {\n\tfmt.Println("hi")\n}\n',
	'c++': '#include <vector>\nint main() { return 0; }\n',
	c: '#include <stdio.h>\nint main(void) { return 0; }\n',
	scala: 'object Main { def main(args: Array[String]): Unit = println("hi") }\n',
	java: 'public class Main { public static void main(String[] a) {} }\n',
	sql: 'SELECT name FROM users WHERE id = 1;\n'
}

describe('opt-in languages', () => {
	it.each(Object.keys(SAMPLES))('%s: colors something and keeps every character', (language) => {
		const tokens = highlight(SAMPLES[language], language)
		expect(tokens.map((token) => token.value).join('')).toBe(SAMPLES[language])
		expect(tokens.some((token) => token.className.includes('hljs-'))).toBe(true)
	})

	it.each(['py', 'rb', 'rs', 'golang', 'cs', 'kt', 'toml', 'docker'])('%s is an alias that resolves', (alias) => {
		expect(canHighlight(alias)).toBe(true)
	})

	it('has svelte, vue, solid and sass without the opt-in set', () => {
		for (const language of ['svelte', 'vue', 'solid', 'sass', 'astro']) expect(canHighlight(language)).toBe(true)
	})

	it('registerLanguage adds a grammar and its aliases', () => {
		expect(canHighlight('zestlang')).toBe(false)
		registerLanguage('zestlang', () => ({ name: 'zestlang', keywords: 'zest', contains: [] }), ['zl'])
		expect(canHighlight('zestlang')).toBe(true)
		expect(canHighlight('zl')).toBe(true)
	})
})
