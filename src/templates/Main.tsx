import { FC } from 'hono/jsx';
import { DbTypes } from '../types';

type MainProps = {
	env: Env
}

export const Main: FC<MainProps> = async ({ env }) => {
	const characteristicsDescending: D1Result<DbTypes.TotalCharacteristics> = await env.D1.prepare("SELECT name, count(*) as count FROM characteristics GROUP BY name ORDER BY count DESC").all<DbTypes.TotalCharacteristics>();

	return <main>
		This app analyzes a random photo from NASA to show its characteristics

		<h3>Total analyzed characteristics</h3>
		<table>
			<thead>
				<tr>
					<th>name</th>
					<th>count</th>
				</tr>
			</thead>
			<tbody>
			{characteristicsDescending.results.map(result => {
				return <tr>
					<td>{result.name}</td>
					<td>{result.count}</td>
				</tr>
			})}
			</tbody>
		</table>
	</main>
}
