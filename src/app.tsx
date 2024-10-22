import { Hono } from 'hono';
import { RandomPhoto } from './templates/RandomPhoto';
import { Main } from './templates/Main';
import { About } from './templates/About';
import { Layout } from './templates/Layout';

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
