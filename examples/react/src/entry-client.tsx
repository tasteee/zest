import '@tasteee/zest'
import '@tasteee/zest/ink.css'
import '@tasteee/zest/fonts.css'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'

// The server rendered the tags; the zest import above upgraded them, and
// React now attaches to the existing markup. A bare `vite` dev server has no
// server pass, so it falls back to a fresh mount.
const root = document.getElementById('root')!
if (root.hasChildNodes()) hydrateRoot(root, <App />)
else createRoot(root).render(<App />)
