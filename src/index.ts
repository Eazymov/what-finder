import { render } from 'react-dom';

import AppRouter from 'Router';

import './style';

const root: Element | null = document.querySelector('#root');

render(AppRouter, root);
