import { css } from 'hono/css';

export namespace Theme {
	export const globalClass = css`
  :-hono-global {
		header {
			text-align: center;
		}
		body {
			margin: 0;
			width: 100%;
		}
    html {
      font-family: Arial, Helvetica, sans-serif;
    }
		main {
			padding: 1rem 2rem;
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
		}
		th {
			padding: 0 1rem .5rem;
		}
		td {
			min-width: 100px;
			padding: 0 1rem;
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
		gap: 2rem;
		flex-grow: 1;
	`;

	export const randomPhotoContainer = css`
	display: flex;
	flex-direction: row;
	gap: 2rem;
	flex-grow: 1;
`

}
