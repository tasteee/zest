<script lang="ts">
  import '@tasteee/zest'

  const FILES = [
    { name: 'index.html', language: 'html', code: '<z-button id="save">Save</z-button>\n<script src="app.js"><\/script>' },
    { name: 'app.js', language: 'js', code: "document.querySelector('#save').addEventListener('click', () => {\n  console.log('saved')\n})" },
    { name: 'styles.css', language: 'css', code: 'z-button {\n  margin-block: 1rem;\n}' }
  ]
</script>

<z-code-block files={FILES}></z-code-block>
