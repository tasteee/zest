import { Link, Route, Switch } from 'wouter'
import { Home } from '@blog/pages/Home'
import { Post } from '@blog/pages/Post'
import { New } from '@blog/pages/New'
import { Admin } from '@blog/pages/Admin'
import { EditorPage } from '@blog/editor/EditorPage'
import { useAuth } from '@blog/useAuth'

const AuthControls = () => {
	const { isLoading, isAuthenticated, isAuthor, signInWithGitHub, signOut } = useAuth()

	if (isLoading) return null

	if (!isAuthenticated) {
		return <z-button size="small" kind="ghost" onClick={() => void signInWithGitHub()}>Sign in</z-button>
	}

	return (
		<>
			{isAuthor && <Link href="/admin">Posts</Link>}
			{isAuthor && <Link href="/new">New post</Link>}
			<z-button size="small" kind="ghost" onClick={() => void signOut()}>Sign out</z-button>
		</>
	)
}

const NotFound = () => (
	<section className="BlogContainer">
		<z-heading size="lg">Not found</z-heading>
		<Link href="/">Back home</Link>
	</section>
)

export const App = () => {
	return (
		<div className="BlogShell">
			<header className="BlogTopbar">
				<Link href="/" className="BlogBrand">zest · blog</Link>
				<nav className="BlogNav">
					<AuthControls />
				</nav>
			</header>

			<main className="BlogMain">
				<Switch>
					<Route path="/" component={Home} />
					<Route path="/post/:slug" component={Post} />
					<Route path="/admin" component={Admin} />
					<Route path="/new" component={New} />
					<Route path="/edit/:id" component={EditorPage} />
					<Route component={NotFound} />
				</Switch>
			</main>
		</div>
	)
}
