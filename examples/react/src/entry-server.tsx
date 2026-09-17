import { renderToString } from 'react-dom/server'
import { App } from './App'

// No zest import here on purpose: the bundle needs DOM globals and cannot
// load in Node. The tags render as plain markup and upgrade in the browser.
export const render = (): string => renderToString(<App />)
