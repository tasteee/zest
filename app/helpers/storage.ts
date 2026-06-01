const storageMetadataKey = '__zesty_storage_types__'

const StorageValueType = {
	bigint: 'bigint',
	boolean: 'boolean',
	json: 'json',
	null: 'null',
	number: 'number',
	string: 'string'
} as const

type StorageValueTypeT = (typeof StorageValueType)[keyof typeof StorageValueType]

type StorageMetadataT = Record<string, StorageValueTypeT>

const getStorageValueType = (value: unknown): StorageValueTypeT | undefined => {
	const isUndefined = typeof value === 'undefined'
	if (isUndefined) return undefined

	const isString = typeof value === 'string'
	if (isString) return StorageValueType.string

	const isFunction = typeof value === 'function'
	const isSymbol = typeof value === 'symbol'
	if (isFunction || isSymbol) return StorageValueType.string

	const isNumber = typeof value === 'number'
	if (isNumber) return StorageValueType.number

	const isBoolean = typeof value === 'boolean'
	if (isBoolean) return StorageValueType.boolean

	const isBigInt = typeof value === 'bigint'
	if (isBigInt) return StorageValueType.bigint

	const isNull = value === null
	if (isNull) return StorageValueType.null

	return StorageValueType.json
}

const toString = (value: unknown, valueType: StorageValueTypeT): string => {
	const isFunction = typeof value === 'function'
	const isSymbol = typeof value === 'symbol'
	if (isFunction || isSymbol) return String(value)

	const isJson = valueType === StorageValueType.json
	if (isJson) return JSON.stringify(value)

	return String(value)
}

const toValue = (storedValue: string, valueType?: StorageValueTypeT): unknown => {
	const hasStorageValueType = typeof valueType === 'string'
	if (!hasStorageValueType) return storedValue

	const isString = valueType === StorageValueType.string
	if (isString) return storedValue

	const isNumber = valueType === StorageValueType.number
	if (isNumber) return Number(storedValue)

	const isBoolean = valueType === StorageValueType.boolean
	if (isBoolean) return storedValue === 'true'

	const isBigInt = valueType === StorageValueType.bigint
	if (isBigInt) return BigInt(storedValue)

	const isNull = valueType === StorageValueType.null
	if (isNull) return null

	return JSON.parse(storedValue)
}

const getStorageMetadata = (target: Storage): StorageMetadataT => {
	const storedMetadata = target.getItem(storageMetadataKey)
	if (storedMetadata === null) return {}

	return JSON.parse(storedMetadata) as StorageMetadataT
}

const setStorageMetadata = (target: Storage, storageMetadata: StorageMetadataT): void => {
	const storageMetadataKeys = Object.keys(storageMetadata)
	const hasStorageMetadata = storageMetadataKeys.length > 0
	if (!hasStorageMetadata) {
		target.removeItem(storageMetadataKey)
		return
	}

	target.setItem(storageMetadataKey, JSON.stringify(storageMetadata))
}

const setStorageValueType = (target: Storage, key: string, valueType: StorageValueTypeT): void => {
	const storageMetadata = getStorageMetadata(target)
	storageMetadata[key] = valueType
	setStorageMetadata(target, storageMetadata)
}

const deleteStorageValueType = (target: Storage, key: string): void => {
	const storageMetadata = getStorageMetadata(target)
	delete storageMetadata[key]
	setStorageMetadata(target, storageMetadata)
}

const getStorageValue = (storage: Storage) => {
	return (key: string): unknown => {
		const isStorageMetadataKey = key === storageMetadataKey
		if (isStorageMetadataKey) return undefined

		const storedValue = storage.getItem(key)
		if (storedValue === null) return undefined

		const storageMetadata = getStorageMetadata(storage)
		const valueType = storageMetadata[key]
		return toValue(storedValue, valueType)
	}
}

const getLocalStorageValue = getStorageValue(window.localStorage)
const getSessionStorageValue = getStorageValue(window.sessionStorage)

const localState = {} as any
const sessionState = {} as any
const localKeys = Object.keys(window.localStorage)
const sessionKeys = Object.keys(window.sessionStorage)

for (const localKey of localKeys) {
	const storedValue = getLocalStorageValue(localKey)
	if (storedValue === undefined) continue
	localState[localKey] = storedValue
}

for (const sessionKey of sessionKeys) {
	const storedValue = getSessionStorageValue(sessionKey)
	if (storedValue === undefined) continue
	sessionState[sessionKey] = storedValue
}

export const storage = {} as any

type StorageProxyOptionsT = {
	getValue: (key: string) => unknown
	scope?: string
	target: Storage
}

const getStorageKey = (key: PropertyKey, scope?: string): string => {
	const stringKey = String(key)
	const isScopeString = typeof scope === 'string'
	const isScopeNonEmpty = isScopeString && scope.length > 0
	const hasScope = isScopeString && isScopeNonEmpty
	if (hasScope) return `${scope}:${stringKey}`
	return stringKey
}

const createStorageProxy = (options: StorageProxyOptionsT) => {
	return new Proxy(
		{},
		{
			get: (_, key) => {
				const stringKey = getStorageKey(key, options.scope)
				return options.getValue(stringKey)
			},

			set: (_, key, value) => {
				const stringKey = getStorageKey(key, options.scope)
				const isStorageMetadataKey = stringKey === storageMetadataKey
				if (isStorageMetadataKey) return true

				const valueType = getStorageValueType(value)
				const isUndefinedValue = typeof valueType === 'undefined'
				if (isUndefinedValue) {
					options.target.removeItem(stringKey)
					deleteStorageValueType(options.target, stringKey)
					return true
				}

				const stringValue = toString(value, valueType)
				options.target.setItem(stringKey, stringValue)
				setStorageValueType(options.target, stringKey, valueType)
				return true
			},

			deleteProperty: (_, key) => {
				const stringKey = getStorageKey(key, options.scope)
				const isStorageMetadataKey = stringKey === storageMetadataKey
				if (isStorageMetadataKey) return true

				options.target.removeItem(stringKey)
				deleteStorageValueType(options.target, stringKey)
				return true
			}
		}
	)
}

storage.local = createStorageProxy({
	target: localStorage,
	getValue: getLocalStorageValue
})

storage.session = createStorageProxy({
	target: sessionStorage,
	getValue: getSessionStorageValue
})

storage.scoped = (scope: string) => {
	return {
		local: createStorageProxy({
			scope,
			target: localStorage,
			getValue: getLocalStorageValue
		}),

		session: createStorageProxy({
			scope,
			target: sessionStorage,
			getValue: getSessionStorageValue
		})
	}
}
