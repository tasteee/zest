/*
 * Extra syntax-highlighting grammars for z-code-block. The core build ships
 * nine (TypeScript, JavaScript, CSS, SCSS, JSON, Bash, HTML/XML, YAML,
 * Markdown); every other language is opt-in so the base bundle stays small.
 *
 *   import '@tasteee/zest/languages'
 *
 * registers the set below once for the whole page. To add only some, or a
 * grammar of your own, call registerLanguage() from the root entry instead.
 */
import { registerLanguage } from './shared/highlight'
import c from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'
import csharp from 'highlight.js/lib/languages/csharp'
import dart from 'highlight.js/lib/languages/dart'
import diff from 'highlight.js/lib/languages/diff'
import dockerfile from 'highlight.js/lib/languages/dockerfile'
import elixir from 'highlight.js/lib/languages/elixir'
import go from 'highlight.js/lib/languages/go'
import graphql from 'highlight.js/lib/languages/graphql'
import haskell from 'highlight.js/lib/languages/haskell'
import ini from 'highlight.js/lib/languages/ini'
import java from 'highlight.js/lib/languages/java'
import kotlin from 'highlight.js/lib/languages/kotlin'
import less from 'highlight.js/lib/languages/less'
import lua from 'highlight.js/lib/languages/lua'
import makefile from 'highlight.js/lib/languages/makefile'
import nginx from 'highlight.js/lib/languages/nginx'
import objectivec from 'highlight.js/lib/languages/objectivec'
import perl from 'highlight.js/lib/languages/perl'
import php from 'highlight.js/lib/languages/php'
import powershell from 'highlight.js/lib/languages/powershell'
import protobuf from 'highlight.js/lib/languages/protobuf'
import python from 'highlight.js/lib/languages/python'
import r from 'highlight.js/lib/languages/r'
import ruby from 'highlight.js/lib/languages/ruby'
import rust from 'highlight.js/lib/languages/rust'
import scala from 'highlight.js/lib/languages/scala'
import sql from 'highlight.js/lib/languages/sql'
import swift from 'highlight.js/lib/languages/swift'

const grammars = {
	c,
	cpp,
	csharp,
	dart,
	diff,
	dockerfile,
	elixir,
	go,
	graphql,
	haskell,
	ini,
	java,
	kotlin,
	less,
	lua,
	makefile,
	nginx,
	objectivec,
	perl,
	php,
	powershell,
	protobuf,
	python,
	r,
	ruby,
	rust,
	scala,
	sql,
	swift
}

for (const [name, grammar] of Object.entries(grammars)) registerLanguage(name, grammar)

// highlight.js names these as aliases of the grammars above already: py, rb,
// rs, kt, cs, golang, c++, h, toml (ini), docker, ps1, gql, proto, patch, pl.
