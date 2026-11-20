import { getManifestAttribute } from '@app/docs/frameworks/element-manifest'
import { formatJsxAttributeValue, printJsx } from '@app/docs/frameworks/print-jsx'
import type { MarkupAttributeT, MarkupElementT, MarkupNodeT } from '@app/docs/frameworks/markup-tree'

// HTML → React 19. z elements take camelCase props (`aligns-y` → `alignsY`),
// which React sets as properties on the element. Native elements get
// React's own spellings (`class` → `className`, `for` → `htmlFor`).

const BOOLEAN_PROP_PREFIX = /^(is|has|can|does|should|will|was)-/

const NATIVE_PROP_NAMES: Record<string, string> = {
	class: 'className',
	for: 'htmlFor',
	tabindex: 'tabIndex',
	readonly: 'readOnly',
	maxlength: 'maxLength',
	minlength: 'minLength',
	autocomplete: 'autoComplete',
	autofocus: 'autoFocus',
	colspan: 'colSpan',
	rowspan: 'rowSpan',
	contenteditable: 'contentEditable',
	spellcheck: 'spellCheck',
	inputmode: 'inputMode',
	enctype: 'encType',
	novalidate: 'noValidate',
	srcset: 'srcSet',
	datetime: 'dateTime',
	accesskey: 'accessKey',
	crossorigin: 'crossOrigin',
	referrerpolicy: 'referrerPolicy'
}

const NATIVE_BOOLEAN_NAMES = ['disabled', 'hidden', 'required', 'open', 'multiple', 'selected', 'readonly', 'autofocus']

// Form fields keep their HTML value as a starting value, not a controlled one.
const UNCONTROLLED_FIELD_TAGS = ['input', 'textarea', 'select']

const KEBAB_SEGMENT = /-([a-z])/g

export const camelize = (name: string): string => {
	return name.replace(KEBAB_SEGMENT, (match, letter: string) => letter.toUpperCase())
}

const checkIsPassThrough = (name: string): boolean => {
	const isAria = name.startsWith('aria-')
	const isData = name.startsWith('data-')
	return isAria || isData
}

// "width: 18rem; --gap: 1rem" → "{{ width: '18rem', '--gap': '1rem' }}"
const formatStyleKey = (property: string): string => {
	const isCustomProperty = property.startsWith('--')
	if (isCustomProperty) return `'${property}'`
	const isVendorPrefixed = property.startsWith('-')
	const camelName = camelize(property)
	if (isVendorPrefixed) return camelName.charAt(0).toUpperCase() + camelName.slice(1)
	return camelName
}

const formatStyleEntry = (declaration: string): string | null => {
	const separatorIndex = declaration.indexOf(':')
	const hasSeparator = separatorIndex > 0
	if (!hasSeparator) return null

	const property = declaration.slice(0, separatorIndex).trim()
	const value = declaration.slice(separatorIndex + 1).trim()
	const escapedValue = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
	return `${formatStyleKey(property)}: '${escapedValue}'`
}

export const formatStyleObject = (styleText: string): string => {
	const declarations = styleText.split(';')
	const entries = declarations.map(formatStyleEntry).filter((entry) => entry !== null)
	return `{{ ${entries.join(', ')} }}`
}

const NUMERIC_VALUE = /^-?\d+(\.\d+)?$/

const checkIsNumberType = (typeText: string): boolean => {
	const mentionsNumber = /\bnumber\b/.test(typeText)
	const mentionsString = /\bstring\b/.test(typeText) || typeText.includes("'")
	return mentionsNumber && !mentionsString
}

const checkIsBooleanFlag = (element: MarkupElementT, attribute: MarkupAttributeT): boolean => {
	const isEmpty = attribute.value === ''
	if (!isEmpty) return false
	const manifestAttribute = getManifestAttribute(element.tag, attribute.name)
	const isBooleanType = manifestAttribute?.typeText === 'boolean'
	return isBooleanType || BOOLEAN_PROP_PREFIX.test(attribute.name)
}

const printCustomElementAttribute = (element: MarkupElementT, attribute: MarkupAttributeT): string => {
	const isPassThrough = checkIsPassThrough(attribute.name)
	if (isPassThrough) return `${attribute.name}=${formatJsxAttributeValue(attribute.value)}`

	const manifestAttribute = getManifestAttribute(element.tag, attribute.name)
	const propName = manifestAttribute?.fieldName ?? camelize(attribute.name)
	const isBooleanFlag = checkIsBooleanFlag(element, attribute)
	if (isBooleanFlag) return propName

	const isNumberProp = checkIsNumberType(manifestAttribute?.typeText ?? '')
	const isNumericValue = NUMERIC_VALUE.test(attribute.value)
	const isNumber = isNumberProp && isNumericValue
	if (isNumber) return `${propName}={${attribute.value}}`
	return `${propName}=${formatJsxAttributeValue(attribute.value)}`
}

const getNativePropName = (element: MarkupElementT, attributeName: string): string => {
	const isFieldValue = attributeName === 'value' && UNCONTROLLED_FIELD_TAGS.includes(element.tag)
	if (isFieldValue) return 'defaultValue'
	const isFieldChecked = attributeName === 'checked' && element.tag === 'input'
	if (isFieldChecked) return 'defaultChecked'

	const reactName = NATIVE_PROP_NAMES[attributeName]
	if (reactName) return reactName
	const isNamespaced = attributeName.includes(':')
	if (isNamespaced) return camelize(attributeName.replace(':', '-'))
	if (element.isSvg) return camelize(attributeName)
	return attributeName
}

const printNativeAttribute = (element: MarkupElementT, attribute: MarkupAttributeT): string => {
	const isPassThrough = checkIsPassThrough(attribute.name)
	if (isPassThrough) return `${attribute.name}=${formatJsxAttributeValue(attribute.value)}`

	const propName = getNativePropName(element, attribute.name)
	const isBooleanFlag = attribute.value === '' && (NATIVE_BOOLEAN_NAMES.includes(attribute.name) || propName === 'defaultChecked')
	if (isBooleanFlag) return propName
	return `${propName}=${formatJsxAttributeValue(attribute.value)}`
}

const printReactAttribute = (element: MarkupElementT, attribute: MarkupAttributeT): string => {
	const isStyle = attribute.name === 'style'
	if (isStyle) return `style=${formatStyleObject(attribute.value)}`
	const isClass = attribute.name === 'class'
	if (isClass) return `className=${formatJsxAttributeValue(attribute.value)}`

	const isCustomElement = element.tag.includes('-')
	if (isCustomElement) return printCustomElementAttribute(element, attribute)
	return printNativeAttribute(element, attribute)
}

export const printReactAttributes = (element: MarkupElementT): string[] => {
	return element.attributes.map((attribute) => printReactAttribute(element, attribute))
}

type ComponentSourceInputT = {
	nodes: MarkupNodeT[]
	hasStyles: boolean
	printAttributes: (element: MarkupElementT) => string[]
}

/** A complete component file around the demo's markup. */
export const buildJsxComponentSource = (input: ComponentSourceInputT): string => {
	const styleImport = input.hasStyles ? "import './styles.css'\n" : ''
	const jsx = printJsx(input.nodes, 1, input.printAttributes)
	const imports = `import '@tasteee/zest'\n${styleImport}`
	return `${imports}\nexport const Example = () => (\n${jsx}\n)\n`
}

export const convertToReact = (nodes: MarkupNodeT[], hasStyles: boolean): string => {
	return buildJsxComponentSource({ nodes, hasStyles, printAttributes: printReactAttributes })
}
