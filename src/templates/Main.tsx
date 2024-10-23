import { FC } from 'hono/jsx';
import { DbTypes } from '../types';
import { Theme } from '../styles';
import { capitalize } from '../helpers';

type MainProps = {
	env: Env
}

export const Main: FC<MainProps> = async ({ env }) => {
	const characteristicsDescending: D1Result<DbTypes.TotalCharacteristics> = await env.D1.prepare('SELECT name, count(*) as count FROM characteristics GROUP BY name ORDER BY count DESC').all<DbTypes.TotalCharacteristics>();

	return <main class={Theme.mainContainer}>
		<section>
			<h3>Welcome to kdr's random photo analyzer</h3>
			This app analyzes a random photo from NASA to show its characteristics
		</section>
		<section>
			<h3>Total analyzed characteristics</h3>
			<table class={Theme.characteristicsTable}>
				<thead>
				<tr>
					<th>Name</th>
					<th>Count</th>
				</tr>
				</thead>
				<tbody>
				{characteristicsDescending.results.map(result => {
					return <tr>
						<td>{capitalize(result.name)}</td>
						<td>{result.count}</td>
					</tr>;
				})}
				</tbody>
			</table>
		</section>
	</main>;
};
