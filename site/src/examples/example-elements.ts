// Elements the examples compose that are not (yet) part of the published
// package surface. The chat family is held back from dist/zest.js by
// scripts/check-release-surface.mjs while its API settles, but the examples
// are where that family gets exercised as a whole — so the docs app registers
// them privately, the same way internal-doc-elements.ts does for its authoring
// chrome. Nothing here changes what consumers get from @tasteee/zest.
import '../../../src/components/z-chat-shell'
import '../../../src/components/z-chat-header'
import '../../../src/components/z-conversation-list'
import '../../../src/components/z-conversation-item'
import '../../../src/components/z-message-list'
import '../../../src/components/z-message-group'
import '../../../src/components/z-message-bubble'
import '../../../src/components/z-message-actions'
import '../../../src/components/z-reactions'
import '../../../src/components/z-date-divider'
import '../../../src/components/z-unread-divider'
import '../../../src/components/z-system-message'
import '../../../src/components/z-delivery-status'
import '../../../src/components/z-read-receipt'
import '../../../src/components/z-quoted-message'
import '../../../src/components/z-image-message'
import '../../../src/components/z-typing-indicator'
import '../../../src/components/z-composer'
