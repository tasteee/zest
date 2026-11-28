export declare const oneOf: <const Values extends readonly [string, ...string[]]>(...values: Values) => import("atomico").CustomType<Values[number]>;
export declare const listOf: <Item>() => import("atomico").CustomType<Item[]>;
