import { Hono } from 'hono';
import type { FC } from 'hono/jsx'
import { RandomPhoto } from './templates/RandomPhoto';
import { Main } from './templates/Main';
import { About } from './templates/About';

const Layout: FC = (props) => {
	return (
		<html lang="en">
		<head>
			<title>kdr's random photo analyzer</title>
		</head>
		<body>
		<header>
			<h1>kdr's random photo analyzer</h1>
			<nav>
				<li><a href={"/"}>home</a></li>
				<li><a href={"/random"}>show me a random photo</a></li>
				<li><a href={"/about"}>about</a></li>
			</nav>
		</header>
		{props.children}
		</body>
		</html>
	)
}

const app = new Hono<{ Bindings: Env }>()

app.get('/', c => {
	return c.html(<Layout><Main env={c.env}/></Layout>)
})

app.get('/random', c => {
	return c.html(<Layout><RandomPhoto env={c.env}/></Layout>)
})

app.get('/about', c => {
	return c.html(<Layout><About env={c.env}/></Layout>)
})

export default app satisfies ExportedHandler<Env>;
