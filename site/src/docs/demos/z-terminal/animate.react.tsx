import '@tasteee/zest'

const SESSION = `$ pnpm add @tasteee/zest
Packages: +1
$ pnpm build
Built in 2.4s`

export const Example = () => <z-terminal shell="zsh" cwd="~/my-app" code={SESSION} doesAnimate doesLoop />
