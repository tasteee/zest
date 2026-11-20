<script lang="ts">
  import '@tasteee/zest'

  const RELEASE_NOTES = `# Release notes

Zest is **framework-agnostic**. It works in plain HTML, React or anywhere else.

- Lists
- Tables
- ~~Strikethrough~~

| Element | Kind |
| --- | --- |
| z-button | Control |

\`\`\`ts
const count: number = 3
\`\`\``
</script>

<z-markdown content={RELEASE_NOTES}></z-markdown>
