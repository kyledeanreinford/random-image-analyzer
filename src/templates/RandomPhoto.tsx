import { FC, JSX } from 'hono/jsx';

type CharacteristicsResult = {
	name: string,
	title: string,
}

type PhotoResult = {
	name: string,
}

type Props = {
	env: Env;
}

export const RandomPhoto: FC<Props> = async ({ env }) => {
	const photos = await env.PHOTO_DETAILS.list<KVNamespaceListResult<any>>();
	let mappedKeys: PhotoResult[] = [];

	photos.keys.map((photo) => {
		mappedKeys = [...mappedKeys, photo];
	});

	const random = Math.floor(Math.random() * photos.keys.length);
	const titleKey: string = mappedKeys[random].name;

	const title = JSON.parse(titleKey).title;

	const url = await env.PHOTO_DETAILS.get(titleKey);

	const characteristics: D1Result<CharacteristicsResult> = await env.D1.prepare('SELECT * FROM characteristics WHERE title = ?1').bind(title).all<CharacteristicsResult>();

	return <main>
		<img src={url ? url : ''} alt={titleKey} />
		<ul>Characteristics</ul>
		{characteristics.results.map((result) => {
			return <li>{result.name}</li>;
		})}
	</main>;
};
