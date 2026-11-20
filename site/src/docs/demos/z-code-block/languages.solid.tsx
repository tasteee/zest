import '@tasteee/zest'
import '@tasteee/zest/languages'

const PYTHON_CODE = `def greet(name: str) -> str:
    return f"Hello, {name}"`

export const Example = () => <z-code-block filename="main.py" language="python" prop:code={PYTHON_CODE} />
