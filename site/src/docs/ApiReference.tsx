import type { ReactNode } from 'react'
import customElementsManifest from '../../../custom-elements.json'
import apiNotes from '../../../api-notes.json'
import { formatMarkup } from '@app/docs/formatMarkup'
import { convertMarkupExample, getAttributeUsage, getEventUsage } from '@app/docs/frameworks/api-usage'
import { FRAMEWORK_LABELS, useFramework, type FrameworkT } from '@app/docs/frameworks/framework-storage'

// One API section per component. The manifest says what exists (names, types,
// events), so the list can never drift from the shipped element. The notes file
// says what each item is for: description, values, default, min, max, example.
//
// Every group renders as one flat panel of hairline-divided rows, and every
// row of a kind has the same skeleton:
//   spec rows    attributes, events, css properties: name, description,
//                then a label/value grid whose labels never change
//   inline rows  slots, parts, keyboard: name left, meaning right
//   prose rows   accessibility, guidance: a title and a paragraph

type ManifestAttributeT = { name?: string; fieldName?: string; type?: { text?: string }; default?: string }
type ManifestEventT = { name?: string; detail?: string }
type ManifestDeclarationT = { tagName?: string; attributes?: ManifestAttributeT[]; events?: ManifestEventT[] }

type PropNoteT = {
	description?: string
	type?: string
	values?: string[]
	default?: string
	min?: string
	max?: string
	example?: string
}

type EventNoteT = { description?: string; detail?: string; example?: string }
type GuidanceNoteT = { title: string; text: string }
type CssPropertyNoteT = { description: string; default?: string }
type KeyboardNoteT = { keys: string; action: string }
type TagNotesT = {
	summary?: string
	props?: Record<string, PropNoteT>
	events?: Record<string, EventNoteT>
	slots?: Record<string, string>
	cssProperties?: Record<string, CssPropertyNoteT>
	cssParts?: Record<string, string>
	keyboard?: KeyboardNoteT[]
	accessibility?: string
	guidance?: GuidanceNoteT[]
}

// A spec value with no content renders as a muted dash, so every
// row of a kind keeps the same labels in the same places.
type SpecRowT = { label: string; values: string[] }

type SpecItemPropsT = {
	name: string
	alias?: string
	description?: string
	spec: SpecRowT[]
	example?: string
	exampleLanguage?: string
	framework: FrameworkT
}

type InlineItemPropsT = {
	name: string
	description?: string
}

type ProseItemPropsT = {
	title: string
	text?: string
}

const API_NOTES: Record<string, TagNotesT> = apiNotes
const EMPTY_NOTES: TagNotesT = {}
const MISSING_DESCRIPTION = 'No description yet.'

const readDeclarations = (): ManifestDeclarationT[] => {
	const modules = customElementsManifest.modules ?? []
	const declarations = modules.flatMap((module) => module.declarations ?? [])
	return declarations as ManifestDeclarationT[]
}

const DECLARATIONS = readDeclarations()

// Notes may wrap identifiers in backticks; render those as inline code.
const renderInlineCode = (text: string): ReactNode[] => {
	const segments = text.split('`')
	return segments.map((segment: string, index: number) => {
		const isCode = index % 2 === 1
		if (isCode) return <code key={index}>{segment}</code>
		return segment
	})
}

// ── spec builders ─────────────────────────────────────────────

const getPropTypeValues = (attribute: ManifestAttributeT, note: PropNoteT): string[] => {
	// an enum's values say more than its union type, so they replace it
	const hasValues = Boolean(note.values) && note.values?.length !== 0
	if (hasValues) return note.values ?? []
	const typeText = note.type ?? attribute.type?.text ?? 'unknown'
	return [typeText]
}

const getPropDefault = (attribute: ManifestAttributeT, note: PropNoteT): string[] => {
	const declaredDefault = note.default ?? attribute.default
	if (declaredDefault) return [declaredDefault]
	const typeText = note.type ?? attribute.type?.text
	const isBoolean = typeText === 'boolean'
	if (isBoolean) return ['false']
	return []
}

const getPropRange = (note: PropNoteT): SpecRowT | undefined => {
	const hasRange = Boolean(note.min) || Boolean(note.max)
	if (!hasRange) return undefined
	const minText = note.min ?? '…'
	const maxText = note.max ?? '…'
	return { label: 'Range', values: [`${minText} – ${maxText}`] }
}

const buildPropSpec = (attribute: ManifestAttributeT, note: PropNoteT): SpecRowT[] => {
	const typeRow = { label: 'Type', values: getPropTypeValues(attribute, note) }
	const defaultRow = { label: 'Default', values: getPropDefault(attribute, note) }
	const rangeRow = getPropRange(note)
	if (!rangeRow) return [typeRow, defaultRow]
	return [typeRow, defaultRow, rangeRow]
}

const buildEventSpec = (detail: string): SpecRowT[] => {
	const isVoid = detail === 'void'
	const detailValues = isVoid ? [] : [detail]
	return [{ label: 'Detail', values: detailValues }]
}

const buildCssPropertySpec = (note: CssPropertyNoteT): SpecRowT[] => {
	const defaultValues = note.default ? [note.default] : []
	return [{ label: 'Default', values: defaultValues }]
}

// ── row components ────────────────────────────────────────────

const SpecValue = (props: { values: string[] }) => {
	const isEmpty = props.values.length === 0
	if (isEmpty) return <span className="apiSpecEmpty">—</span>

	const chips = props.values.map((value: string) => <code key={value}>{value}</code>)
	return <>{chips}</>
}

const SpecGrid = (props: { spec: SpecRowT[] }) => {
	const rows = props.spec.map((row: SpecRowT) => (
		<div className="apiSpecRow" key={row.label}>
			<dt>{row.label}</dt>
			<dd>
				<SpecValue values={row.values} />
			</dd>
		</div>
	))

	return <dl className="apiSpec">{rows}</dl>
}

const Description = (props: { text?: string }) => {
	const hasText = Boolean(props.text)
	const className = hasText ? 'apiDescription' : 'apiDescription isMissing'
	const content = hasText ? renderInlineCode(props.text ?? '') : MISSING_DESCRIPTION
	return <p className={className}>{content}</p>
}

type ExamplePropsT = { code?: string; language?: string; framework: FrameworkT }

// Markup examples are converted to the reader's framework. Script examples
// set properties and listen imperatively, which has no faithful one-to-one
// translation, so outside HTML they are labelled as plain JavaScript.
const MarkupExample = (props: { code: string; framework: FrameworkT }) => {
	const formattedCode = formatMarkup(props.code)
	const example = convertMarkupExample(formattedCode, props.framework)
	return <z-code-block language={example.language} code={example.code} />
}

const ScriptExample = (props: { code: string; language: string; framework: FrameworkT }) => {
	const isPlainHtml = props.framework === 'html'
	const noteText = `Shown in plain JavaScript. The ${FRAMEWORK_LABELS[props.framework]} examples above show the same thing in context.`

	return (
		<>
			{!isPlainHtml && <p className="apiDescription">{noteText}</p>}
			<z-code-block language={props.language} code={props.code} />
		</>
	)
}

const Example = (props: ExamplePropsT) => {
	if (!props.code) return null
	const isMarkup = props.code.trimStart().startsWith('<')
	if (isMarkup) return <MarkupExample code={props.code} framework={props.framework} />
	const language = props.language ?? 'ts'
	return <ScriptExample code={props.code} language={language} framework={props.framework} />
}

const SpecItem = (props: SpecItemPropsT) => (
	<article className="apiItem">
		<header className="apiItemHead">
			<code className="apiName">{props.name}</code>
			{props.alias && <span className="apiAlias">{props.alias}</span>}
		</header>
		<Description text={props.description} />
		<SpecGrid spec={props.spec} />
		<Example code={props.example} language={props.exampleLanguage} framework={props.framework} />
	</article>
)

const InlineItem = (props: InlineItemPropsT) => (
	<article className="apiItem isInline">
		<code className="apiName">{props.name}</code>
		<Description text={props.description} />
	</article>
)

const ProseItem = (props: ProseItemPropsT) => (
	<article className="apiItem">
		<span className="apiName isText">{props.title}</span>
		<Description text={props.text} />
	</article>
)

const ApiGroup = (props: { title: string; count: number; children: ReactNode }) => (
	<div className="apiGroup">
		<h3 className="apiGroupTitle">
			{props.title}
			<span className="apiGroupCount">{props.count}</span>
		</h3>
		<div className="apiPanel">{props.children}</div>
	</div>
)

// ── groups ────────────────────────────────────────────────────

type PropItemsPropsT = { attributes: ManifestAttributeT[]; notes: Record<string, PropNoteT>; framework: FrameworkT }

const PropItems = (props: PropItemsPropsT) => {
	const items = props.attributes.map((attribute: ManifestAttributeT) => {
		const attributeName = attribute.name ?? ''
		const note = props.notes[attributeName] ?? {}
		const propertyName = attribute.fieldName ?? attributeName
		const usage = getAttributeUsage({ framework: props.framework, attributeName, propertyName })

		return (
			<SpecItem
				key={attributeName}
				name={usage.name}
				alias={usage.alias}
				framework={props.framework}
				description={note.description}
				spec={buildPropSpec(attribute, note)}
				example={note.example}
			/>
		)
	})

	return <>{items}</>
}

type EventItemsPropsT = { events: ManifestEventT[]; notes: Record<string, EventNoteT>; framework: FrameworkT }

const EventItems = (props: EventItemsPropsT) => {
	const items = props.events.map((manifestEvent: ManifestEventT) => {
		const eventName = manifestEvent.name ?? ''
		const note = props.notes[eventName] ?? {}
		const detail = note.detail ?? manifestEvent.detail ?? 'unknown'
		const usage = getEventUsage(props.framework, eventName)

		return (
			<SpecItem
				key={eventName}
				name={usage.name}
				alias={usage.alias}
				framework={props.framework}
				description={note.description}
				spec={buildEventSpec(detail)}
				example={note.example}
				exampleLanguage="ts"
			/>
		)
	})

	return <>{items}</>
}

const getSlotLabel = (slotName: string): string => {
	const isDefaultSlot = slotName === 'default'
	if (isDefaultSlot) return '(default)'
	return slotName
}

const SlotItems = (props: { slots: Record<string, string> }) => {
	const slotNames = Object.keys(props.slots)

	const items = slotNames.map((slotName: string) => (
		<InlineItem key={slotName} name={getSlotLabel(slotName)} description={props.slots[slotName]} />
	))

	return <>{items}</>
}

const CssPropertyItems = (props: { cssProperties: Record<string, CssPropertyNoteT> }) => {
	const propertyNames = Object.keys(props.cssProperties)

	const items = propertyNames.map((propertyName: string) => {
		const note = props.cssProperties[propertyName]
		const spec = buildCssPropertySpec(note)
		return <SpecItem key={propertyName} name={propertyName} description={note.description} spec={spec} framework="html" />
	})

	return <>{items}</>
}

const CssPartItems = (props: { cssParts: Record<string, string> }) => {
	const partNames = Object.keys(props.cssParts)

	const items = partNames.map((partName: string) => (
		<InlineItem key={partName} name={`::part(${partName})`} description={props.cssParts[partName]} />
	))

	return <>{items}</>
}

const KeyboardItems = (props: { keyboard: KeyboardNoteT[] }) => {
	const isInteractive = props.keyboard.length > 0
	if (!isInteractive) {
		return <ProseItem title="None" text="This element is not interactive, so it takes no keyboard input." />
	}

	const items = props.keyboard.map((entry: KeyboardNoteT) => (
		<InlineItem key={entry.keys} name={entry.keys} description={entry.action} />
	))

	return <>{items}</>
}

const GuidanceItems = (props: { guidance: GuidanceNoteT[] }) => {
	const items = props.guidance.map((entry: GuidanceNoteT) => (
		<ProseItem key={entry.title} title={entry.title} text={entry.text} />
	))

	return <>{items}</>
}

// Events that the manifest does not know about (dispatched by hand rather than
// declared as an Atomico event prop) are documented in the notes file only.
const collectEvents = (declaration: ManifestDeclarationT, notes: Record<string, EventNoteT>): ManifestEventT[] => {
	const declaredEvents = declaration.events ?? []
	const declaredNames = declaredEvents.map((declared: ManifestEventT) => declared.name)
	const noteOnlyNames = Object.keys(notes).filter((name: string) => !declaredNames.includes(name))
	const noteOnlyEvents = noteOnlyNames.map((name: string) => ({ name, detail: notes[name].detail }))
	return [...declaredEvents, ...noteOnlyEvents]
}

export const ApiReference = (props: { tag: string; heading?: string }) => {
	const framework = useFramework()
	const declaration = DECLARATIONS.find((item: ManifestDeclarationT) => item.tagName === props.tag)
	if (!declaration) return null

	const tagNotes = API_NOTES[props.tag] ?? EMPTY_NOTES
	const attributes = declaration.attributes ?? []
	const events = collectEvents(declaration, tagNotes.events ?? {})
	const guidance = tagNotes.guidance ?? []
	const slots = tagNotes.slots ?? {}
	const cssProperties = tagNotes.cssProperties ?? {}
	const cssParts = tagNotes.cssParts ?? {}
	const keyboard = tagNotes.keyboard
	const accessibility = tagNotes.accessibility

	const slotCount = Object.keys(slots).length
	const cssPropertyCount = Object.keys(cssProperties).length
	const cssPartCount = Object.keys(cssParts).length

	const hasAttributes = attributes.length > 0
	const hasEvents = events.length > 0
	const hasSlots = slotCount > 0
	const hasCssProperties = cssPropertyCount > 0
	const hasCssParts = cssPartCount > 0
	const hasKeyboard = keyboard !== undefined
	const hasAccessibility = Boolean(accessibility)
	const hasGuidance = guidance.length > 0
	const hasContent =
		hasAttributes || hasEvents || hasSlots || hasCssProperties || hasCssParts || hasKeyboard || hasAccessibility || hasGuidance
	if (!hasContent) return null

	const headingText = props.heading ?? 'API'

	return (
		<section className="apiReference" aria-label={`${props.tag} API reference`}>
			<z-heading size="xs" tag="h2">
				{headingText}
			</z-heading>
			{hasAttributes && (
				<ApiGroup title="Attributes" count={attributes.length}>
					<PropItems attributes={attributes} notes={tagNotes.props ?? {}} framework={framework} />
				</ApiGroup>
			)}
			{hasEvents && (
				<ApiGroup title="Events" count={events.length}>
					<EventItems events={events} notes={tagNotes.events ?? {}} framework={framework} />
				</ApiGroup>
			)}
			{hasSlots && (
				<ApiGroup title="Slots" count={slotCount}>
					<SlotItems slots={slots} />
				</ApiGroup>
			)}
			{hasCssProperties && (
				<ApiGroup title="CSS custom properties" count={cssPropertyCount}>
					<CssPropertyItems cssProperties={cssProperties} />
				</ApiGroup>
			)}
			{hasCssParts && (
				<ApiGroup title="CSS parts" count={cssPartCount}>
					<CssPartItems cssParts={cssParts} />
				</ApiGroup>
			)}
			{hasKeyboard && (
				<ApiGroup title="Keyboard" count={keyboard.length}>
					<KeyboardItems keyboard={keyboard} />
				</ApiGroup>
			)}
			{hasAccessibility && (
				<ApiGroup title="Accessibility" count={1}>
					<ProseItem title="Semantics" text={accessibility} />
				</ApiGroup>
			)}
			{hasGuidance && (
				<ApiGroup title="Guidance" count={guidance.length}>
					<GuidanceItems guidance={guidance} />
				</ApiGroup>
			)}
		</section>
	)
}
