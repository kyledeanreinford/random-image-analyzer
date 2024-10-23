import type { FC } from 'hono/dist/types/jsx';
import { Style } from 'hono/css';
import { Theme } from '../styles';

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
		<body class={Theme.globalClass}>
		<header>
			<a href={"/"}><h1 class={Theme.headerClass}>kdr's random photo analyzer</h1></a>
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
