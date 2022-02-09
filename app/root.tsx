import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  LinksFunction,
} from 'remix';
import type { MetaFunction } from 'remix';
import rootStyles from './styles/root.css';

export const meta: MetaFunction = () => {
  return { title: 'Bio data' };
};

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: rootStyles }];
};

export default function App() {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
