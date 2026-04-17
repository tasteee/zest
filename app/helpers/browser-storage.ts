const toString = (value: unknown): string => {
	const isString = typeof value === 'string'
	const isUndefined = typeof value === 'undefined'
	const isNull = value === null
	const isNumber = typeof value === 'number'
	const isBoolean = typeof value === 'boolean'
	const isObject = typeof value === 'object'
	const isArray = Array.isArray(value)

	if (isString) return value as string
	if (isUndefined) return 'undefined'
	if (isNull) return 'null'
	if (isNumber || isBoolean) return String(value)
	if (isObject || isArray) return JSON.stringify(value)

	return String(value)
}

const toValue = (storedValue: string): unknown => {
	const isUndefinedLiteral = storedValue === 'undefined'
	const isNullLiteral = storedValue === 'null'
	const isTrueLiteral = storedValue === 'true'
	const isFalseLiteral = storedValue === 'false'
	const isNumericValue = !Number.isNaN(Number(storedValue))
	const isArray = storedValue.startsWith('[') && storedValue.endsWith(']')
	const isObject = storedValue.startsWith('{') && storedValue.endsWith('}')

	if (isUndefinedLiteral) return undefined
	if (isNullLiteral) return null
	if (isTrueLiteral) return true
	if (isFalseLiteral) return false
	if (isNumericValue) return Number(storedValue)
	if (isArray || isObject) return JSON.parse(storedValue)

	return storedValue
}

const getStorageValue = (storage: Storage) => {
	return (key: string): unknown => {
		const storedValue = storage.getItem(key)
		if (storedValue === null) return undefined
		return toValue(storedValue)
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

storage.local = new Proxy(
	{},
	{
		get: (target, key) => {
			const stringKey = String(key)
			return getLocalStorageValue(stringKey)
		},

		set: (target, propertyKey, value): boolean => {
			const stringValue = toString(value)
			const stringKey = String(propertyKey)
			window.localStorage.setItem(stringKey, stringValue)
			return true
		},

		deleteProperty: (target, propertyKey): boolean => {
			const stringKey = String(propertyKey)
			window.localStorage.removeItem(stringKey)
			return true
		}
	}
)

storage.session = new Proxy(
	{},
	{
		get: (target, propertyKey) => {
			const stringKey = String(propertyKey)
			return getSessionStorageValue(stringKey)
		},

		set: (target, propertyKey, value): boolean => {
			const stringValue = toString(value)
			const stringKey = String(propertyKey)
			window.sessionStorage.setItem(stringKey, stringValue)
			return true
		},

		deleteProperty: (target, propertyKey): boolean => {
			const stringKey = String(propertyKey)
			window.sessionStorage.removeItem(stringKey)
			return true
		}
	}
)
