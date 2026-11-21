import '@tasteee/zest'

const SESSION = `$ pnpm add @tasteee/zest
Packages: +1
Done in 1.2s

$ pnpm dev
Local: http://localhost:5173/`

export const Example = () => <z-terminal width="min(100%, 36rem)" maxHeight="16rem" shell="zsh" cwd="~/my-app" code={SESSION} />
