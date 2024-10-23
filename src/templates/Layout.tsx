import type { FC } from 'hono/dist/types/jsx';
import { css, Style } from 'hono/css';

const globalClass = css`
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

const headerClass = css`
    background-color: darkblue;
    color: white;
    padding: 2rem 1rem;
		margin-left: auto;
		margin-right: auto;
  `

export const Layout: FC = (props) => {
	return (
		<html lang="en">
		<head>
			<Style />
			<meta charSet="UTF-8" />
			<meta name="viewport"
						content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
			<meta http-equiv="X-UA-Compatible" content="ie=edge" />
			<title>kdr's random photo analyzer</title>
		</head>
		<body class={globalClass}>
		<header>
			<a href={"/"}><h1 class={headerClass}>kdr's random photo analyzer</h1></a>
			<nav>
					<a href={"/"}>Home</a>
					<a href={"/random"}>Show Me A Random Photo</a>
					<a href={"/about"}>About</a>
			</nav>
		</header>
		{props.children}
		</body>
		</html>
	)
}
