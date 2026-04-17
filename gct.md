# @gct/feature-flags

```ts
import { featureFlags } from '@gct/feature-flags'

featureFlags.toggle('foo')
featureFlags.toggle(['bar', 'baz'])

featureFlags.enable('foo')
featureFlags.enable(['foo', 'bar'])

featureFlags.disable('foo')
featureFlags.disable(['foo', 'bar'])

featureFlags.check('foo')
featureFlags.check(['foo', 'bar'])

const areFeaturesEnabled = featureFlags.check(['foo', 'bar', 'baz'])
const isCoolFeatureOn = featureFlags.coolFeature

import { FeatureFlags, useFeatureFlags } from '@gct/feature-flags'

const areFeatureFlagsOn = useFeatureFlags(['a', 'b'])

<FeatureFlags flags={['c', 'd']}>
  <p>I wont render if those flags arent enabled.</p>
</FeatureFlags>

// idk what featureFlags apis usually look like... help, suggestions?
```

# gct/browser-storage

```ts
import { storage } from '@gct/browser-storage'

// save a value to localStorage
storage.value = { whatever: true }
// read a value from localStorage
storage.value // '{ "whatever": true }'
// save a value to sessionStorage
storage.session.value = { whatever: true }
// read a value from sessionStorage
storage.session.value // '{ "whatever": true }'

// storage is a proxy that intercepts setters,
// ensures that the value being set is correctly
// stringified, and then stores it in browser storage.
storage.string = 'pink'
storage.array = ['seattle', 'dallas']
storage.object = { name: 'baxter' }
storage.boolean = true
storage.null = null
storage.undefined = undefined
storage.number = 1_234_567

// You can test this by checking localStorage.
localStorage.getItem('string') // 'pink'
localStorage.getItem('array') // '["seattle", "dallas"]'
localStorage.getItem('object') // '{"name":"baxter"}'
localStorage.getItem('boolean') // 'true'
localStorage.getItem('null') // 'null'
localStorage.getItem('undefined') // undefined
localStorage.getItem('number') // '1234567'

// You can work with sessionStorage the same way,
// but by dotting into the session proxy.
storage.session.string = 'pink'
storage.session.array = ['seattle', 'dallas']
storage.session.object = { name: 'baxter' }
storage.session.boolean = true
storage.session.null = null
storage.session.undefined = undefined
storage.session.number = 1_234_567

// You can test this by checking sessionStorage.
sessionStorage.getItem('string') // 'pink'
sessionStorage.getItem('array') // '["seattle", "dallas"]'
sessionStorage.getItem('object') // '{"name":"baxter"}'
sessionStorage.getItem('boolean') // 'true'
sessionStorage.getItem('null') // 'null'
sessionStorage.getItem('undefined') // undefined
sessionStorage.getItem('number') // '1234567'

// It also works to read data set to storage
// without @gct/browser-storage.
localStorage.setItem('foo', '{"some":"object"}')
localStorage.getItem('foo') // '{"some":"object"}'
storage.foo // {"some":"object"}

// Same for sessionStorage:
sessionStorage.setItem('bar', '{"another":"thing"}')
sessionStorage.getItem('bar') // '{"another":"thing"}'
storage.session.bar // {"another":"thing"}
```
