<script lang="ts">
  import '@tasteee/zest'
  import '@tasteee/zest/languages'

  const PYTHON_CODE = `def greet(name: str) -> str:
    return f"Hello, {name}"`
</script>

<z-code-block filename="main.py" language="python" code={PYTHON_CODE}></z-code-block>
