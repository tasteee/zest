import './zest' // registers <z-*> elements + loads tokens/component CSS
import './styles.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConvexAuthProvider } from '@convex-dev/auth/react'
import { convex } from '@blog/convexClient'
import { App } from '@blog/App'

const rootElement = document.getElementById('root')
if (rootElement === null) throw new Error('Missing #root element')

createRoot(rootElement).render(
	<StrictMode>
		<ConvexAuthProvider client={convex}>
			<App />
		</ConvexAuthProvider>
	</StrictMode>
)
