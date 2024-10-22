import type { FC } from 'hono/dist/types/jsx';
import { css, Style } from 'hono/css';

const globalClass = css`
  :-hono-global {
		body {
			margin: 0;
		}
    html {
      font-family: Arial, Helvetica, sans-serif;
    }
		main {
			padding: 1rem 2rem;
		}
		nav {
			background-color:rgba(0, 0, 0, 0.2);
			margin: 2rem
		}
		a, a:visited {
			text-decoration: none;
			color: black;
		}
		ul {
			list-style: none;
		}
		li {
			padding: .3rem 1rem;
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
			<h1 class={headerClass}>kdr's random photo analyzer</h1>
			<nav>
				<ul>
					<li><a href={"/"}>Home</a></li>
					<li><a href={"/random"}>Show Me A Random Photo</a></li>
					<li><a href={"/about"}>About</a></li>
				</ul>
			</nav>
		</header>
		{props.children}
		</body>
		</html>
	)
}
