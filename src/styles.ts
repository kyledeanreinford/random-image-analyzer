import { css } from 'hono/css';

export namespace Theme {
	export const globalClass = css`
  :-hono-global {
		html {
			font-family: Arial, Helvetica, sans-serif;
		}
		header {
			text-align: center;
		}
		body {
			margin: 0;
		}
		main {
			max-width: 100rem;
			margin: 0 auto;
		}
		nav {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 1rem;
			font-size: 1.2rem;
			margin: 0 2rem
		}
		a, a:visited {
			text-decoration: none;
			color: black;
			&:hover {
				color: crimson;
			}
		}
		th {
			padding: 0 1rem .5rem;
		}
		td {
			min-width: 100px;
			padding: 0 1rem;
		}
		img {
			max-width: 50rem;
		}
  }
`

	export const headerClass = css`
    background-color: darkblue;
    color: white;
    padding: 2rem 1rem;
		margin-left: auto;
		margin-right: auto;
  `

	export const characteristicsTable = css`
		background-color: lightsalmon;
		text-align: left;
		color: white;
		padding: 1rem;
	`;

	export const mainContainer = css`
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		gap: 2rem;
	`;

	export const randomPhotoContainer = css`
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		gap: 2rem;

	`

}
