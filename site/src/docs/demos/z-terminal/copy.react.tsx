import '@tasteee/zest'

const SESSION = `$ git clone https://github.com/tasteee/zest.git
$ cd zest && pnpm install
Lockfile is up to date
Select any part of a line, then use "Copy selection".`

export const Example = () => <z-terminal shell="bash" copyLines="1-2,4" code={SESSION} />
