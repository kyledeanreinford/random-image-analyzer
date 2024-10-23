import { FC } from 'hono/jsx';
import { DbTypes } from '../types';
import { Theme } from '../styles';
import { capitalize } from '../helpers';

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

	return <main class={Theme.randomPhotoContainer}>
		<section>
			<h3>{title}</h3>
			<img src={url ? url : ''} alt={titleKey} />
		</section>
		<section>
			<h3>Characteristics of this photo</h3>
			<table>
				<thead>
				<tr>
					<th>Name</th>
				</tr>
				</thead>
				<tbody>
				{characteristics.results.map(result => {
					return <tr>
						<td>{capitalize(result.name)}</td>
					</tr>;
				})}
				</tbody>
			</table>
		</section>
	</main>;
};
