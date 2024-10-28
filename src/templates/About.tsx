import { FC } from 'hono/jsx';
import { Theme } from '../styles';

export const About: FC = () => {
	return <main class={Theme.mainContainer}>
		<section>
			<h3>About</h3>
			<article>
				Kyle is an incredible developer. He is great at this.
			</article>
		</section>
	</main>;
};
