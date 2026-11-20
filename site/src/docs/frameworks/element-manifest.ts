import customElementsManifest from '../../../../custom-elements.json'

// What each z element's attributes are called and typed as, read from the
// package manifest (already bundled for the API tables). The React printer
// uses it to write `columns={4}` rather than `columns="4"`, and the exact
// property name for every attribute.

export type ManifestAttributeT = { name: string; fieldName: string; typeText: string }

type RawAttributeT = { name: string; fieldName?: string; type?: { text?: string } }
type RawDeclarationT = { tagName?: string; customElement?: boolean; attributes?: RawAttributeT[] }
type RawModuleT = { declarations?: RawDeclarationT[] }
type RawManifestT = { modules: RawModuleT[] }

const manifest = customElementsManifest as unknown as RawManifestT

const readAttribute = (attribute: RawAttributeT): ManifestAttributeT => ({
	name: attribute.name,
	fieldName: attribute.fieldName ?? attribute.name,
	typeText: attribute.type?.text ?? ''
})

const buildAttributeMap = (declaration: RawDeclarationT): Map<string, ManifestAttributeT> => {
	const attributes = declaration.attributes ?? []
	const entries = attributes.map((attribute) => [attribute.name, readAttribute(attribute)] as const)
	return new Map(entries)
}

const buildElementMap = (): Map<string, Map<string, ManifestAttributeT>> => {
	const elementMap = new Map<string, Map<string, ManifestAttributeT>>()

	for (const module of manifest.modules) {
		for (const declaration of module.declarations ?? []) {
			const tagName = declaration.tagName
			const isElement = Boolean(declaration.customElement && tagName)
			if (!isElement || !tagName) continue
			elementMap.set(tagName, buildAttributeMap(declaration))
		}
	}

	return elementMap
}

const ELEMENT_ATTRIBUTES = buildElementMap()

export const getManifestAttribute = (tagName: string, attributeName: string): ManifestAttributeT | undefined => {
	return ELEMENT_ATTRIBUTES.get(tagName)?.get(attributeName)
}
