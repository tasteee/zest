import { Redirect, Route, Router, Switch } from 'wouter'
import { Docs } from '@app/docs/Docs'
import { Roll } from '@app/site/Roll'

// Vite's BASE_URL is "/" by default and "/<repo>/" on GitHub Pages. wouter
// wants the base without its trailing slash.
const ROUTER_BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

const DocsHome = () => <Redirect to="/docs" replace />

export const App = () => (
	<Router base={ROUTER_BASE}>
		<Switch>
			<Route path="/" component={DocsHome} />
			{/* before the docs nest: the player skips the docs chrome */}
			<Route path="/docs/x" component={Roll} />
			<Route path="/docs" nest>
				<Docs />
			</Route>
			<Route path="/docs/:rest*" component={DocsHome} />
			<Route component={DocsHome} />
		</Switch>
	</Router>
)
