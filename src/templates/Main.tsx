import { FC } from 'hono/jsx';
import { DbTypes } from '../types';
import { css } from 'hono/css';

type MainProps = {
	env: Env
}

const characteristicsTable = css`
	background-color: lightsalmon;
	text-align: left;
	color: white;
	padding: 1rem;
`;

const mainContainer = css`
	display: flex;
	flex-direction: row;
	gap: 2rem;
	flex-grow: 1;
`

export const capitalize = (s: string) => (s && s[0].toUpperCase() + s.slice(1)) || '';

export const Main: FC<MainProps> = async ({ env }) => {
	const characteristicsDescending: D1Result<DbTypes.TotalCharacteristics> = await env.D1.prepare('SELECT name, count(*) as count FROM characteristics GROUP BY name ORDER BY count DESC').all<DbTypes.TotalCharacteristics>();

	return <main class={mainContainer}>
		<section>
			<h3>Welcome to kdr's random photo analyzer</h3>
			This app analyzes a random photo from NASA to show its characteristics
		</section>
		<section>
			<h3>Total analyzed characteristics</h3>
			<table class={characteristicsTable}>
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
