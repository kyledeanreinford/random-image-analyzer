import { FC } from 'hono/jsx';
import { DbTypes } from '../types';

type RandomPhotoProps = {
	env: Env;
}

export const RandomPhoto: FC<RandomPhotoProps> = async ({ env }) => {
	const photos = await env.PHOTO_DETAILS.list<KVNamespaceListResult<any>>();
	let mappedKeys: DbTypes.PhotoResult[] = [];

	photos.keys.map((photo) => {
		mappedKeys = [...mappedKeys, photo];
	});

	const random = Math.floor(Math.random() * photos.keys.length);
	const titleKey: string = mappedKeys[random].name;

	const title = JSON.parse(titleKey).title;

	const url = await env.PHOTO_DETAILS.get(titleKey);

	const characteristics: D1Result<DbTypes.CharacteristicsResult> = await env.D1.prepare('SELECT * FROM characteristics WHERE title = ?1').bind(title).all<DbTypes.CharacteristicsResult>();

	return <main>
		<h1>{title}</h1>
		<img src={url ? url : ''} alt={titleKey} />
		<ul>Characteristics
			{characteristics.results.map((result) => {
				return <li>{result.name}</li>;
			})}
		</ul>
	</main>;
};
