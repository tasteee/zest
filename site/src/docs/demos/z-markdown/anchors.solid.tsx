import '@tasteee/zest'

const CONTENT = `## Install

Add the package.

## Usage

Import it once.`

export const Example = () => <z-markdown has-heading-anchors="" prop:content={CONTENT} />
